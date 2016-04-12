import 'reflect-metadata';
import * as React from 'react';
import { MetaData } from './MetaData';

/**
 * @param {React.ComponentClass<any>} type the component user-interface React
 *                                         definition
 */
export function ComponentUI(type: React.ComponentClass<any>) {
  return function (target: any) {
    if (!type) {
      throw new Error(`Given @ComponentUI() type cannot be null or undefined`);
    }
    Reflect.defineMetadata(MetaData.TYPE, type, target.prototype);
  };
}
