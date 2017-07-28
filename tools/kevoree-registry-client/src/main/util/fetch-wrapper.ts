// trick the typeScript compiler so that the output of webpack can be replaced with the browser native "fetch"
const fetch = require('node-fetch');
import { Response } from 'node-fetch';
import KevoreeRegistryClientError from './client-error';

function checkStatus(resp: Response): any {
  if (resp.status >= 200 && resp.status < 300) {
    return resp;
  } else {
    const contentType = resp.headers.get('Content-Type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      return resp.json().then((data) => {
        if (data.message) {
          throw new KevoreeRegistryClientError(resp, ` - ${data.message}`);
        } else if (data.error_description) {
          throw new KevoreeRegistryClientError(resp, ` - ${data.error_description}`);
        } else {
          throw new KevoreeRegistryClientError(resp);
        }
      });
    } else {
      throw new KevoreeRegistryClientError(resp, ` - ${resp.url}`);
    }
  }
}

function parseJSON(resp: Response): any {
  const contentType = resp.headers.get('Content-Type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return resp.json();
  } else {
    return resp;
  }
}

export default function fetchWrapper<T = Response>(url: string, options?: RequestInit): Promise<T> {
  return fetch(url, {
    headers: {
      Accept: 'application/json',
    },
    ...options,
  }).then(checkStatus)
    .then(parseJSON);
}
