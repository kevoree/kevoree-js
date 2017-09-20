const kGroupMock = require('./kGroupMock');

function InstanceMock(nodeName, name) {
  this.nodeName = nodeName;
  this.name = name;
  this.currentModel = null;
  this.kInstance = kGroupMock;
  this.dictionary = {
    getString(name) {
      switch (name) {
        case 'masterNet':
          return 'lo.ipv4';
        case 'onDisconnect':
          return '// nothing';
        default:
          return undefined;
      }
    }
  };
  this.dic_onDisconnect = {};
  this.dic_onDisconnect.defaultValue = 'lo.ipv4';
}

InstanceMock.prototype = {
  getName() {
    return this.name;
  },

  getNodeName() {
    return this.nodeName;
  },

  getKevoreeCore() {
    const self = this;
    return {
      getCurrentModel() {
        return self.currentModel;
      },
      deploy: () => Promise.resolve(),
      on: () => {},
      off: () => {},
      submitScript: () => {}
    };
  },

  getModelEntity() {
    return this.kInstance;
  },

  getDictionary() {
    return this.dictionary;
  }
};

module.exports = InstanceMock;
