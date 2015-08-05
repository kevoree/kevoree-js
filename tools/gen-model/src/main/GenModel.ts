/// <reference path="../../node_modules/reflect-metadata/reflect-metadata.d.ts"/>
require('reflect-metadata')

import { resolve } from 'path'
import { readFile } from 'fs'
import { Types, ParamData, InjectData } from 'kevoree-api'

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
          console.log('Type:    ', Types[Reflect.getMetadata('Type', Type.prototype)])
          console.log('Name:    ', Reflect.getMetadata('Name', Type.prototype))
          console.log('Meta:    ', Reflect.getMetadata('Meta', Type.prototype))
          console.log('Params:  ')
          Reflect.getMetadata('Params', Type.prototype)
            .forEach(function (param: ParamData) {
              console.log(`   ${param.fragmentDependant ? '#':''}${param.name}${param.optional ? '':'*'}: ${param.type} ${param.defaultValue ? '(default='+param.defaultValue+')':''}`)
            })
          console.log('Inputs:  ')
          Reflect.getMetadata('Inputs', Type.prototype)
            .forEach(function (param: string) {
              console.log(`   ${param}`)
            })
          console.log('Outputs: ')
          Reflect.getMetadata('Outputs', Type.prototype)
            .forEach(function (param: string) {
              console.log(`   ${param}`)
            })
          console.log('Injects: ')
          Reflect.getMetadata('Injects', Type.prototype)
            .forEach(function (data: InjectData) {
              console.log(`   ${data.propertyKey}: ${Types[data.service]}`)
            })
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
