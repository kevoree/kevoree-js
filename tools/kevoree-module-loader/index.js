function KevoreeModuleLoader() {
  this.modules = {};
}

KevoreeModuleLoader.prototype = {
  register(name, version, module) {
    this.modules[createKey(name, version)] = module;
  },

  has(name, version) {
    return Boolean(this.modules[createKey(name, version)]);
  },

  require(name, version) {
    const key = createKey(name, version);
    const module = this.modules[key];
    if (module) {
      return module;
    }
    throw new Error(`KevoreeModule "${key}" not found`);
  },

  remove(name, version) {
    delete this.modules[createKey(name, version)];
  },
};

function createKey(name, version) {
  return `${name}@${version}`;
}

if (!global.KevoreeModuleLoader) {
  global.KevoreeModuleLoader = new KevoreeModuleLoader();
}
module.exports = global.KevoreeModuleLoader;
