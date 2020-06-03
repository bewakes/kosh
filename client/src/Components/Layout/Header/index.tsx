import React from 'react';

import { Link } from 'react-router-dom';

import {
    Navbar, NavbarBrand, Nav, NavItem, NavLink, Collapse, NavbarText,
} from 'reactstrap';

import './style.scss';

const APP_TITLE = 'Valmiki Kosh';

export interface LinkAndTitle {
    link: string;
    title: string;
}

interface HeaderProps {
    links:  LinkAndTitle[];
}

const Header = (props: HeaderProps) => {
    const { links } = props;
    const isOpen = true;
    return (
        <Navbar color="white" light expand="md" className="navbar">
            <NavbarBrand href="/">{APP_TITLE}</NavbarBrand>
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
                    <b>Hi User !!</b>
                </NavbarText>
            </Collapse>
        </Navbar>
    );
};

export default Header;
