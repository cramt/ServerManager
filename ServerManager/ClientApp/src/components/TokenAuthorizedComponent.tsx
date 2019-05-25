import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class TokenAuthorizedComponent<T> extends React.Component<RouteComponentProps<T>, {}>{
    public static token: string | null = null;

    componentDidMount() {
        if (TokenAuthorizedComponent.token === null) {
            //this.props.history.push("/masterlogin")
        }
    }
}