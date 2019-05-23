import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';

export class MasterLogin extends Component<RouteComponentProps<{}>, {}> {
    public static username: string | null = null;
    public static password: string | null = null;
    displayName = MasterLogin.name
    constructor(props: RouteComponentProps<{}>) {
        super(props);
    }

    usernameInput: HTMLInputElement | null = null
    passwordInput: HTMLInputElement | null = null

    login = () => {
        if (this.usernameInput != null && this.passwordInput != null) {
            let pass = true;
            if (this.usernameInput.value == "") {
                pass = false;
                this.errorMessage = "username is empty"
                this.setState({})
            }
            if (this.passwordInput.value == "") {
                pass = false;
                this.errorMessage = "password is empty"
                this.setState({})
            }
            if (pass) {
                let username = this.usernameInput.value
                let password = this.passwordInput.value
                fetch("api/LoginController/Login", {
                    method: "post",
                    body: JSON.stringify({ username: username, password: password }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(async x => {
                    if ((await x.text()) == "true") {
                        MasterLogin.username = username
                        MasterLogin.password = password
                        this.setState({})
                        this.props.history.push("/controlpanel")
                    }
                    else {
                        this.errorMessage = "username and password didnt match"
                        this.setState({})
                    }
                })
            }
        }
    }

    errorMessage: string = "";

    loginKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            this.login()
        }
    }

    render() {
        return (
            <div>
                <h2>Master Login</h2>
                <label>username: </label>
                <input type="text" ref={e => { this.usernameInput = e }} onKeyUp={this.loginKeyPress} />
                <br />
                <label>password: </label>
                <input type="password" ref={e => { this.passwordInput = e }} onKeyUp={this.loginKeyPress} />
                <br />
                <button onClick={this.login}>login</button>
                <br />
                <span style={{
                    color: "red"
                }}>{this.errorMessage}</span>
            </div>
        );
    }
}
