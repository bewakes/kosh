import React from 'react';

import SingleColumn from '../Layout/SingleColumn';
import Form, { FormSpecs } from '../Form';
import requests from '../../Utils/requests';
import { NotificationHOC } from '../../Utils/hocs';

import './style.scss';

const memberFormSpecs: FormSpecs = {
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

const postUrl = '/api/members/';

const _NewMember: React.FC = (props: any) => {
    const onSuccess = (data: any) => {
        props.setNotification('Added member', 'success');
        props.history.push('/members');
    };
    const onFailure = (err) => {
        props.setNotification(`Can't add member: ${err.toString()}`, 'error');
    };
    const onSubmit = (data) => {
        requests.post(postUrl, data, onSuccess, onFailure);
    };
    return (
        <div className="page-content">
            <h2> Add New Member </h2>
            <hr />
            <Form specs={memberFormSpecs} onSubmit={onSubmit} />
        </div>
    );
};

const NewMember = ( props: any) => (
    <SingleColumn Component={_NewMember} offset={2} componentProps={props} />
);

export default NotificationHOC(NewMember);
