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
var api_1 = require('../main/api');
var MyComp = (function () {
    function MyComp() {
    }
    MyComp.prototype.start = function (done) {
        console.log('MyComp level');
        this.logger.info(this.modelService.getName() + " started on node " + this.modelService.getNodeName());
        done();
    };
    MyComp.prototype.input = function (msg) {
        console.log('input: ' + msg);
    };
    MyComp.prototype.input2 = function (msg) {
        console.log('input2: ' + msg);
    };
    MyComp.prototype.output = function (msg) { };
    MyComp.prototype.output2 = function (msg) { };
    __decorate([
        api_1.Param({ defaultValue: 9000 }), 
        __metadata('design:type', Number)
    ], MyComp.prototype, "port");
    __decorate([
        api_1.Param({ defaultValue: 'ws.kevoree.org' }), 
        __metadata('design:type', String)
    ], MyComp.prototype, "host");
    __decorate([
        api_1.Inject(api_1.Services.ModelService), 
        __metadata('design:type', Object)
    ], MyComp.prototype, "modelService");
    __decorate([
        api_1.Inject(api_1.Services.LoggerService), 
        __metadata('design:type', Object)
    ], MyComp.prototype, "logger");
    Object.defineProperty(MyComp.prototype, "input",
        __decorate([
            api_1.Input, 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [String]), 
            __metadata('design:returntype', void 0)
        ], MyComp.prototype, "input", Object.getOwnPropertyDescriptor(MyComp.prototype, "input")));
    Object.defineProperty(MyComp.prototype, "input2",
        __decorate([
            api_1.Input, 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [String]), 
            __metadata('design:returntype', void 0)
        ], MyComp.prototype, "input2", Object.getOwnPropertyDescriptor(MyComp.prototype, "input2")));
    Object.defineProperty(MyComp.prototype, "output",
        __decorate([
            api_1.Output, 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [String]), 
            __metadata('design:returntype', void 0)
        ], MyComp.prototype, "output", Object.getOwnPropertyDescriptor(MyComp.prototype, "output")));
    Object.defineProperty(MyComp.prototype, "output2",
        __decorate([
            api_1.Output, 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [String]), 
            __metadata('design:returntype', void 0)
        ], MyComp.prototype, "output2", Object.getOwnPropertyDescriptor(MyComp.prototype, "output2")));
    MyComp = __decorate([
        api_1.Component({ desc: 'This component does something' }), 
        __metadata('design:paramtypes', [])
    ], MyComp);
    return MyComp;
})();
exports.MyComp = MyComp;
