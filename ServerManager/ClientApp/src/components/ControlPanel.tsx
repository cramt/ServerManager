import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { MasterAuthorizedComponent } from './MasterAuthorizedComponent';
import { parseAuthToken, AuthToken } from './AuthToken';
import { formatDate } from '../utilities';

export class ControlPanel extends MasterAuthorizedComponent<{}>  {
    displayName = ControlPanel.name;
    authTokens: AuthToken[] | null = null;
    constructor(props: RouteComponentProps<{}>) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount();
    }

    render() {
        if (this.authTokens === null) {
            fetch("api/AuthTokenController/GetTokens", {
                method: "post",
                body: JSON.stringify({ username: MasterAuthorizedComponent.username, password: MasterAuthorizedComponent.password }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(async x => {
                let rawData = await x.text()
                if (rawData === null) {
                    //todo some error thing
                    return;
                }
                this.authTokens = (JSON.parse(rawData) as any[]).map(parseAuthToken)
                this.setState({})
            })
            return (
                <div>
                    loading
            </div>
            );
        }
        else {
            return (
                <div>
                    <table style={{
                        border: "1"
                    }}>
                        <thead><tr>
                            <th>Name</th>
                            <th>Token Name</th>
                            <th>Expiration Date</th>
                            <th>Edit</th>

                        </tr></thead>
                        <tbody>
                            {this.authTokens.map((x, i) => (
                                <tr key={i}>
                                    <td>
                                        {x.name}
                                    </td>
                                    <td>
                                        {x.token}
                                    </td>
                                    <td>
                                        {formatDate(new Date(x.expirationDate * 1000))}
                                    </td>
                                    <td>
                                        <button onClick={() => {
                                            this.props.history.push("/authtoken/" + x.token)
                                        }}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={() => {
                        fetch("api/AuthTokenController/NewToken", {
                            method: "post",
                            body: JSON.stringify({ username: MasterAuthorizedComponent.username, password: MasterAuthorizedComponent.password }),
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }).then(async x => {
                            let rawData = await x.text()
                            if (rawData === null) {
                                //todo some error thing
                                return;
                            }
                            this.authTokens = null;
                            this.setState({})
                        })
                    }}>Generate New</button>
                </div>
            );
        }
    }
}
