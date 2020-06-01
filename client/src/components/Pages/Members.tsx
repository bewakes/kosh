import React from 'react';
import { Link } from 'react-router-dom';

import SingleColumn from '../Layout/SingleColumn';

import {
    Button,
} from 'reactstrap';

import './style.scss';

const _Members: React.FC = () => {
    return (
        <div className="page-content">
            <h2> Members </h2>
            <Link to="/newMember">
                <Button type="button" color="success">Add</Button>
            </Link>
        </div>
    );
};

const Members: React.FC = () => (
    <SingleColumn Component={_Members} offset={0} />
);

export default Members;
