const PREFIX = 'out_';

function Output(compInstance, portElem) {
  this.path = portElem.path();
  this.channels = {};

  const fieldName = PREFIX + portElem.name;

  if (typeof compInstance[fieldName] === 'undefined') {
    throw new Error('Unable to find output port field \'' + fieldName + '\' in component \'' + compInstance.name + '\'');
  } else {
    compInstance[fieldName] = (msg, callback) => {
      const channelPaths = Object.keys(this.channels);
      if (channelPaths.length > 0) {
        compInstance.log.debug(portElem.name + ' -> ' + msg);
      } else {
        compInstance.log.debug(portElem.name + ' -> ' + msg + ' (dropped)');
      }
      channelPaths.forEach((chanPath) => {
        this.channels[chanPath].internalSend(portElem.path(), msg, callback);
      });
    };
  }
}

Output.prototype = {
  addChannel(chanInstance) {
    this.channels[chanInstance.path] = chanInstance;
  },

  removeChannel(chanInstance) {
    delete this.channels[chanInstance.path];
  }
};

module.exports = Output;
module.exports.PREFIX = PREFIX;
