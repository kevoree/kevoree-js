/**
 * @param namespace {String}
 * @param name {String}
 * @param version {Object} with { tdef: String, du: String }
 */
function FQN(namespace, name, version) {
	this.namespace = namespace;
	this.name = name;
	this.version = Object.assign({ tdef: 'LATEST', du : 'RELEASE' }, version);
}

FQN.prototype = {
  toString() {
    if (typeof this.version.du === 'object') {
      return this.namespace + '.' + this.name + '/' + this.version.tdef + '/' + JSON.stringify(this.version.du);
    } else {
      return this.namespace + '.' + this.name + '/' + this.version.tdef + '/' + this.version.du;
    }
  },

  toKevoreePath() {
    if (this.version.tdef === 'LATEST') {
      return '/packages[' + this.namespace + ']/typeDefinitions[name=' + this.name + ']';
    } else {
      return '/packages[' + this.namespace + ']/typeDefinitions[name=' + this.name + ',version=' + this.version.tdef + ']';
    }
  },

  clone() {
    const fqn = new FQN(this.namespace, this.name, {});
    fqn.version.tdef = this.version.tdef;
    fqn.version.du = this.version.du;
    return fqn;
  }
};

module.exports = FQN;
