import 'reflect-metadata';

import { resolve } from 'path';
import { readFile } from 'fs';
import * as util from 'util';
import { TypeEnum, MetaData, TypeMeta, NumberTypeMeta, MinMaxMeta } from 'kevoree-api';
import { MetaData as InjectMetaData, InjectData } from 'ts-injector';
import { KevoreeModel, kevoree, modeling } from 'kevoree-model';
import { ModelCallback } from './ModelCallback';

var jsonValidator = require('is-my-json-valid');
var metaJsonSchema = require('../../jsonschema.json');
var schemaValidator = jsonValidator(metaJsonSchema, { verbose: true, greedy: true });

export class GenModel {
    generate(path: string, done: ModelCallback): void {
        var kModel = new KevoreeModel(modeling.memory.manager.DataManagerBuilder.buildDefault());
        var kView = kModel.universe(0).time(0);
        kModel.connect(() => {
            var pkgPath = resolve(path, 'package.json');
            readFile(pkgPath, { encoding: 'utf8' }, (err, data) => {
                if (err) {
                    done(err);
                } else {
                    var model = kView.createModel();
                    var pkg: any, classPath: string, Type: FunctionConstructor;
                    try {
                        pkg = JSON.parse(data);
                    } catch (err) {
                        done(new Error('Unable to parse package.json'));
                        return;
                    }

                    try {
                        classPath = resolve(path, pkg.main);
                        Type = require(classPath);
                    } catch (err) {
                        done(new Error(`Unable to load class ${classPath}`));
                        return;
                    }

                    var type = Reflect.getMetadata(MetaData.TYPE, Type.prototype);
                    if (typeof type !== 'undefined') {
                        var tdef: kevoree.TypeDefinition;
                        switch (type) {
                            case TypeEnum.NODE:
                                tdef = kView.createNodeType();
                                break;
                            case TypeEnum.GROUP:
                                tdef = kView.createGroupType();
                                break;
                            case TypeEnum.CHANNEL:
                                tdef = kView.createChannelType();
                                break;
                            case TypeEnum.COMPONENT:
                                tdef = kView.createComponentType();
                                break;
                        }
                        tdef.setName(Reflect.getMetadata(MetaData.NAME, Type.prototype));
                        tdef.setVersion(Reflect.getMetadata(MetaData.VERSION, Type.prototype));
                        if (typeof pkg.version === 'string') {
                            var du = kView.createDeployUnit();
                            du.setVersion(pkg.version);
                            if (typeof pkg.name === 'string') {
                                du.setName(pkg.name);
                                du.setPlatform('javascript');
                                // var platformMeta = kView.createValue();
                                // platformMeta.setName('platform');
                                // platformMeta.setValue('javascript');
                                // du.addMetaData(platformMeta);
                                if (typeof pkg.kevoree === 'object') {
                                    if (typeof pkg.kevoree.namespace === 'string') {
                                        var ns = kView.createNamespace();
                                        ns.setName(pkg.kevoree.namespace);
                                        tdef.addDeployUnits(du);
                                        ns.addTypeDefinitions(tdef);
                                        model.addNamespaces(ns);

                                        var meta: TypeMeta = Reflect.getMetadata(MetaData.META, Type.prototype);
                                        if (meta) {
                                            var descMeta = kView.createValue();
                                            descMeta.setName('description');
                                            descMeta.setValue(meta.description);
                                            tdef.addMetaData(descMeta);
                                        }

                                        var dicType = kView.createDictionaryType();
                                        Reflect.getMetadata(MetaData.PARAMS, Type.prototype).forEach((name: string) => {
                                            var param: kevoree.ParamType;

                                            const type = Reflect.getMetadata('design:type', Type.prototype, name);
                                            const required: boolean = Reflect.getMetadata(MetaData.REQUIRED, Type.prototype, name) || false;
                                            const fragment: boolean = Reflect.getMetadata(MetaData.FRAGMENT, Type.prototype, name) || false;
                                            const t = new Type();

                                            switch (typeof t[name]) {
                                                case 'string':
                                                    param = kView.createStringParamType();
                                                    const multi = Reflect.getMetadata(MetaData.MULTILINE, Type.prototype, name) || false;
                                                    const constraint = kView.createMultilineConstraint();
                                                    constraint.setValue(multi);
                                                    param.addConstraints(constraint);
                                                    break;

                                                case 'boolean':
                                                    param = kView.createBooleanParamType();
                                                    break;

                                                case 'number':
                                                    param = kView.createNumberParamType();
                                                    const numberType: NumberTypeMeta = Reflect.getMetadata(MetaData.NUMBER_TYPE, Type.prototype, name);
                                                    switch (numberType) {
                                                        case NumberTypeMeta.SHORT:
                                                            (<kevoree.NumberParamType> param).setType(kevoree.meta.MetaNumberType.SHORT);
                                                            break;
                                                        case NumberTypeMeta.INT:
                                                            (<kevoree.NumberParamType> param).setType(kevoree.meta.MetaNumberType.INT);
                                                            break;
                                                        case NumberTypeMeta.LONG:
                                                            (<kevoree.NumberParamType> param).setType(kevoree.meta.MetaNumberType.LONG);
                                                            break;
                                                        case NumberTypeMeta.FLOAT:
                                                            (<kevoree.NumberParamType> param).setType(kevoree.meta.MetaNumberType.FLOAT);
                                                            break;
                                                        case NumberTypeMeta.DOUBLE:
                                                            (<kevoree.NumberParamType> param).setType(kevoree.meta.MetaNumberType.DOUBLE);
                                                            break;
                                                    }
                                                    const min: MinMaxMeta = Reflect.getMetadata(MetaData.MIN, Type.prototype, name);
                                                    if (min) {
                                                        const minConstraint = kView.createMinConstraint();
                                                        minConstraint.setValue(min.value);
                                                        minConstraint.setExclusive(min.exclusive);
                                                        param.addConstraints(minConstraint);
                                                    }
                                                    const max: MinMaxMeta = Reflect.getMetadata(MetaData.MAX, Type.prototype, name);
                                                    if (max) {
                                                        const maxConstraint = kView.createMaxConstraint();
                                                        maxConstraint.setValue(max.value);
                                                        maxConstraint.setExclusive(max.exclusive);
                                                        param.addConstraints(maxConstraint);
                                                    }
                                                    break;

                                                // case ParamType.INTEGER:
                                                //     var idt = kView.createIntDataType();
                                                //     idt.setDefault((<NumberParamMeta> data).default);
                                                //     idt.setMin((<NumberParamMeta> data).min);
                                                //     idt.setMax((<NumberParamMeta> data).max);
                                                //     attr.addDatatype(idt);
                                                //     break;
                                                //
                                                // case ParamType.CHOICES:
                                                //     var cdt = kView.createChoiceDataType();
                                                //     cdt.setDefaultIndex((<ChoiceParamMeta> data).defaultIndex);
                                                //     (<ChoiceParamMeta> data).choices.forEach((val) => {
                                                //         var choice = kView.createItem();
                                                //         choice.setValue(val);
                                                //         cdt.addChoices(choice);
                                                //     });
                                                //     attr.addDatatype(cdt);
                                                //     break;
                                                //
                                                // case ParamType.LIST:
                                                //     var ldt = kView.createListDataType();
                                                //     (<ListParamMeta> data).default.forEach((val) => {
                                                //         var value = kView.createItem();
                                                //         value.setValue(val);
                                                //         ldt.addDefault(value);
                                                //     });
                                                //     attr.addDatatype(ldt);
                                                //     break;

                                                default:
                                                    done(new Error(`Param "${name}" has an invalid type.`));
                                                    return;
                                            }

                                            param.setRequired(required);
                                            param.setFragment(fragment);
                                            dicType.addParams(param);
                                        });
                                        tdef.addDictionary(dicType);

                                        Reflect.getMetadata(MetaData.INPUTS, Type.prototype).forEach((name: string) => {
                                            var portType = kView.createPortType();
                                            portType.setName(name);

                                            // check for schema
                                            if (Reflect.getMetadata(MetaData.MSG_SCHEMA, Type.prototype, name)) {
                                                var schema = Reflect.getMetadata(MetaData.MSG_SCHEMA, Type.prototype, name);
                                                if (schema) {
                                                    var valid = schemaValidator(schema);
                                                    if (valid) {
                                                        var protocol = kView.createValue();
                                                        protocol.setName('jsonschema');
                                                        protocol.setValue(schema);
                                                        portType.addProtocol(protocol);
                                                    } else {
                                                        done(new Error(`Invalid schema for input port ${name} (${schema})`));
                                                        return;
                                                    }
                                                }
                                            }

                                            (<kevoree.ComponentType> tdef).addInputTypes(portType);
                                        });

                                        Reflect.getMetadata(MetaData.OUTPUTS, Type.prototype).forEach((name: string) => {
                                            var portType = kView.createPortType();
                                            portType.setName(name);

                                            // check for schema
                                            if (Reflect.getMetadata(MetaData.MSG_SCHEMA, Type.prototype, name)) {
                                                var schema = Reflect.getMetadata(MetaData.MSG_SCHEMA, Type.prototype, name);
                                                if (schema) {
                                                    var valid = schemaValidator(schema);
                                                    if (valid) {
                                                        var schemaMeta = kView.createValue();
                                                        schemaMeta.setName('jsonschema');
                                                        schemaMeta.setValue(JSON.stringify(schema));
                                                        portType.addMetaData(schemaMeta);
                                                    } else {
                                                        done(new Error(`Invalid schema for output port ${name} (${schema})`));
                                                        return;
                                                    }
                                                }
                                            }

                                            (<kevoree.ComponentType> tdef).addOutputTypes(portType);
                                        });

                                        kView.json().save(model, (modelStr: string) => {
                                            kModel.disconnect(() => {});
                                            done(null, modelStr);
                                        });
                                    } else {
                                        done(new Error(`Unable to find "kevoree.namespace" string in package.json`));
                                    }
                                } else {
                                    done(new Error(`Unable to find "kevoree" object in package.json`));
                                }
                            } else {
                                done(new Error(`Unable to find "name" string in package.json`));
                            }
                        } else {
                            done(new Error(`Unable to find "version" string in package.json`));
                        }
                    } else {
                        done(new Error(`Unable to find the type annotation (@Node, @Component, @Channel, @Group) of ${classPath}`));
                    }
                }
            });
        });
    }

    private prettyPrint(type: string, model: any): void {
        console.log('Type:      ', type);

        // console.log('Name:      ', model.name);
        // console.log('Version:   ', model.deployUnit.version);
        // console.log('Namespace: ', model.namespace);
        // console.log('Meta:      ', model.description ? model.description : '<none>');
        // console.log('Params:    ');
        // if (model.params.length === 0) {
        //   console.log('    <none>');
        // } else {
        //   model.params.forEach((param: Param) => {
        //     console.log(`   ${param.fragmentDependant ? '#' : ''}${param.name}${param.optional ? '' : '*'}: ${param.type} ${param.default ? '(default=' + param.default + ')' : ''}`);
        //   });
        // }
        // console.log('Inputs:');
        // var inputs = model.inputs.map((port: Port) => {
        //   return port.name;
        // }).join(', ');
        // if (inputs.length === 0) {
        //   console.log('    <none>');
        // } else {
        //   console.log(`    ${inputs}`);
        // }
        //
        // console.log('Outputs:');
        // var outputs = model.outputs.map((port: Port) => {
        //   return port.name;
        // }).join(', ');
        // if (outputs.length === 0) {
        //   console.log('    <none>');
        // } else {
        //   console.log(`    ${outputs}`);
        // }
        //
        //
        // console.log('Injects: ');
        // if (model.services.length === 0) {
        //   console.log('    <none>');
        // } else {
        //   model.services.forEach((service: Service) => {
        //     // TODO check if service exists for targeted platform version
        //     console.log(`   ${service.name}: ${service.className}`);
        //   });
        // }
    }
}
