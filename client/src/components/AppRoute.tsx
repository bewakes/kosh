import React from 'react';

import { Route } from 'react-router-dom';

import Home from './Pages/Home';
import NewMember from './Pages/NewMember';
import Members from './Pages/Members';

const AppRoute = () => {
    return (
        <>
            <Route
                exact
                path="/"
                render={Home}
            />
            <Route
                exact
                path="/newMember"
                render={NewMember}
            />
            <Route
                exact
                path="/members"
                render={Members}
            />
        </>
    );
};

export default AppRoute;
