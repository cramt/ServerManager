export interface AuthToken {
    expirationDate: number;
    serversAuthorized: string[];
    token: string;
    name:string;
}

export function parseAuthToken(obj: any): AuthToken {
    return (obj as AuthToken);
}