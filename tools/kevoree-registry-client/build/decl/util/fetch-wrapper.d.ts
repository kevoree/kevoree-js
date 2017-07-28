import { Response } from 'node-fetch';
export default function fetchWrapper<T = Response>(url: string, options?: RequestInit): Promise<T>;
