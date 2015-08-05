var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var kevoree_api_1 = require('kevoree-api');
var MyComp = (function () {
    function MyComp() {
    }
    MyComp.prototype.start = function (done) {
        this.logger.info(this.modelService.getName() + " started");
        done();
    };
    MyComp.prototype.input = function (msg) {
        this.logger.info(this.modelService.getName() + " incoming message: " + msg);
    };
    __decorate([
        kevoree_api_1.Inject(kevoree_api_1.Services.ModelService), 
        __metadata('design:type', Object)
    ], MyComp.prototype, "modelService");
    __decorate([
        kevoree_api_1.Inject(kevoree_api_1.Services.LoggerService), 
        __metadata('design:type', Object)
    ], MyComp.prototype, "logger");
    __decorate([
        kevoree_api_1.Param({ defaultValue: 42 }), 
        __metadata('design:type', Number)
    ], MyComp.prototype, "port");
    __decorate([
        kevoree_api_1.Param(), 
        __metadata('design:type', String)
    ], MyComp.prototype, "host");
    Object.defineProperty(MyComp.prototype, "input",
        __decorate([
            kevoree_api_1.Input, 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [String]), 
            __metadata('design:returntype', void 0)
        ], MyComp.prototype, "input", Object.getOwnPropertyDescriptor(MyComp.prototype, "input")));
    MyComp = __decorate([
        kevoree_api_1.Component({ desc: 'MyComp description is cool' }), 
        __metadata('design:paramtypes', [])
    ], MyComp);
    return MyComp;
})();
module.exports = MyComp;
