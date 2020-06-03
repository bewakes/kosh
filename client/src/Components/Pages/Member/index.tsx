import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import requests from '../../../Utils/requests';
import { memberUrl } from '../consts';
import SingleColumn from '../../Layout/SingleColumn';
import { memberFormSpecs } from '../NewMember';
import { NotificationHOC } from '../../../Utils/hocs';
import { Member } from '../Members';

import './style.scss';

interface MemberProps {
    id: number;
}

interface Transaction {
}

interface ExtendedMember extends Member {
    transaction: Transaction[];
}

const MemberSummary = ({ member }) => {
    if(!member) { return null; };
    return (
        <div>
            <h2>Member Info for <i>{member && member.name}</i></h2>
            <hr/>
            <div className="summary-blocks">
                <div className="summary-item">
                    <h3 className="summary-item-child">
                        .
                    </h3>
                    <span>{member.school_role || "No role info"}</span>
                </div>
                <div className="summary-item">
                    <h3 className="summary-item-child">
                        NRs. {member.total_saving}
                    </h3>
                    <span>Savings</span>
                </div>
                <div className="summary-item">
                    <h3 className="summary-item-child">
                        NRs. {member.remaining_loan && 100000}
                    </h3>
                    <span>Loan</span>
                </div>
            </div>
        </div>
    );
};

const MemberTransactions = ({ member }) => {
    if(!member) { return null; };
    return (
        <div>
            <h2>Transactions for <i>{ member && member.name }</i></h2>
            <hr/>
        </div>
    );
};

const _MemberComponent: React.FC = (props: MemberProps) => {
    const params = useParams();
    const [member, setMember] = useState<ExtendedMember>();
    console.warn('hereeee');
    useEffect(() => {
        console.warn('using effect');
        requests.get(
            memberUrl(params.id),
            {'_expand': true },
            (mem) => { console.warn(mem); setMember(mem); },
            (err) => { props.setNotification(err.toString(), "error"); },
        );
    }, []);

    return (
        <div className="page-content">
            <MemberSummary member={member} />
            <br />
            <MemberTransactions member={member} />
        </div>
    );
};

const MemberComponent: React.FC = (props: MemberProps) => (
    <SingleColumn Component={NotificationHOC(_MemberComponent)} offset={2} componentProps={props} />
);

export default MemberComponent;
