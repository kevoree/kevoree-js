"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const main_1 = require("../../main");
const set_up_1 = require("../util/set-up");
const config = require('tiny-conf');
const ServerMock = require('mock-http-server');
describe('Auth', function () {
    this.slow(200);
    const server = new ServerMock({ host: 'localhost', port: 8080 });
    before('set up', set_up_1.default);
    before('start mock server', (done) => server.start(done));
    after('stop mock server', (done) => server.stop(done));
    it('auth.login("username", "password") should define access_token, refresh_token and expires_at', () => {
        const expectedAuth = {
            access_token: 'foo',
            refresh_token: 'bar',
            expires_in: 3600,
        };
        server.on({
            method: 'POST',
            path: '/oauth/token',
            reply: {
                status: 200,
                body: JSON.stringify(expectedAuth),
            },
        });
        return main_1.auth.login('kevoree', 'password')
            .then(() => {
            const user = config.get('user');
            chai_1.assert.equal(user.access_token, expectedAuth.access_token);
            chai_1.assert.equal(user.refresh_token, expectedAuth.refresh_token);
            chai_1.assert.isAtLeast(user.expires_at, Date.now());
        });
    });
    it('auth.ensureLogin() should try to refresh token if expired', () => {
        const expectedAuth = {
            access_token: 'new-foo',
            refresh_token: 'new-bar',
            expires_in: 3600,
        };
        server.on({
            method: 'POST',
            path: '/oauth/token',
            reply: {
                status: 200,
                body: JSON.stringify(expectedAuth),
            },
        });
        config.set('user.expires_at', Date.now() - (1000 * 60 * 10));
        return main_1.auth.ensureLogin()
            .then(() => {
            const user = config.get('user');
            chai_1.assert.equal(user.access_token, expectedAuth.access_token);
            chai_1.assert.equal(user.refresh_token, expectedAuth.refresh_token);
            chai_1.assert.isAtLeast(user.expires_at, Date.now());
        });
    });
});
//# sourceMappingURL=auth.js.map