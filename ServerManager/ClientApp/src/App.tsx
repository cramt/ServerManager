import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { MasterLogin } from './components/MasterLogin';
import { ControlPanel } from './components/ControlPanel';
import { AuthTokenEdit } from './components/AuthTokenEdit';
import { TokenLogin } from './components/TokenLogin';
import { ServerActions } from './components/ServerActions';

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <Layout>
                <Route path='/masterlogin' component={MasterLogin} />
                <Route path='/controlpanel' component={ControlPanel} />
                <Route path='/authtoken/:id' component={AuthTokenEdit} />
                <Route path='/tokenlogin' component={TokenLogin} />
                <Route path='/serveractions' component={ServerActions} />
            </Layout>
        );
    }
}
