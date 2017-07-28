'use strict';

var KevoreeEntity = require('./KevoreeEntity');

/**
 * AbstractChannel entity
 *
 * @class
 */
var AbstractChannel = KevoreeEntity.extend({
	toString: 'AbstractChannel',

	/**
	 * @constructs
	 */
	construct: function () {
		this.inputs = {};
		this.pendings = [];
	},

	__start__: function (done) {
		var self = this;
		this._super(function () {
			self.pendings.forEach(function (msg) {
				self.internalSend(msg.outputPath, msg.content, msg.callback);
			});
			self.pendings.length = 0;
			done();
		});
	},

	/**
	 * @param {String} outputPath
	 * @param {String} msg
	 * @param {Function} callback
	 */
	internalSend: function (outputPath, msg, callback) {
		var paths = [];
		var debugPaths = [];
		var model = this.getKevoreeCore().getCurrentModel();
		if (model) {
			Object.keys(this.inputs).forEach(function (inputPath) {
				var port = model.findByPath(inputPath);
				if (port) {
					var comp = port.eContainer();
					if (comp && comp.started) {
						// do not send message to stopped component
						paths.push(inputPath);
						debugPaths.push(comp.eContainer().name + '.' + comp.name + '.' + port.name);
					}
				}
			});
		}

		if (this.started) {
			this.log.debug(' ' + this.name + ' -> ' + msg + ' -> [' + debugPaths.join(', ') + ']');
			this.onSend(outputPath, paths, msg + '', callback);
		} else {
			this.log.debug(' ' + this.name + ' -> ' + msg + ' -> [' + debugPaths.join(', ') + '] (queued)');
			this.pendings.push({
				outputPath: outputPath,
				content: msg,
				callback: callback
			});
		}
	},

	/**
	 * Method to override in channels implementation to provide a way
	 * to dispatch messages to the different connected input ports
	 *
	 * @param {String} fromPortPath
	 * @param {Array} destPortPaths Array
	 * @param {String} msg
	 * @param {Function} callback
	 *
	 * @abstract
	 */
	onSend: function () {},

	/**
	 * Dispatch messages to all bound ports
	 *
	 * @param msg
	 * @param {Function} [callback]
	 */
	localDispatch: function (msg, callback) {
		// if no callback given, then prevent exception to be thrown
		callback = callback || function () {};

		this.getLocalInputPorts().forEach(function (input) {
			input.call(msg, callback);
		});
	},

	/**
	 * Returns this channel output port paths
	 * @returns {Array}
	 */
	getOutputs: function () {
		var outputs = [];

		var chan = this.getModelEntity();
		if (chan) {
			chan.bindings.array.forEach(function (binding) {
				if (binding.port && binding.port.getRefInParent() === 'required') {
					if (binding.port.eContainer().eContainer().name === this.getNodeName()) {
						if (outputs.indexOf(binding.port.path()) === -1) {
							outputs.push(binding.port.path());
						}
					}
				}
			});
		}

		return outputs;
	},

	/**
	 * Returns this channel input port paths
	 * @returns {Array}
	 */
	getInputs: function () {
		var inputs = [];

		var chan = this.getModelEntity();
		if (chan) {
			chan.bindings.array.forEach(function (binding) {
				if (binding.port && binding.port.getRefInParent() === 'provided') {
					if (inputs.indexOf(binding.port.path()) === -1) {
						inputs.push(binding.port.path());
					}
				}
			});
		}

		return inputs;
	},

	/**
	 * Returns an array of Input (every input connected to the channel)
	 * @returns {Array} of Input
	 */
	getInputPorts: function () {
		var self = this;
		return Object.keys(this.inputs)
			.map(function (key) {
				return self.inputs[key];
			});
	},

	/**
	 * Returns an array of local Input (running on this node)
	 * @returns {Array} of local Input
	 */
	getLocalInputPorts: function () {
		return this.getInputPorts()
			.filter(function (input) {
				return !input.isRemote;
			});
	},

	/**
	 * Returns an array of remote Input (not running on this node)
	 * @returns {Array} of remote Input
	 */
	getRemoteInputPorts: function () {
		return this.getInputPorts()
			.filter(function (input) {
				return input.isRemote;
			});
	},

	/**
	 *
	 * @param port
	 */
	addInputPort: function (port) {
		this.inputs[port.path] = port;
	},

	/**
	 *
	 * @param port
	 */
	removeInputPort: function (port) {
		delete this.inputs[port.path];
	}
});

module.exports = AbstractChannel;
