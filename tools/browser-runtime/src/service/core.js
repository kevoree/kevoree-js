import KevoreeCore from 'kevoree-core';

export default class CoreService extends KevoreeCore {

  constructor(resolver, kevs, logger, instances) {
    super(resolver, kevs, logger);
    this.instances = instances;
  }

  getInstances() {
    if (this.nodeInstance) {
      const map = this.nodeInstance.adaptationEngine.modelObjMapper.map;
      return Object.keys(map)
        .map((name) => map[name])
        .filter((elem) => typeof elem === 'object')
        .filter((instance) => instance.path.startsWith(`/nodes[${this.nodeInstance.name}]/components[`))
        .map((instance) => {
          this.instances.register(instance.path, instance);
          return instance;
        });
    } else {
      return [];
    }
  }
}
