"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function qsEncode(obj) {
    return Object.keys(obj).reduce((params, key, i) => {
        return params + (i > 0 ? '&' : '') + key + '=' + obj[key];
    }, '');
}
exports.default = qsEncode;
//# sourceMappingURL=qs-encode.js.map