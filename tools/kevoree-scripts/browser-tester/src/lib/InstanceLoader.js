class KevoreeInstanceLoader {

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

window['KevoreeInstanceLoader'] = window['KevoreeInstanceLoader'] || new KevoreeInstanceLoader();

export default window['KevoreeInstanceLoader'];
