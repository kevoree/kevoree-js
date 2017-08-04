const PREFIX = 'in_';

function Input(compInstance, portElem, isRemote) {
  this.path = portElem.path();
  this.compInstance = compInstance;
  this.portElem = portElem;
  this.methodName = PREFIX + this.portElem.name;
  this.pendings = [];
  this.isRemote = Boolean(isRemote);

  if (!isRemote && typeof this.compInstance[this.methodName] === 'undefined') {
    throw new Error('Unable to find input port method \'' + this.methodName + '\' in component \'' + compInstance.name + '\'');
  }
}

Input.prototype = {
  call(msg, callback) {
    if (!this.isRemote) {
      // convert msg to an array if it isn't already one
      msg = [].concat(msg);

      if (this.compInstance.started) {
        this.compInstance.log.debug(this.portElem.name + ' -> ' + msg);
        let result, error;
        try {
          result = this.compInstance[this.methodName].apply(this.compInstance, msg);
        } catch (err) {
          error = err;
          error.message = 'Input port ' + this.portElem.path() + ' method threw an exception';
        }
        callback(error, result);
      } else {
        this.compInstance.log.debug(this.portElem.name + ' -> ' + msg + ' (queued)');
        this.pendings.push({
          content: msg,
          callback: callback
        });
      }
    }
  },

  processPendings() {
    if (!this.isRemote) {
      this.pendings.forEach((msg) => {
        this.call(msg.content, msg.callback);
      });
      this.pendings.length = 0;
    }
  }
};

module.exports = Input;
module.exports.PREFIX = PREFIX;
