export default class InstanceService {

  constructor() {
    this.instances = {};
  }

  register(key, instance) {
    this.instances[key] = instance;
  }

  has(key) {
    return Boolean(this.instances[key]);
  }

  require(key) {
    const instance = this.instances[key];
    if (instance) {
      return instance;
    }
    throw new Error(`KevoreeInstance "${key}" not found`);
  }

  remove(key) {
    delete this.instances[key];
  }

  getInstances() {
    return this.instances;
  }
}