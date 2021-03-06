import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Nav, NavItem, NavLink, TabPane, TabContent, Button } from 'reactstrap';
import classNames from 'classnames';

import { useNotification } from '../../../hooks';
import requests from '../../../Utils/requests';
import { memberUrl } from '../consts';
import SingleColumn from '../../Layout/SingleColumn';
import Modal from '../../Display/Modal';

import { ExtendedMember, Transaction } from './types';
import TransactionForm from './TransactionForm';

import './style.scss';

interface MemberProps {
    id: number;
}

type SummaryProps = {
    member: ExtendedMember;
    formAction: () => void;
};

const MemberSummary = (props: SummaryProps) => {
    const { member, formAction } = props;
    const [ transactionForm, setTransactionForm ] = useState<"saving" | "loan" | null>(null);
    const onClose = () => { setTransactionForm(null) };
    if(!member) { return null; };
    return (
        <div>
            <h2>{member && member.name}</h2>
            { transactionForm !== null && (
                <Modal onClose={() => setTransactionForm(null)}>
                    <TransactionForm formAction={formAction} member={member} type={transactionForm} onClose={onClose} />
                </Modal>
            )}
            <hr/>
            <div className="summary-blocks">
                <div className="summary-item">
                    <h3 className="summary-item-child">
                    <b>{member.school_role || "No role info"}</b>
                    </h3>
                    <h3>
                    {member.school_role ? "School Role" : null }
                        </h3>
                </div>
                <div className="summary-item">
                    <h3 className="summary-item-child">
                        <b>NRs. {member.total_saving}</b>
                    </h3>
                    <h3>
                        Savings&nbsp;
                        <Button
                            className="add-transaction" color="primary"
                            size="sm" onClick={() => setTransactionForm("saving")}
                        >
                            <b>+</b>
                        </Button>
                    </h3>
                </div>
                <div className="summary-item">
                    <h3 className="summary-item-child">
                        <b>NRs. {member.remaining_loan}</b>
                    </h3>
                    <h3>
                        Loan&nbsp;
                        <Button
                            className="add-transaction" color="primary"
                            size="sm" onClick={() => setTransactionForm("loan")}
                        >
                            <b>+</b>
                        </Button>
                    </h3>
                </div>
            </div>
        </div>
    );
};

const MemberTransactions = ({ transactions, type }: { transactions: Transaction[]; type: "saving" | "loan"; }) => {
    const totalDisplay = type === "saving" ? "Saving": "Loan";
    return (
        <div>
            {
                (transactions && transactions.length > 0 && (
                    <Table>
                        <thead>
                            <tr>
                                <th>Transaction Month</th>
                                <th>Transaction Amount</th>
                                <th>Transaction Type</th>
                                <th>Total {totalDisplay}</th>
                                <th>Transaction On</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                transactions.map((txn, i: number) => (
                                    <tr key={i}>
                                        <td>{txn.transaction_for_month}</td>
                                        <td>NRs. {txn.transaction_amount}</td>
                                        <td>{txn.transaction_type}</td>
                                        <td>NRs. {type === "saving" ? txn.current_saving : txn.current_remaining_loan}</td>
                                        <td>{new Date(txn.created_at).toDateString()}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                )) || (<small>No transactions</small>)
            }
        </div>
    );
};

const _MemberComponent: React.FC<MemberProps> = (props) => {
    const { setNotification } = useNotification();
    const params = useParams<{id: any}>();
    const [member, setMember] = useState<ExtendedMember>();
    const [activeTab, setActiveTab] = useState('1');
    const toggle = (id: string) => (activeTab !== id) && setActiveTab(id);

    const retrieveMember = () => {
        requests.get(
            memberUrl(params.id),
            {'_expand': true },
            (mem) => { setMember(mem); },
            (err) => { setNotification(err.toString(), "error"); },
        );
    };

    useEffect(() => {
        if(!params.id) return;
        retrieveMember();
    }, []);
    return member ? (
        <div className="page-content">
            <MemberSummary member={member} formAction={retrieveMember}/>
            <br />
            <Nav tabs>
                <NavItem className="nav-tab-item">
                    <NavLink
                        className={classNames({active: activeTab === '1'})}
                        onClick={() => toggle('1')}
                    >
                        Saving Transactions
                    </NavLink>
                </NavItem>
                <NavItem className="nav-tab-item">
                    <NavLink
                        className={classNames({active: activeTab === '2'})}
                        onClick={() => toggle('2')}
                    >
                        Loan Transactions
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <MemberTransactions transactions={member.saving_transactions} type="saving"/>
                </TabPane>
                <TabPane tabId="2">
                    <MemberTransactions transactions={member.loan_transactions} type="loan"/>
                </TabPane>
            </TabContent>
        </div>
    ) : null;
};

const MemberComponent: React.FC<MemberProps> = (props) => (
    <SingleColumn Component={_MemberComponent} offset={2} componentProps={props} />
);

export default MemberComponent;
