"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const main_1 = require("../../main");
const set_up_1 = require("../util/set-up");
const security_1 = require("../util/security");
const ServerMock = require('mock-http-server');
describe('DeployUnits', function () {
    this.slow(200);
    const server = new ServerMock({ host: 'localhost', port: 8080 });
    before('set up', set_up_1.default);
    before('start mock server', (done) => server.start(done));
    after('stop mock server', (done) => server.stop(done));
    it('retrieve all dus', () => {
        server.on({
            method: 'GET',
            path: '/api/dus',
            reply: {
                status: 200,
                body: JSON.stringify([
                    { id: 0 },
                    { id: 1 },
                ]),
            },
        });
        return main_1.du.all()
            .then((dus) => {
            chai_1.assert.equal(dus.length, 2);
            chai_1.assert.equal(dus[0].id, 0);
            chai_1.assert.equal(dus[1].id, 1);
        });
    });
    it('retrieve all dus by namespace, name and version', () => {
        const expectedDus = [
            {
                id: 1,
                namespace: 'kevoree',
                name: 'kevoree-comp-ticker',
                version: '1.2.3',
                model: '{}',
                platform: 'js',
                tdefName: 'Ticker',
                tdefVersion: 3,
            },
            {
                id: 2,
                namespace: 'kevoree',
                name: 'kevoree-comp-ticker',
                version: '2.3.4',
                model: '{}',
                platform: 'js',
                tdefName: 'Ticker',
                tdefVersion: 3,
            },
        ];
        server.on({
            method: 'GET',
            path: '/api/namespaces/kevoree/tdefs/Ticker/3/dus',
            reply: {
                status: 200,
                body: JSON.stringify(expectedDus),
            },
        });
        return main_1.du.getAllByNamespaceAndTdefNameAndTdefVersion('kevoree', 'Ticker', 3)
            .then((dus) => {
            chai_1.assert.deepEqual(dus, expectedDus);
        });
    });
    it('retrieve a du by namespace, tdefName, tdefVersion, name, version and platform', () => {
        const expectedDu = {
            id: 1,
            model: '{}',
            namespace: 'kevoree',
            tdefName: 'Ticker',
            tdefVersion: 3,
            name: 'kevoree-comp-ticker',
            version: '3.1.0',
            platform: 'js',
        };
        server.on({
            method: 'GET',
            path: '/api/namespaces/kevoree/tdefs/Ticker/3/dus/kevoree-comp-ticker/3.1.0/js',
            reply: {
                status: 200,
                body: JSON.stringify(expectedDu),
            },
        });
        return main_1.du.getByNamespaceAndTdefNameAndTdefVersionAndNameAndVersionAndPlatform('kevoree', 'Ticker', 3, 'kevoree-comp-ticker', '3.1.0', 'js')
            .then((deployUnit) => {
            chai_1.assert.deepEqual(deployUnit, expectedDu);
        });
    });
    it('retrieve specific dus', () => {
        server.on({
            method: 'GET',
            path: '/api/namespaces/kevoree/tdefs/Ticker/3/specific-dus',
            reply: {
                status: 200,
                body: JSON.stringify([
                    {
                        id: 0,
                        model: '{}',
                        namespace: 'kevoree',
                        tdefName: 'Ticker',
                        tdefVersion: 3,
                        name: 'kevoree-comp-ticker',
                        version: '3.1.0-alpha',
                        platform: 'js',
                    },
                    {
                        id: 1,
                        model: '{}',
                        namespace: 'kevoree',
                        tdefName: 'Ticker',
                        tdefVersion: 3,
                        name: 'kevoree-comp-ticker',
                        version: '3.0.0',
                        platform: 'java',
                    },
                    {
                        id: 2,
                        model: '{}',
                        namespace: 'kevoree',
                        tdefName: 'Ticker',
                        tdefVersion: 3,
                        name: 'kevoree-comp-ticker',
                        version: '5.4.0-SNAPSHOT',
                        platform: 'dotnet',
                    },
                ]),
            },
        });
        const filters = {
            js: '3.1.0-alpha',
            dotnet: 'latest',
        };
        return main_1.du.getSpecificByNamespaceAndTdefNameAndTdefVersion('kevoree', 'Ticker', 3, filters)
            .then((dus) => {
            chai_1.assert.equal(dus.length, 3);
            const js = dus.find((deployUnit) => deployUnit.platform === 'js');
            chai_1.assert.isNotNull(js);
            chai_1.assert.equal(js.version, filters.js);
            const java = dus.find((deployUnit) => deployUnit.platform === 'java');
            chai_1.assert.isNotNull(java);
            chai_1.assert.equal(java.version, '3.0.0');
            const dotnet = dus.find((deployUnit) => deployUnit.platform === 'dotnet');
            chai_1.assert.isNotNull(dotnet);
            chai_1.assert.equal(dotnet.version, '5.4.0-SNAPSHOT');
        });
    });
    let createdDu;
    it('create a new du', () => {
        server.on({
            method: 'POST',
            path: '/api/namespaces/kevoree/tdefs/Ticker/3/dus',
            reply: {
                status: 201,
                body: JSON.stringify({
                    id: 1,
                    model: JSON.stringify({
                        class: 'org.kevoree.DeployUnit@kevoree-comp-ticker',
                        name: 'kevoree-comp-ticker',
                        version: '5.5.1-alpha',
                    }),
                    namespace: 'kevoree',
                    tdefName: 'Ticker',
                    tdefVersion: 3,
                    name: 'kevoree-comp-ticker',
                    version: '5.5.1-alpha',
                    platform: 'js',
                }),
            },
        });
        const newDu = {
            name: 'kevoree-comp-ticker',
            version: '5.5.1-alpha',
            platform: 'js',
            model: JSON.stringify({
                class: 'org.kevoree.DeployUnit@kevoree-comp-ticker',
                name: 'kevoree-comp-ticker',
                version: '5.5.1-alpha',
            }),
        };
        security_1.logUserIn();
        return main_1.du.create('kevoree', 'Ticker', 3, newDu)
            .then((deployUnit) => {
            chai_1.assert.ok(deployUnit.id);
            chai_1.assert.equal(deployUnit.name, newDu.name);
            chai_1.assert.equal(deployUnit.version, newDu.version);
            chai_1.assert.equal(deployUnit.platform, newDu.platform);
            chai_1.assert.equal(deployUnit.tdefName, 'Ticker');
            chai_1.assert.equal(deployUnit.tdefVersion, 3);
            chai_1.assert.equal(deployUnit.namespace, 'kevoree');
            createdDu = deployUnit;
        });
    });
    it('update newly created du', () => {
        server.on({
            method: 'PUT',
            path: '/api/namespaces/kevoree/tdefs/Ticker/3/dus/kevoree-comp-ticker/5.5.1-alpha/js',
            reply: {
                status: 200,
                body: JSON.stringify({
                    id: 1,
                    model: JSON.stringify({
                        class: 'org.kevoree.DeployUnit@kevoree-comp-ticker',
                        name: 'kevoree-comp-ticker',
                        version: '5.5.1-alpha',
                        another: 'thing in the model',
                    }),
                    namespace: 'kevoree',
                    tdefName: 'Ticker',
                    tdefVersion: 3,
                    name: 'kevoree-comp-ticker',
                    version: '5.5.1-alpha',
                    platform: 'js',
                }),
            },
        });
        createdDu.model = JSON.stringify({
            class: 'org.kevoree.DeployUnit@kevoree-comp-ticker',
            name: 'kevoree-comp-ticker',
            version: '5.5.1-alpha',
            another: 'thing in the model',
        });
        security_1.logUserIn();
        return main_1.du.update(createdDu)
            .then((deployUnit) => {
            chai_1.assert.ok(deployUnit.id);
            chai_1.assert.equal(deployUnit.namespace, createdDu.namespace);
            chai_1.assert.equal(deployUnit.tdefName, createdDu.tdefName);
            chai_1.assert.equal(deployUnit.tdefVersion, createdDu.tdefVersion);
            chai_1.assert.equal(deployUnit.name, createdDu.name);
            chai_1.assert.equal(deployUnit.version, createdDu.version);
            chai_1.assert.equal(deployUnit.platform, createdDu.platform);
            chai_1.assert.equal(deployUnit.model, createdDu.model);
        });
    });
    it('delete a du by namespace, tdefName, tdefVersion, name, version and platform', () => {
        server.on({
            method: 'DELETE',
            path: '/api/namespaces/kevoree/tdefs/Ticker/3/dus/kevoree-comp-ticker/5.5.1-alpha/js',
            reply: {
                status: 200,
                body: '{}',
            },
        });
        security_1.logUserIn();
        return main_1.du.deleteByNamespaceAndTdefNameAndTdefVersionAndNameAndVersionAndPlatform('kevoree', 'Ticker', 3, 'kevoree-comp-ticker', '5.5.1-alpha', 'js');
    });
    it('retrieve all the latest dus for a namespace.Type/version', () => {
        const expectedDus = [
            {
                id: 1,
                name: 'one',
                version: '1.0.0',
                platform: 'js',
                model: '',
                namespace: 'kevoree',
                tdefName: 'Ticker',
                tdefVersion: 3,
            },
            {
                id: 2,
                name: 'two',
                version: '1.0.0-alpha',
                platform: 'java',
                model: '',
                namespace: 'kevoree',
                tdefName: 'Ticker',
                tdefVersion: 3,
            },
        ];
        server.on({
            method: 'GET',
            path: '/api/namespaces/kevoree/tdefs/Ticker/3/dus',
            reply: {
                status: 200,
                body: JSON.stringify(expectedDus),
            },
        });
        return main_1.du.getLatests('kevoree', 'Ticker', 3)
            .then((dus) => {
            chai_1.assert.deepEqual(dus, expectedDus);
        });
    });
    it('retrieve the latest du targetting "js" for kevoree.Ticker/3', () => {
        const expectedDu = {
            id: 1,
            namespace: 'kevoree',
            tdefName: 'Ticker',
            tdefVersion: 3,
            name: 'kevoree-comp-ticker',
            version: '5.5.1-alpha',
            platform: 'js',
            model: '',
        };
        server.on({
            method: 'GET',
            path: '/api/namespaces/kevoree/tdefs/Ticker/3/dus',
            reply: {
                status: 200,
                body: JSON.stringify([expectedDu]),
            },
        });
        return main_1.du.getLatestByPlatform('kevoree', 'Ticker', 3, 'js')
            .then((deployUnit) => {
            chai_1.assert.equal(deployUnit.id, expectedDu.id);
            chai_1.assert.equal(deployUnit.namespace, expectedDu.namespace);
            chai_1.assert.equal(deployUnit.tdefName, expectedDu.tdefName);
            chai_1.assert.equal(deployUnit.tdefVersion, expectedDu.tdefVersion);
            chai_1.assert.equal(deployUnit.name, expectedDu.name);
            chai_1.assert.equal(deployUnit.version, expectedDu.version);
            chai_1.assert.equal(deployUnit.platform, expectedDu.platform);
            chai_1.assert.equal(deployUnit.model, expectedDu.model);
        });
    });
    it('retrieve the latest release du targetting "java" for kevoree.Ticker/3', () => {
        const expectedDu = {
            id: 1,
            namespace: 'kevoree',
            tdefName: 'Ticker',
            tdefVersion: 3,
            name: 'org.kevoree.library:ticker',
            version: '5.5.1',
            platform: 'java',
            model: '',
        };
        server.on({
            method: 'GET',
            path: '/api/namespaces/kevoree/tdefs/Ticker/3/dus',
            reply: {
                status: 200,
                body: JSON.stringify([expectedDu]),
            },
        });
        return main_1.du.getReleaseByPlatform('kevoree', 'Ticker', 3, 'java')
            .then((deployUnit) => {
            chai_1.assert.equal(deployUnit.id, expectedDu.id);
            chai_1.assert.equal(deployUnit.namespace, expectedDu.namespace);
            chai_1.assert.equal(deployUnit.tdefName, expectedDu.tdefName);
            chai_1.assert.equal(deployUnit.tdefVersion, expectedDu.tdefVersion);
            chai_1.assert.equal(deployUnit.name, expectedDu.name);
            chai_1.assert.equal(deployUnit.version, expectedDu.version);
            chai_1.assert.equal(deployUnit.platform, expectedDu.platform);
            chai_1.assert.equal(deployUnit.model, expectedDu.model);
        });
    });
});
//# sourceMappingURL=dus.js.map