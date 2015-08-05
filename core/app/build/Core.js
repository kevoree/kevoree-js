var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events_1 = require('events');
var NAME_PATTERN = /^[\w-]+$/;
var Core = (function (_super) {
    __extends(Core, _super);
    function Core(logger) {
        _super.call(this);
        this.logger = logger;
        this.emitter = new events_1.EventEmitter();
    }
    Core.prototype.start = function (name) {
        var _this = this;
        if (!name || name.length === 0) {
            name = 'node0';
        }
        if (name.match(NAME_PATTERN)) {
            this.nodeName = name;
            var factory = new kevoree.factory.DefaultKevoreeFactory();
            this.currentModel = factory.createContainerRoot();
            factory.root(this.currentModel);
            var node = factory.createContainerNode();
            node.name = this.nodeName;
            node.started = false;
            this.currentModel.addNodes(node);
            var id = setInterval(function () {
            }, 10e10);
            this.emitter.on('stopped', function () {
                clearInterval(id);
                _this.emit('stopped');
            });
        }
        else {
            throw new Error('');
        }
    };
    Core.prototype.stop = function (done) {
    };
    Core.prototype.deploy = function (model, done) {
    };
    return Core;
})(events_1.EventEmitter);
exports.Core = Core;
