import React from 'react';

import requests from '../../../Utils/requests';
import Form, { FormSpecs } from '../../Form';
import { useNotification } from '../../../hooks';

import { Member } from './types';
import './style.scss';

interface FormProps {
    member: Member;
    type: "loan" | "saving";
    onClose?: () => void;
    formAction: () => void;
}

const transactionSpecs: (member: Member, a: string) => FormSpecs = (member, type) => ({
    fields: {
        transaction_amount: {
            label: "Transaction Amount",
            type: "number",
            required: true,
        },
        transaction_method: {
            label: "Transaction Method",
            type: "select",
            required: true,
            options: [
                { key: "cash", label: "Cash" },
                { key: "cheque", label: "Cheque" },
            ]
        },
        transaction_for_month: {
            label: "Transaction Month",
            type: "date",
            required: true,
        },
        transaction_type: {
            label: "Transaction Type",
            type: "select",
            required: true,
            options: (
                type === 'loan'
                ? [['return', 'Return'], ['invest', 'Invest']]
                : [['installment', 'Installment'], ['principal', 'Principal']]
            ).map(([key, label]) => ({key, label}))
        },
        remarks: {
            label: "Remarks",
            type: "text",
            required: false,
        },
    },
    layout: [
        ['transaction_amount', 'transaction_method'],
        ['transaction_for_month', 'transaction_type'],
        ['remarks']
    ]
});

const TransactionForm: React.FC<FormProps> = (props) => {
    console.warn(props);
    const { type, onClose, member, formAction } = props;
    const { setNotification } = useNotification();

    const onSuccess = () => {
        setNotification("Tranasction added successfully", "success");
        formAction();
        onClose && onClose();
    };
    const onFailure = (err: any) => {
        setNotification(err.message || "Could not add transaction", "error");
    }
    const txnURL = type === "saving" ? "/api/saving-transactions/" : "/api/loan-transactions/";
    const onSubmit = (data: any) => {
        const dataWithMember = {...data, member: member.id};
        requests.post(txnURL, dataWithMember, onSuccess, onFailure);
    };

    return (
        <div className="transaction-form">
            <h3>{member.name}: Add a {type} transaction</h3>
            <hr/>
            <Form specs={transactionSpecs(member, type)} onSubmit={onSubmit} />
        </div>
    );
};

export default TransactionForm;
