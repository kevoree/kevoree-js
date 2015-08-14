/// <reference path="../../node_modules/reflect-metadata/reflect-metadata.d.ts"/>
require('reflect-metadata')

import { resolve } from 'path';
import { readFile } from 'fs';
import * as util from 'util';
import { Types, ParamData, MetaData, TypeMeta } from 'kevoree-api';
import { MetaData as InjectMetaData, InjectData } from 'ts-injector';
import { Model, Param, Port, DeployUnit, Service } from './Model';

var jsonValidator = require('is-my-json-valid');
var metaJsonSchema = require('../../jsonschema.json');
var schemaValidator = jsonValidator(metaJsonSchema, { verbose: true, greedy: true });

export class GenModel {

  generate(done: Callback): void {
    var pkgPath = resolve(process.cwd(), 'package.json');
    readFile(pkgPath, { encoding: 'utf8' }, (err, data) => {
      if (err) {
        done(err);
      } else {
        var model = new Model();
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

        model.type = Types[Reflect.getMetadata(MetaData.TYPE, Type.prototype)];
        if (typeof model.type !== 'undefined') {
          model.name = Reflect.getMetadata(MetaData.NAME, Type.prototype);
          if (typeof pkg.version === 'string') {
            model.deployUnit.version = pkg.version;
            if (typeof pkg.name === 'string') {
              model.deployUnit.name = pkg.name;
              if (typeof pkg.kevoree === 'object') {
                if (typeof pkg.kevoree.namespace === 'string') {
                  model.namespace = pkg.kevoree.namespace;

                  var meta: TypeMeta = Reflect.getMetadata(MetaData.META, Type.prototype);
                  if (meta) {
                    model.description = meta.desc;
                  }

                  Reflect.getMetadata(MetaData.PARAMS, Type.prototype)
                    .forEach(function(param: ParamData) {
                      model.params.push({
                        name: param.name,
                        type: param.type,
                        default: param.meta.defaultValue,
                        fragmentDependant: param.meta.fragmentDependant,
                        optional: param.meta.optional
                      });
                  });

                  this.processPort(Reflect.getMetadata(MetaData.INPUTS, Type.prototype), Type, model.inputs);
                  this.processPort(Reflect.getMetadata(MetaData.OUTPUTS, Type.prototype), Type, model.outputs);

                  var injects = Reflect.getMetadata(InjectMetaData.INJECTS, Type.prototype) || [];
                  injects.forEach((inject: InjectData) => {
                      model.services.push({
                        name: inject.name,
                        className: inject.className
                      });
                  });

                  this.prettyPrint(model);
                  // TODO
                  done(null, '{}');
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
  }

  private prettyPrint(model: Model): void {
    console.log('Type:      ', model.type);
    console.log('Name:      ', model.name);
    console.log('Version:   ', model.deployUnit.version);
    console.log('Namespace: ', model.namespace);
    console.log('Meta:      ', model.description ? model.description : '<none>');
    console.log('Params:    ');
    if (model.params.length === 0) {
      console.log('    <none>');
    } else {
      model.params.forEach((param: Param) => {
        console.log(`   ${param.fragmentDependant ? '#' : ''}${param.name}${param.optional ? '' : '*'}: ${param.type} ${param.default ? '(default=' + param.default + ')' : ''}`);
      });
    }
    console.log('Inputs:');
    var inputs = model.inputs.map((port: Port) => {
      return port.name;
    }).join(', ');
    if (inputs.length === 0) {
      console.log('    <none>');
    } else {
      console.log(`    ${inputs}`);
    }

    console.log('Outputs:');
    var outputs = model.outputs.map((port: Port) => {
      return port.name;
    }).join(', ');
    if (outputs.length === 0) {
      console.log('    <none>');
    } else {
      console.log(`    ${outputs}`);
    }


    console.log('Injects: ');
    if (model.services.length === 0) {
      console.log('    <none>');
    } else {
      model.services.forEach((service: Service) => {
        // TODO check if service exists for targeted platform version
        console.log(`   ${service.name}: ${service.className}`);
      });
    }
  }

  private processPort(list: string[], Type: Function, portList: Port[]): void {
    list.forEach((name: string) => {
      if (Reflect.getMetadata(MetaData.MSG_SCHEMA, Type.prototype, name)) {
        var schema = Reflect.getMetadata(MetaData.MSG_SCHEMA, Type.prototype, name);
        if (schema) {
          var valid = schemaValidator(schema);
          if (valid) {
            portList.push({
              name: name + ' (valid)',
              schema: schema
            });
          } else {
            portList.push({
              name: name + ' (invalid)',
              schema: schema
            });
          }
        } else {
          portList.push({
            name: name + ' (no schema)',
            schema: null
          });
        }
      } else {
        portList.push({
          name: name + ' (no schema)',
          schema: null
        });
      }
    });
  }
}

declare interface Callback {
  (err: Error, model?: string): void;
}
