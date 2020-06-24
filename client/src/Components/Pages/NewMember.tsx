import React from 'react';

import { wrapInsideSingleColumn }from '../Layout/SingleColumn';
import Form, { FormSpecs } from '../Form';
import requests from '../../Utils/requests';
import { useNotification } from '../../hooks';
import { membersUrl } from './consts';

import './style.scss';

export const memberFormSpecs: FormSpecs = {
    fields: {
        name: {
            label: "Member Name",
            type: "string",
            required: true,
        },
        contact : {
            label: "Contact Number",
            type: "string",
            required: true,
        },
        school_role: {
            label: "School Role",
            type: "string",
            required: false,
        },
        total_saving: {
            label: "Current Saving",
            type: "number",
            required: true,
        },
        remaining_loan: {
            label: "Current Remaining Loan",
            type: "number",
            required: true,
        },
        remarks: {
            label: "Remarks",
            type: "string",
            required: false,
        }
    },
    layout: [
        ['name', 'contact', 'school_role'],
        ['total_saving', 'remaining_loan'],
        ['remarks'],
    ],
};


const NewMember: React.FC = (props: any) => {
    const { setNotification } = useNotification();

    const onSuccess = (data: any) => {
        setNotification('Member Successfully Added', 'success');
        props.history.push('/members');
    };
    const onFailure = (err) => {
        setNotification(`Can't add member: ${err.toString()}`, 'error');
    };
    const onSubmit = (data) => {
        requests.post(membersUrl, data, onSuccess, onFailure);
    };
    return (
        <div className="page-content">
            <h2> Add New Member </h2>
            <hr />
            <Form specs={memberFormSpecs} onSubmit={onSubmit} />
        </div>
    );
};

export default wrapInsideSingleColumn(NewMember, 3);
