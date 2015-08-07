/// <reference path="../../node_modules/reflect-metadata/reflect-metadata.d.ts"/>
require('reflect-metadata')

import { resolve } from 'path'
import { readFile } from 'fs'
import { Types, Services, ParamData, InjectData, MetaData } from 'kevoree-api'
var jsonValidator = require('is-my-json-valid');
var metaJsonSchema = require('../../jsonschema.json');
var util = require('util');

export class GenModel {

  generate(done: Callback): void {
    var pkgPath = resolve(process.cwd(), 'package.json')
    readFile(pkgPath, { encoding: 'utf8' }, (err, data) => {
      if (err) {
        done(err)
      } else {
        try {
          var pkg = JSON.parse(data)
          var Type = require(resolve(process.cwd(), pkg.main))
          console.log('Type:    ', Types[Reflect.getMetadata(MetaData.TYPE, Type.prototype)])
          console.log('Name:    ', Reflect.getMetadata(MetaData.NAME, Type.prototype))
          console.log('Meta:    ', Reflect.getMetadata(MetaData.META, Type.prototype))
          console.log('Params:  ')
          Reflect.getMetadata(MetaData.PARAMS, Type.prototype)
            .forEach(function(param: ParamData) {
            console.log(`   ${param.meta.fragmentDependant ? '#' : ''}${param.name}${param.meta.optional ? '' : '*'}: ${param.type} ${param.meta.defaultValue ? '(default=' + param.meta.defaultValue + ')' : ''}`)
          })
          console.log(`Inputs:\n   ${Reflect.getMetadata(MetaData.INPUTS, Type.prototype).join(', ')}`)
          console.log(`Outputs:\n   ${Reflect.getMetadata(MetaData.OUTPUTS, Type.prototype).join(', ')}`)
          console.log('Outputs: ')
          console.log('Injects: ')
          Reflect.getMetadata('Injects', Type.prototype)
            .forEach(function(data: InjectData) {
            // check if service exists: Services[data.service]
            console.log(`   ${data.propertyKey}: ${Services[data.service]}`)
          })

          var schemaValidator = jsonValidator(metaJsonSchema, { verbose: true, greedy: true });
          Reflect.getMetadata(MetaData.INPUTS, Type.prototype)
            .forEach((name: string) => {
            if (Reflect.getMetadata(MetaData.MSG_SCHEMA, Type.prototype, name)) {
              var schema = Reflect.getMetadata(MetaData.MSG_SCHEMA, Type.prototype, name);
              if (schema) {
                var valid = schemaValidator(schema);
                if (valid) {
                  console.log(`input ${name} valid schema?: ${valid}`);
                } else {
                  console.log(`input ${name} valid schema?: ${valid}`);
                  console.log(schemaValidator.errors);
                }
              }
            }
          });
          var model = '{}'
          done(null, model)
        } catch (err) {
          done(err)
        }
      }
    })
  }
}

declare interface Callback {
  (err: Error, model?: string): void
}
