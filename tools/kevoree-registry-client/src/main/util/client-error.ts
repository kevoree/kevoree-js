import { Response } from 'node-fetch';

export default class KevoreeRegistryClientError extends Error {

  public name: string;
  public statusCode: number;
  public statusText: string;

  constructor(response: Response, detail?: string) {
    super(response.status + ' - ' + response.statusText + (detail ? detail : ''));
    (Object as any).setPrototypeOf(this, KevoreeRegistryClientError.prototype);
    this.name = 'KevoreeRegistryClientError';
    this.statusCode = response.status;
    this.statusText = response.statusText;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error()).stack;
    }
  }
}
