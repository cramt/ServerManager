import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { MasterAuthorizedComponent } from './MasterAuthorizedComponent';
import { AuthToken, parseAuthToken } from './AuthToken';
import { formatDate } from '../utilities';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

interface AuthTokenComponentProps {
    id: string
}

export class AuthTokenEdit extends MasterAuthorizedComponent<AuthTokenComponentProps>  {
    displayName = AuthTokenEdit.name
    servers: string[] | null = null;
    authToken: AuthToken | null = null;
    constructor(props: RouteComponentProps<AuthTokenComponentProps>) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount();
        fetch("api/AuthTokenController/GetToken", {
            method: "post",
            body: JSON.stringify({ username: MasterAuthorizedComponent.username, password: MasterAuthorizedComponent.password, id: this.props.match.params.id }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(async x => {
            let rawData = await x.text()
            if (rawData === null) {
                //todo some error thing
                return;
            }
            this.authToken = parseAuthToken(JSON.parse(rawData))
            this.expirationDate = new Date(this.authToken.expirationDate * 1000)
            this.setState({})
        })

        fetch("api/ServerController/GetServers", {
            method: "post",
            body: JSON.stringify({ username: MasterAuthorizedComponent.username, password: MasterAuthorizedComponent.password }),
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
            this.servers = JSON.parse(rawData)
            this.setState({})
        })
    }
    expirationDate: Date | null = null;
    render() {
        if (this.servers !== null && this.authToken !== null) {
            return (
                <div>
                    <p>
                        token id: {this.authToken.token}
                    </p>
                    <DatePicker
                        selected={this.expirationDate}
                        onChange={d => {
                            console.log(d)
                            if (d !== null) {
                                this.expirationDate = d;
                                this.setState({});
                            }
                        }}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="d/m/yyyy HH:mm"
                        timeInputLabel="Time"
                    />
                    <br />
                    <br />
                    <table>
                        <thead><tr>
                            <th>
                                server
                            </th>
                            <th>
                                allowed
                            </th>
                        </tr></thead>
                        <tbody>
                            {this.servers.map((x, i) => (
                                <tr key={i}>
                                    <td>
                                        {x}
                                    </td>
                                    <td>
                                        <input type="checkbox"
                                            defaultChecked={this.authToken!.serversAuthorized.includes(x)}
                                            onClick={e => {
                                                if (e.currentTarget.checked) {
                                                    this.authToken!.serversAuthorized[this.authToken!.serversAuthorized.length] = x
                                                }
                                                else {
                                                    let index = this.authToken!.serversAuthorized.indexOf(x)
                                                    if (index !== -1) {
                                                        this.authToken!.serversAuthorized.splice(index, 1)
                                                    }
                                                }
                                            }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                    <br />
                    <button onClick={() => {
                        this.authToken!.expirationDate = Math.floor(((this.expirationDate as any as number) - 0) / 1000)
                        fetch("api/AuthTokenController/UpdateToken", {
                            method: "post",
                            body: JSON.stringify({ username: MasterAuthorizedComponent.username, password: MasterAuthorizedComponent.password, authToken: this.authToken }),
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }).then(async x => {
                            let rawData = await x.text()
                        })
                    }}>save</button>
                    <br />
                    <br />
                    <button onClick={() => {
                        fetch("api/AuthTokenController/DeleteToken", {
                            method: "post",
                            body: JSON.stringify({ username: MasterAuthorizedComponent.username, password: MasterAuthorizedComponent.password, id: this.authToken!.token }),
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }).then(async x => {
                            let rawData = await x.text()
                            this.props.history.push("/controlpanel")
                        })
                    }}>delete</button>
                </div>
            )
        }
        else {
            return (
                <div>
                    loading
            </div>
            );
        }
    }
}
