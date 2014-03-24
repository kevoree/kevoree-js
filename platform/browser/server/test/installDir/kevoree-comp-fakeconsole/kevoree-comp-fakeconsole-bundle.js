require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        throw TypeError('Uncaught, unspecified "error" event.');
      }
      return false;
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      console.trace();
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],3:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

},{}],4:[function(require,module,exports){
(function (exports) {
	
/*!
 * Jade - runtime
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Lame Array.isArray() polyfill for now.
 */

if (!Array.isArray) {
  Array.isArray = function(arr){
    return '[object Array]' == Object.prototype.toString.call(arr);
  };
}

/**
 * Lame Object.keys() polyfill for now.
 */

if (!Object.keys) {
  Object.keys = function(obj){
    var arr = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(key);
      }
    }
    return arr;
  }
}

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    ac = ac.filter(nulls);
    bc = bc.filter(nulls);
    a['class'] = ac.concat(bc).join(' ');
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function nulls(val) {
  return val != null;
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 * @api private
 */

exports.attrs = function attrs(obj, escaped){
  var buf = []
    , terse = obj.terse;

  delete obj.terse;
  var keys = Object.keys(obj)
    , len = keys.length;

  if (len) {
    buf.push('');
    for (var i = 0; i < len; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('boolean' == typeof val || null == val) {
        if (val) {
          terse
            ? buf.push(key)
            : buf.push(key + '="' + key + '"');
        }
      } else if (0 == key.indexOf('data') && 'string' != typeof val) {
        buf.push(key + "='" + JSON.stringify(val) + "'");
      } else if ('class' == key && Array.isArray(val)) {
        buf.push(key + '="' + exports.escape(val.join(' ')) + '"');
      } else if (escaped && escaped[key]) {
        buf.push(key + '="' + exports.escape(val) + '"');
      } else {
        buf.push(key + '="' + val + '"');
      }
    }
  }

  return buf.join(' ');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  return String(html)
    .replace(/&(?!(\w+|\#\d+);)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno){
  if (!filename) throw err;

  var context = 3
    , str = require('fs').readFileSync(filename, 'utf8')
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

})(module.exports);
},{"fs":1}],5:[function(require,module,exports){
var jade = require('./runtime');

(function (jade) {
	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row"><div class="col-md-11"><input id="msg" type="text" class="form-control"/></div><div class="col-md-1"><button id="send" class="btn btn-info">' + escape((interp = btn) == null ? '' : interp) + '</button></div></div><div class="row"><dl id="msg-list" class="dl-horizontal col-md-12"></dl></div>');
}
return buf.join("");
};
})(jade);
},{"./runtime":4}],"OwW0W7":[function(require,module,exports){
module.exports = require('./lib/FakeConsole');

},{"./lib/FakeConsole":8}],"kevoree-comp-fakeconsole":[function(require,module,exports){
module.exports=require('OwW0W7');
},{}],8:[function(require,module,exports){
var AbstractComponent = require('kevoree-entities').AbstractComponent,
    view = require('./../generated-ui/view');


var FakeConsole = AbstractComponent.extend({
    toString: 'FakeConsole',

    dic_proxy: {
        optional: true,
        defaultValue: false
    },

    start: function (_super) {
        _super.call(this);

        this.setUIContent(view({btn: 'Send msg!'}), function (err, root) {
            if (err) {
                // no KevoreeUI provided by runtime (NodeJS platform obviously)
                this.log.info(this.toString(), 'FakeConsole setUIContent in NodeJS runtime!');

            } else {
                // view set successfully
                var msgInput = root.querySelector('#msg'),
                    sendBtn  = root.querySelector('#send');
                var sendMsg = function() {
                    if (msgInput.value.length > 0) {
                        // update message list
                        this.addMessageUI('<', msgInput.value);
                        // send it through output port 'sendMsg'
                        this.out_sendMsg(msgInput.value);
                    }
                }.bind(this);

                // send message on click event if value.length > 0
                sendBtn.onclick = sendMsg;

                // send message on 'enter' key keyup event if value.length > 0
                msgInput.onkeyup = function (e) {
                    if (e && e.keyCode && e.keyCode == 13) {
                        // 'enter' key pressed
                        sendMsg();
                    }
                };
            }
        });
    },

    stop: function (_super) {
        _super.call(this);
    },

    in_inMsg: function (msg) {
        var proxy = this.dictionary.getValue('proxy');
        if (typeof proxy !== 'undefined' && proxy) this.out_sendMsg(msg);

        this.addMessageUI('>', msg);
    },

    out_sendMsg: function (msg) {},

    addMessageUI: function(tag, msg) {
        var root = this.getUIRoot();
        if (root == null) {
            // TODO handle no UI version
            this.log.debug(this.toString(), tag+' '+msg);
        } else {
            var msgList = root.querySelector('#msg-list');
            msgList.innerHTML += '<dt>'+(new Date().toTimeString().split(' ')[0])+' '+tag+'</dt><dd>'+msg+'</dd>';
        }
    }
});

module.exports = FakeConsole;
},{"./../generated-ui/view":5,"kevoree-entities":16}],9:[function(require,module,exports){
module.exports.Resolver      = require('./lib/Resolver');
module.exports.Bootstrapper  = require('./lib/Bootstrapper');
module.exports.KevoreeLogger = require('./lib/KevoreeLogger');
module.exports.FileSystem    = require('./lib/FileSystem');
},{"./lib/Bootstrapper":10,"./lib/FileSystem":11,"./lib/KevoreeLogger":12,"./lib/Resolver":13}],10:[function(require,module,exports){
var Class = require('pseudoclass');

/**
 * Bootstrapper API
 * @type {Bootstrapper}
 */
var Bootstrapper = Class({
    toString: 'Bootstrapper',

    /**
     *
     * @param nodeName
     * @param model
     * @param callback
     */
    bootstrapNodeType: function (nodeName, model, callback) {
        callback = callback || function () {};

        var nodeInstance = model.findNodesByID(nodeName);
        if (nodeInstance != undefined && nodeInstance != null) {
            var deployUnit = nodeInstance.typeDefinition.deployUnit;
            if (deployUnit) {
                // bootstrap node deploy unit
                this.bootstrap(deployUnit, false, callback);

            } else {
                return callback(new Error("'"+nodeName+"' NodeType deploy units not found. Have you forgotten to merge nodetype library ?"));
            }
        } else {
            return callback(new Error("Unable to find '"+nodeName+"' in the given model."));
        }
    },

    /**
     *
     * @param deployUnit
     * @param forceInstall [optional] boolean to indicate whether or not we should force re-installation
     * @param callback(Error, Clazz, ContainerRoot)
     */
    bootstrap: function (deployUnit, forceInstall, callback) {},

    /**
     *
     * @param deployUnit
     * @param callback
     */
    uninstall: function (deployUnit, callback) {}
});

module.exports = Bootstrapper;
},{"pseudoclass":15}],11:[function(require,module,exports){
var Class         = require('pseudoclass');

var FileSystem = Class({
    toString: 'FileSystem',

    getFileSystem: function (size, callback) {
        if (document) {
            getBrowserFileSystem(this, size, callback);
        } else {
            console.error('Kevoree FileSystem API only handles Browser FS for now.');
        }
    }
});

var getBrowserFileSystem = function getBrowserFileSystem(fsapi, size, callback) {
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    navigator.persistentStorage = navigator.persistentStorage || navigator.webkitPersistentStorage;

    if (window.requestFileSystem && navigator.persistentStorage) {

        var successHandler = function successHandler(grantedSize) {
            window.requestFileSystem(window.PERSISTENT, grantedSize, function (fs) {
                callback.call(fsapi, null, fs);
            });
        }

        var errorHandler = function errorHandler(e) {
            callback.call(fsapi, null);
        }

        navigator.persistentStorage.requestQuota(size, successHandler, errorHandler);
    }
}

module.exports = FileSystem;
},{"pseudoclass":15}],12:[function(require,module,exports){
var Class  = require('pseudoclass'),
    colors = require('colors');

var KevoreeLogger = Class({
  toString: 'KevoreeLogger',

  construct: function (tag) {
    this.tag = tag;
  },

  info: function (tag, msg) {
    if (typeof(msg) == 'undefined') {
      msg = tag;
      tag = this.tag;
    }
    console.log(getTime()+'  '+'INFO'.grey+'   '+processTag(tag)+'  '+msg.grey);
  },

  warn: function (tag, msg) {
    if (typeof(msg) == 'undefined') {
      msg = tag;
      tag = this.tag;
    }
    console.warn(getTime()+'  '+'WARN'.grey.yellowBG+'   '+processTag(tag)+'  '+msg.yellow);
  },

  error: function (tag, msg) {
    if (typeof(msg) == 'undefined') {
      msg = tag;
      tag = this.tag;
    }
    console.error(getTime()+'  '+'ERROR'.white.redBG+'  '+processTag(tag)+'  '+msg.red);
  },

  debug: function (tag, msg) {
    if (typeof(msg) == 'undefined') {
      msg = tag;
      tag = this.tag;
    }
    console.log(getTime()+'  '+'DEBUG '.cyan+' '+processTag(tag)+'  '+msg.cyan);
  }
});

var processTag = function processTag(tag) {
  if (tag.length >= 15) {
    tag = tag.substr(0, 14)+'.';
  } else {
    var spaces = '';
    for (var i=0; i < 15 - tag.length; i++) spaces += ' ';
    tag += spaces;
  }

  return (tag+'').magenta;
}

var getTime = function getTime() {
  var time = new Date;
  var hours = (time.getHours().toString().length == 1) ? '0'+time.getHours() : time.getHours();
  var mins = (time.getMinutes().toString().length == 1) ? '0'+time.getMinutes() : time.getMinutes();
  var secs = (time.getSeconds().toString().length == 1) ? '0'+time.getSeconds() : time.getSeconds();
  return (hours+':'+mins+':'+secs).grey;
}

module.exports = KevoreeLogger;
},{"colors":14,"pseudoclass":15}],13:[function(require,module,exports){
var Class = require('pseudoclass'),
    KevoreeLogger = require('./KevoreeLogger');

/**
 * Resolver API
 * @type {Resolver}
 */
var Resolver = Class({
    toString: 'Resolver',

    construct: function (modulesPath, logger) {
        this.modulesPath = modulesPath || '';
        this.log = logger || new KevoreeLogger(this.toString());
        this.repositories = [];
    },

    /**
     *
     * @param deployUnit Kevoree DeployUnit
     * @param force [optional] boolean that indicates whether or not we should force re-installation no matter what
     * @param callback(err, Class, model)
     */
    resolve: function (deployUnit, force, callback) {},

    uninstall: function (deployUnit, force, callback) {},

    addRepository: function (url) {
        if (this.repositories.indexOf(url) === -1) this.repositories.push(url);
    }
});

module.exports = Resolver;
},{"./KevoreeLogger":12,"pseudoclass":15}],14:[function(require,module,exports){
/*
colors.js

Copyright (c) 2010

Marak Squires
Alexis Sellier (cloudhead)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var isHeadless = false;

if (typeof module !== 'undefined') {
  isHeadless = true;
}

if (!isHeadless) {
  var exports = {};
  var module = {};
  var colors = exports;
  exports.mode = "browser";
} else {
  exports.mode = "console";
}

//
// Prototypes the string object to have additional method calls that add terminal colors
//
var addProperty = function (color, func) {
  exports[color] = function (str) {
    return func.apply(str);
  };
  String.prototype.__defineGetter__(color, func);
};

function stylize(str, style) {

  var styles;

  if (exports.mode === 'console') {
    styles = {
      //styles
      'bold'      : ['\x1B[1m',  '\x1B[22m'],
      'italic'    : ['\x1B[3m',  '\x1B[23m'],
      'underline' : ['\x1B[4m',  '\x1B[24m'],
      'inverse'   : ['\x1B[7m',  '\x1B[27m'],
      'strikethrough' : ['\x1B[9m',  '\x1B[29m'],
      //text colors
      //grayscale
      'white'     : ['\x1B[37m', '\x1B[39m'],
      'grey'      : ['\x1B[90m', '\x1B[39m'],
      'black'     : ['\x1B[30m', '\x1B[39m'],
      //colors
      'blue'      : ['\x1B[34m', '\x1B[39m'],
      'cyan'      : ['\x1B[36m', '\x1B[39m'],
      'green'     : ['\x1B[32m', '\x1B[39m'],
      'magenta'   : ['\x1B[35m', '\x1B[39m'],
      'red'       : ['\x1B[31m', '\x1B[39m'],
      'yellow'    : ['\x1B[33m', '\x1B[39m'],
      //background colors
      //grayscale
      'whiteBG'     : ['\x1B[47m', '\x1B[49m'],
      'greyBG'      : ['\x1B[49;5;8m', '\x1B[49m'],
      'blackBG'     : ['\x1B[40m', '\x1B[49m'],
      //colors
      'blueBG'      : ['\x1B[44m', '\x1B[49m'],
      'cyanBG'      : ['\x1B[46m', '\x1B[49m'],
      'greenBG'     : ['\x1B[42m', '\x1B[49m'],
      'magentaBG'   : ['\x1B[45m', '\x1B[49m'],
      'redBG'       : ['\x1B[41m', '\x1B[49m'],
      'yellowBG'    : ['\x1B[43m', '\x1B[49m']
    };
  } else if (exports.mode === 'browser') {
    styles = {
      //styles
      'bold'      : ['<b>',  '</b>'],
      'italic'    : ['<i>',  '</i>'],
      'underline' : ['<u>',  '</u>'],
      'inverse'   : ['<span style="background-color:black;color:white;">',  '</span>'],
      'strikethrough' : ['<del>',  '</del>'],
      //text colors
      //grayscale
      'white'     : ['<span style="color:white;">',   '</span>'],
      'grey'      : ['<span style="color:gray;">',    '</span>'],
      'black'     : ['<span style="color:black;">',   '</span>'],
      //colors
      'blue'      : ['<span style="color:blue;">',    '</span>'],
      'cyan'      : ['<span style="color:cyan;">',    '</span>'],
      'green'     : ['<span style="color:green;">',   '</span>'],
      'magenta'   : ['<span style="color:magenta;">', '</span>'],
      'red'       : ['<span style="color:red;">',     '</span>'],
      'yellow'    : ['<span style="color:yellow;">',  '</span>'],
      //background colors
      //grayscale
      'whiteBG'     : ['<span style="background-color:white;">',   '</span>'],
      'greyBG'      : ['<span style="background-color:gray;">',    '</span>'],
      'blackBG'     : ['<span style="background-color:black;">',   '</span>'],
      //colors
      'blueBG'      : ['<span style="background-color:blue;">',    '</span>'],
      'cyanBG'      : ['<span style="background-color:cyan;">',    '</span>'],
      'greenBG'     : ['<span style="background-color:green;">',   '</span>'],
      'magentaBG'   : ['<span style="background-color:magenta;">', '</span>'],
      'redBG'       : ['<span style="background-color:red;">',     '</span>'],
      'yellowBG'    : ['<span style="background-color:yellow;">',  '</span>']
    };
  } else if (exports.mode === 'none') {
    return str + '';
  } else {
    console.log('unsupported mode, try "browser", "console" or "none"');
  }
  return styles[style][0] + str + styles[style][1];
}

function applyTheme(theme) {

  //
  // Remark: This is a list of methods that exist
  // on String that you should not overwrite.
  //
  var stringPrototypeBlacklist = [
    '__defineGetter__', '__defineSetter__', '__lookupGetter__', '__lookupSetter__', 'charAt', 'constructor',
    'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf', 'charCodeAt',
    'indexOf', 'lastIndexof', 'length', 'localeCompare', 'match', 'replace', 'search', 'slice', 'split', 'substring',
    'toLocaleLowerCase', 'toLocaleUpperCase', 'toLowerCase', 'toUpperCase', 'trim', 'trimLeft', 'trimRight'
  ];

  Object.keys(theme).forEach(function (prop) {
    if (stringPrototypeBlacklist.indexOf(prop) !== -1) {
      console.log('warn: '.red + ('String.prototype' + prop).magenta + ' is probably something you don\'t want to override. Ignoring style name');
    }
    else {
      if (typeof(theme[prop]) === 'string') {
        addProperty(prop, function () {
          return exports[theme[prop]](this);
        });
      }
      else {
        addProperty(prop, function () {
          var ret = this;
          for (var t = 0; t < theme[prop].length; t++) {
            ret = exports[theme[prop][t]](ret);
          }
          return ret;
        });
      }
    }
  });
}


//
// Iterate through all default styles and colors
//
var x = ['bold', 'underline', 'strikethrough', 'italic', 'inverse', 'grey', 'black', 'yellow', 'red', 'green', 'blue', 'white', 'cyan', 'magenta', 'greyBG', 'blackBG', 'yellowBG', 'redBG', 'greenBG', 'blueBG', 'whiteBG', 'cyanBG', 'magentaBG'];
x.forEach(function (style) {

  // __defineGetter__ at the least works in more browsers
  // http://robertnyman.com/javascript/javascript-getters-setters.html
  // Object.defineProperty only works in Chrome
  addProperty(style, function () {
    return stylize(this, style);
  });
});

function sequencer(map) {
  return function () {
    if (!isHeadless) {
      return this.replace(/( )/, '$1');
    }
    var exploded = this.split(""), i = 0;
    exploded = exploded.map(map);
    return exploded.join("");
  };
}

var rainbowMap = (function () {
  var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta']; //RoY G BiV
  return function (letter, i, exploded) {
    if (letter === " ") {
      return letter;
    } else {
      return stylize(letter, rainbowColors[i++ % rainbowColors.length]);
    }
  };
})();

exports.themes = {};

exports.addSequencer = function (name, map) {
  addProperty(name, sequencer(map));
};

exports.addSequencer('rainbow', rainbowMap);
exports.addSequencer('zebra', function (letter, i, exploded) {
  return i % 2 === 0 ? letter : letter.inverse;
});

exports.setTheme = function (theme) {
  if (typeof theme === 'string') {
    try {
      exports.themes[theme] = require(theme);
      applyTheme(exports.themes[theme]);
      return exports.themes[theme];
    } catch (err) {
      console.log(err);
      return err;
    }
  } else {
    applyTheme(theme);
  }
};


addProperty('stripColors', function () {
  return ("" + this).replace(/\x1B\[\d+m/g, '');
});

// please no
function zalgo(text, options) {
  var soul = {
    "up" : [
      '̍', '̎', '̄', '̅',
      '̿', '̑', '̆', '̐',
      '͒', '͗', '͑', '̇',
      '̈', '̊', '͂', '̓',
      '̈', '͊', '͋', '͌',
      '̃', '̂', '̌', '͐',
      '̀', '́', '̋', '̏',
      '̒', '̓', '̔', '̽',
      '̉', 'ͣ', 'ͤ', 'ͥ',
      'ͦ', 'ͧ', 'ͨ', 'ͩ',
      'ͪ', 'ͫ', 'ͬ', 'ͭ',
      'ͮ', 'ͯ', '̾', '͛',
      '͆', '̚'
    ],
    "down" : [
      '̖', '̗', '̘', '̙',
      '̜', '̝', '̞', '̟',
      '̠', '̤', '̥', '̦',
      '̩', '̪', '̫', '̬',
      '̭', '̮', '̯', '̰',
      '̱', '̲', '̳', '̹',
      '̺', '̻', '̼', 'ͅ',
      '͇', '͈', '͉', '͍',
      '͎', '͓', '͔', '͕',
      '͖', '͙', '͚', '̣'
    ],
    "mid" : [
      '̕', '̛', '̀', '́',
      '͘', '̡', '̢', '̧',
      '̨', '̴', '̵', '̶',
      '͜', '͝', '͞',
      '͟', '͠', '͢', '̸',
      '̷', '͡', ' ҉'
    ]
  },
  all = [].concat(soul.up, soul.down, soul.mid),
  zalgo = {};

  function randomNumber(range) {
    var r = Math.floor(Math.random() * range);
    return r;
  }

  function is_char(character) {
    var bool = false;
    all.filter(function (i) {
      bool = (i === character);
    });
    return bool;
  }

  function heComes(text, options) {
    var result = '', counts, l;
    options = options || {};
    options["up"] = options["up"] || true;
    options["mid"] = options["mid"] || true;
    options["down"] = options["down"] || true;
    options["size"] = options["size"] || "maxi";
    text = text.split('');
    for (l in text) {
      if (is_char(l)) {
        continue;
      }
      result = result + text[l];
      counts = {"up" : 0, "down" : 0, "mid" : 0};
      switch (options.size) {
      case 'mini':
        counts.up = randomNumber(8);
        counts.min = randomNumber(2);
        counts.down = randomNumber(8);
        break;
      case 'maxi':
        counts.up = randomNumber(16) + 3;
        counts.min = randomNumber(4) + 1;
        counts.down = randomNumber(64) + 3;
        break;
      default:
        counts.up = randomNumber(8) + 1;
        counts.mid = randomNumber(6) / 2;
        counts.down = randomNumber(8) + 1;
        break;
      }

      var arr = ["up", "mid", "down"];
      for (var d in arr) {
        var index = arr[d];
        for (var i = 0 ; i <= counts[index]; i++) {
          if (options[index]) {
            result = result + soul[index][randomNumber(soul[index].length)];
          }
        }
      }
    }
    return result;
  }
  return heComes(text);
}


// don't summon zalgo
addProperty('zalgo', function () {
  return zalgo(this);
});

},{}],15:[function(require,module,exports){
/*
	Class - JavaScript inheritance

	Construction:
		Setup and construction should happen in the construct() method.
		The construct() method is automatically chained, so all construct() methods defined by superclass methods will be called first.

	Initialization:
		Initialziation that needs to happen after all construct() methods have been called should be done in the init() method.
		The init() method is not automatically chained, so you must call _super() if you intend to call the superclass' init method.
		init() is not passed any arguments

	Destruction:
		Teardown and destruction should happen in the destruct() method. The destruct() method is also chained.

	Mixins:
		An array of mixins can be provided with the mixins[] property. An object or the prototype of a class should be provided, not a constructor.
		Mixins can be added at any time by calling this.mixin(properties)

	Usage:
		var MyClass = Class(properties);
		var MyClass = new Class(properties);
		var MyClass = Class.extend(properties);

	Credits:
		Inspired by Simple JavaScript Inheritance by John Resig http://ejohn.org/

	Usage differences:
		construct() is used to setup instances and is automatically chained so superclass construct() methods run automatically
		destruct() is used  to tear down instances. destruct() is also chained
		init(), if defined, is called after construction is complete and is not chained
		toString() can be defined as a string or a function
		mixin() is provided to mix properties into an instance
		properties.mixins as an array results in each of the provided objects being mixed in (last object wins)
		_super is passed as an argument (not as this._super) and can be used asynchronously
*/
(function(global) {
	// Used for default initialization methods
	var noop = function() {};

	// Given a function, the superTest RE will match if _super is the first argument to a function
	// The function will be serialized, then the serialized string will be searched for _super
	// If the environment isn't capable of function serialization, make it so superTest.test always returns true
	var superTest = /xyz/.test(function(){return 'xyz';}) ? /\(\s*_super\b/ : { test: function() { return true; } };

	// Remove the _super function from the passed arguments array
	var removeSuper = function(args, _super) {
		// For performance, first check if at least one argument was passed
		if (args && args.length && args[0] === _super)
			args = Array.prototype.slice.call(args, 1);
		return args;
	};

	// Bind an overriding method such that it gets the overridden method as its first argument
	var superify = function(name, func, superPrototype, isStatic) {
		var _super;

		// We redefine _super.apply so _super is stripped from the passed arguments array
		// This allows implementors to call _super.apply(this, arguments) without manually stripping off _super
		if (isStatic) {
			// Static binding: If the passed superPrototype is modified, the bound function will still call the ORIGINAL method
			// This comes into play when functions are mixed into an object that already has a function by that name (i.e. two mixins are used)
			var superFunc = superPrototype[name];
			_super = function _superStatic() {
				return superFunc.apply(this, arguments);
			};

			_super.apply = function _applier(context, args) {
				return Function.prototype.apply.call(superFunc, context, removeSuper(args, _super));
			};
		}
		else {
			// Dynamic binding: If the passed superPrototype is modified, the bound function will call the NEW method
			// This comes into play when functions are mixed into a class at declaration time
			_super = function _superDynamic() {
				return superPrototype[name].apply(this, arguments);
			};

			_super.apply = function _applier(context, args) {
				return Function.prototype.apply.call(superPrototype[name], context, removeSuper(args, _super));
			};
		}

		// Name the function for better stack traces
		return function _passSuper() {
			// Add the super function to the start of the arguments array
			var args = Array.prototype.slice.call(arguments);
			args.unshift(_super);

			// Call the function with the modified arguments
			return func.apply(this, args);
		};
	};

	// Mix the provided properties into the current context with the ability to call overridden methods with _super()
	var mixin = function(properties, superPrototype) {
		// Use this instance
		superPrototype = superPrototype || this.constructor && this.constructor.prototype;
		
		// Copy the properties onto the new prototype
		for (var name in properties) {
			// Never mix construct or destruct
			if (name === 'construct' || name === 'destruct')
				continue;

			// Check if the function uses _super
			// It should be a function, the super prototype should have a function by the same name
			// And finally, the function should take _super as its first argument
			var usesSuper = superPrototype && typeof properties[name] === 'function' && typeof superPrototype[name] === 'function' && superTest.test(properties[name]);

			if (usesSuper) {
				// Wrap the function such that _super will be passed accordingly
				if (this.hasOwnProperty(name))
					this[name] = superify(name, properties[name], this, true);
				else
					this[name] = superify(name, properties[name], superPrototype, false);
			}
			else {
				// Directly assign the property
				this[name] = properties[name];
			}
		}
	};

	// The base Class implementation acts as extend alias, with the exception that it can take properties.extend as the Class to extend
	var Class = function(properties) {
		// If a class-like object is passed as properties.extend, just call extend on it
		if (properties && properties.extend)
			return properties.extend.extend(properties);

		// Otherwise, just create a new class with the passed properties
		return Class.extend(properties);
	};
	
	// Add the mixin method to all classes created with Class
	Class.prototype.mixin = mixin;
	
	// Creates a new Class that inherits from this class
	// Give the function a name so it can refer to itself without arguments.callee
	Class.extend = function extend(properties) {
		var superPrototype = this.prototype;
		
		// Create an object with the prototype of the superclass
		var prototype = Object.create(superPrototype);
		
		if (properties) {
			// Mix the new properties into the class prototype
			// This does not copy construct and destruct
			mixin.call(prototype, properties, superPrototype);
			
			// Mix in all the mixins
			// This also does not copy construct and destruct
			if (Array.isArray(properties.mixins)) {
				for (var i = 0, ni = properties.mixins.length; i < ni; i++) {
					// Mixins should be _super enabled, with the methods defined in the prototype as the superclass methods
					mixin.call(prototype, properties.mixins[i], prototype);
				}
			}
			
			// Chain the construct() method (supermost executes first) if necessary
			if (properties.construct && superPrototype.construct) {
				prototype.construct = function() {
					superPrototype.construct.apply(this, arguments);
					properties.construct.apply(this, arguments);
				};
			}
			else if (properties.construct)
				prototype.construct = properties.construct;
			
			// Chain the destruct() method in reverse order (supermost executes last) if necessary
			if (properties.destruct && superPrototype.destruct) {
				prototype.destruct = function() {
					properties.destruct.apply(this, arguments);
					superPrototype.destruct.apply(this, arguments);
				};
			}
			else if (properties.destruct)
				prototype.destruct = properties.destruct;
			
			// Allow definition of toString as a string (turn it into a function)
			if (typeof properties.toString === 'string') {
				var className = properties.toString;
				prototype.toString = function() { return className; };
			}
		}

		// Define construct and init as noops if undefined
		// This serves to avoid conditionals inside of the constructor
		if (typeof prototype.construct !== 'function')
			prototype.construct = noop;
		if (typeof prototype.init !== 'function')
			prototype.init = noop;

		// The constructor handles creating an instance of the class, applying mixins, and calling construct() and init() methods
		function Class() {
			// Optimization: Requiring the new keyword and avoiding usage of Object.create() increases performance by 5x
			if (this instanceof Class === false) {
				throw new Error('Cannot create instance without new operator');
			}
			
			// Optimization: Avoiding conditionals in constructor increases performance of instantiation by 2x
			this.construct.apply(this, arguments);
			this.init();
		}

		// Assign prototype.constructor to the constructor itself
		// This allows instances to refer to this.constructor.prototype
		// This also allows creation of new instances using instance.constructor()
		prototype.constructor = Class;

		// Store the superPrototype
		// It will be accessible on an instance as follows:
		//	instance.superPrototype
		//	instance.constructor.prototype.superPrototype
		prototype.superPrototype = superPrototype;

		// Store the extended class' prototype as the prototype of the constructor
		Class.prototype = prototype;

		// Add extend() as a static method on the constructor
		Class.extend = extend;

		return Class;
	};
	
	if (typeof module !== 'undefined' && module.exports) {
		// Node.js Support
		module.exports = Class;
	}
	else if (typeof global.define === 'function') {
		(function(define) {
			// AMD Support
			define(function() { return Class; });
		}(global.define));
	}
	else {
		// Browser support
		global.Class = Class;
	}
}(this));

},{}],16:[function(require,module,exports){
exports.KevoreeEntity       = require('./lib/KevoreeEntity');
exports.AbstractGroup       = require('./lib/AbstractGroup');
exports.AbstractChannel     = require('./lib/AbstractChannel');
exports.AbstractNode        = require('./lib/AbstractNode');
exports.AbstractComponent   = require('./lib/AbstractComponent');
exports.Port                = require('./lib/Port');
},{"./lib/AbstractChannel":17,"./lib/AbstractComponent":18,"./lib/AbstractGroup":19,"./lib/AbstractNode":20,"./lib/KevoreeEntity":22,"./lib/Port":24}],17:[function(require,module,exports){
var KevoreeEntity = require('./KevoreeEntity');

/**
 * AbstractChannel entity
 *
 * @type {AbstractChannel} extends KevoreeEntity
 */
module.exports = KevoreeEntity.extend({
  toString: 'AbstractChannel',

  construct: function () {
    this.inputs = {};
  },

  internalSend: function (outputPath, msg) {
    var paths = [];
    for (var inputPath in this.inputs) {
      paths.push(inputPath);
    }
    this.onSend(outputPath, paths, msg);
  },

  /**
   *
   * @param fromPortPath
   * @param destPortPaths Array
   * @param msg
   */
  onSend: function (fromPortPath, destPortPaths, msg) {},

  /**
   * Dispatch messages to all bound ports
   * @param msg
   */
  localDispatch: function (msg) {
    for (var path in this.inputs) {
      var port = this.inputs[path];
      var comp = port.getComponent();
      if (comp != null && port.getInputPortMethodName() != null && typeof comp[port.getInputPortMethodName()] === 'function') {
        // call component's input port function with 'msg' parameter
        comp[port.getInputPortMethodName()](msg);
      }
    }
  },

  addInternalInputPort: function (port) {
    this.inputs[port.getPath()] = port;
  },

  removeInternalInputPort: function (port) {
    delete this.inputs[port.getPath()];
  }
});
},{"./KevoreeEntity":22}],18:[function(require,module,exports){
var KevoreeEntity = require('./KevoreeEntity'),
    Port          = require('./Port'),
    KevoreeUI     = require('./KevoreeUI');

/**
 * AbstractComponent entity
 *
 * @type {AbstractComponent} extends KevoreeEntity
 */
var AbstractComponent = KevoreeEntity.extend({
  toString: 'AbstractComponent',

  construct: function () {
    this.inputs = {};
    this.ui = new KevoreeUI(this);
  },

  start: function (_super) {
    _super.call(this);
    this.ui.name = this.name; // default ui name is component name
  },

  stop: function () {
    if (this.ui.isReady()) {
      // there is an UI running for this comp
      // remove it
      this.ui.destroy();
    }
  },

  addInternalInputPort: function (port) {
    this.inputs[port.getPath()] = port;
    if (typeof(this[AbstractComponent.IN_PORT+port.getName()]) === 'undefined') {
      throw new Error("Unable to find provided port '"+AbstractComponent.IN_PORT+port.getName()+"' (Function defined in class?)");
    } else port.setInputPortMethodName(AbstractComponent.IN_PORT+port.getName());
  },

  addInternalOutputPort: function (port) {
    this[AbstractComponent.OUT_PORT+port.getName()] = function (msg) {
      port.processSend(msg);
    };
  },

  removeInternalInputPort: function (port) {
    delete this.inputs[port.getPath()];
  },

  removeInternalOutputPort: function (port) {
    this[AbstractComponent.OUT_PORT+port.getName()] = function () {}; // reset function binding to an empty one
  },

  /**
   *
   * @param content
   * @param callback function(err) if 'err' is defined then something went wrong. Using 'this' in this callback refers
   * to the current component instance
   */
  setUIContent: function (content, callback) {
    callback = callback.bind(this) || function () {};
    var self = this;

    if (this.ui.isReady()) {
      this.ui.setContent(content);
      return callback(null, this.ui.getRoot());

    } else {
      this.ui.initialize(this, this.kCore.getUICommand(), function (err) {
        if (err) return callback(err);

        self.ui.setContent(content);
        return callback(null, self.ui.getRoot());
      });
    }
  },

  getUIRoot: function () {
    return this.ui.getRoot();
  }
});

AbstractComponent.IN_PORT = 'in_';
AbstractComponent.OUT_PORT = 'out_';

module.exports = AbstractComponent;
},{"./KevoreeEntity":22,"./KevoreeUI":23,"./Port":24}],19:[function(require,module,exports){
var KevoreeEntity = require('./KevoreeEntity');

/**
 * AbstractGroup entity
 *
 * @type {AbstractGroup} extends KevoreeEntity
 */
module.exports = KevoreeEntity.extend({
  toString: 'AbstractGroup',

  /**
   *
   * @param model
   */
  updateModel: function (model) {
    this.kCore.deploy(model);
  },

  /**
   * Should define a way to 'contact' targetNodeName and give the given model to it
   * @param model
   * @param targetNodeName
   */
  push: function (model, targetNodeName) {},

  /**
   * Should define a way to 'contact' targetNodeName and retrieve its current model
   * @param targetNodeName
   * @param callback function(err, model)
   */
  pull: function (targetNodeName, callback) {}
});
},{"./KevoreeEntity":22}],20:[function(require,module,exports){
var KevoreeEntity = require('./KevoreeEntity');

/**
 * AbstractNode entity
 *
 * @type {AbstractNode} extends KevoreeEntity
 */
module.exports = KevoreeEntity.extend({
    toString: 'AbstractNode'
});
},{"./KevoreeEntity":22}],21:[function(require,module,exports){
var Class           = require('pseudoclass'),
    kevoree         = require('kevoree-library').org.kevoree,
    EventEmitter    = require('events').EventEmitter;

var factory = new kevoree.impl.DefaultKevoreeFactory();

var ADD_EVENT = 'dictionary_add';

var Dictionary = Class({
    toString: 'Dictionary',

    construct: function (entity) {
        this.entity = entity;
        this.emitter = new EventEmitter();
        this.map = {};
        this.length = 0;
    },

    /**
     * Adds a listener on dictionary changes or on a particular attribute changes
     * dictionary.on('myAttr', function (newVal, oldVal) { ... });
     *
     * @param attrName name of the attribute you want to add a listener on
     * @param callback function (attrNewValue, attrOldValue)
     */
    on: function (attrName, callback) {
        this.emitter.addListener(attrName, callback.bind(this.entity));
    },

    /**
     * Adds a listener on the dictionary attribute given that is triggered when added
     * to the dictionary instance.
     * @param attrName attribute to listen to
     * @param callback function (value)
     */
    onAdd: function (attrName, callback) {
        this.emitter.addListener(ADD_EVENT, function (name, value) {
            if (value == attrName) callback(value);
        });
    },

    off: function (event, callback) {
        this.emitter.removeListener(event, callback);
    },

    getValue: function (name) {
        return this.map[name];
    },

    setValue: function (name, value) {
        var entity = this.entity.getModelEntity();
        if (!entity.dictionary) entity.dictionary = factory.createDictionary();
        var value = entity.dictionary.findValuesByID(name);
        if (!value) {
            value = factory.createDictionaryValue();
            value.name = name;
            entity.dictionary.addValues(value);
        }
        value.value = value;
        this.setEntry(name, value);
    },

    setEntry: function (name, value) {
        if (this.map[name] != undefined) {
            // an entry with the same name already exists in the dictionary
            var oldValue = this.map[name];
            this.map[name] = value;
            // emit update event with the name, oldValue and newValue
            this.emitter.emit(name, value, oldValue);

        } else {
            // no entry with that name exists in the dictionary : add it
            this.map[name] = value;
            this.length++;
            // emit an add event with the entry
            this.emitter.emit(ADD_EVENT, name, value);
        }
    },

    setMap: function (map) {
        if (this.length > 0) {
            // current map is not empty
            for (var newName in map) {
                var alreadyAdded = false;

                for (var name in this.map) {
                    if (newName == name) {
                        // oldMap and newMap both have this attribute : update needed ?
                        var oldValue = this.map[name];
                        if (oldValue != map[name]) {
                            // map[name] value is different from current value => update
                            this.map[name] = map[name];
                            this.emitter.emit(name, this.map[name], oldValue);
                        }
                        alreadyAdded = true;
                    }
                }

                if (!alreadyAdded) {
                    // newMap has a new attribute to add to currentMap : ADD event
                    this.map[newName] = map[newName];
                    this.emitter.emit(ADD_EVENT, newName, this.map[newName]);
                }
            }

        } else {
            // dictionary was empty : set it from scratch
            this.map = map;

            // compute map length
            for (var name in this.map) this.length++;

            // emit add event for each value added in the dictionary
            for (var name in this.map) this.emitter.emit(ADD_EVENT, name, this.map[name]);
        }
    },

    getMap: function () {
        return this.map;
    },

    /**
     * Returns this dictionary current cloned map
     * @returns {{}}
     */
    cloneMap: function () {
        var clonedMap = {};
        for (var name in this.map) {
            clonedMap[name] = this.map[name];
        }
        return clonedMap;
    }
});

Dictionary.ADD_EVENT = ADD_EVENT;
module.exports = Dictionary;
},{"events":2,"kevoree-library":"xt4+u2","pseudoclass":25}],22:[function(require,module,exports){
var Class       = require('pseudoclass'),
    Dictionary  = require('./Dictionary');

/**
 * Abstract class: KevoreeEntity
 * You are not supposed to instantiate this class manually. It makes no sense
 * You should create your own Kevoree entity that extend one of the defined abstraction type:
 * <ul>
 *     <li>AbstractNode</li>
 *     <li>AbstractGroup</li>
 *     <li>AbstractChannel</li>
 *     <li>AbstractComponent</li>
 * </ul>
 * All this sub-classes extend KevoreeEntity in order to have the same basic prototype
 * Each KevoreeEntity can declare a KevoreeDictionary by adding new properties to their class:
 * dic_myAttr: {
 *   optional: true,
 *   defaultValue: 'foo',
 *   fragmentDependant: false,
 *   datatype: ['foo', 'bar', baz']
 * }
 * KevoreeDictionary API follows those guidelines:
 * <ul>
 *   <li>"optional" attribute is <b>optional</b>, <b>boolean</b> (default: true)</li>
 *   <li>"defaultValue" attribute is <b>optional</b>, <b>string|boolean</b></li>
 *   <li>"fragmentDependant" attribute is <b>optional</b>, <b>boolean</b> (default: false)</li>
 *   <li>"datatype" attribute is <b>optional</b>, <b>array</b></li>
 * </ul>
 *
 * If you specify a "defaultValue" AND a "datatype", be sure that "datatype" array contains "defaultValue" string.
 *
 * @type {KevoreeEntity}
 */
var KevoreeEntity = Class({
    toString: 'KevoreeEntity',

    construct: function () {
        this.kCore = null;
        this.dictionary = new Dictionary(this);
        this.name = null;
        this.path = null;
        this.nodeName = null;
    },

    start: function () {
      this.log = this.kCore.getLogger();
    },

    stop: function () {},

    setKevoreeCore: function (kCore) {
        this.kCore = kCore;
    },

    getKevoreeCore: function () {
        return this.kCore;
    },

    getDictionary: function () {
        return this.dictionary;
    },

    getName: function () {
        return this.name;
    },

    getNodeName: function () {
        return this.nodeName;
    },

    setName: function (name) {
        this.name = name;
    },

    setPath: function (path) {
        this.path = path;
    },

    getPath: function () {
        return this.path;
    },

    setNodeName: function (name) {
        this.nodeName = name;
    },

    getModelEntity: function () {
        return this.kCore.getDeployModel().findByPath(this.path);
    },

    getNetworkInfos: function (name) {
        var model = this.kCore.getDeployModel();
        if (!model) this.kCore.getCurrentModel();
        var node = model.findNodesByID(this.getNodeName());
        if (name) return node.findNetworkInformationByID(name);
        else return node.networkInformation.iterator();
    }
});

KevoreeEntity.DIC = 'dic_';
module.exports = KevoreeEntity;
},{"./Dictionary":21,"pseudoclass":25}],23:[function(require,module,exports){
var Class         = require('pseudoclass'),
    KevoreeLogger = require('kevoree-commons').KevoreeLogger,
    fs            = require('fs'),
    path          = require('path'),
    EventEmitter  = require('events').EventEmitter;

var KevoreeUI = Class({
  toString: 'KevoreeUI',

  construct: function (comp) {
    this.comp = comp;
    this.root = null;
    this.log = new KevoreeLogger(this.toString());
    this.name = null;
    this.destroyCmd = null;
    this.emitter = new EventEmitter();
  },

  isReady: function () {
    return (this.root != null);
  },

  setRoot: function (root) {
    this.root = root;
  },

  getRoot: function () {
    return this.root;
  },

  initialize: function (comp, initCmd, callback) {
    var self = this;

    if (typeof(initCmd) == 'undefined' || initCmd == null) return callback(new Error('KevoreeUI init command unset in KevoreeCore.'));

    initCmd(this, function (err) {
      if (err) {
        self.log.error(err.message);
        self.root = null;
        return callback(err);
      }

      return callback();
    });
  },

  setContent: function (content) {
    this.root.innerHTML = content;
    this.emitter.emit('contentChanged', content);
  },

  destroy: function () {
    if (this.destroyCmd) this.destroyCmd();
  },

  setDestroyCmd: function (cmd) {
    this.destroyCmd = cmd;
  },

  getName: function () {
    return this.name;
  },

  setName: function (name) {
    this.name = name;
    this.emitter.emit('nameChanged', name);
  },

  on: function (event, callback) {
    this.emitter.addListener(event, callback);
  }
});

module.exports = KevoreeUI;
},{"events":2,"fs":1,"kevoree-commons":9,"path":3,"pseudoclass":25}],24:[function(require,module,exports){
var Class = require('pseudoclass');

/**
 * You are not supposed to create Port object (unless you are an AdaptationPrimitive)
 * @type {*}
 */
module.exports = Class({
  toString: 'Port',

  construct: function (name, path) {
    this.name                = name;
    this.path                = path;
    this.component           = null;
    this.channel             = null;
    this.inputPortMethodName = null;
  },

  processSend: function (msg) {
    this.channel.internalSend(this.path, msg);
  },

  setInputPortMethodName: function (name) {
    this.inputPortMethodName = name;
  },

  getInputPortMethodName: function () {
    return this.inputPortMethodName;
  },

  getName: function () {
    return this.name;
  },

  getPath: function () {
    return this.path;
  },

  setComponent: function (comp) {
    this.component = comp;
  },

  getComponent: function () {
    return this.component;
  },

  setChannel: function (chan) {
    this.channel = chan;
  }
});
},{"pseudoclass":25}],25:[function(require,module,exports){
module.exports=require(15)
},{}],"kevoree-library":[function(require,module,exports){
module.exports=require('xt4+u2');
},{}]},{},[])