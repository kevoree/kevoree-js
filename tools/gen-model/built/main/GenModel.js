require('reflect-metadata');
var path_1 = require('path');
var fs_1 = require('fs');
var kevoree_api_1 = require('kevoree-api');
var ts_injector_1 = require('ts-injector');
var kevoree_model_1 = require('kevoree-model');
var jsonValidator = require('is-my-json-valid');
var metaJsonSchema = require('../../jsonschema.json');
var schemaValidator = jsonValidator(metaJsonSchema, { verbose: true, greedy: true });
var GenModel = (function () {
    function GenModel() {
    }
    GenModel.prototype.generate = function (done) {
        var kModel = new kevoree_model_1.org.KevoreeModel(kevoree_model_1.org.kevoree.modeling.memory.manager.DataManagerBuilder.buildDefault());
        var kView = kModel.universe(0).time(0);
        kModel.connect(function () {
            var pkgPath = path_1.resolve(process.cwd(), 'package.json');
            fs_1.readFile(pkgPath, { encoding: 'utf8' }, function (err, data) {
                if (err) {
                    done(err);
                }
                else {
                    var model = kView.createModel();
                    kView.setRoot(model, function () {
                        var pkg, classPath, Type;
                        try {
                            pkg = JSON.parse(data);
                        }
                        catch (err) {
                            done(new Error('Unable to parse package.json'));
                            return;
                        }
                        try {
                            classPath = path_1.resolve(process.cwd(), pkg.main);
                            Type = require(classPath);
                        }
                        catch (err) {
                            done(new Error("Unable to load class " + classPath));
                            return;
                        }
                        var type = Reflect.getMetadata(kevoree_api_1.MetaData.TYPE, Type.prototype);
                        if (typeof type !== 'undefined') {
                            var tdef;
                            switch (type) {
                                case kevoree_api_1.Types.Node:
                                    tdef = kView.createNodeType();
                                    break;
                                case kevoree_api_1.Types.Group:
                                    tdef = kView.createGroupType();
                                    break;
                                case kevoree_api_1.Types.Channel:
                                    tdef = kView.createChannelType();
                                    break;
                                case kevoree_api_1.Types.Component:
                                    tdef = kView.createComponentType();
                                    break;
                            }
                            tdef.setName(Reflect.getMetadata(kevoree_api_1.MetaData.NAME, Type.prototype));
                            if (typeof pkg.version === 'string') {
                                var du = kView.createDeployUnit();
                                du.setVersion(pkg.version);
                                if (typeof pkg.name === 'string') {
                                    du.setName(pkg.name);
                                    var platformMeta = kView.createValue();
                                    platformMeta.setName('platform');
                                    platformMeta.setValue('javascript');
                                    du.addMetaData(platformMeta);
                                    if (typeof pkg.kevoree === 'object') {
                                        if (typeof pkg.kevoree.namespace === 'string') {
                                            var ns = kView.createNamespace();
                                            ns.setName(pkg.kevoree.namespace);
                                            tdef.addDeployUnits(du);
                                            ns.addTypeDefinitions(tdef);
                                            model.addNamespaces(ns);
                                            var meta = Reflect.getMetadata(kevoree_api_1.MetaData.META, Type.prototype);
                                            if (meta) {
                                                var descMeta = kView.createValue();
                                                descMeta.setName('description');
                                                descMeta.setValue(meta.desc);
                                                tdef.addMetaData(descMeta);
                                            }
                                            var dicType = kView.createDictionaryType();
                                            Reflect.getMetadata(kevoree_api_1.MetaData.PARAMS, Type.prototype).forEach(function (param) {
                                                var attr = kView.createAttributeType();
                                                attr.setName(param.name);
                                                attr.setOptional(param.meta.optional);
                                                attr.setDefaultValue(param.meta.defaultValue + '');
                                                attr.setFragmentDependant(param.meta.fragmentDependant);
                                                if (typeof param.meta.datatype === 'undefined') {
                                                    switch (param.type) {
                                                        case 'Number':
                                                            attr.setDatatype(kevoree_model_1.org.kevoree.meta.MetaDataType.INTEGER);
                                                            break;
                                                        case 'String':
                                                            attr.setDatatype(kevoree_model_1.org.kevoree.meta.MetaDataType.STRING);
                                                            break;
                                                        case 'Boolean':
                                                            attr.setDatatype(kevoree_model_1.org.kevoree.meta.MetaDataType.BOOLEAN);
                                                            break;
                                                        default:
                                                            done(new Error("Param \"" + param.name + "\" has an invalid type."));
                                                            return;
                                                    }
                                                }
                                                else {
                                                    switch (param.meta.datatype) {
                                                        case kevoree_api_1.DataType.STRING:
                                                            attr.setDatatype(kevoree_model_1.org.kevoree.meta.MetaDataType.STRING);
                                                            break;
                                                        case kevoree_api_1.DataType.BOOLEAN:
                                                            attr.setDatatype(kevoree_model_1.org.kevoree.meta.MetaDataType.BOOLEAN);
                                                            break;
                                                        case kevoree_api_1.DataType.INTEGER:
                                                            attr.setDatatype(kevoree_model_1.org.kevoree.meta.MetaDataType.INTEGER);
                                                            break;
                                                        case kevoree_api_1.DataType.DECIMAL:
                                                            attr.setDatatype(kevoree_model_1.org.kevoree.meta.MetaDataType.DECIMAL);
                                                            break;
                                                        case kevoree_api_1.DataType.LIST:
                                                            attr.setDatatype(kevoree_model_1.org.kevoree.meta.MetaDataType.LIST);
                                                            break;
                                                        case kevoree_api_1.DataType.CHAR:
                                                            attr.setDatatype(kevoree_model_1.org.kevoree.meta.MetaDataType.CHAR);
                                                            break;
                                                        default:
                                                            done(new Error("Param \"" + param.name + "\" has an invalid type."));
                                                            return;
                                                    }
                                                }
                                                dicType.addAttributes(attr);
                                            });
                                            tdef.setDictionaryType(dicType);
                                            Reflect.getMetadata(kevoree_api_1.MetaData.INPUTS, Type.prototype).forEach(function (name) {
                                                var portType = kView.createPortType();
                                                portType.setName(name);
                                                if (Reflect.getMetadata(kevoree_api_1.MetaData.MSG_SCHEMA, Type.prototype, name)) {
                                                    var schema = Reflect.getMetadata(kevoree_api_1.MetaData.MSG_SCHEMA, Type.prototype, name);
                                                    if (schema) {
                                                        var valid = schemaValidator(schema);
                                                        if (valid) {
                                                            var schemaMeta = kView.createValue();
                                                            schemaMeta.setName('schema');
                                                            schemaMeta.setValue(schema);
                                                            portType.addMetaData(schemaMeta);
                                                        }
                                                        else {
                                                            done(new Error("Invalid schema for input port " + name + " (" + schema + ")"));
                                                            return;
                                                        }
                                                    }
                                                }
                                                tdef.addInputs(portType);
                                            });
                                            Reflect.getMetadata(kevoree_api_1.MetaData.OUTPUTS, Type.prototype).forEach(function (name) {
                                                var portType = kView.createPortType();
                                                portType.setName(name);
                                                if (Reflect.getMetadata(kevoree_api_1.MetaData.MSG_SCHEMA, Type.prototype, name)) {
                                                    var schema = Reflect.getMetadata(kevoree_api_1.MetaData.MSG_SCHEMA, Type.prototype, name);
                                                    if (schema) {
                                                        var valid = schemaValidator(schema);
                                                        if (valid) {
                                                            var schemaMeta = kView.createValue();
                                                            schemaMeta.setName('schema');
                                                            schemaMeta.setValue(JSON.stringify(schema));
                                                            portType.addMetaData(schemaMeta);
                                                        }
                                                        else {
                                                            done(new Error("Invalid schema for output port " + name + " (" + schema + ")"));
                                                            return;
                                                        }
                                                    }
                                                }
                                                tdef.addOutputs(portType);
                                            });
                                            var injects = Reflect.getMetadata(ts_injector_1.MetaData.INJECTS, Type.prototype) || [];
                                            injects.forEach(function (inject) {
                                            });
                                            var view = model.manager().model().universe(0).time(0);
                                            view.json().save(model, function (modelStr) {
                                                view.disconnect(null);
                                                done(null, modelStr);
                                            });
                                        }
                                        else {
                                            done(new Error("Unable to find \"kevoree.namespace\" string in package.json"));
                                        }
                                    }
                                    else {
                                        done(new Error("Unable to find \"kevoree\" object in package.json"));
                                    }
                                }
                                else {
                                    done(new Error("Unable to find \"name\" string in package.json"));
                                }
                            }
                            else {
                                done(new Error("Unable to find \"version\" string in package.json"));
                            }
                        }
                        else {
                            done(new Error("Unable to find the type annotation (@Node, @Component, @Channel, @Group) of " + classPath));
                        }
                    });
                }
            });
        });
    };
    GenModel.prototype.prettyPrint = function (type, model) {
        console.log('Type:      ', type);
    };
    return GenModel;
})();
exports.GenModel = GenModel;
