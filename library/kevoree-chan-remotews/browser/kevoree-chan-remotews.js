require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Bn+HLi":[function(require,module,exports){
// if you have already created your own Channel extending AbstractChannel
// you can replace AbstractChannel here and use your own
// ex: var MyChan = require('./path/to/MyChan')
// the only thing needed is that the top level channel extends AbstractChannel :)
var AbstractChannel = require('kevoree-entities').AbstractChannel,
    WebSocket = require('ws');

/**
 * Kevoree channel
 * @type {RemoteWS}
 */
var RemoteWS = AbstractChannel.extend({
    toString: 'RemoteWS',

    construct: function () {
        this.ws = null;
        this.timeoutIDs = [];
    },

    /**
     * this method will be called by the Kevoree platform when your channel has to start
     */
    start: function (_super) {
        _super.call(this);

        var host = this.dictionary.getValue('host');
        var port = this.dictionary.getValue('port');
        var topic = this.dictionary.getValue('topic') || '';
        if (typeof(host) == 'undefined' || host.length == 0 || typeof(port) == 'undefined' || port.length == 0)
            throw new Error('RemoteWS channel expects "host" & "port" attributes to be defined and valid.');

        var connectToRemoteServer = function () {
            this.ws = new WebSocket('ws://'+host+':'+port+'/'+topic);

            this.ws.onopen = function () {
                this.log.info(this.toString(), 'Successfully connected to remote server ws://'+host+':'+port+'/'+topic);

                this.clearTimeouts();
            }.bind(this);

            this.ws.onmessage = function (e) {
                var data = '';
                if (typeof(e) === 'string') data = e;
                else data = e.data;

                this.localDispatch(data);
            }.bind(this);

            this.ws.onclose = function () {
                this.log.info(this.toString(), 'Connection closed with remote server. Reconnecting in 5 seconds...');
                this.clearTimeouts();
                var timeoutID = setTimeout(connectToRemoteServer, 5000);
                this.timeoutIDs.push(timeoutID);
            }.bind(this);

            this.ws.onerror = function () {
                this.log.info(this.toString(), 'Something went wrong with connection to remote server ('+host+':'+port+'). Reconnecting in 5 seconds...');
                this.clearTimeouts();
                var timeoutID = setTimeout(connectToRemoteServer, 5000);
                this.timeoutIDs.push(timeoutID);
            }.bind(this);

        }.bind(this);

        connectToRemoteServer();
    },

    /**
     * this method will be called by the Kevoree platform when your channel has to stop
     */
    stop: function () {
        if (this.ws != null) {
            this.ws.close();
            this.ws = null;
        }
    },

    /**
     * When a channel is bound with an output port this method will be called 'n' times
     * when this output port will send a message ('n' corresponding to the number of input port
     * connected to this channel)
     * @param fromPortPath
     * @param destPortPaths
     * @param msg
     */
    onSend: function (fromPortPath, destPortPaths, msg) {
        var sendMessage = function () {
            if (this.ws != null) {
                if (this.ws.readyState == 1) { // open according to http://dev.w3.org/html5/websockets/
                    this.ws.send(msg);
                    return;
                }
            }
            // we are not currently connected to remote server, wait a little and try again
            var timeoutID = setTimeout(sendMessage, 2000);
            this.timeoutIDs.push(timeoutID);
        }.bind(this);

        sendMessage();
    },

    clearTimeouts: function () {
        // clear all pending timeouts
        for (var i in this.timeoutIDs) clearTimeout(this.timeoutIDs[i]);
        this.timeoutIDs.length = 0; // reset timeouts
    },

    dic_host: {
        optional: false,
        fragmentDependant: false
    },

    dic_port: {
        optional: false,
        fragmentDependant: false
    },

    dic_topic: {
        optional: true,
        fragmentDependant: false
    }
});

module.exports = RemoteWS;

},{"kevoree-entities":7,"ws":26}],"kevoree-chan-remotews":[function(require,module,exports){
module.exports=require('Bn+HLi');
},{}],3:[function(require,module,exports){

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.once = noop;
process.off = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],6:[function(require,module,exports){
(function (process){
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

}).call(this,require("/home/leiko/dev/kevoree-js/library/kevoree-chan-remotews/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/home/leiko/dev/kevoree-js/library/kevoree-chan-remotews/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":5}],7:[function(require,module,exports){
exports.KevoreeEntity       = require('./lib/KevoreeEntity');
exports.AbstractGroup       = require('./lib/AbstractGroup');
exports.AbstractChannel     = require('./lib/AbstractChannel');
exports.AbstractNode        = require('./lib/AbstractNode');
exports.AbstractComponent   = require('./lib/AbstractComponent');
exports.Port                = require('./lib/Port');
},{"./lib/AbstractChannel":8,"./lib/AbstractComponent":9,"./lib/AbstractGroup":10,"./lib/AbstractNode":11,"./lib/KevoreeEntity":13,"./lib/Port":15}],8:[function(require,module,exports){
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
            // do not send message to stopped component
            var model = this.getKevoreeCore().getCurrentModel();
            if (model) {
                var port = model.findByPath(inputPath);
                if (port) {
                    var comp = port.eContainer();
                    if (comp && comp.started) {
                        paths.push(inputPath);
                    }
                }
            }
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
                if (comp.getModelEntity().started) {
                    // call component's input port function with 'msg' parameter
                    comp[port.getInputPortMethodName()](msg);
                } else {
                    this.log.debug(this.toString(), 'Component '+comp.getName()+'@'+this.getNodeName()+' is stopped. Drop message.');
                }
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
},{"./KevoreeEntity":13}],9:[function(require,module,exports){
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
},{"./KevoreeEntity":13,"./KevoreeUI":14,"./Port":15}],10:[function(require,module,exports){
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
},{"./KevoreeEntity":13}],11:[function(require,module,exports){
var KevoreeEntity = require('./KevoreeEntity');

/**
 * AbstractNode entity
 *
 * @type {AbstractNode} extends KevoreeEntity
 */
module.exports = KevoreeEntity.extend({
    toString: 'AbstractNode'
});
},{"./KevoreeEntity":13}],12:[function(require,module,exports){
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

    off: function (event, callback) {
        this.emitter.removeListener(event, callback);
    },

    getValue: function (name) {
        return this.map[name];
    },

    setValue: function (name, value) {
        var entity = this.entity.getModelEntity();
        if (!entity.dictionary) entity.dictionary = factory.createDictionary();
        value = entity.dictionary.findValuesByID(name);
        if (!value) {
            value = factory.createDictionaryValue();
            value.name = name;
            entity.dictionary.addValues(value);
        }
        value.value = value;
        this.setEntry(name, value);
    },

    setEntry: function (name, value) {
        var oldValue = this.map[name];
        this.map[name] = value;
        // emit update event with the name, oldValue and newValue
        this.entity['dic_'+name].value = value;
        if (this.entity.isStarted()) {
            if (this.entity['dic_'+name].update && (typeof this.entity['dic_'+name].update === 'function')) {
                this.entity['dic_'+name].update.bind(this.entity)(oldValue);
            }
            this.emitter.emit(name, value, oldValue);
        }
    },

    setMap: function (map) {
        var name;
        if (Object.keys(this.map).length > 0) {
            // current map is not empty
            for (var newName in map) {
                var alreadyAdded = false;

                for (name in this.map) {
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
                }
            }

        } else {
            // dictionary was empty : set it from scratch
            this.map = map;
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

module.exports = Dictionary;
},{"events":4,"pseudoclass":25}],13:[function(require,module,exports){
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
 *   update: function (oldValue) {
 *     // do something when attribute is updated
 *   }
 * }
 * KevoreeDictionary API follows those guidelines:
 * <ul>
 *   <li>"optional" attribute is <b>optional</b>, <b>boolean</b> (default: true)</li>
 *   <li>"defaultValue" attribute is <b>optional</b>, <b>string|boolean</b></li>
 *   <li>"fragmentDependant" attribute is <b>optional</b>, <b>boolean</b> (default: false)</li>
 *   <li>"update" attribute is <b>optional</b>, <b>function</b>(oldAttributeValue)</li>
 * </ul>
 *
 * Once your entity is started, you will be able to retrieve your attribute value by calling dic_myAttr.value
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
        this.started = false;
    },

    start: function () {
        this.log = this.kCore.getLogger();
        this.started = true;
    },

    stop: function () {
        this.started = false;
    },

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

    /**
     * Tries to retrieve this Kevoree entity from deployModel first.
     * If deployModel is null (meaning that we are in a deployed-state and not in a deploying-state)
     * it tries to retrieve this Kevoree entity from currentModel.
     * @returns {*}
     */
    getModelEntity: function () {
        var model = this.kCore.getDeployModel();
        if (!model) {
            model = this.kCore.getCurrentModel();
        }
        return model.findByPath(this.path);
    },

    getNetworkInfos: function (nodeName) {
        var model = this.kCore.getDeployModel();
        if (!model) {
            this.kCore.getCurrentModel();
        }
        var node = model.findNodesByID(nodeName);
        return node.networkInformation.iterator();
    },

    isStarted: function () {
        return this.started;
    }
});

KevoreeEntity.DIC = 'dic_';
module.exports = KevoreeEntity;
},{"./Dictionary":12,"pseudoclass":25}],14:[function(require,module,exports){
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
        this.root = null;
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
},{"events":4,"fs":3,"kevoree-commons":16,"path":6,"pseudoclass":25}],15:[function(require,module,exports){
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
},{"pseudoclass":25}],16:[function(require,module,exports){
module.exports.Resolver      = require('./lib/Resolver');
module.exports.Bootstrapper  = require('./lib/Bootstrapper');
module.exports.KevoreeLogger = require('./lib/KevoreeLogger');
module.exports.FileSystem    = require('./lib/FileSystem');
},{"./lib/Bootstrapper":17,"./lib/FileSystem":18,"./lib/KevoreeLogger":19,"./lib/Resolver":20}],17:[function(require,module,exports){
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
        if (nodeInstance) {
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
},{"pseudoclass":25}],18:[function(require,module,exports){
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
},{"pseudoclass":25}],19:[function(require,module,exports){
var Class  = require('pseudoclass'),
    chalk  = require('chalk');

var LEVELS = ['all', 'info', 'debug', 'warn', 'error', 'quiet'];

var chalkInfo       = chalk.grey,
    chalkWarn       = chalk.grey.bgYellow,
    chalkWarnMsg    = chalk.yellow,
    chalkError      = chalk.white.bgRed,
    chalkErrorMsg   = chalk.red,
    chalkDebug      = chalk.cyan;

var KevoreeLogger = Class({
    toString: 'KevoreeLogger',

    construct: function (tag) {
        this.tag = tag;
        this.level = 0;
        this.filter = '';
    },

    info: function (tag, msg) {
        if (this.level <= LEVELS.indexOf('info')) {
            if (typeof(msg) === 'undefined') {
                msg = tag;
                tag = this.tag;
            }

            if (this.filter.length === 0 || (this.filter.length > 0 && tag === this.filter)) {
                console.log(getTime()+'  '+chalkInfo('INFO')+'   '+processTag(tag)+'  '+chalkInfo(msg));
            }
        }
    },

    debug: function (tag, msg) {
        if (this.level <= LEVELS.indexOf('debug')) {
            if (typeof(msg) === 'undefined') {
                msg = tag;
                tag = this.tag;
            }

            if (this.filter.length === 0 || (this.filter.length > 0 && tag === this.filter)) {
                console.log(getTime()+'  '+chalkDebug('DEBUG ')+' '+processTag(tag)+'  '+chalkDebug(msg));
            }
        }
    },

    warn: function (tag, msg) {
        if (this.level <= LEVELS.indexOf('warn')) {
            if (typeof(msg) === 'undefined') {
                msg = tag;
                tag = this.tag;
            }

            if (this.filter.length === 0 || (this.filter.length > 0 && tag === this.filter)) {
                console.warn(getTime()+'  '+chalkWarn('WARN')+'   '+processTag(tag)+'  '+chalkWarnMsg(msg));
            }
        }
    },

    error: function (tag, msg) {
        if (this.level <= LEVELS.indexOf('error')) {
            if (typeof(msg) === 'undefined') {
                msg = tag;
                tag = this.tag;
            }

            if (this.filter.length === 0 || (this.filter.length > 0 && tag === this.filter)) {
                console.error(getTime() + '  ' + chalkError('ERROR') + '  ' + processTag(tag) + '  ' + chalkErrorMsg(msg));
            }
        }
    },

    setLevel: function (level) {
        this.level = level;
        console.log(getTime()+'  '+chalkInfo('ALL ')+'   '+processTag(this.toString())+'  '+chalkInfo('Set logLevel= '+LEVELS[this.level]));
    },

    setFilter: function (filter) {
        this.filter = filter;
        console.log(getTime()+'  '+chalkInfo('ALL ')+'   '+processTag(this.toString())+'  '+chalkInfo('Set logFilter= "'+this.filter+'"'));
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

    return chalk.magenta(tag);
};

var getTime = function getTime() {
    var time = new Date();
    var hours = (time.getHours().toString().length == 1) ? '0'+time.getHours() : time.getHours();
    var mins = (time.getMinutes().toString().length == 1) ? '0'+time.getMinutes() : time.getMinutes();
    var secs = (time.getSeconds().toString().length == 1) ? '0'+time.getSeconds() : time.getSeconds();
    return chalk.grey(hours+':'+mins+':'+secs);
};


KevoreeLogger.ALL   = LEVELS.indexOf('all');
KevoreeLogger.INFO  = LEVELS.indexOf('info');
KevoreeLogger.DEBUG = LEVELS.indexOf('debug');
KevoreeLogger.WARN  = LEVELS.indexOf('warn');
KevoreeLogger.ERROR = LEVELS.indexOf('error');
KevoreeLogger.QUIET = LEVELS.indexOf('quiet');

module.exports = KevoreeLogger;
},{"chalk":21,"pseudoclass":25}],20:[function(require,module,exports){
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
},{"./KevoreeLogger":19,"pseudoclass":25}],21:[function(require,module,exports){
'use strict';
var ansi = require('ansi-styles');
var stripAnsi = require('strip-ansi');
var hasColor = require('has-color');
var defineProps = Object.defineProperties;
var chalk = module.exports;

var styles = (function () {
	var ret = {};

	ansi.grey = ansi.gray;

	Object.keys(ansi).forEach(function (key) {
		ret[key] = {
			get: function () {
				this._styles.push(key);
				return this;
			}
		};
	});

	return ret;
})();

function init() {
	var ret = {};

	Object.keys(styles).forEach(function (name) {
		ret[name] = {
			get: function () {
				var obj = defineProps(function self() {
					var str = [].slice.call(arguments).join(' ');

					if (!chalk.enabled) {
						return str;
					}

					return self._styles.reduce(function (str, name) {
						var code = ansi[name];
						return str ? code.open + str + code.close : '';
					}, str);
				}, styles);

				obj._styles = [];

				return obj[name];
			}
		}
	});

	return ret;
}

defineProps(chalk, init());

chalk.styles = ansi;
chalk.stripColor = stripAnsi;
chalk.supportsColor = hasColor;

// detect mode if not set manually
if (chalk.enabled === undefined) {
	chalk.enabled = chalk.supportsColor;
}

},{"ansi-styles":22,"has-color":23,"strip-ansi":24}],22:[function(require,module,exports){
'use strict';
var styles = module.exports;

var codes = {
	reset: [0, 0],

	bold: [1, 22],
	italic: [3, 23],
	underline: [4, 24],
	inverse: [7, 27],
	strikethrough: [9, 29],

	black: [30, 39],
	red: [31, 39],
	green: [32, 39],
	yellow: [33, 39],
	blue: [34, 39],
	magenta: [35, 39],
	cyan: [36, 39],
	white: [37, 39],
	gray: [90, 39],

	bgBlack: [40, 49],
	bgRed: [41, 49],
	bgGreen: [42, 49],
	bgYellow: [43, 49],
	bgBlue: [44, 49],
	bgMagenta: [45, 49],
	bgCyan: [46, 49],
	bgWhite: [47, 49]
};

Object.keys(codes).forEach(function (key) {
	var val = codes[key];
	var style = styles[key] = {};
	style.open = '\x1b[' + val[0] + 'm';
	style.close = '\x1b[' + val[1] + 'm';
});

},{}],23:[function(require,module,exports){
(function (process){
'use strict';
module.exports = (function () {
	if (process.argv.indexOf('--no-color') !== -1) {
		return false;
	}

	if (process.argv.indexOf('--color') !== -1) {
		return true;
	}

	if (process.stdout && !process.stdout.isTTY) {
		return false;
	}

	if (process.platform === 'win32') {
		return true;
	}

	if ('COLORTERM' in process.env) {
		return true;
	}

	if (process.env.TERM === 'dumb') {
		return false;
	}

	if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
		return true;
	}

	return false;
})();

}).call(this,require("/home/leiko/dev/kevoree-js/library/kevoree-chan-remotews/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/home/leiko/dev/kevoree-js/library/kevoree-chan-remotews/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":5}],24:[function(require,module,exports){
'use strict';
module.exports = function (str) {
	return typeof str === 'string' ? str.replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g, '') : str;
};

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){

/**
 * Module dependencies.
 */

var global = (function() { return this; })();

/**
 * WebSocket constructor.
 */

var WebSocket = global.WebSocket || global.MozWebSocket;

/**
 * Module exports.
 */

module.exports = WebSocket ? ws : null;

/**
 * WebSocket constructor.
 *
 * The third `opts` options object gets ignored in web browsers, since it's
 * non-standard, and throws a TypeError if passed to the constructor.
 * See: https://github.com/einaros/ws/issues/227
 *
 * @param {String} uri
 * @param {Array} protocols (optional)
 * @param {Object) opts (optional)
 * @api public
 */

function ws(uri, protocols, opts) {
  var instance;
  if (protocols) {
    instance = new WebSocket(uri, protocols);
  } else {
    instance = new WebSocket(uri);
  }
  return instance;
}

if (WebSocket) ws.prototype = WebSocket.prototype;

},{}]},{},["Bn+HLi"]);