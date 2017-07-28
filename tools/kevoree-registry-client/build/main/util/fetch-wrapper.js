"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require('node-fetch');
const client_error_1 = require("./client-error");
function checkStatus(resp) {
    if (resp.status >= 200 && resp.status < 300) {
        return resp;
    }
    else {
        const contentType = resp.headers.get('Content-Type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
            return resp.json().then((data) => {
                if (data.message) {
                    throw new client_error_1.default(resp, ` - ${data.message}`);
                }
                else if (data.error_description) {
                    throw new client_error_1.default(resp, ` - ${data.error_description}`);
                }
                else {
                    throw new client_error_1.default(resp);
                }
            });
        }
        else {
            throw new client_error_1.default(resp, ` - ${resp.url}`);
        }
    }
}
function parseJSON(resp) {
    const contentType = resp.headers.get('Content-Type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
        return resp.json();
    }
    else {
        return resp;
    }
}
function fetchWrapper(url, options) {
    return fetch(url, Object.assign({ headers: {
            Accept: 'application/json',
        } }, options)).then(checkStatus)
        .then(parseJSON);
}
exports.default = fetchWrapper;
//# sourceMappingURL=fetch-wrapper.js.map