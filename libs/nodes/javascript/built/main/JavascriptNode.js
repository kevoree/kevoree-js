var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var kevoree_api_1 = require('kevoree-api');
var ts_injector_1 = require('ts-injector');
var kevoree_logger_1 = require('kevoree-logger');
var JavascriptNode = (function () {
    function JavascriptNode() {
    }
    JavascriptNode.prototype.start = function () {
        this.logger.info('Node started');
    };
    JavascriptNode.prototype.stop = function () {
        this.logger.info('Node stopped');
    };
    __decorate([
        ts_injector_1.Inject(kevoree_logger_1.LoggerImpl), 
        __metadata('design:type', Object)
    ], JavascriptNode.prototype, "logger", void 0);
    __decorate([
        ts_injector_1.Inject(null), 
        __metadata('design:type', Object)
    ], JavascriptNode.prototype, "modelService", void 0);
    __decorate([
        kevoree_api_1.Start(), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], JavascriptNode.prototype, "start", null);
    __decorate([
        kevoree_api_1.Stop(), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], JavascriptNode.prototype, "stop", null);
    JavascriptNode = __decorate([
        kevoree_api_1.Node({ desc: '<strong>TODO</strong> JavascriptNode description' }), 
        __metadata('design:paramtypes', [])
    ], JavascriptNode);
    return JavascriptNode;
})();
module.exports = JavascriptNode;
