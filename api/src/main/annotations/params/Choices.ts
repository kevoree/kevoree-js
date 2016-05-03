import 'reflect-metadata';
import { MetaData } from '../../api/MetaData';

export type ChoicesType = { [key:string]: any };

export function Choices(choices: ChoicesType | Array<any>) {
  return (target: any, propertyKey: string) => {
    if (choices instanceof Array) {
      Reflect.defineMetadata(MetaData.CHOICES, choices, target, propertyKey);
    } else {
      Reflect.defineMetadata(
        MetaData.CHOICES,
        Object.keys(choices)
          .filter(key => isNaN(parseInt(key, 10)))
          .map(key => key),
        target,
        propertyKey
      );
    }
  };
}
