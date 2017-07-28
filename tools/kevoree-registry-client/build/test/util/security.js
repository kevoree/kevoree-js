"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require('tiny-conf');
function logUserIn() {
    config.set('user.access_token', 'foo');
    config.set('user.expires_at', Date.now() + (1000 * 60 * 10));
}
exports.logUserIn = logUserIn;
//# sourceMappingURL=security.js.map