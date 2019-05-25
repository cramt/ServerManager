import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';

export class TokenLogin extends Component<RouteComponentProps<{}>, {}> {
    displayName = TokenLogin.name
    tokenInput: HTMLInputElement | null = null
    constructor(props: RouteComponentProps<{}>) {
        super(props);
    }

    login = () => {
        fetch("api/LoginController/AuthLogin", {
            method: "post",
            body: JSON.stringify({ token: this.tokenInput!.value }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(async x => {
            let text = (await x.text())
            console.log(text)
            if (text == "true") {
                
            }
            else {
                this.errorMessage = "token didnt match"
                this.setState({})
            }
        })
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
                <h2>Token Login</h2>
                <label>token: </label>
                <input type="text" ref={e => { this.tokenInput = e }} onKeyUp={this.loginKeyPress} />
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
