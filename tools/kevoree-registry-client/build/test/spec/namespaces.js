"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const main_1 = require("../../main");
const set_up_1 = require("../util/set-up");
const security_1 = require("../util/security");
const ServerMock = require('mock-http-server');
describe('Namespaces', function () {
    this.slow(200);
    const server = new ServerMock({ host: 'localhost', port: 8080 });
    before('set up', set_up_1.default);
    before('start mock server', (done) => server.start(done));
    after('stop mock server', (done) => server.stop(done));
    it('retrieve all namespaces', () => {
        const expectedNs = [
            { name: 'kevoree' }, { name: 'leiko' },
        ];
        server.on({
            method: 'GET',
            path: '/api/namespaces',
            reply: {
                status: 200,
                body: JSON.stringify(expectedNs),
            },
        });
        return main_1.namespace.all()
            .then((namespaces) => {
            chai_1.assert.deepEqual(namespaces, expectedNs);
        });
    });
    it('retrieve a namespace by name', () => {
        const expectedNs = { name: 'kevoree', owner: 'kevoree' };
        server.on({
            method: 'GET',
            path: '/api/namespaces/kevoree',
            reply: {
                status: 200,
                body: JSON.stringify(expectedNs),
            },
        });
        return main_1.namespace.get('kevoree')
            .then((ns) => {
            chai_1.assert.equal(ns.name, 'kevoree');
            chai_1.assert.equal(ns.owner, 'kevoree');
        });
    });
    it('create a new namespace', () => {
        const expectedNs = { name: 'newnamespace', owner: 'kevoree' };
        server.on({
            method: 'POST',
            path: '/api/namespaces',
            reply: {
                status: 201,
                body: JSON.stringify(expectedNs),
            },
        });
        security_1.logUserIn();
        return main_1.namespace.create('newnamespace')
            .then((ns) => {
            chai_1.assert.equal(ns.name, 'newnamespace');
            chai_1.assert.equal(ns.owner, 'kevoree');
        });
    });
    it('delete a namespace', () => {
        const expectedNs = { name: 'newnamespace', owner: 'kevoree' };
        server.on({
            method: 'DELETE',
            path: '/api/namespaces/newnamespace',
            reply: {
                status: 200,
                body: JSON.stringify(expectedNs),
            },
        });
        security_1.logUserIn();
        return main_1.namespace.delete('newnamespace');
    });
    it('add a member', () => {
        const expectedNs = {
            name: 'kevoree',
            owner: 'kevoree',
            members: ['kevoree', 'user'],
        };
        server.on({
            method: 'POST',
            path: '/api/namespaces/kevoree/members',
            reply: {
                status: 200,
                body: JSON.stringify(expectedNs),
            },
        });
        security_1.logUserIn();
        return main_1.namespace.addMember('kevoree', 'user')
            .then((ns) => {
            chai_1.assert.equal(ns.name, expectedNs.name);
            chai_1.assert.deepEqual(ns.members, expectedNs.members);
        });
    });
    it('delete a namespace member', () => {
        const expectedNs = {
            name: 'kevoree',
            owner: 'kevoree',
            members: ['kevoree'],
        };
        server.on({
            method: 'DELETE',
            path: '/api/namespaces/kevoree/members/user',
            reply: {
                status: 200,
                body: JSON.stringify(expectedNs),
            },
        });
        security_1.logUserIn();
        return main_1.namespace.removeMember('kevoree', 'user');
    });
    it('delete a namespace not owned should fail', () => {
        server.on({
            method: 'DELETE',
            path: '/api/namespaces/newnamespace',
            reply: {
                status: 403,
                body: '{}',
            },
        });
        security_1.logUserIn();
        return main_1.namespace.delete('newnamespace')
            .catch((err) => {
            chai_1.assert.ok(err);
            chai_1.assert.equal(err.statusCode, 403);
        });
    });
});
//# sourceMappingURL=namespaces.js.map