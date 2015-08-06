/// <reference path="../../node_modules/reflect-metadata/reflect-metadata.d.ts"/>
require('reflect-metadata')

import { resolve } from 'path'
import { readFile } from 'fs'
import { Types, Services, ParamData, InjectData } from 'kevoree-api'

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
              console.log(`   ${param.meta.fragmentDependant ? '#':''}${param.name}${param.meta.optional ? '':'*'}: ${param.type} ${param.meta.defaultValue ? '(default='+param.meta.defaultValue+')':''}`)
            })
          console.log(`Inputs:\n   ${Reflect.getMetadata('Inputs', Type.prototype).join(', ')}`)
          console.log(`Outputs:\n   ${Reflect.getMetadata('Outputs', Type.prototype).join(', ')}`)
          console.log('Outputs: ')
          console.log('Injects: ')
          Reflect.getMetadata('Injects', Type.prototype)
            .forEach(function (data: InjectData) {
              // check if service exists: Services[data.service]
              console.log(`   ${data.propertyKey}: ${Services[data.service]}`)
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
