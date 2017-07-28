"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_wrapper_1 = require("./util/fetch-wrapper");
const config_1 = require("./util/config");
const auth_1 = require("./auth");
exports.default = {
    get() {
        return auth_1.default.ensureLogin()
            .then(() => {
            return fetch_wrapper_1.default(`${config_1.baseUrl()}/api/account`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config_1.token()}`,
                },
            });
        });
    },
};
//# sourceMappingURL=account.js.map