require('reflect-metadata');
import { Inject } from 'ts-injector';
import { Component } from '../annotations/types/Component';
import { TypeMeta } from '../annotations/metas/TypeMeta';
import { Input } from '../annotations/ports/Input';

export function componentDecorator(target: Function, metas: TypeMeta) {
  Reflect.decorate([Component(metas)], target);
}

export function inputDecorator(target: Function, name: string, schema: Object) {
  Reflect.decorate([
    Input(schema),
    Reflect.metadata('design:type', Function),
    Reflect.metadata('design:paramtypes', [String]),
    Reflect.metadata('design:returntype', null)
  ], target.prototype, name);
}

export function injectDecorator(target: Function, name: string, service: { name: string }) {
  Reflect.decorate([
    Inject(service),
    Reflect.metadata('design:type', Object)
  ], target.prototype, name, void 0);
}

export function createComponent(): FunctionConstructor {
  
  return null;
}
