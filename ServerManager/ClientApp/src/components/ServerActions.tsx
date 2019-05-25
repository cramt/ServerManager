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
                        token: {this.myself.token}
                    </p>
                    <p>
                        expiration: {formatDate(new Date(this.myself.expirationDate * 1000))}
                    </p>
                    <table>
                        <thead><th>
                            <td>
                                server action
                            </td>
                            <td>
                                run
                            </td>
                        </th></thead>
                        <tbody>
                            {this.myself.serversAuthorized.map(x => (
                                <tr>
                                    <td>
                                        {x}
                                    </td>
                                    <td>
                                        <button onClick={() => {
                                            alert(x)
                                        }}>run</button>
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
