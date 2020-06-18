import React from 'react';

import { useNotification } from '../../../hooks';

import './style.scss';

const Notification: React.FC = () => {
    const { ephemeral, persistent, clearPersistent } = useNotification();
    return (
        <>
        {
            ephemeral.show? (
                <div className={"notification " + ephemeral.type}>
                    <span>{ ephemeral.message }</span>
                </div>
            ) : null
        }
        {
            persistent.show ? (
                <div className={"notification-persistent " + persistent.type}>
                    <span
                        className="persistent-cross"
                        onClick={clearPersistent}
                    >
                        X
                    </span>
                    <span>{ persistent.message } </span>
                </div>
            ) : null
        }
        </>
    );
};

export default Notification;
