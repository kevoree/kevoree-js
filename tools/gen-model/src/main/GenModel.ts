import 'reflect-metadata';

import { resolve } from 'path';
import { readFile } from 'fs';
import * as util from 'util';
import { TypeEnum, MetaData, TypeMeta, ReflectUtils } from 'kevoree-api';
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
            done(err);
            return;
          }

          var type = Reflect.getMetadata(MetaData.TYPE, Type.prototype);
          if (typeof type !== 'undefined') {
            var tdef: org.kevoree.TypeDefinition;
            switch (type) {
              case TypeEnum.NODE:
                tdef = kView.createNodeType();
                break;
              case TypeEnum.MCON:
                // tdef = kView.createModelConnector();
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
                    const t = new Type();
                    ReflectUtils.getParams(t).forEach(paramDetails => {
                      let param: org.kevoree.ParamType;

                      const minMaxConstraints = function (param: org.kevoree.NumberParamType) {
                        if (typeof paramDetails.min !== 'undefined') {
                          const minConstraint = kView.createMinConstraint();
                          minConstraint.setValue(paramDetails.min);
                          param.addConstraints(minConstraint);
                        }

                        if (typeof paramDetails.max !== 'undefined') {
                          const maxConstraint = kView.createMaxConstraint();
                          maxConstraint.setValue(paramDetails.max);
                          param.addConstraints(maxConstraint);
                        }
                      }

                      switch (paramDetails.type) {
                        case 'int':
                          param = kView.createNumberParamType();
                          (<org.kevoree.NumberParamType> param).setType(org.kevoree.meta.MetaNumberType.INT);
                          minMaxConstraints((<org.kevoree.NumberParamType> param));
                          break;

                        case 'long':
                          param = kView.createNumberParamType();
                          (<org.kevoree.NumberParamType> param).setType(org.kevoree.meta.MetaNumberType.LONG);
                          minMaxConstraints((<org.kevoree.NumberParamType> param));
                          break;

                        case 'short':
                          param = kView.createNumberParamType();
                          (<org.kevoree.NumberParamType> param).setType(org.kevoree.meta.MetaNumberType.SHORT);
                          minMaxConstraints((<org.kevoree.NumberParamType> param));
                          break;

                        case 'double':
                          param = kView.createNumberParamType();
                          (<org.kevoree.NumberParamType> param).setType(org.kevoree.meta.MetaNumberType.DOUBLE);
                          minMaxConstraints((<org.kevoree.NumberParamType> param));
                          break;

                        case 'float':
                          param = kView.createNumberParamType();
                          (<org.kevoree.NumberParamType> param).setType(org.kevoree.meta.MetaNumberType.FLOAT);
                          minMaxConstraints((<org.kevoree.NumberParamType> param));
                          break;

                        case 'string':
                          param = kView.createStringParamType();
                          const multi = kView.createMultilineConstraint();
                          multi.setValue(paramDetails.multi);
                          param.addConstraints(multi);
                          // const length = kView.createLengthConstraint();
                          // length.setValue(paramDetails.length);
                          // param.addConstraints(length);
                          break;

                        case 'boolean':
                          param = kView.createBooleanParamType();
                          break;

                        case 'choice':
                          param = kView.createChoiceParamType();
                          paramDetails.choices.forEach(item => {
                            const choice = kView.createItem();
                            choice.setValue(item);
                            (<org.kevoree.ChoiceParamType> param).addChoices(choice);
                          });
                          break;

                        default:
                          done(new Error(`Param "${paramDetails.name}" has an invalid type.`));
                          return;
                      }

                      param.setRequired(paramDetails.required);
                      param.setFragment(paramDetails.fragment);
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
                            protocol.setValue(JSON.stringify(schema));
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
                            schemaMeta.setValue(JSON.stringify(schema));
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
                      kModel.disconnect(() => { });
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
