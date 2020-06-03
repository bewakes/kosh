import React from 'react';

import { Route } from 'react-router-dom';

import Home from './Pages/Home';
import NewMember from './Pages/NewMember';
import Members from './Pages/Members';
import Member from './Pages/Member';

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
                render={(props) => (<NewMember {...props} />)}
            />
            <Route
                exact
                path="/members"
                render={(props) => (<Members {...props} />)}
            />
            <Route
                exact
                path="/members/:id/"
                render={(props) => (<Member {...props} />)}
            />
        </>
    );
};

export default AppRoute;
