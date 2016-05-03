import { OutputPort, ReflectUtils } from 'kevoree-api';

export class InstanceUtils {
  static injectOutputs(instance: any, nodeName: string, compName: string) {
    ReflectUtils.getOutputs(instance).forEach(name => {
      const port: OutputPort = {
        path: `${nodeName}:${compName}->${name}`,
        send: (msg: string) => { /* stub */ }
      };
      instance[name] = port;
    });
  }
}
