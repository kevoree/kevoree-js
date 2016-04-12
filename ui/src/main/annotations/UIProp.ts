import 'reflect-metadata';
import * as React from 'react';
import { MetaData } from './MetaData';

/**
 * Define a property to be passed to the React component creation
 * eg:
 * ```typescript
 *   @UIProp()
 *   private seedCount: number = 0;
 * ```
 * This will result in the component to be created with:
 * ```typescript
 *   React.createElement(UIType, { seedCount: 0 });
 * ```
 * You can override the name of the field using the annotation propName:
 * ```typescript
 *   @UIProp('otherName')
 *   private seedCount: number = 0;
 *   // result in: React.createElement(UIType, { otherName: 0 });
 * ```
 *
 * @param {string} propName override prop name
 */
export function UIProp(propName?: string) {
  return function(target: any, fieldName: string) {
    var fields = Reflect.getMetadata(MetaData.PROPS, target);
    if (!fields) {
      fields = [];
      Reflect.defineMetadata(MetaData.PROPS, fields, target);
    }
    fields.push(fieldName);
    Reflect.defineMetadata(MetaData.PROP, propName || fieldName, target, fieldName);
  };
}
