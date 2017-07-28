"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const main_1 = require("../../main");
const set_up_1 = require("../util/set-up");
const conf = require('tiny-conf');
describe('Errors', function () {
    this.slow(200);
    before('set up', set_up_1.default);
    before('', () => {
        conf.set('registry.host', 'unknown-host.fail');
    });
    it('auth should fail when host is unreachable', () => {
        return main_1.auth.login('username', 'password')
            .catch((err) => {
            chai_1.assert.ok(err);
        });
    });
});
//# sourceMappingURL=errors.js.map