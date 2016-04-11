import 'reflect-metadata';
import * as React from 'react';
import { MetaData } from './MetaData';

export function UIProp(target: any, propName: string) {
  var props = Reflect.getMetadata(MetaData.PROPS, target);
  if (!props) {
    props = [];
    Reflect.defineMetadata(MetaData.PROPS, props, target);
  }
  props.push(propName);
  Reflect.defineMetadata(MetaData.PROP, propName, target, propName);
}
