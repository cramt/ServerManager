import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { AuthorizedComponent } from './AuthorizedComponent';
import { parseAuthToken, AuthToken } from './AuthToken';

export class ControlPanel extends AuthorizedComponent<{}>  {
    displayName = ControlPanel.name;
    authTokens: AuthToken[] | null = null;
    constructor(props: RouteComponentProps<{}>) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount();
        fetch("api/AuthTokenController/GetTokens", {
            method: "post",
            body: JSON.stringify({ username: AuthorizedComponent.username, password: AuthorizedComponent.password }),
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
    }

    formatDate(date: Date): string {
        let options: Intl.DateTimeFormatOptions = {
            second: "2-digit",
            minute: "2-digit",
            hour: "2-digit",
            month: "2-digit",
            year: "numeric",
            day: "2-digit"
        }
        return date.toLocaleDateString("en-GB", options)
    }

    render() {
        if (this.authTokens === null) {
            return (
                <div>
                    loading
            </div>
            );
        }
        else {
            return (
                <div>
                    <table>
                        <thead><tr>
                            <th>token name</th>
                            <th>expiration date</th>
                            <th>edit</th>
                        </tr></thead>
                        <tbody>
                            {this.authTokens.map(x => (
                                <tr>
                                    <td>
                                        {x.token}
                                    </td>
                                    <td>
                                        {this.formatDate(new Date(x.expirationDate*1000))}
                                    </td>
                                    <td>
                                        <button onClick={() => {
                                            this.props.history.push("/authtoken/" + x.token)
                                        }}>edit</button>
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
