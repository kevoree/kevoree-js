import { lifecycleMethod } from './lifecycleMethod';
import { MetaData } from '../../api/MetaData';

export function OnMessage() {
  return (target: any, funcName: string) => {
    if (Reflect.hasMetadata(MetaData.ON_MESSAGE, target)) {
      throw new Error(`Only one method must be annotated with @OnMessage`);
    }
    var params: any[] = Reflect.getMetadata('design:paramtypes', target, funcName);
    if (params.length === 1 && params[0] === String) {
  		Reflect.defineMetadata(MetaData.ON_MESSAGE, { name: funcName } , target);
    } else {
  		throw new Error(`@OnMessage() ${funcName}(...) signature should be ${funcName}(msg: string)`);
  	}
  };
}
