/// <reference path="../../node_modules/reflect-metadata/reflect-metadata.d.ts"/>
require('reflect-metadata');
var path_1 = require('path');
var fs_1 = require('fs');
var kevoree_api_1 = require('kevoree-api');
var GenModel = (function () {
    function GenModel() {
    }
    GenModel.prototype.generate = function (done) {
        var pkgPath = path_1.resolve(process.cwd(), 'package.json');
        fs_1.readFile(pkgPath, { encoding: 'utf8' }, function (err, data) {
            if (err) {
                done(err);
            }
            else {
                try {
                    var pkg = JSON.parse(data);
                    var Type = require(path_1.resolve(process.cwd(), pkg.main));
                    console.log('Type:    ', kevoree_api_1.Types[Reflect.getMetadata('Type', Type.prototype)]);
                    console.log('Name:    ', Reflect.getMetadata('Name', Type.prototype));
                    console.log('Meta:    ', Reflect.getMetadata('Meta', Type.prototype));
                    console.log('Params:  ');
                    Reflect.getMetadata('Params', Type.prototype)
                        .forEach(function (param) {
                        console.log("   " + (param.fragmentDependant ? '#' : '') + param.name + (param.optional ? '' : '*') + ": " + param.type + " " + (param.defaultValue ? '(default=' + param.defaultValue + ')' : ''));
                    });
                    console.log('Inputs:  ');
                    Reflect.getMetadata('Inputs', Type.prototype)
                        .forEach(function (param) {
                        console.log("   " + param);
                    });
                    console.log('Outputs: ');
                    Reflect.getMetadata('Outputs', Type.prototype)
                        .forEach(function (param) {
                        console.log("   " + param);
                    });
                    console.log('Injects: ');
                    Reflect.getMetadata('Injects', Type.prototype)
                        .forEach(function (data) {
                        console.log("   " + data.propertyKey + ": " + kevoree_api_1.Types[data.service]);
                    });
                    var model = '{}';
                    done(null, model);
                }
                catch (err) {
                    done(err);
                }
            }
        });
    };
    return GenModel;
})();
exports.GenModel = GenModel;
