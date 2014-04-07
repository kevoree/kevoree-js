var jade = require('./runtime');

(function (jade) {
	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<style>@import url(\'./node_modules/kevoree-comp-fakeconsole/resources/css/bootstrap.min.css\')\n</style><div class="container-fluid"><div class="row"><div class="input-group"><input id="msg" type="text" class="form-control"/><span class="input-group-btn"><button id="send" type="button" class="btn btn-primary">' + escape((interp = btn) == null ? '' : interp) + '</button></span></div></div><div class="row"><dl id="msg-list" class="dl-horizontal col-xs-12"></dl></div></div>');
}
return buf.join("");
};
})(jade);