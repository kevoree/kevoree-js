import { Response } from 'node-fetch';

import fetch from './util/fetch-wrapper';
import { baseUrl, token } from './util/config';
import auth from './auth';

export interface INamespace {
  name: string;

  owner?: string;
  typeDefinitions?: number[];
  members?: string[];
}

export default {
  all() {
    return fetch<INamespace[]>(`${baseUrl()}/api/namespaces`);
  },

  get(name: string) {
    return fetch<INamespace>(`${baseUrl()}/api/namespaces/${name}`);
  },

  create(name: string) {
    return auth.ensureLogin()
      .then(() => fetch<INamespace>(`${baseUrl()}/api/namespaces`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token()}`,
        },
        body: JSON.stringify({ name }),
      }));
  },

  delete(name: string): Promise<Response> {
    return auth.ensureLogin()
      .then(() => fetch(`${baseUrl()}/api/namespaces/${name}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      }));
  },

  addMember(name: string, member: string) {
    return auth.ensureLogin()
      .then(() => fetch<INamespace>(`${baseUrl()}/api/namespaces/${name}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token()}`,
        },
        body: JSON.stringify({ name: member }),
      }));
  },

  removeMember(name: string, member: string) {
    return auth.ensureLogin()
      .then(() => fetch<INamespace>(`${baseUrl()}/api/namespaces/${name}/members/${member}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      }));
  },
};
