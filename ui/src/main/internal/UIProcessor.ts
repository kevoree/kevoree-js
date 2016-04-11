import 'reflect-metadata';
import * as React from 'react';
import { MetaData } from '../annotations/MetaData';

export class UIProcessor {
  static render(instance: any): React.ReactElement<any> {
    const Type: React.ComponentClass<any> = Reflect.getMetadata(MetaData.TYPE, instance);
    const props = {};
    (Reflect.getMetadata(MetaData.PROPS, instance) as string[]).forEach(name => {
      const prop = Reflect.getMetadata(MetaData.PROP, instance, name);
      props[name] = instance[name];
    });
    return React.createElement(Type, props);
  }
}
