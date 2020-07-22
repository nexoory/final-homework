import React from "react";
import {NavLink} from "react-router-dom";
import logo from "../../img/logo.png"

import "./Header.scss"
import Container from "../Container/Container";

const Header = props => {

    const links = props.links.map((link, i) => (
        <NavLink
            key={i}
            activeClassName='header__link_active'
            className="header__link"
            to={link.link}>
            {link.name}
        </NavLink>
    ))

    return (
        <Container.Item padding="0">
            <header className="header">
                <NavLink to="/">
                    <img src={logo} className="header__logo" alt="logo"/>
                </NavLink>
                <nav className="header__nav">
                    {links}
                </nav>
            </header>
        </Container.Item>
    )
}

export default Header;