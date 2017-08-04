

module.exports = {
  getFQN: function (tdef) {
    return this.getNamespace(tdef.eContainer()) + '.' + tdef.name + '/' + tdef.version;
  },

  getNamespace: function (pkg) {
    let namespace = '';

    function walk(p) {
      if (p.eContainer()) {
        if (namespace.length > 0) {
          namespace = p.name + '.' + namespace;
        } else {
          namespace = p.name;
        }
        walk(p.eContainer());
      }
    }

    walk(pkg);

    return namespace;
  }
};
