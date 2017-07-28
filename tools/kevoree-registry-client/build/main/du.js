"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_wrapper_1 = require("./util/fetch-wrapper");
const config_1 = require("./util/config");
const qs_encode_1 = require("./util/qs-encode");
const auth_1 = require("./auth");
exports.default = {
    all() {
        return fetch_wrapper_1.default(`${config_1.baseUrl()}/api/dus`);
    },
    get(id) {
        return fetch_wrapper_1.default(`${config_1.baseUrl()}/api/dus/${id}`);
    },
    getAllByNamespaceAndTdefName(namespace, tdefName) {
        return fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${namespace}/tdefs/${tdefName}/dus`);
    },
    getAllByNamespaceAndTdefNameAndTdefVersion(namespace, tdefName, tdefVersion) {
        return fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${namespace}/tdefs/${tdefName}/${tdefVersion}/dus`);
    },
    getByNamespaceAndTdefNameAndTdefVersionAndNameAndVersionAndPlatform(namespace, tdefName, tdefVersion, name, version, platform) {
        return fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${namespace}/tdefs/${tdefName}/${tdefVersion}/dus/${name}/${version}/${platform}`);
    },
    getSpecificByNamespaceAndTdefNameAndTdefVersion(namespace, tdefName, tdefVersion, filters) {
        return fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${namespace}/tdefs/${tdefName}/${tdefVersion}/specific-dus?${qs_encode_1.default(filters)}`);
    },
    getLatests(namespace, tdefName, tdefVersion) {
        return fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${namespace}/tdefs/${tdefName}/${tdefVersion}/dus?version=latest`);
    },
    getReleases(namespace, tdefName, tdefVersion) {
        return fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${namespace}/tdefs/${tdefName}/${tdefVersion}/dus?version=release`);
    },
    getLatestByPlatform(namespace, tdefName, tdefVersion, platform) {
        return fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${namespace}/tdefs/${tdefName}/${tdefVersion}/dus?version=latest&platform=${platform}`)
            .then((dus) => dus[0]);
    },
    getReleaseByPlatform(namespace, tdefName, tdefVersion, platform) {
        return fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${namespace}/tdefs/${tdefName}/${tdefVersion}/dus?version=release&platform=${platform}`)
            .then((dus) => dus[0]);
    },
    create(namespace, tdefName, tdefVersion, du) {
        return auth_1.default.ensureLogin()
            .then(() => fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${namespace}/tdefs/${tdefName}/${tdefVersion}/dus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config_1.token()}`,
            },
            body: JSON.stringify(du),
        }));
    },
    update(du) {
        return auth_1.default.ensureLogin()
            .then(() => fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${du.namespace}/tdefs/${du.tdefName}/${du.tdefVersion}/dus/${du.name}/${du.version}/${du.platform}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config_1.token()}`,
            },
            body: JSON.stringify(du),
        }));
    },
    delete(id) {
        return auth_1.default.ensureLogin()
            .then(() => fetch_wrapper_1.default(`${config_1.baseUrl()}/api/dus/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${config_1.token()}`,
            },
        }));
    },
    deleteByNamespaceAndTdefNameAndTdefVersionAndNameAndVersionAndPlatform(namespace, tdefName, tdefVersion, name, version, platform) {
        return auth_1.default.ensureLogin()
            .then(() => fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${namespace}/tdefs/${tdefName}/${tdefVersion}/dus/${name}/${version}/${platform}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${config_1.token()}`,
            },
        }));
    },
};
//# sourceMappingURL=du.js.map