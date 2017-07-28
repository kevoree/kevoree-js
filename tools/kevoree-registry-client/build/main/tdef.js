"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_wrapper_1 = require("./util/fetch-wrapper");
const config_1 = require("./util/config");
const auth_1 = require("./auth");
exports.default = {
    all() {
        return fetch_wrapper_1.default(`${config_1.baseUrl()}/api/tdefs`);
    },
    get(id) {
        return fetch_wrapper_1.default(`${config_1.baseUrl()}/api/tdefs/${id}`);
    },
    getAllByNamespace(namespace) {
        return fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${namespace}/tdefs`);
    },
    getLatestsByNamespace(namespace) {
        return fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${namespace}/tdefs?version=latest`);
    },
    getAllByNamespaceAndName(namespace, name) {
        return fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${namespace}/tdefs/${name}`);
    },
    getLatestByNamespaceAndName(namespace, name) {
        return fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${namespace}/tdefs/${name}/latest`);
    },
    getByNamespaceAndNameAndVersion(namespace, name, version) {
        return fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${namespace}/tdefs/${name}/${version}`);
    },
    create(namespace, tdef) {
        return auth_1.default.ensureLogin()
            .then(() => fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${namespace}/tdefs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config_1.token()}`,
            },
            body: JSON.stringify(tdef),
        }));
    },
    delete(id) {
        return auth_1.default.ensureLogin()
            .then(() => fetch_wrapper_1.default(`${config_1.baseUrl()}/api/tdefs/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${config_1.token()}`,
            },
        }));
    },
    deleteByNamespaceAndNameAndVersion(namespace, name, version) {
        return auth_1.default.ensureLogin()
            .then(() => fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${namespace}/tdefs/${name}/${version}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${config_1.token()}`,
            },
        }));
    },
};
//# sourceMappingURL=tdef.js.map