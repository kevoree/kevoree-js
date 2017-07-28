import config = require('tiny-conf');
import btoa = require('./btoa');

// augment tiny-conf with some utility methods:
export function token(): string {
  const accessToken = config.get('user.access_token');
  if (accessToken) {
    return accessToken;
  }
  throw new Error('Unable to find a valid token');
}

export function isTokenExpired() {
  const user = config.get('user');
  return !user || !user.access_token || !user.expires_at || (Date.now() >= user.expires_at);
}

export function baseUrl() {
  const conf = config.get('registry');
  if (conf) {
    return `${conf.ssl ? 'https' : 'http'}://${conf.host}:${conf.port}`;
  } else {
    throw new Error('Unable to find "registry" in config');
  }
}

export function clientAuthorization() {
  const clientId = config.get('registry.oauth.client_id');
  const clientSecret = config.get('registry.oauth.client_secret');
  return btoa(`${clientId}:${clientSecret}`);
}

export default config;
