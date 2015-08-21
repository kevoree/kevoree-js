require('reflect-metadata')

import { resolve } from 'path';
import { readFile } from 'fs';
import * as util from 'util';
import { Types, ParamData, MetaData, TypeMeta, DataType } from 'kevoree-api';
import { MetaData as InjectMetaData, InjectData } from 'ts-injector';
import { org } from 'kevoree-model';

var jsonValidator = require('is-my-json-valid');
var metaJsonSchema = require('../../jsonschema.json');
var schemaValidator = jsonValidator(metaJsonSchema, { verbose: true, greedy: true });

export class GenModel {

  generate(done: ModelCallback): void {
    var dm = org.kevoree.modeling.memory.manager.DataManagerBuilder.buildDefault();
    var kModel = new org.KevoreeModel(dm);
    var kView = kModel.universe(0).time(0);
    kModel.connect(() => {
      var pkgPath = resolve(process.cwd(), 'package.json');
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
              classPath = resolve(process.cwd(), pkg.main);
              Type = require(classPath);
            } catch (err) {
              done(new Error(`Unable to load class ${classPath}`));
              return;
            }

            var type = Reflect.getMetadata(MetaData.TYPE, Type.prototype);
            if (typeof type !== 'undefined') {
              var tdef: org.kevoree.TypeDefinition;
              switch (type) {
                case Types.Node:
                  tdef = kView.createNodeType();
                  break;
                case Types.Group:
                  tdef = kView.createGroupType();
                  break;
                case Types.Channel:
                  tdef = kView.createChannelType();
                  break;
                case Types.Component:
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
                        descMeta.setValue(meta.desc);
                        tdef.addMetaData(descMeta);
                      }

                      var dicType = kView.createDictionaryType();
                      Reflect.getMetadata(MetaData.PARAMS, Type.prototype).forEach((param: ParamData) => {
                        var attr = kView.createAttributeType();
                        attr.setName(param.name);
                        attr.setOptional(param.meta.optional);
                        attr.setDefaultValue(param.meta.defaultValue + '');
                        attr.setFragmentDependant(param.meta.fragmentDependant);

                        if (typeof param.meta.datatype === 'undefined') {
                          switch (param.type) {
                            case 'Number':
                              attr.setDatatype(org.kevoree.meta.MetaDataType.INTEGER);
                              break;

                            case 'String':
                              attr.setDatatype(org.kevoree.meta.MetaDataType.STRING);
                              break;

                            case 'Boolean':
                              attr.setDatatype(org.kevoree.meta.MetaDataType.BOOLEAN);
                              break;

                            default:
                              done(new Error(`Param "${param.name}" has an invalid type.`));
                              return;
                          }
                        } else {
                          switch (param.meta.datatype) {
                            case DataType.STRING:
                              attr.setDatatype(org.kevoree.meta.MetaDataType.STRING);
                              break;

                            case DataType.BOOLEAN:
                              attr.setDatatype(org.kevoree.meta.MetaDataType.BOOLEAN);
                              break;

                            case DataType.INTEGER:
                              attr.setDatatype(org.kevoree.meta.MetaDataType.INTEGER);
                              break;

                            case DataType.DECIMAL:
                              attr.setDatatype(org.kevoree.meta.MetaDataType.DECIMAL);
                              break;

                            case DataType.LIST:
                              attr.setDatatype(org.kevoree.meta.MetaDataType.LIST);
                              break;

                            case DataType.CHAR:
                              attr.setDatatype(org.kevoree.meta.MetaDataType.CHAR);
                              break;

                            default:
                              done(new Error(`Param "${param.name}" has an invalid type.`));
                              return;
                          }
                        }
                        dicType.addAttributes(attr);
                      });
                      tdef.setDictionaryType(dicType);

                      Reflect.getMetadata(MetaData.INPUTS, Type.prototype).forEach((name: string) => {
                        var portType = kView.createPortType();
                        portType.setName(name);

                        // check for schema
                        if (Reflect.getMetadata(MetaData.MSG_SCHEMA, Type.prototype, name)) {
                          var schema = Reflect.getMetadata(MetaData.MSG_SCHEMA, Type.prototype, name);
                          if (schema) {
                            var valid = schemaValidator(schema);
                            if (valid) {
                              var schemaMeta = kView.createValue();
                              schemaMeta.setName('schema');
                              schemaMeta.setValue(schema);
                              portType.addMetaData(schemaMeta);
                            } else {
                              done(new Error(`Invalid schema for input port ${name} (${schema})`));
                              return;
                            }
                          }
                        }

                        (<org.kevoree.ComponentType> tdef).addInputs(portType);
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
                              schemaMeta.setName('schema');
                              schemaMeta.setValue(JSON.stringify(schema));
                              portType.addMetaData(schemaMeta);
                            } else {
                              done(new Error(`Invalid schema for output port ${name} (${schema})`));
                              return;
                            }
                          }
                        }

                        (<org.kevoree.ComponentType> tdef).addOutputs(portType);
                      });

                      var injects = Reflect.getMetadata(InjectMetaData.INJECTS, Type.prototype) || [];
                      injects.forEach((inject: InjectData) => {
                        // model.services.push({
                        //   name: inject.name,
                        //   className: inject.className
                        // });
                      });

                      var view: org.KevoreeView = model.manager().model().universe(0).time(0);
                      view.json().save(model, modelStr => {
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

declare interface ModelCallback {
  (err: Error, model?: string): void;
}
