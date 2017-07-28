'use strict';

(function (exports) {
  function tag(name, version) {
    return name + '@' + version;
  }

  if (!exports.KevoreeModuleLoader) {
    exports.KevoreeModuleLoader = {
      modules: {},
      register: function (name, version, module) {
        this.modules[tag(name, version)] = module;
      },
      require: function (name, version) {
        const module = this.modules[tag(name, version)];
        if (module) {
          return module;
        }
        throw new Error('KevoreeModule "' + tag(name, version) + '" not found');
      },
      remove: function (name, version) {
        delete this.modules[tag(name, version)];
      }
    };
  }
})(window);
