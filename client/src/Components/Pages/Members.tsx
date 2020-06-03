import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import requests from '../../Utils/requests';
import SingleColumn from '../Layout/SingleColumn';
import List from '../Display/List';

import {
    Button,
} from 'reactstrap';

import { membersUrl } from './consts';

import './style.scss';

interface Member {
    name: string;
    contact: string;
    school_role: string;
    total_saving: number;
    remaining_loan: number;
    remarks: string;
}

const MemberRenderer = ({ item  }: { item: Member; }) => {
    return (
        <a href="" className="list-item-link">
            <div className="list-item-member">
                <b>{item.name}</b>
                <small>{item.school_role}</small>
            </div>
        </a>
    );
};

const _Members: React.FC = (props: any) => {
    const [members, setMembers] = useState<Member>([]);
    useEffect(() => {
        requests.get(
            membersUrl,
            {},
            setMembers,
            err => { props.setNotification(err.toString(), 'error') },
        );
    }, []);
    return (
        <div className="page-content">
            <h2> Members &nbsp;
                <Link to="/newMember">
                    <Button type="button" color="success">Add New Member</Button>
                </Link>
            </h2>
            <hr style={{width: '100% !important'}} />
            <List items={members} Component={MemberRenderer} />
        </div>
    );
};

const Members: React.FC = (props: any) => (
    <SingleColumn Component={_Members} offset={2} componentProps={props} />
);

export default Members;
