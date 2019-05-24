import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class AuthorizedComponent<T> extends React.Component<RouteComponentProps<T>, {}>{
    public static username: string | null = null;
    public static password: string | null = null;

    componentDidMount() {
        if (AuthorizedComponent.username === null && AuthorizedComponent.password === null) {
            this.props.history.push("/masterlogin")
        }
    }
}