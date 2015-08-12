/// <reference path="../../node_modules/reflect-metadata/reflect-metadata.d.ts"/>
require('reflect-metadata')

import { resolve } from 'path';
import { readFile } from 'fs';
import * as util from 'util';
import { Types, ParamData, MetaData } from 'kevoree-api';
import { MetaData as InjectMetaData, InjectData } from 'ts-injector';
import { Model, Param, Port, DeployUnit } from './Model';

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

  private prettyPrint(model: Model, Type: Function): void {
    console.log('Type:      ', model.type);
    console.log('Name:      ', model.name);
    console.log('Version:   ', model.deployUnit.version);
    console.log('Namespace: ', model.namespace);
    console.log('Meta:      ', Reflect.getMetadata(MetaData.META, Type.prototype));
    console.log('Params:    ');
    Reflect.getMetadata(MetaData.PARAMS, Type.prototype)
      .forEach(function(param: ParamData) {
      console.log(`   ${param.meta.fragmentDependant ? '#' : ''}${param.name}${param.meta.optional ? '' : '*'}: ${param.type} ${param.meta.defaultValue ? '(default=' + param.meta.defaultValue + ')' : ''}`)
    });
    console.log('Inputs:');
    this.printPort(Reflect.getMetadata(MetaData.INPUTS, Type.prototype), Type);
    console.log('Outputs:');
    this.printPort(Reflect.getMetadata(MetaData.OUTPUTS, Type.prototype), Type);
    console.log('Injects: ');
    Reflect.getMetadata(InjectMetaData.INJECTS, Type.prototype)
      .forEach(function(data: InjectData) {
      // TODO check if service exists for targeted platform version
      console.log(`   ${data.name}: ${data.className}`);
    });
  }

  private printPort(list: Array<string>, Type: Function): void {
    var str = list.map((name: string) => {
      if (Reflect.getMetadata(MetaData.MSG_SCHEMA, Type.prototype, name)) {
        var schema = Reflect.getMetadata(MetaData.MSG_SCHEMA, Type.prototype, name);
        if (schema) {
          var valid = schemaValidator(schema);
          if (valid) {
            return name + ' (valid)';
          } else {
            return name + ' (invalid)';
            console.log(schemaValidator.errors);
          }
        } else {
          return name + ' (no schema)';
        }
      } else {
        return name + ' (no schema)';
      }
    }).join(', ');
    console.log('   '+str);
  }
}

declare interface Callback {
  (err: Error, model?: string): void;
}
