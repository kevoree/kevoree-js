import fetch from './util/fetch-wrapper';
import { baseUrl, token } from './util/config';
import auth from './auth';

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

export default {
  get() {
    return auth.ensureLogin()
      .then(() => {
        return fetch<IUser>(`${baseUrl()}/api/account`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token()}`,
          },
        });
      });
  },
};
