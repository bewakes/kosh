import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import { NotificationContext } from './context';
import AppRoute from './Components/AppRoute';

import './style.scss';

import Header, { LinkAndTitle } from './Components/Layout/Header';

interface Notification {
    message: string;
    type: string;
}

const App = () => {
    const [ notificationObj, setNotificationObj ] = useState<Notification>();
    const [ showNotification, setShowNotification ] = useState(false);

    const setNotification = (message: string, type: string) => {
        setNotificationObj({ message, type });
        setShowNotification(true);
        setTimeout(setShowNotification, 3000, false);
    };

    const links: LinkAndTitle[] = [
        { link: '/members', title: 'Members' },
    ];
    return (
        <NotificationContext.Provider value={setNotification}>
            <Header links={links} />
            <AppRoute />
            {
                showNotification && notificationObj ? (
                    <div className={"notification " + notificationObj.type}>
                        <span>{ notificationObj.message }</span>
                    </div>
                ) : null
            }
        </NotificationContext.Provider>
    );
};

const WrappedApp = () => (
    <HashRouter>
        <App />
    </HashRouter>
);

ReactDOM.render(
    (<WrappedApp/>),
    document.getElementById('app'),
);
