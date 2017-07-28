const config = require('tiny-conf');

export function logUserIn() {
  config.set('user.access_token', 'foo');
  config.set('user.expires_at', Date.now() + (1000 * 60 * 10)); // 10 min
}
