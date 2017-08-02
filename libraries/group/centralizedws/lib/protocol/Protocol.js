const PullMessage = require('./PullMessage');
const PushMessage = require('./PushMessage');
const PushKevSMessage = require('./PushKevSMessage');
const RegisterMessage = require('./RegisterMessage');
const RegisteredMessage = require('./RegisteredMessage');

/**
 * Parses message to a valid PushMessage or PullMessage type
 * @param msg
 * @returns {PushMessage|PullMessage|RegisterMessage|RegisteredMessage}
 */
function parse(msg) {
  let model;
  if (typeof msg === 'object') {
    // data is a MessageEvent not a raw string
    msg = msg.data;
  }

  if (msg.startsWith(PullMessage.TYPE)) {
    // pull
    return new PullMessage();
  }

  if (msg.startsWith(RegisteredMessage.TYPE)) {
    // registered ack
    return new RegisteredMessage();
  }

  if (msg.startsWith(PushMessage.TYPE + '/')) {
    // push/modelStr
    model = msg.substring(PushMessage.TYPE.length + 1);
    return new PushMessage(model);
  }

  if (msg.startsWith(PushKevSMessage.TYPE + '/')) {
    // push/kevsStr
    model = msg.substring(PushKevSMessage.TYPE.length + 1);
    return new PushKevSMessage(model);
  }

  if (msg.startsWith(RegisterMessage.TYPE)) {
    // register/nodeName/modelStr
    const payload = msg.substring(RegisterMessage.TYPE.length + 1);
    let index = 0;
    let ch = payload.charAt(index);
    while (index < payload.length && ch !== '/') {
      index++;
      ch = payload[index];
    }
    const nodeName = payload.substring(0, index);
    return new RegisterMessage(nodeName, payload.substring(index + 1));
  }

  return null;
}

module.exports = {
  parse: parse
};
