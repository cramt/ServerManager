import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap-typescript';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';
import { MasterLogin } from './MasterLogin';
import { MasterAuthorizedComponent } from './MasterAuthorizedComponent';

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
                        <LinkContainer to={'/tokenlogin'} exact>
                            <NavItem>
                                <Glyphicon glyph='home' /> Token Login
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/masterlogin'}>
                            <NavItem>
                                <Glyphicon glyph='th-list' /> Master Login
                            </NavItem>
                        </LinkContainer>
                        {(() => {
                            if (MasterAuthorizedComponent.username != null && MasterAuthorizedComponent.password != null) {
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
