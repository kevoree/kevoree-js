"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const config_1 = require("../../main/util/config");
const set_up_1 = require("../util/set-up");
const conf = require('tiny-conf');
describe('Config', function () {
    this.slow(200);
    before('set up', set_up_1.default);
    afterEach('reset conf', () => {
        conf.set({
            registry: {
                host: 'localhost',
                port: 8080,
                ssl: false,
                oauth: {
                    client_id: 'kevoree_registryapp',
                    client_secret: 'kevoree_registryapp_secret',
                },
            },
            user: {
                login: 'kevoree',
                password: 'kevoree',
            },
        });
    });
    it('baseUrl() should return the valid base URL', () => {
        chai_1.assert.equal(config_1.baseUrl(), 'http://localhost:8080');
    });
    it('isTokenExpired() should return true when expired', () => {
        chai_1.assert.isTrue(config_1.isTokenExpired());
    });
    it('isTokenExpired() should return false if valid', () => {
        conf.set('user.access_token', 'foo');
        conf.set('user.expires_at', Date.now() + 1000);
        chai_1.assert.isFalse(config_1.isTokenExpired());
    });
    it('clientAuthorization() should return the b64 of oauth client id:secret', () => {
        chai_1.assert.equal(config_1.clientAuthorization(), 'a2V2b3JlZV9yZWdpc3RyeWFwcDprZXZvcmVlX3JlZ2lzdHJ5YXBwX3NlY3JldA==');
    });
    it('token() should throw when no token', () => {
        chai_1.assert.throw(config_1.token);
    });
    it('isTokenExpired() should return true when valid', () => {
        conf.set('user.access_token', 'foo');
        conf.set('user.expires_at', Date.now() + 1000);
        chai_1.assert.isFalse(config_1.isTokenExpired());
    });
    it('token() should return current user token', () => {
        conf.set('user.access_token', 'foo');
        conf.set('user.expires_at', Date.now() + 1000);
        chai_1.assert.equal(config_1.token(), 'foo');
    });
});
//# sourceMappingURL=config.js.map