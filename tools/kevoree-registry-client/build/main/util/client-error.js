"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KevoreeRegistryClientError extends Error {
    constructor(response, detail) {
        super(response.status + ' - ' + response.statusText + (detail ? detail : ''));
        Object.setPrototypeOf(this, KevoreeRegistryClientError.prototype);
        this.name = 'KevoreeRegistryClientError';
        this.statusCode = response.status;
        this.statusText = response.statusText;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        }
        else {
            this.stack = (new Error()).stack;
        }
    }
}
exports.default = KevoreeRegistryClientError;
//# sourceMappingURL=client-error.js.map