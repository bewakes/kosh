import React, { useContext } from 'react';

import { NotificationContext } from '../context';

export const NotificationHOC = (Component: any) => (props: any) => {
    const setNotification = useContext(NotificationContext);
    return (<Component {...props} setNotification={setNotification} />);
};
