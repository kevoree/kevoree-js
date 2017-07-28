'use strict';

// Created by leiko on 02/10/14 15:29
var PullMessage = require('./message/PullMessage');
var PushMessage = require('./message/PushMessage');
var PushKevSMessage = require('./message/PushKevSMessage');
var RegisterMessage = require('./message/RegisterMessage');

// Protocol
var REGISTER = 'register';
var REGISTER_TYPE = 0;
var PULL = 'pull';
var PULL_TYPE = 1;
var PUSH = 'push';
var PUSH_TYPE = 2;
var KEVS = 'kevs';
var KEVS_TYPE = 3;
var SEP = '/';

/**
 * Checks whether or not 'src' string starts with 'target' string
 * @param {String}      src     source string to look into
 * @param {String}      target  string to find at the beginning
 * @returns {boolean}   true    if 'src' has 'target' at his beginning
 */
function startsWith(src, target) {
  if (target && target.length > 0) {
    return (src.substr(0, target.length) === target);
  } else {
    return false;
  }
}

/**
 * Parses message to a valid PushMessage or PullMessage type
 * @param msg
 * @returns {PushMessage|PullMessage|RegisterMessage}
 */
function parse(msg) {
	var pMsg;
  if (typeof msg === 'object') {
    // data is a MessageEvent not a raw string
    pMsg = msg.data;
  } else {
		pMsg = msg;
	}

  var model;
  if (startsWith(pMsg, REGISTER)) {
    var payload = pMsg.substring(REGISTER.length + SEP.length);
    var i = 0;
    var ch = payload.charAt(i);
    var buffer = '';
    while (i < payload.length && ch !== '/') {
      i++;
      buffer += ch;
      ch = payload.charAt(i);
    }

    if (ch !== '/') {
      buffer += ch;
    } else {
      i++;
    }
    model = null;
    if (i < payload.length) {
      model = payload.substring(i, payload.length);
    }
    return new RegisterMessage(buffer, model);
  }

  if (startsWith(pMsg, PUSH + SEP)) {
    model = pMsg.substring(PUSH.length + SEP.length);
    return new PushMessage(model);
  }

  if (startsWith(pMsg, KEVS + SEP)) {
    model = pMsg.substring(KEVS.length + SEP.length);
    return new PushKevSMessage(model);
  }

  if (startsWith(pMsg, PULL)) {
    return new PullMessage();
  }

  /* retro compat */
  if (startsWith(pMsg, 'get')) {
    return new PullMessage();
  }

  return null;
}

module.exports.REGISTER = REGISTER;
module.exports.REGISTER_TYPE = REGISTER_TYPE;
module.exports.PULL = PULL;
module.exports.PULL_TYPE = PULL_TYPE;
module.exports.PUSH = PUSH;
module.exports.PUSH_TYPE = PUSH_TYPE;
module.exports.KEVS = KEVS;
module.exports.KEVS_TYPE = KEVS_TYPE;
module.exports.SEP = SEP;
module.exports.parse = parse;
