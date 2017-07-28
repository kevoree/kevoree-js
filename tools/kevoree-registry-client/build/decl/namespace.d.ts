import { Response } from 'node-fetch';
export interface INamespace {
    name: string;
    owner?: string;
    typeDefinitions?: number[];
    members?: string[];
}
declare const _default: {
    all(): Promise<INamespace[]>;
    get(name: string): Promise<INamespace>;
    create(name: string): Promise<INamespace>;
    delete(name: string): Promise<Response>;
    addMember(name: string, member: string): Promise<INamespace>;
    removeMember(name: string, member: string): Promise<INamespace>;
};
export default _default;
