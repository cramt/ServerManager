import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap-typescript';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';
import { MasterLogin } from './MasterLogin';
import { AuthorizedComponent } from './AuthorizedComponent';

export class NavMenu extends Component {
    displayName = NavMenu.name

    render() {
        return (
            <Navbar inverse fixedTop fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={'/'}>ServerManager</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to={'/'} exact>
                            <NavItem>
                                <Glyphicon glyph='home' /> Home
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/counter'}>
                            <NavItem>
                                <Glyphicon glyph='education' /> Counter
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/fetchdata'}>
                            <NavItem>
                                <Glyphicon glyph='th-list' /> Fetch data
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/masterlogin'}>
                            <NavItem>
                                <Glyphicon glyph='th-list' /> Master Login
                            </NavItem>
                        </LinkContainer>
                        {(() => {
                            if (AuthorizedComponent.username != null && AuthorizedComponent.password != null) {
                                return <LinkContainer to={'/controlpanel'}>
                                    <NavItem>
                                        <Glyphicon glyph='th-list' /> Control Panel
                                    </NavItem>
                                </LinkContainer>
                            }
                        })()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
