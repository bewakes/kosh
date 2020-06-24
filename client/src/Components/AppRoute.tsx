import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { NotificationProvider } from '../context';
import Notification from './UI/Notification';

import Header, { LinkAndTitle } from '../Components/Layout/Header';
import Home from './Pages/Home';
import NewMember from './Pages/NewMember';
import Members from './Pages/Members';
import Member from './Pages/Member';
import Login from './Pages/Login';


const links: LinkAndTitle[] = [
    { link: '/members', title: 'Members' },
];

const ProtectedRoute = (props: any) => {
    const { render: Component, ...rest } = props;
    return (
        <Route
            {...rest}
            render={(componentProps) => {
                if (window.localStorage.getItem('loggedIn') == "true") {
                    return (<Component {...componentProps} />);
                } else {
                    return (<Redirect to="/login" />);
                }
            }}
        />
    );
};

const withHeader = (Component: any) => (props: any) => (
    <>
        <Header links={links} />
        <Component {...props} />
    </>
);

const AppRoute = () => {
    return (
        <NotificationProvider>
            <ProtectedRoute
                exact
                path="/"
                render={withHeader(Home)}
            />
            <Route
                exact
                path="/newMember"
                render={withHeader(NewMember)}
            />
            <Route
                exact
                path="/members"
                render={withHeader(Members)}
            />
            <Route
                exact
                path="/members/:id"
                render={withHeader(Member)}
            />
            <Route
                exact
                path="/login"
                render={(props) => (<Login {...props} />)}
            />
            <Notification />
        </NotificationProvider>
    );
};

export default AppRoute;
