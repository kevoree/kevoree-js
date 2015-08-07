require('reflect-metadata')

import { Services } from './Services'
import { Types } from './Types'

function typeDefinition(target: any, meta: TypeMeta) {
  Reflect.defineMetadata(MetaData.NAME, target.name, target.prototype)
  Reflect.defineMetadata(MetaData.META, meta || {}, target.prototype)
  if (!Reflect.hasMetadata(MetaData.PARAMS, target.prototype)) {
    Reflect.defineMetadata(MetaData.PARAMS, [], target.prototype)
  }
  if (!Reflect.hasMetadata('Injects', target.prototype)) {
    Reflect.defineMetadata('Injects', [], target.prototype)
  }
  if (!Reflect.hasMetadata(MetaData.INPUTS, target.prototype)) {
    Reflect.defineMetadata(MetaData.INPUTS, [], target.prototype)
  }
  if (!Reflect.hasMetadata(MetaData.OUTPUTS, target.prototype)) {
    Reflect.defineMetadata(MetaData.OUTPUTS, [], target.prototype)
  }
}

export function Channel(meta?: TypeMeta) {
  return function (target: any) {
    Reflect.defineMetadata(MetaData.TYPE, Types.Channel, target.prototype)
    typeDefinition(target, meta)
  }
}

export function Component(meta?: TypeMeta) {
  return function (target: any) {
    Reflect.defineMetadata(MetaData.TYPE, Types.Component, target.prototype)
    typeDefinition(target, meta)
  }
}

export function Group(meta?: TypeMeta) {
  return function (target: any) {
    Reflect.defineMetadata(MetaData.TYPE, Types.Group, target.prototype)
    typeDefinition(target, meta)
  }
}

export function Node(meta?: TypeMeta) {
  return function (target: any) {
    Reflect.defineMetadata(MetaData.TYPE, Types.Node, target.prototype)
    typeDefinition(target, meta)
  }
}

export function Inject(service: Services) {
  return function (target: any, propertyKey: string) {
    var injects: Array<InjectData> = Reflect.getMetadata('kevoree:injects', target)
    if (!injects) {
      injects = new Array<InjectData>()
      Reflect.defineMetadata('kevoree:injects', injects, target)
    }
    injects.push({
      propertyKey: propertyKey,
      service:     service
    })
  }
}

export function Input(schema?: JSONSchema) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata(MetaData.MSG_SCHEMA, schema, target, propertyKey);
    var inputs: Array<string> = Reflect.getMetadata(MetaData.INPUTS, target)
    if (!inputs) {
      inputs = new Array<string>()
      Reflect.defineMetadata(MetaData.INPUTS, inputs, target)
    }
    inputs.push(propertyKey)
  }
}

export function Output(schema?: JSONSchema) {
  return function (target: any, propertyKey: string) {
    var outputs: Array<string> = Reflect.getMetadata(MetaData.OUTPUTS, target)
    if (!outputs) {
      outputs = new Array<string>()
      Reflect.defineMetadata(MetaData.OUTPUTS, outputs, target)
    }
    outputs.push(propertyKey)
  }
}

export function Param(meta?: ParamMeta) {
  return function(target: any, propertyKey: string) {
    var params: Array<ParamData> = Reflect.getMetadata(MetaData.PARAMS, target)
    if (!params) {
      params = new Array<ParamData>()
      Reflect.defineMetadata(MetaData.PARAMS, params, target)
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

export enum MetaData {
  TYPE, META, NAME, PARAMS, INPUTS, OUTPUTS, MSG_SCHEMA
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
  STRING, INT, FLOAT, DOUBLE, ARRAY, OBJECT
}

export interface JSONSchema {
  title?: string
  type: SchemaType,
  properties?: {
    [key: string]: JSONSchema
  }
  required?: Array<string>
}
