import React from 'react';

import { useNotification } from '../../hooks';
import requests from '../../Utils/requests';
import { loginUrl } from './consts';

import { wrapInsideSingleColumn } from '../Layout/SingleColumn';
import Form, { FormSpecs } from '../Form';

export const loginSpecs: FormSpecs = {
    fields: {
        username: {
            label: "User Name or Email",
            type: "string",
            required: true
        },
        password: {
            label: "Password",
            type: "password",
            required: true
        }
    },
    layout: [
        ['username'],
        ['password'],
    ]
};


const Login: React.FC = (props: any) => {
    const { setNotification } = useNotification();
    const doLogin = (data) => {
        requests.post(
            loginUrl,
            data,
            (userinfo) => {
                console.warn('logged in!!!', userinfo);
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("userinfo", JSON.stringify(userinfo));
                props.history.push("/");
            },
            (err) => {
                setNotification(err.detail || "Could not login", "error");
            }
        );
    };
    return (
        <div className="page-content" style={{marginTop: '10vh'}}>
            <h2> Valmiki Kosh Login </h2>
            <hr/>
            <Form specs={loginSpecs} onSubmit={doLogin} submitText="Login" />
        </div>
    );
};

export default wrapInsideSingleColumn(Login, 4);
