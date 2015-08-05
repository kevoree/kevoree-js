function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./annotations/annotations'));
var Services_1 = require('./annotations/Services');
exports.Services = Services_1.Services;
var Types_1 = require('./annotations/Types');
exports.Types = Types_1.Types;
__export(require('./services/ModelService'));
