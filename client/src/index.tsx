import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import AppRoute from './Components/AppRoute';

import './style.scss';

const App = () => {
    return ( <AppRoute />);
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
