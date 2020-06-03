import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'reactstrap';

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
    transaction_for_month: string;
    transaction_amount: number;
    transaction_type: string;
    current_remaining_loan: number;
    created_at: string;
}

interface ExtendedMember extends Member {
    loan_transactions: Transaction[];
    saving_transactions: Transaction[];
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
                        &nbsp;
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
                        NRs. {member.remaining_loan}
                    </h3>
                    <span>Loan</span>
                </div>
            </div>
        </div>
    );
};

const MemberTransactions = ({ member }: { member: ExtendedMember; }) => {
    if(!member) { console.warn('....'); return null; };
    console.warn('in txns', member);
    const { name, loan_transactions, saving_transactions } = member;
    return (
        <div>
            <h2>Loan Transactions for <i>{ name }</i></h2>
            <hr/>
            {
                (loan_transactions && loan_transactions.length > 0 && (
                    <Table>
                        <thead>
                            <tr>
                                <th>Transaction Month</th>
                                <th>Transaction Amount</th>
                                <th>Transaction Type</th>
                                <th>Total Loan</th>
                                <th>Transaction On</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loan_transactions.map((txn, i: number) => (
                                    <tr key={i}>
                                        <td>{txn.transaction_for_month}</td>
                                        <td>NRs. {txn.transaction_amount}</td>
                                        <td>{txn.transaction_type}</td>
                                        <td>NRs. {txn.current_remaining_loan}</td>
                                        <td>{txn.created_at}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                )) || "No loan transactions"
            }
        </div>
    );
};

const _MemberComponent: React.FC = (props: MemberProps) => {
    const params = useParams();
    const [member, setMember] = useState<ExtendedMember>();
    useEffect(() => {
        requests.get(
            memberUrl(params.id),
            {'_expand': true },
            (mem) => { console.warn('MEMBER', mem); setMember(mem); },
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
