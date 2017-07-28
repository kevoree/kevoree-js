import { Response } from 'node-fetch';
export interface IDeployUnit {
    name: string;
    version: string;
    platform: string;
    model: string;
    id?: number;
    namespace?: string;
    tdefName?: string;
    tdefVersion?: number;
}
declare const _default: {
    all(): Promise<IDeployUnit[]>;
    get(id: number): Promise<IDeployUnit>;
    getAllByNamespaceAndTdefName(namespace: string, tdefName: string): Promise<IDeployUnit[]>;
    getAllByNamespaceAndTdefNameAndTdefVersion(namespace: string, tdefName: string, tdefVersion: number): Promise<IDeployUnit[]>;
    getByNamespaceAndTdefNameAndTdefVersionAndNameAndVersionAndPlatform(namespace: string, tdefName: string, tdefVersion: number, name: string, version: string, platform: string): Promise<IDeployUnit>;
    getSpecificByNamespaceAndTdefNameAndTdefVersion(namespace: string, tdefName: string, tdefVersion: number, filters: {
        [key: string]: string;
    }): Promise<IDeployUnit[]>;
    getLatests(namespace: string, tdefName: string, tdefVersion: number): Promise<IDeployUnit[]>;
    getReleases(namespace: string, tdefName: string, tdefVersion: number): Promise<IDeployUnit[]>;
    getLatestByPlatform(namespace: string, tdefName: string, tdefVersion: number, platform: string): Promise<IDeployUnit>;
    getReleaseByPlatform(namespace: string, tdefName: string, tdefVersion: number, platform: string): Promise<IDeployUnit>;
    create(namespace: string, tdefName: string, tdefVersion: number, du: IDeployUnit): Promise<IDeployUnit>;
    update(du: IDeployUnit): Promise<IDeployUnit>;
    delete(id: number): Promise<Response>;
    deleteByNamespaceAndTdefNameAndTdefVersionAndNameAndVersionAndPlatform(namespace: string, tdefName: string, tdefVersion: number, name: string, version: string, platform: string): Promise<Response>;
};
export default _default;
