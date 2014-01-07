var jade = require('./runtime');

(function (jade) {
	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row"><div class="col-md-11"><input id="msg" type="text" class="form-control"/></div><div class="col-md-1"><button id="send" class="btn btn-info">' + escape((interp = btn) == null ? '' : interp) + '</button></div></div><div class="row"><dl id="msg-list" class="dl-horizontal col-md-12"></dl></div>');
}
return buf.join("");
};
})(jade);