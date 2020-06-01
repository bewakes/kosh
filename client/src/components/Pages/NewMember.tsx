import React from 'react';

import SingleColumn from '../Layout/SingleColumn';
import Form from '../Form';

import './style.scss';

const sampleFormSpecs = {
    fields: {
        name: {
            label: "Name",
            type: "string",
            required: true,
        },
        email: {
            label: "Email",
            type: "string",
            required: true,
        },
        age: {
            label: "Age",
            type: "number",
            required: true,
        }
    },
    layout: [
        ['name', 'email'],
        ['age'],
    ],
};

const _NewMember: React.FC = () => {
    const onSubmit = (data) => { console.warn('DATA', data); };
    return (
        <div className="page-content">
            <h2> Add New Member </h2>
            <Form specs={sampleFormSpecs} onSubmit={onSubmit} />
        </div>
    );
};

const NewMember = () => (
    <SingleColumn Component={_NewMember} offset={2} />
);

export default NewMember;
