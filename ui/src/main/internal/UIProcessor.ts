import 'reflect-metadata';
import * as React from 'react';
import { MetaData } from '../annotations/MetaData';
import { Observer } from '../api/Observer';

export class UIProcessor {
  static render(instance: any): React.ReactElement<any> {
    const Type: React.ComponentClass<any> = Reflect.getMetadata(MetaData.TYPE, instance);
    const propsMetas: string[] = Reflect.getMetadata(MetaData.PROPS, instance) || [];

    const props = {};
    propsMetas.forEach(fieldName => {
      const propName = Reflect.getMetadata(MetaData.PROP, instance, fieldName);
      if (instance[fieldName] === null || typeof instance[fieldName] === 'undefined') {
        props[propName] = instance[fieldName] = new Observer<any>();
      } else {
        props[propName] = instance[fieldName];
      }
    });

    return React.createElement(Type, props);
  }
}
