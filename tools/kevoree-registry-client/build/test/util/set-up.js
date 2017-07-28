"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conf = require('tiny-conf');
exports.default = () => {
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
        },
    });
};
//# sourceMappingURL=set-up.js.map