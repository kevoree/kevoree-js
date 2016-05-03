import { OutputPort, ReflectUtils } from 'kevoree-api';

export class InstanceUtils {
  static injectOutputs(instance: any, nodeName: string, compName: string, handler: (portName: string, msg: string) => void): { [key:string]: string[] } {
    const initialOutputs: { [key:string]: string[] } = {};
    ReflectUtils.getOutputs(instance).forEach(name => {
      const port: OutputPort = {
        path: `${nodeName}:${compName}->${name}`,
        send: (msg: string) => {
          handler(name, msg);
        }
      };
      instance[name] = port;
      initialOutputs[name] = [];
    });
    return initialOutputs;
  }
}
