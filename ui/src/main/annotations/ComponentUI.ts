import 'reflect-metadata';
import * as React from 'react';
import { MetaData } from './MetaData';

export function ComponentUI(type: React.ComponentClass<any>) {
  return function (target: any) {
    Reflect.defineMetadata(MetaData.TYPE, type, target.prototype);
  };
}
