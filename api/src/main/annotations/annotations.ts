require('reflect-metadata')

import { Services } from './Services'
import { Types } from './Types'

function typeDefinition(target: any, meta: TypeMeta) {
  Reflect.defineMetadata('Name', target.name, target.prototype)
  Reflect.defineMetadata('Meta', meta || {}, target.prototype)
  if (!Reflect.hasMetadata('Params', target.prototype)) {
    Reflect.defineMetadata('Params', [], target.prototype)
  }
  if (!Reflect.hasMetadata('Injects', target.prototype)) {
    Reflect.defineMetadata('Injects', [], target.prototype)
  }
  if (!Reflect.hasMetadata('Inputs', target.prototype)) {
    Reflect.defineMetadata('Inputs', [], target.prototype)
  }
  if (!Reflect.hasMetadata('Outputs', target.prototype)) {
    Reflect.defineMetadata('Outputs', [], target.prototype)
  }
}

export function Channel(meta?: TypeMeta) {
  return function (target: any) {
    Reflect.defineMetadata('Type', Types.Channel, target.prototype)
    typeDefinition(target, meta)
  }
}

export function Component(meta?: TypeMeta) {
  return function (target: any) {
    Reflect.defineMetadata('Type', Types.Component, target.prototype)
    typeDefinition(target, meta)
  }
}

export function Group(meta?: TypeMeta) {
  return function (target: any) {
    Reflect.defineMetadata('Type', Types.Group, target.prototype)
    typeDefinition(target, meta)
  }
}

export function Node(meta?: TypeMeta) {
  return function (target: any) {
    Reflect.defineMetadata('Type', Types.Node, target.prototype)
    typeDefinition(target, meta)
  }
}

export function Inject(service: Services) {
  return function (target: any, propertyKey: string) {
    var injects: Array<InjectData> = Reflect.getMetadata('Injects', target)
    if (!injects) {
      injects = new Array<InjectData>()
      Reflect.defineMetadata('Injects', injects, target)
    }
    injects.push({
      propertyKey: propertyKey,
      service:     service
    })
  }
}

export function Input(schema?: JSONSchema) {
  return function (target: any, propertyKey: string) {
    var inputs: Array<string> = Reflect.getMetadata('Inputs', target)
    if (!inputs) {
      inputs = new Array<string>()
      Reflect.defineMetadata('Inputs', inputs, target)
    }
    inputs.push(propertyKey)
  }
}

export function Output(schema?: JSONSchema) {
  return function (target: any, propertyKey: string) {
    var outputs: Array<string> = Reflect.getMetadata('Outputs', target)
    if (!outputs) {
      outputs = new Array<string>()
      Reflect.defineMetadata('Outputs', outputs, target)
    }
    outputs.push(propertyKey)
  }
}

export function Param(meta?: ParamMeta) {
  return function(target: any, propertyKey: string) {
    var params: Array<ParamData> = Reflect.getMetadata('Params', target)
    if (!params) {
      params = new Array<ParamData>()
      Reflect.defineMetadata('Params', params, target)
    }

    meta = meta || {}
    if (typeof meta.optional === 'undefined') {
      meta.optional = true
    }
    if (typeof meta.fragmentDependant === 'undefined') {
      meta.fragmentDependant = false
    }

    params.push({
      name: propertyKey,
      type: Reflect.getMetadata('design:type', target, propertyKey).name,
      meta: meta
    })
  }
}

export interface ParamMeta {
  optional?: boolean
  fragmentDependant?: boolean
  defaultValue?: number | string
}

export interface ParamData {
  name: string
  type: string
  meta: ParamMeta
}

export interface TypeMeta {
  desc?: string
}

export interface InjectData {
  propertyKey: string
  service: Services
}

export enum SchemaType {
  STRING, NUMBER, ARRAY, OBJECT
}

export interface JSONSchema {
  title?: string
  type: SchemaType,
  properties?: {
    [key: string]: JSONSchema
  }
  required?: Array<string>
}
