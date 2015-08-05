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
var MyOtherComp = (function () {
    function MyOtherComp() {
    }
    __decorate([
        api_1.Inject(api_1.Services.ModelService), 
        __metadata('design:type', Object)
    ], MyOtherComp.prototype, "modelService");
    MyOtherComp = __decorate([
        api_1.Component({ desc: 'This other component does something' }), 
        __metadata('design:paramtypes', [])
    ], MyOtherComp);
    return MyOtherComp;
})();
exports.MyOtherComp = MyOtherComp;
