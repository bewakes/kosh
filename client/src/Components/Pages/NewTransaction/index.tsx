import React from 'react';

import Form, { FormSpecs } from '../../Form';

const SavingTxnTypes = [
    { key: 'return', label: 'Return' },
    { key: 'invest', label: 'Invest' },
];

const LoanTxnTypes = [
    { key: 'installment', label: 'Installment' },
    { key: 'principal', label: 'Principal' },
];

const newTxnSpecs: FormSpecs = (txnType: 'saving' | 'loan' ) => ({
    fields: {
        transaction_type: {
            label: 'Transaction Type',
            type: 'select',
            options: txnType == 'loan' ? LoanTxnTypes : SavingTxnTypes,
            required: true,
        },
        transaction_amount: {
            label: 'Amount',
            type: 'number',
            required: true,
        },
        transaction_method: {
            label: 'Method',
            type: 'select',
            options: [
                { key: 'cash', label: 'Cash' },
                { key: 'cheque', label: 'Cheque' },
            ],
            required: true,
        },
        transaction_for_month: {
            label: 'Month',
            type: 'date',
            required: true,
        },
        remarks: {
            label: 'Remarks',
            type: 'text',
        }
    },
});

interface NewTransactionProps {
    transactionType: 'saving' | 'loan';
}


const NewTransaction: React.FC<NewTransactionProps> = (props) => {
    const { transactionType } = props;
    const specs = newTxnSpecs(transactionType);
    const onSubmit = () => {};
    return (
        <>
        <h2>Add {transactionType}</h2>
        <Form onSubmit={onSubmit} specs={specs} />
        </>
    );
};

export default NewTransaction;
