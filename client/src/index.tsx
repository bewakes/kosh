import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import AppRoute from './components/AppRoute';

import './style.scss';

import Header, { LinkAndTitle } from './components/layout/Header';

const App = () => {
    const links: LinkAndTitle = [
        { link: '/about', title: 'About' },
        { link: '/summary', title: 'Summary' },
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
