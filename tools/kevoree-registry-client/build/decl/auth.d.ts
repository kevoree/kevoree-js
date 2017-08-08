export interface IAOuthToken {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}
export interface IConfigUser {
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
}
declare const _default: {
    login(username: string, password: string): Promise<void>;
    logout(): Promise<void>;
    refresh(): Promise<void>;
    ensureLogin(): Promise<void>;
    getToken(): string;
    isTokenExpired(): boolean;
};
export default _default;
