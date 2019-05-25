import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { MasterLogin } from './components/MasterLogin';
import { ControlPanel } from './components/ControlPanel';
import { AuthTokenEdit } from './components/AuthTokenEdit';
import { TokenLogin } from './components/TokenLogin';

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetchdata' component={FetchData} />
                <Route path='/masterlogin' component={MasterLogin} />
                <Route path='/controlpanel' component={ControlPanel} />
                <Route path='/authtoken/:id' component={AuthTokenEdit} />
                <Route path='/tokenlogin' component={TokenLogin} />
            </Layout>
        );
    }
}
