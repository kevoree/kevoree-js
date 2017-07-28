import { Response } from 'node-fetch';
export default class KevoreeRegistryClientError extends Error {
    name: string;
    statusCode: number;
    statusText: string;
    constructor(response: Response, detail?: string);
}
