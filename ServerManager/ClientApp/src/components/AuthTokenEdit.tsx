import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { AuthorizedComponent } from './AuthorizedComponent';

interface AuthTokenComponentProps {
    id: string
}

export class AuthTokenEdit extends AuthorizedComponent<AuthTokenComponentProps>  {
    displayName = AuthTokenEdit.name
    constructor(props: RouteComponentProps<AuthTokenComponentProps>) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount();

    }

    render() {
        return (
            <div>
                hello there
            </div>
        );
    }
}
