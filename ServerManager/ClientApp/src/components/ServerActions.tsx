import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { TokenAuthorizedComponent } from './TokenAuthorizedComponent';
import { AuthToken, parseAuthToken } from './AuthToken';
import { formatDate } from '../utilities';

export class ServerActions extends TokenAuthorizedComponent<{}>  {
    displayName = ServerActions.name;
    myself: AuthToken | null = null;
    constructor(props: RouteComponentProps<{}>) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount();
        fetch("api/AuthTokenController/GetMyself", {
            method: "post",
            body: JSON.stringify({ token: TokenAuthorizedComponent.token }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(async x => {
            let rawData = await x.text()
            console.log(rawData)
            if (rawData === null) {
                //todo some error thing
                return;
            }
            this.myself = parseAuthToken(JSON.parse(rawData))
            console.log(this.myself)
            this.setState({})
        })
    }

    render() {
        if (this.myself === null) {
            return (
                <div>
                    loading
            </div>
            );
        }
        else {
            return (
                <div>
                    <p>
                        Token: {this.myself.token}
                    </p>
                    <p>
                        Expiration: {formatDate(new Date(this.myself.expirationDate * 1000))}
                    </p>
                    <table>
                        <thead><th>
                            <td>
                                Server Action
                            </td>
                            <td>
                                Run
                            </td>
                        </th></thead>
                        <tbody>
                            {this.myself.serversAuthorized.map(server => (
                                <tr>
                                    <td>
                                        {server}
                                    </td>
                                    <td>
                                        <button onClick={() => {
                                            fetch("api/ServerController/RunServerAction", {
                                                method: "post",
                                                body: JSON.stringify({ token: TokenAuthorizedComponent.token, serverName: server }),
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                }
                                            }).then(async x => {
                                                let rawData = await x.text()
                                                alert(rawData);
                                            })
                                        }}>Run</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}
