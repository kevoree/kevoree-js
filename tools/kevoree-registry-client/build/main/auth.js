"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_wrapper_1 = require("./util/fetch-wrapper");
const config_1 = require("./util/config");
const qs_encode_1 = require("./util/qs-encode");
function oauthToken(body) {
    return fetch_wrapper_1.default(`${config_1.baseUrl()}/oauth/token`, {
        method: 'POST',
        body: qs_encode_1.default(Object.assign({ client_id: config_1.default.get('registry.oauth.client_id'), client_secret: config_1.default.get('registry.oauth.client_secret') }, body)),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Basic ${config_1.clientAuthorization()}`,
        },
    }).then((data) => {
        const user = config_1.default.get('user');
        const expiredAt = new Date();
        expiredAt.setSeconds(expiredAt.getSeconds() + data.expires_in);
        user.login = body.username ? body.username : user.login;
        user.access_token = data.access_token;
        user.refresh_token = data.refresh_token;
        user.expires_at = expiredAt.getTime();
        return config_1.default.save('user');
    });
}
exports.default = {
    login(username, password) {
        return oauthToken({ username, password, grant_type: 'password', scope: 'read%20write' });
    },
    logout() {
        config_1.default.set('user.access_token', null);
        config_1.default.set('user.expires_at', 0);
        return Promise.resolve();
    },
    refresh() {
        const refreshToken = config_1.default.get('user.refresh_token');
        if (refreshToken) {
            return oauthToken({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                scope: 'read%20write',
            });
        }
        else {
            return Promise.reject(new Error(`Invalid refresh_token: ${refreshToken}`));
        }
    },
    ensureLogin() {
        const accessToken = this.getToken();
        if (accessToken) {
            if (this.isTokenExpired()) {
                return this.refresh();
            }
            else {
                return Promise.resolve();
            }
        }
        else {
            return Promise.reject(new Error('Unable to find valid token'));
        }
    },
    getToken() {
        return config_1.token();
    },
    isTokenExpired() {
        return config_1.isTokenExpired();
    },
};
//# sourceMappingURL=auth.js.map