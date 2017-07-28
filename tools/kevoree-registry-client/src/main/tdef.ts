import { Response } from 'node-fetch';

import fetch from './util/fetch-wrapper';
import { baseUrl, token } from './util/config';
import auth from './auth';

export interface ITypeDefinition {
  name: string;
  version: number;
  model: string;

  id?: number;
  deployUnits?: number[];
  namespace?: string;
}

export default {
  all() {
    return fetch<ITypeDefinition[]>(`${baseUrl()}/api/tdefs`);
  },

  get(id: number) {
    return fetch<ITypeDefinition>(`${baseUrl()}/api/tdefs/${id}`);
  },

  getAllByNamespace(namespace: string) {
    return fetch<ITypeDefinition[]>(`${baseUrl()}/api/namespaces/${namespace}/tdefs`);
  },

  getLatestsByNamespace(namespace: string) {
    return fetch<ITypeDefinition[]>(`${baseUrl()}/api/namespaces/${namespace}/tdefs?version=latest`);
  },

  getAllByNamespaceAndName(namespace: string, name: string) {
    return fetch<ITypeDefinition[]>(`${baseUrl()}/api/namespaces/${namespace}/tdefs/${name}`);
  },

  getLatestByNamespaceAndName(namespace: string, name: string) {
    return fetch<ITypeDefinition>(`${baseUrl()}/api/namespaces/${namespace}/tdefs/${name}/latest`);
  },

  getByNamespaceAndNameAndVersion(namespace: string, name: string, version: number) {
    return fetch<ITypeDefinition>(`${baseUrl()}/api/namespaces/${namespace}/tdefs/${name}/${version}`);
  },

  create(namespace: string, tdef: ITypeDefinition) {
    return auth.ensureLogin()
      .then(() => fetch<ITypeDefinition>(`${baseUrl()}/api/namespaces/${namespace}/tdefs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token()}`,
        },
        body: JSON.stringify(tdef),
      }));
  },

  delete(id: number): Promise<Response> {
    return auth.ensureLogin()
      .then(() => fetch(`${baseUrl()}/api/tdefs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      }));
  },

  deleteByNamespaceAndNameAndVersion(namespace: string, name: string, version: number) {
    return auth.ensureLogin()
      .then(() => fetch(`${baseUrl()}/api/namespaces/${namespace}/tdefs/${name}/${version}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      }));
  },
};
