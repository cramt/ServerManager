export interface AuthToken {
    expirationDate: number;
    serversAuthorized: string[];
    token: string;
}

export function parseAuthToken(obj: any): AuthToken {
    return (obj as AuthToken);
}