import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class MasterAuthorizedComponent<T> extends React.Component<RouteComponentProps<T>, {}>{
    public static username: string | null = null;
    public static password: string | null = null;

    componentDidMount() {
        if (MasterAuthorizedComponent.username === null && MasterAuthorizedComponent.password === null) {
            this.props.history.push("/masterlogin")
        }
    }
}