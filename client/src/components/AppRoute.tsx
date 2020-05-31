import React from 'react';

import { Route } from 'react-router-dom';

import Home from './Pages/Home';

const AppRoute = () => {
    return (
        <>
            <Route
                exact
                path="/"
                render={Home}
            />
        </>
    );
};

export default AppRoute;
