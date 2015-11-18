import 'reflect-metadata';
import { resolve } from 'path';
import { readFile } from 'fs';
import * as util from 'util';
import {
    TypeEnum, ParamMeta, MetaData, TypeMeta, ParamType, StringParamMeta,
    BooleanParamMeta, ChoiceParamMeta, ListParamMeta, NumberParamMeta
} from 'kevoree-api';
import { MetaData as InjectMetaData, InjectData } from 'ts-injector';
import { org } from 'kevoree-model';
import { ModelCallback } from './ModelCallback';

var jsonValidator = require('is-my-json-valid');
var metaJsonSchema = require('../../jsonschema.json');
var schemaValidator = jsonValidator(metaJsonSchema, { verbose: true, greedy: true });

export class GenModel {
    generate(path: string, done: ModelCallback): void {
        var kModel = new org.KevoreeModel(org.kevoree.modeling.memory.manager.DataManagerBuilder.buildDefault());
        var kView = kModel.universe(0).time(0);
        kModel.connect(() => {
            var pkgPath = resolve(path, 'package.json');
            readFile(pkgPath, { encoding: 'utf8' }, (err, data) => {
                if (err) {
                    done(err);
                } else {
                    var model = kView.createModel();
                    kView.setRoot(model, () => {
                        var pkg: any, classPath: string, Type: Function;
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
                            var tdef: org.kevoree.TypeDefinition;
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

                                            var meta: TypeMeta = Reflect.getMetadata(MetaData.META, Type.prototype);
                                            if (meta) {
                                                var descMeta = kView.createValue();
                                                descMeta.setName('description');
                                                descMeta.setValue(meta.description);
                                                tdef.addMetaData(descMeta);
                                            }

                                            var dicType = kView.createDictionaryType();
                                            Reflect.getMetadata(MetaData.PARAMS, Type.prototype).forEach((name: string) => {
                                                var data: ParamMeta = Reflect.getMetadata(MetaData.PARAM, Type.prototype, name);
                                                var attr = kView.createAttributeType();
                                                attr.setName(name);
                                                attr.setOptional(data.optional);
                                                attr.setFragment(data.fragment);
                                                dicType.addAttributes(attr);

                                                switch (data.datatype) {
                                                    case ParamType.STRING:
                                                        var sdt = kView.createStringDataType();
                                                        sdt.setMultiline((<StringParamMeta> data).multiline);
                                                        sdt.setDefault((<StringParamMeta> data).default);
                                                        attr.addDatatype(sdt);
                                                        break;

                                                    case ParamType.BOOLEAN:
                                                        var bdt = kView.createBooleanDataType();
                                                        bdt.setDefault((<BooleanParamMeta> data).default);
                                                        attr.addDatatype(bdt);
                                                        break;

                                                    case ParamType.INTEGER:
                                                        var idt = kView.createIntDataType();
                                                        idt.setDefault((<NumberParamMeta> data).default);
                                                        idt.setMin((<NumberParamMeta> data).min);
                                                        idt.setMax((<NumberParamMeta> data).max);
                                                        attr.addDatatype(idt);
                                                        break;

                                                    case ParamType.CHOICES:
                                                        var cdt = kView.createChoiceDataType();
                                                        cdt.setDefaultIndex((<ChoiceParamMeta> data).defaultIndex);
                                                        (<ChoiceParamMeta> data).choices.forEach((val) => {
                                                            var choice = kView.createItem();
                                                            choice.setValue(val);
                                                            cdt.addChoices(choice);
                                                        });
                                                        attr.addDatatype(cdt);
                                                        break;

                                                    case ParamType.LIST:
                                                        var ldt = kView.createListDataType();
                                                        (<ListParamMeta> data).default.forEach((val) => {
                                                            var value = kView.createItem();
                                                            value.setValue(val);
                                                            ldt.addDefault(value);
                                                        });
                                                        attr.addDatatype(ldt);
                                                        break;

                                                    default:
                                                        done(new Error(`Param "${name}" has an invalid type.`));
                                                        return;
                                                }
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

                                                (<org.kevoree.ComponentType> tdef).addInputTypes(portType);
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
                                                            schemaMeta.setValue(schema);
                                                            portType.addMetaData(schemaMeta);
                                                        } else {
                                                            done(new Error(`Invalid schema for output port ${name} (${schema})`));
                                                            return;
                                                        }
                                                    }
                                                }

                                                (<org.kevoree.ComponentType> tdef).addOutputTypes(portType);
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
                    });
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
