import { LifecycleMeta } from '../annotations/metas/LifecycleMeta';

export function lifecycleMethod(async: boolean, name: string, meta: string) {
    return function (target: any, funcName: string) {
        if (Reflect.hasMetadata(meta, target)) {
            throw new Error(`Only one method must be annotated with @${name}`);
        }

        var params: any[] = Reflect.getMetadata('design:paramtypes', target, funcName);
        if (async) {
            if (params.length === 1 && params[0] === Function) {
                var data: LifecycleMeta = { name: funcName, async: true };
                Reflect.defineMetadata(meta, data, target);
            } else {
                throw new Error(`Asynchronous @${name} expects a callback parameter in the method signature (eg. ${target.constructor.name}.${funcName}(done: Callback))`);
            }
        } else {
            if (params.length === 0) {
                var data: LifecycleMeta = { name: funcName, async: false };
                Reflect.defineMetadata(meta, data, target);
            } else {
                throw new Error(`Synchronous @${name} method signature should not define parameters (eg. ${target.constructor.name}.${funcName}())`);
            }
        }
    };
}
