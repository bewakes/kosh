import React from 'react';

import { FormSpecs } from '../../Form';

const SavingTransactionSpecs: FormSpecs = {
    fields: {
        transaction_type: {
            label: "Transaction Type",
            type: "select",
            required: true,
            options: [
                {key: "", label: ""}
            ],
        },
        transaction_amount: {
            label: "Amount",
            type: "number",
            required: true,
        },
        transaction_method: {
            label: "Method",
            type: "select",
            required: true,
            options: [
                {key: "", label: ""}
            ],
        }
    },
    layout: [
    ],
};


export const SavingTransaction: React.FC = (props) => {
    return null;
};
