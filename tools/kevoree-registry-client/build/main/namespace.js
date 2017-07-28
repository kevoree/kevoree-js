"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_wrapper_1 = require("./util/fetch-wrapper");
const config_1 = require("./util/config");
const auth_1 = require("./auth");
exports.default = {
    all() {
        return fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces`);
    },
    get(name) {
        return fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${name}`);
    },
    create(name) {
        return auth_1.default.ensureLogin()
            .then(() => fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config_1.token()}`,
            },
            body: JSON.stringify({ name }),
        }));
    },
    delete(name) {
        return auth_1.default.ensureLogin()
            .then(() => fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${name}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${config_1.token()}`,
            },
        }));
    },
    addMember(name, member) {
        return auth_1.default.ensureLogin()
            .then(() => fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${name}/members`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config_1.token()}`,
            },
            body: JSON.stringify({ name: member }),
        }));
    },
    removeMember(name, member) {
        return auth_1.default.ensureLogin()
            .then(() => fetch_wrapper_1.default(`${config_1.baseUrl()}/api/namespaces/${name}/members/${member}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${config_1.token()}`,
            },
        }));
    },
};
//# sourceMappingURL=namespace.js.map