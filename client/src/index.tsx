import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import AppRoute from './components/AppRoute';

import './style.scss';

import Header, { LinkAndTitle } from './components/Layout/Header';

const App = () => {
    const links: LinkAndTitle[] = [
        { link: '/members', title: 'Members' },
    ];
    return (
        <>
            <Header links={links} />
            <AppRoute />
        </>
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
