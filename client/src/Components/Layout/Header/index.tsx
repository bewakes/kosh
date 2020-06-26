import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
    Navbar, NavbarBrand, Nav, NavItem, NavLink, Collapse, NavbarText,
    Button,
} from 'reactstrap';

import { useNotification } from '../../../hooks';
import { logoutUrl } from '../../Pages/consts';
import requests from '../../../Utils/requests';

import './style.scss';

const APP_TITLE = 'Valmiki Kosh';

export interface LinkAndTitle {
    link: string;
    title: string;
}

interface HeaderProps {
    links:  LinkAndTitle[];
}

const Header: React.FC<HeaderProps> = (props) => {
    const { links } = props;
    const { setNotification } = useNotification();
    const isOpen = true;
    const userinfo = JSON.parse(window.localStorage.getItem("userinfo") || "{}");
    const logout = () => {
        requests.post(
            logoutUrl,
            {},
            () => { localStorage.clear(); props.history.push("/"); },
            () => setNotification("Could not logout", "warning")
        );
    };
    const displayName = (userinfo.name && userinfo.name.trim() !== '' && userinfo.name) || userinfo.username;
    return (
        <Navbar color="white" light expand="md" className="navbar">
            <NavbarBrand tag={Link} to="/"><b>{APP_TITLE}</b></NavbarBrand>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" />
                <Nav className="mr-auto" />
                <Nav className="mr-auto" navbar>
                    {
                    links.map(
                        (link: LinkAndTitle, i: number) => (
                            <NavItem key={i}>
                                <NavLink tag={Link} to={link.link}>{link.title}</NavLink>
                            </NavItem>
                        ))
                    }
                </Nav>
                <NavbarText>
                    <b>{ displayName } </b>
                        <Button size="sm" color="danger" onClick={logout}>Logout</Button>
                </NavbarText>
            </Collapse>
        </Navbar>
    );
};

export default withRouter(Header);
