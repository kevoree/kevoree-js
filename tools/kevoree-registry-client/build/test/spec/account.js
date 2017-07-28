"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const main_1 = require("../../main");
const set_up_1 = require("../util/set-up");
const security_1 = require("../util/security");
const ServerMock = require('mock-http-server');
describe('Account', function () {
    this.slow(200);
    const server = new ServerMock({ host: 'localhost', port: 8080 });
    before('init conf', set_up_1.default);
    before('start mock server', (done) => server.start(done));
    after('stop mock server', (done) => server.stop(done));
    it('retrieve account', () => {
        server.on({
            method: 'GET',
            path: '/api/account',
            reply: {
                status: 200,
                body: JSON.stringify({
                    id: 1234,
                    login: 'kevoree',
                    namespaces: ['kevoree'],
                }),
            },
        });
        security_1.logUserIn();
        return main_1.account.get()
            .then((user) => {
            chai_1.assert.ok(user.id);
            chai_1.assert.equal(user.login, 'kevoree');
            chai_1.assert.deepEqual(user.namespaces, ['kevoree']);
        });
    });
});
//# sourceMappingURL=account.js.map