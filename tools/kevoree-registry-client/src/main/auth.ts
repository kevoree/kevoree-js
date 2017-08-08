import fetch from './util/fetch-wrapper';
import config, {
  baseUrl, clientAuthorization, isTokenExpired, token,
} from './util/config';
import qsEncode from './util/qs-encode';

export interface IAOuthToken {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface IConfigUser {
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
}

function oauthToken(body: { [key: string]: string }) {
  return fetch<IAOuthToken>(`${baseUrl()}/oauth/token`, {
    method: 'POST',
    body: qsEncode({
      client_id: config.get('registry.oauth.client_id'),
      client_secret: config.get('registry.oauth.client_secret'),
      ...body,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Basic ${clientAuthorization()}`,
    },
  }).then((data: IAOuthToken) => {
    let user: IConfigUser = config.get('user');
    if (!user) {
      user = {};
      config.set('user', user);
    }
    const expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + data.expires_in);
    user.access_token = data.access_token;
    user.refresh_token = data.refresh_token;
    user.expires_at = expiredAt.getTime();
    // update config file if any
    return config.save('user');
  });
}

export default {
  login(username: string, password: string) {
    return oauthToken({ username, password, grant_type: 'password', scope: 'read%20write' });
  },
  logout() {
    config.set('user.access_token', null);
    config.set('user.expires_at', 0);
    return Promise.resolve();
  },
  refresh() {
    const refreshToken = config.get('user.refresh_token');
    if (refreshToken) {
      return oauthToken({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        scope: 'read%20write',
      });
    } else {
      return Promise.reject(new Error(`Invalid refresh_token: ${refreshToken}`));
    }
  },
  ensureLogin() {
    const accessToken = this.getToken();
    if (accessToken) {
      if (this.isTokenExpired()) {
        return this.refresh();
      } else {
        return Promise.resolve();
      }
    } else {
      return Promise.reject(new Error('Unable to find valid token'));
    }
  },
  getToken() {
    return token();
  },
  isTokenExpired() {
    return isTokenExpired();
  },
};
