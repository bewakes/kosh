import React from 'react';

import requests from '../../Utils/requests';
import { useNotification } from '../../hooks';
import { summaryUrl } from './consts';

import './style.scss';

interface Summary {
    total_members: number;
    total_collected: number;
    total_loan: number;
}

const Home: React.FC = (props) => {
    const [summary, setSummary] = React.useState<Summary>();
    const { setNotification } = useNotification();
    React.useEffect(() => {
        requests.get(
            summaryUrl,
            {},
            setSummary,
            (err) => {
                console.warn('Fetch summary error: ', err);
                setNotification('Could not fetch summary', 'error');
            }
        );
    }, []);
    return (
        <div className="home">
            <div className="kosh-summary">
                <div className="summary-item">
                    <h1>{summary?.total_members || '-'}</h1>
                    <h2>Total Members</h2>
                </div>
                <div className="summary-item">
                    <h1>NRs. {summary?.total_loan || '-'}</h1>
                    <h2>Total Loan</h2>
                </div>
                <div className="summary-item">
                    <h1>NRs. {summary?.total_collected || '-'}</h1>
                    <h2>Total Collected</h2>
                </div>
            </div>
        </div>
    );
};

export default Home;
