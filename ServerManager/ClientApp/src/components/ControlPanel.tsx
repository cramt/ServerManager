import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { MasterLogin } from './MasterLogin';

export class ControlPanel extends Component<RouteComponentProps<{}>, {}>  {
    displayName = ControlPanel.name
    constructor(props: RouteComponentProps<{}>) {
        super(props);
    }

    componentDidMount() {
        if (MasterLogin.username === null && MasterLogin.password === null) {
            this.props.history.push("/masterlogin")
        }
    }

    render() {
        return (
            <div>
                hello there
            </div>
        );
    }
}
