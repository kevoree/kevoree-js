import { Response } from 'node-fetch';
export interface ITypeDefinition {
    name: string;
    version: number;
    model: string;
    id?: number;
    deployUnits?: number[];
    namespace?: string;
}
declare const _default: {
    all(): Promise<ITypeDefinition[]>;
    get(id: number): Promise<ITypeDefinition>;
    getAllByNamespace(namespace: string): Promise<ITypeDefinition[]>;
    getLatestsByNamespace(namespace: string): Promise<ITypeDefinition[]>;
    getAllByNamespaceAndName(namespace: string, name: string): Promise<ITypeDefinition[]>;
    getLatestByNamespaceAndName(namespace: string, name: string): Promise<ITypeDefinition>;
    getByNamespaceAndNameAndVersion(namespace: string, name: string, version: number): Promise<ITypeDefinition>;
    create(namespace: string, tdef: ITypeDefinition): Promise<ITypeDefinition>;
    delete(id: number): Promise<Response>;
    deleteByNamespaceAndNameAndVersion(namespace: string, name: string, version: number): Promise<Response>;
};
export default _default;
