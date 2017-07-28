export interface IUser {
    id: number;
    login: string;
    firstName: string;
    lastName: string;
    email: string;
    activated: boolean;
    langKey: string;
    authorities: string[];
    namespaces: string[];
    createdBy: string;
    createdDate: string;
    lastModifiedBy: string;
    lastModifiedDate: string;
}
declare const _default: {
    get(): Promise<IUser>;
};
export default _default;
