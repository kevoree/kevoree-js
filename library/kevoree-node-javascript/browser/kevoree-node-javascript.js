require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Class               = require('pseudoclass'),
    kevoree             = require('kevoree-library').org.kevoree,
    ModelAddTrace       = kevoree.modeling.api.trace.ModelAddTrace,
    ModelSetTrace       = kevoree.modeling.api.trace.ModelSetTrace,
    ModelRemoveTrace    = kevoree.modeling.api.trace.ModelRemoveTrace,
    ModelRemoveAllTrace = kevoree.modeling.api.trace.ModelRemoveAllTrace,
    ModelAddAllTrace    = kevoree.modeling.api.trace.ModelAddAllTrace,
    Kotlin              = require('kevoree-kotlin'),
    ModelObjectMapper   = require('./ModelObjectMapper'),
    KevoreeLogger       = require('kevoree-commons').KevoreeLogger;

// Adaptation Primitives
var AddInstance         = require('./adaptations/AddInstance'),
    AddBinding          = require('./adaptations/AddBinding'),
    AddDeployUnit       = require('./adaptations/AddDeployUnit'),
    Noop                = require('./adaptations/Noop'),
    RemoveBinding       = require('./adaptations/RemoveBinding'),
    RemoveDeployUnit    = require('./adaptations/RemoveDeployUnit'),
    RemoveInstance      = require('./adaptations/RemoveInstance'),
    StartInstance       = require('./adaptations/StartInstance'),
    StopInstance        = require('./adaptations/StopInstance'),
    UpdateDictionary    = require('./adaptations/UpdateDictionary');


// CONSTANTS
var INSTANCE_TRACE  = [
        'groups',
        'nodes',
        'components',
        'hubs'
    ],
    DEPLOY_UNIT     = [
        'deployUnits'
    ],
    COMMAND_RANK = {
        // highest priority
        StopInstance:     0,
        RemoveBinding:    1,
        RemoveInstance:   2,
        RemoveTypeDef:    3,
        RemoveDeployUnit: 4,
        AddDeployUnit:    5,
        AddTypeDef:       6,
        AddInstance:      7,
        AddBinding:       8,
        UpdateDictionary: 9,
        StartInstance:    10,
        Noop:             42
        // lowest priority
    };

/**
 * AdaptationEngine knows each AdaptationPrimitive command available
 * for JavascriptNode.
 * Plus, it handles model - object mapping
 *
 * @type {AdaptationEngine}
 */
var AdaptationEngine = Class({
    toString: 'AdaptationEngine',

    construct: function (node) {
        this.log = new KevoreeLogger(this.toString());

        this.node = node;
        this.modelObjMapper = new ModelObjectMapper();
        this.compare = new kevoree.compare.DefaultModelCompare();
        this.alreadyProcessedTraces = {};
    },

    /**
     * Process traces to find the right adaptation primitive command
     * Returns a command to execute in order to do the adaptation logic
     * @param diffSeq
     * @param targetModel
     * @returns {Array}
     */
    processTraces: function (diffSeq, targetModel) {
        var cmdList = [];

        // fill adaptation primitives list
        var traces = diffSeq.traces.iterator();
        while (traces.hasNext()) {
            this.processTrace(traces.next(), targetModel, cmdList);
        }

        // reset processedTrace map
        this.alreadyProcessedTraces = {};

        return this.sortCommands(cmdList);
    },

    /**
     * Fill up cmdList array parameter with the proper AdaptationPrimitive according to the trace parameter
     * @param trace
     * @param model
     * @param cmdList
     */
    processTrace: function (trace, model, cmdList) {
        var cmd;

        var addProcessedTrace = function (path, cmd) {
            this.alreadyProcessedTraces[path] = this.alreadyProcessedTraces[path] || {};
            this.alreadyProcessedTraces[path][cmd.toString()] = true;
        }.bind(this);

        var traceAlreadyProcessed = function (path, cmd) {
            return this.alreadyProcessedTraces[path] && this.alreadyProcessedTraces[path][cmd];
        }.bind(this);

        // ADD - TRACES HANDLING
        if (Kotlin.isType(trace, ModelAddTrace)) {
            if (INSTANCE_TRACE.indexOf(trace.refName) != -1) {
                // Add instance
                if (!traceAlreadyProcessed(trace.previousPath, AddInstance.prototype.toString())) {
                    cmd = new AddInstance(this.node, this.modelObjMapper, model, model.findByPath(trace.previousPath));
                    cmdList.push(cmd);
                    addProcessedTrace(trace.previousPath, cmd);
                }

            } else if (trace.refName === 'deployUnits') {
                // Add deploy unit
                cmd = new AddDeployUnit(this.node, this.modelObjMapper, model, model.findByPath(trace.previousPath));
                cmdList.push(cmd);
                addProcessedTrace(trace.previousPath, cmd);

            } else if (trace.refName === 'mBindings') {
                // Add binding
                var binding = model.findByPath(trace.previousPath);
                if (binding && binding.hub && !this.modelObjMapper.getObject(binding.hub.path())) {
                    var hub = model.findByPath(binding.hub.path());
                    // this binding relies on a hub that hasn't been instantiated yet
                    if (!traceAlreadyProcessed(hub.path(), AddInstance.prototype.toString())) {
                        cmd = new AddInstance(this.node, this.modelObjMapper, model, hub);
                        cmdList.push(cmd);
                        addProcessedTrace(hub.path(), cmd);
                    }

                    // also check if the instance has been started or not
                    if (!traceAlreadyProcessed(hub.path(), StartInstance.prototype.toString())) {
                        cmd = new StartInstance(this.node, this.modelObjMapper, model, hub);
                        cmdList.push(cmd);
                        addProcessedTrace(hub.path(), cmd);
                    }
                }
                cmd = new AddBinding(this.node, this.modelObjMapper, model, binding);
                cmdList.push(cmd);
                addProcessedTrace(binding.path(), cmd);

            } else if (trace.refName === 'subNodes') {
                var node = model.findByPath(trace.previousPath);
                if (node.name === this.node.getName()) {
                    // this subNodes add-trace is related to this platform node
                    var group = model.findByPath(trace.srcPath);
                    if (group && !this.modelObjMapper.getObject(group.path())) {
                        // there is no group instance created on this platform yet
                        // lets check if there is already a primitive added for that or not
                        if (!traceAlreadyProcessed(group.path(), AddInstance.prototype.toString())) {
                            cmd = new AddInstance(this.node, this.modelObjMapper, model, group);
                            cmdList.push(cmd);
                            addProcessedTrace(group.path(), cmd);
                        }
                        // also check if the instance has been started or not
                        if (!traceAlreadyProcessed(group.path(), StartInstance.prototype.toString())) {
                            cmd = new StartInstance(this.node, this.modelObjMapper, model, group);
                            cmdList.push(cmd);
                            addProcessedTrace(group.path(), cmd);
                        }
                    }
                }
            }

            // SET - TRACES HANDLING
        } else if (Kotlin.isType(trace, ModelSetTrace)) {
            if (trace.refName && trace.refName === "started") {
                var AdaptationPrimitive = (trace.content === 'true') ? StartInstance : StopInstance;
                cmd = new AdaptationPrimitive(this.node, this.modelObjMapper, model, model.findByPath(trace.srcPath));
                cmdList.push(cmd);
                addProcessedTrace(trace.srcPath, cmd);

            } else if (trace.refName && trace.refName === 'value') {
                var modelElement = model.findByPath(trace.srcPath);
                if (Kotlin.isType(modelElement, kevoree.impl.DictionaryValueImpl)) {
                    if (!traceAlreadyProcessed(trace.srcPath, UpdateDictionary.prototype.toString())) {
                        cmd = new UpdateDictionary(this.node, this.modelObjMapper, model, modelElement);
                        cmdList.push(cmd);
                        addProcessedTrace(trace.srcPath, cmd);
                    }
                }
            }

            // REMOVE - TRACES HANDLING
        } else if (Kotlin.isType(trace, ModelRemoveTrace)) {
            var tracePath = trace.previousPath || trace.objPath;
            var elem = this.node.getKevoreeCore().getCurrentModel().findByPath(tracePath);

            if (INSTANCE_TRACE.indexOf(trace.refName) != -1) {
                // Remove instance
                // first of all, check if instance is stopped
                if (elem.started) {
                    // instance is in "started" state, but maybe we've already added a StopInstance primitive for it
                    if (!traceAlreadyProcessed(tracePath, StopInstance.prototype.toString())) {
                        // instance is started and there is no "StopInstance" primitive for it yet: add it
                        var stopCmd = new StopInstance(this.node, this.modelObjMapper, model, elem);
                        cmdList.push(stopCmd);
                        addProcessedTrace(tracePath, stopCmd);
                    }
                }
                // add RemoveInstance primitive
                cmd = new RemoveInstance(this.node, this.modelObjMapper, model, elem);
                cmdList.push(cmd);
                addProcessedTrace(tracePath, cmd);

            } else if (DEPLOY_UNIT.indexOf(trace.typeName) != -1) {
                // Remove deploy unit
                cmd = new RemoveDeployUnit(this.node, this.modelObjMapper, model, elem);
                cmdList.push(cmd);
                addProcessedTrace(tracePath, cmd);

            } else if (trace.refName === 'mBindings') {
                // Remove binding
                cmd = new RemoveBinding(this.node, this.modelObjMapper, model, elem);
                cmdList.push(cmd);
                addProcessedTrace(tracePath, cmd);
            }
        }
    },

    /**
     * Sorts primitives array according to COMMAND_RANK
     * @param list
     * @returns {*}
     */
    sortCommands: function (list) {
        list.sort(function (a, b) {
            if (COMMAND_RANK[a.toString()] > COMMAND_RANK[b.toString()]) return 1;
            else if (COMMAND_RANK[a.toString()] < COMMAND_RANK[b.toString()]) return -1;
            else return 0;
        });

        return list;
    },

    setLogger: function (logger) {
        this.log = logger;
    }
});

module.exports = AdaptationEngine;
},{"./ModelObjectMapper":4,"./adaptations/AddBinding":6,"./adaptations/AddDeployUnit":7,"./adaptations/AddInstance":8,"./adaptations/Noop":9,"./adaptations/RemoveBinding":10,"./adaptations/RemoveDeployUnit":11,"./adaptations/RemoveInstance":12,"./adaptations/StartInstance":13,"./adaptations/StopInstance":14,"./adaptations/UpdateDictionary":15,"kevoree-commons":21,"kevoree-kotlin":"xe9q1n","kevoree-library":"xt4+u2","pseudoclass":39}],"kevoree-node-javascript":[function(require,module,exports){
module.exports=require('+j62Bo');
},{}],"+j62Bo":[function(require,module,exports){
var AbstractNode        = require('kevoree-entities').AbstractNode,
    KevoreeLogger       = require('kevoree-commons').KevoreeLogger,
    AdaptationEngine    = require('./AdaptationEngine'),
    kevoree             = require('kevoree-library').org.kevoree,
    async               = require('async');

var JavascriptNode = AbstractNode.extend({
    toString: 'JavascriptNode',

    dic_logLevel: {
        defaultValue: 'INFO',
        optional: false,
        update: function () {
            var level = this.dic_logLevel.value.toLowerCase().trim();
            switch (level) {
                default:
                case 'info':
                    this.log.setLevel(KevoreeLogger.INFO);
                    break;

                case 'debug':
                    this.log.setLevel(KevoreeLogger.DEBUG);
                    break;

                case 'error':
                    this.log.setLevel(KevoreeLogger.ERROR);
                    break;

                case 'warn':
                    this.log.setLevel(KevoreeLogger.WARN);
                    break;
            }
        }
    },

    dic_logFilter: {
        optional: true,
        update: function () {
            this.log.setFilter(this.dic_logFilter.value);
        }
    },

    construct: function () {
        this.adaptationEngine = new AdaptationEngine(this);
    },

    start: function (_super) {
        _super.call(this);
        this.adaptationEngine.setLogger(this.getKevoreeCore().getLogger());
    },

    stop: function (_super) {
        _super.call(this);
        // TODO improve that, this is not a "stop" this is a complete "destroy"
        // clone current model
        var cloner = new kevoree.cloner.DefaultModelCloner();
        var emptyNodeModel = cloner.clone(this.getKevoreeCore().getCurrentModel(), false);
        var node = emptyNodeModel.findNodesByID(this.getName());
        if (node) {
            // delete everything from cloned model that is related to this node
            node.delete();

            // re-add this "empty" node to the cloned model
            var factory = new kevoree.impl.DefaultKevoreeFactory();
            node = factory.createContainerNode();
            node.name = this.getName();

            // compare emptyNodeModel with currentModel in order to create primitives for this platform fragments stops
            var compare = new kevoree.compare.DefaultModelCompare();
            var diffSeq = compare.diff(this.getKevoreeCore().getCurrentModel(), emptyNodeModel);
            var primitives = this.processTraces(diffSeq, emptyNodeModel);

            function execPrimitive(primitive, cb) {
                primitive.execute(cb);
            }

            async.eachSeries(primitives, execPrimitive, function (err) {
                if (err) {
                    // something went wrong while stopping node
                    this.log.error(this.toString(), 'Something went wrong while stopping '+this.getName());
                }
            }.bind(this));
        }
    },

    /**
     * Process traces in order to do the adaptation logic on the current node
     * @param diffSeq diff traces generated by comparing current KevoreeCore model and given model
     * @param targetModel toDeploy model used by KevoreeCore to generate the trace
     * @returns {Array}
     */
    processTraces: function (diffSeq, targetModel) {
        return this.adaptationEngine.processTraces(diffSeq, targetModel);
    }
});

module.exports = JavascriptNode;
},{"./AdaptationEngine":1,"async":16,"kevoree-commons":21,"kevoree-entities":30,"kevoree-library":"xt4+u2"}],4:[function(require,module,exports){
var Class   = require('pseudoclass');

var ModelObjectMapper = Class({
    toString: 'ModelObjectMapper',

    construct: function () {
        this.map = {};
    },

    addEntry: function (path, object) {
        this.map[path] = object;
    },

    removeEntry: function (path) {
        if (this.map[path]) {
            delete this.map[path];
        }
    },

    getObject: function (path) {
        return this.map[path];
    },

    hasObject: function (path) {
        return (this.map[path] != undefined && this.map[path] != null);
    },

    getMap: function () {
        return this.map;
    }
});

module.exports = ModelObjectMapper;
},{"pseudoclass":39}],5:[function(require,module,exports){
var Class   = require('pseudoclass'),
  Kotlin = require('kevoree-kotlin'),
  kevoree = require('kevoree-library').org.kevoree,
  KevoreeLogger = require('kevoree-commons').KevoreeLogger;

/**
 * Abstract AdaptationPrimitive command
 *
 * @param node JavascriptNode context
 * @param mapper ModelObjectMapper that handles mapping betweend model objects and 'real-life' object
 * @type {AdaptationPrimitive}
 */
module.exports = Class({
  toString: 'AdaptationPrimitive',

  /**
   * Construct an AdaptationPrimitive object
   *
   * @param node KevoreeNode platform
   * @param mapper ModelObjectMapper
   * @param model model to deploy (that triggers adaptations)
   * @param modelElement model element linked with this primitive
   */
  construct: function (node, mapper, model, modelElement) {
    this.node = node;
    this.mapper = mapper;
    this.adaptModel = model;
    this.modelElement = modelElement;
    this.log = this.node.getKevoreeCore().getLogger();
  },

  /**
   * Executes adaptation primitive logics
   * @param callback Function(err, [args]) if 'err' is defined => something went wrong
   */
  execute: function (callback) {
    if (callback == undefined || callback == null || typeof(callback) != 'function') {
      console.error("Execute method need a callback function as last parameter");
      return;
    }
  },

  /**
   * Undo the process done by execute()
   */
  undo: function (callback) {
    if (callback == undefined || callback == null || typeof(callback) != 'function') {
      console.error("Undo method need a callback function as last parameter");
      return;
    }
  },

  isRelatedToPlatform: function (kInstance) {
    if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.ComponentTypeImpl)) {
      // if parent is this node platform: it's ok
      return (kInstance.eContainer().name == this.node.getName());

    } else if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.ChannelTypeImpl)) {
      // if this channel has bindings with components hosted in this node platform: it's ok
      var bindings = kInstance.bindings;
      for (var i=0; i < bindings.size(); i++) {
        if (bindings.get(i).port.eContainer().eContainer().name == this.node.getName()) return true;
      }

    } else if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.GroupTypeImpl)) {
      var subNodes = kInstance.subNodes;
      for (var i=0; i < subNodes.size(); i++) {
        if (subNodes.get(i).name == this.node.name) return true;
      }

    } else if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.NodeTypeImpl)) {
      // TODO take subnodes in account
      return false;

    }

    return false;
  }
});
},{"kevoree-commons":21,"kevoree-kotlin":"xe9q1n","kevoree-library":"xt4+u2","pseudoclass":39}],6:[function(require,module,exports){
var AdaptationPrimitive = require('./AdaptationPrimitive'),
    RemoveBinding       = require('./RemoveBinding');

module.exports = AdaptationPrimitive.extend({
  toString: 'AddBinding',

  execute: function (_super, callback) {
    _super.call(this, callback);
    
    if (this.modelElement.port.eContainer().eContainer().name == this.node.getName()) {
      // this binding is related to the current node platform
      var chanInstance = this.mapper.getObject(this.modelElement.hub.path()),
          compInstance = this.mapper.getObject(this.modelElement.port.eContainer().path()),
          portInstance = this.mapper.getObject(this.modelElement.port.path());

      if (chanInstance && compInstance) {
        try {
          portInstance.setComponent(compInstance);
          portInstance.setChannel(chanInstance);

          if (this.isInputPortType(this.modelElement.port)) {
            // binding related port is an 'in' port type
            compInstance.addInternalInputPort(portInstance);
            chanInstance.addInternalInputPort(portInstance);
          } else {
            // binding related port is an 'out' port type
            // so we need to get all this channel 'in' ports
            // and give them to this chan fragment
            compInstance.addInternalOutputPort(portInstance);

            // retrieve every bindings related to this binding chan
            var bindings = this.modelElement.hub.bindings.iterator();
            while (bindings.hasNext()) {
              var binding = bindings.next();
              if (binding != this.modelElement) { // ignore this binding cause we are already processing it
                chanInstance.addInternalInputPort(this.mapper.getObject(binding.port.path()));
              }
            }
          }

          this.log.debug(this.toString(), 'job done between '+compInstance.getName()+'@'+this.node.getName()+' and '+chanInstance.getName()+'@'+this.node.getName());
          return callback();

        } catch (err) {
          return callback(err);
        }

      } else {
        return callback(new Error(this.toString()+" error: unable to find channel or component instance(s)."));
      }
    }

    return callback();
  },

  undo: function (_super, callback) {
    _super.call(this, callback);

    var cmd = new RemoveBinding(this.node, this.mapper, this.adaptModel, this.modelElement);
    cmd.execute(callback);

    return;
  },

  isInputPortType: function (kPort) {
    var kCompTD = kPort.eContainer().typeDefinition;
    var inputs = kCompTD.provided ? kCompTD.provided.iterator() : null;
    if (inputs) {
      while (inputs.hasNext()) {
        var input = inputs.next();
        if (input.name == kPort.portTypeRef.name) return true;
      }
    }

    var outputs = kCompTD.required ? kCompTD.required.iterator() : null;
    if (outputs) {
      while (outputs.hasNext()) {
        var output = outputs.next();
        if (output.name == kPort.portTypeRef.name) return false;
      }
    }

    return false;
  }
});
},{"./AdaptationPrimitive":5,"./RemoveBinding":10}],7:[function(require,module,exports){
var AdaptationPrimitive = require('./AdaptationPrimitive'),
  RemoveDeployUnit    = require('./RemoveDeployUnit');

/**
 * AddDeployUnit Adaptation command
 *
 * @type {AddDeployUnit} extends AdaptationPrimitive
 */
module.exports = AdaptationPrimitive.extend({
  toString: 'AddDeployUnit',

  /**
   *
   * @param _super AdaptationPrimitive parent
   * @param callback function: if this function first parameter != null it means that there is an error
   */
  execute: function (_super, callback) {
    _super.call(this, callback);

    if (!this.mapper.hasObject(this.modelElement.path())) {
      var bootstrapper = this.node.getKevoreeCore().getBootstrapper();

      bootstrapper.bootstrap(this.modelElement, false, function (err) {
        if (err) return callback(err);

        // bootstrap success: add deployUnit path & packageName into mapper
        this.mapper.addEntry(this.modelElement.path(), this.modelElement.name);
        this.log.debug(this.toString(), 'job done for '+this.modelElement.name+'@'+this.node.getName());
        return callback();
      }.bind(this));

    } else {
      // this deploy unit is already installed, move on
      return callback();
    }
  },

  undo: function (_super, callback) {
    _super.call(this, callback);

    var cmd = new RemoveDeployUnit(this.node, this.mapper, this.adaptModel, this.modelElement);
    cmd.execute(callback);

    return;
  }
});
},{"./AdaptationPrimitive":5,"./RemoveDeployUnit":11}],8:[function(require,module,exports){
var AdaptationPrimitive = require('./AdaptationPrimitive'),
    RemoveInstance      = require('./RemoveInstance'),
    kevoree             = require('kevoree-library').org.kevoree,
    Kotlin              = require('kevoree-kotlin'),
    Port                = require('kevoree-entities').Port,
    path                = require('path');

/**
 * AddInstance Adaptation command
 *
 * @type {AddInstance} extends AdaptationPrimitive
 */
module.exports = AdaptationPrimitive.extend({
    toString: 'AddInstance',

    /**
     *
     * @param _super AdaptationPrimitive parent
     * @param callback function: if this function first parameter != null it means that there is an error
     */
    execute: function (_super, callback) {
        _super.call(this, callback);

        // inception check
        if (this.modelElement && (this.modelElement.name != this.node.getName())) {
            // platform related check
            if (this.isRelatedToPlatform(this.modelElement)) {
                var moduleName = this.findSuitableModuleName(this.modelElement);
                if (moduleName != undefined && moduleName != null) {
                    try {
                        var InstanceClass = require(moduleName);
                        var instance = new InstanceClass();
                        instance.setKevoreeCore(this.node.getKevoreeCore());
                        instance.setName(this.modelElement.name);
                        instance.setPath(this.modelElement.path());
                        instance.setNodeName(this.node.getName());

                        this.doSpecificTypeProcess(this.modelElement);

                        this.mapper.addEntry(this.modelElement.path(), instance);

                        this.log.debug(this.toString(), 'job done for '+instance.getName()+'@'+this.node.getName());
                        return callback();

                    } catch (e) {
                        return callback(e);
                    }

                } else {
                    // there is no DeployUnit installed for this instance TypeDefinition
                    return callback(new Error(this.toString()+ " error: no DeployUnit installed for "+this.kInstance.path()));
                }
            }
        }

        callback();
    },

    undo: function (_super, callback) {
        _super.call(this, callback);
        var cmd = new RemoveInstance(this.node, this.mapper, this.adaptModel, this.modelElement);
        cmd.execute(callback);
    },

    findSuitableModuleName: function (kInstance) {
        var du = kInstance.typeDefinition.deployUnit;
        return this.mapper.getObject(du.path());
    },

    doSpecificTypeProcess: function (kInstance) {
        if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.ComponentTypeImpl)) {
            var i;
            var provided = kInstance.provided;
            for (i=0; i < provided.size(); i++) {
                var input = provided.get(i);
                this.mapper.addEntry(input.path(), new Port(input.portTypeRef.name, input.path()));
            }

            var required = kInstance.required;
            for (i=0; i < required.size(); i++) {
                var output = required.get(i);
                this.mapper.addEntry(output.path(), new Port(output.portTypeRef.name, output.path()));
            }
        } else if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.ChannelTypeImpl)) {
            var bindings = kInstance.bindings.iterator();
            while (bindings.hasNext()) {
                var binding = bindings.next();
                this.mapper.addEntry(binding.port.path(), new Port(binding.port.portTypeRef.name, binding.port.path()));
            }
        }
    }
});
},{"./AdaptationPrimitive":5,"./RemoveInstance":12,"kevoree-entities":30,"kevoree-kotlin":"xe9q1n","kevoree-library":"xt4+u2","path":20}],9:[function(require,module,exports){
var AdaptationPrimitive = require('./AdaptationPrimitive');

/**
 * Noop Adaptation command
 *
 * @type {Noop} extends AdaptationPrimitive
 */
module.exports = AdaptationPrimitive.extend({
    toString: 'Noop',

    /**
     *
     * @param _super AdaptationPrimitive parent
     * @param callback function: if this function first parameter != null it means that there is an error
     */
    execute: function (_super, callback) {
        _super.call(this, callback);
        callback.call(this, null);
    },

    undo: function (_super, callback) {
        _super.call(this, callback);
        // TODO
        callback.call(this, null);
    }
});
},{"./AdaptationPrimitive":5}],10:[function(require,module,exports){
var AdaptationPrimitive = require('./AdaptationPrimitive'),
    AddBinding          = require('./AddBinding');

module.exports = AdaptationPrimitive.extend({
    toString: 'RemoveBinding',

    execute: function (_super, callback) {
        _super.call(this, callback);

        if (this.modelElement && this.modelElement.port.eContainer().eContainer().name == this.node.getName()) {
            // this binding is related to the current node platform
            var chanInstance = this.mapper.getObject(this.modelElement.hub.path()),
                compInstance = this.mapper.getObject(this.modelElement.port.eContainer().path()),
                portInstance = this.mapper.getObject(this.modelElement.port.path());

            if (chanInstance && compInstance) {
                try {
                    if (this.isInputPortType(this.modelElement.port)) {
                        compInstance.removeInternalInputPort(portInstance);
                        chanInstance.removeInternalInputPort(portInstance);
                    } else {
                        compInstance.removeInternalOutputPort(portInstance);
                    }

                    this.log.debug(this.toString(), 'job done between '+compInstance.getName()+'@'+this.node.getName()+' and '+chanInstance.getName()+'@'+this.node.getName());
                    return callback();

                } catch (err) {
                    return callback(err);
                }
            }
        }

        return callback();
    },

    undo: function (_super, callback) {
        _super.call(this, callback);

        var cmd = new AddBinding(this.node, this.mapper, this.adaptModel, this.modelElement);
        cmd.execute(callback);
    },

    isInputPortType: function (kPort) {
        var kCompTD = kPort.eContainer().typeDefinition;
        var inputs = kCompTD.provided ? kCompTD.provided.iterator() : null;
        if (inputs) {
            while (inputs.hasNext()) {
                var input = inputs.next();
                if (input.name == kPort.name) return true;
            }
        }

        var outputs = kCompTD.required ? kCompTD.required.iterator() : null;
        if (outputs) {
            while (outputs.hasNext()) {
                var output = outputs.next();
                if (output.name == kPort.name) return false;
            }
        }

        return false;
    }
});
},{"./AdaptationPrimitive":5,"./AddBinding":6}],11:[function(require,module,exports){
var AdaptationPrimitive = require('./AdaptationPrimitive'),
    AddDeployUnit       = require('./AddDeployUnit');

/**
 * RemoveDeployUnit Adaptation
 *
 * @type {RemoveDeployUnit} extend AdaptationPrimitive
 */
module.exports = AdaptationPrimitive.extend({
    toString: 'RemoveDeployUnit',

    execute: function (_super, callback) {
        _super.call(this, callback);

        if (this.modelElement) {
            var bootstrapper = this.node.getKevoreeCore().getBootstrapper();
            return bootstrapper.uninstall(this.modelElement, function (err) {
                if (err) {
                    return callback(err);
                }

                this.mapper.removeEntry(this.modelElement.path());
                this.log.debug(this.toString(), 'job done on '+this.modelElement.name+'@'+this.node.getName());
                callback();
            }.bind(this));
        }

        return callback();
    },

    undo: function (_super, callback) {
        _super.call(this, callback);

        var cmd = new AddDeployUnit(this.node, this.mapper, this.adaptModel, this.modelElement);
        cmd.execute(callback);
    }
});
},{"./AdaptationPrimitive":5,"./AddDeployUnit":7}],12:[function(require,module,exports){
var AdaptationPrimitive = require('./AdaptationPrimitive'),
    AddInstance         = require('./AddInstance'),
    kevoree             = require('kevoree-library').org.kevoree,
    Kotlin              = require('kevoree-kotlin');

/**
 * RemoveInstance Adaptation command
 *
 * @type {RemoveInstance} extends AdaptationPrimitive
 */
module.exports = AdaptationPrimitive.extend({
  toString: 'RemoveInstance',

  /**
   *
   * @param _super AdaptationPrimitive parent
   * @param callback function: if this function first parameter != null it means that there is an error
   */
  execute: function (_super, callback) {
    _super.call(this, callback);

    if (this.modelElement) {
      var instance = this.mapper.getObject(this.modelElement.path());
      if (instance) {
        this.mapper.removeEntry(this.modelElement.path());
        this.doSpecificTypeProcess(this.modelElement);
        this.log.debug(this.toString(), 'job done for '+instance.getName()+'@'+this.node.getName());
        return callback();
      }
    }

    return callback();
  },

  undo: function (_super, callback) {
    _super.call(this, callback);

    var cmd = new AddInstance(this.node, this.mapper, this.adaptModel, this.modelElement);
    cmd.execute(callback);
    return;
  },

  doSpecificTypeProcess: function (kInstance) {
    if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.ComponentTypeImpl)) {
      var provided = kInstance.provided;
      for (var i=0; i < provided.size(); i++) {
        this.mapper.removeEntry(provided.get(i).path());
      }

      var required = kInstance.required;
      for (var i=0; i < required.size(); i++) {
        this.mapper.removeEntry(required.get(i).path());
      }

    } else if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.ChannelTypeImpl)) {

    } else if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.GroupTypeImpl)) {


    } else if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.NodeTypeImpl)) {

    }
  }
});
},{"./AdaptationPrimitive":5,"./AddInstance":8,"kevoree-kotlin":"xe9q1n","kevoree-library":"xt4+u2"}],13:[function(require,module,exports){
var AdaptationPrimitive = require('./AdaptationPrimitive'),
    StopInstance        = require('./StopInstance');

module.exports = AdaptationPrimitive.extend({
    toString: 'StartInstance',

    execute: function (_super, callback) {
        _super.call(this, callback);

        if (this.modelElement.name != this.node.getName() && this.isRelatedToPlatform(this.modelElement)) {
            var instance = this.mapper.getObject(this.modelElement.path());

            if (instance != undefined && instance != null) {
                // check dictionary value and give default values if none set
                var dicType = this.modelElement.typeDefinition.dictionaryType;
                if (dicType) {
                    var attrs = dicType.attributes.iterator();
                    while (attrs.hasNext()) {
                        var attr = attrs.next();
                        var val = instance.dictionary.getValue(attr.name);
                        if (!val) {
                            // there is no value set for this attribute
                            if (attr.optional) {
                                // the attribute is optional, we will only add the value if defaultValue is set
                                if (attr.defaultValue.length > 0) {
                                    instance.dictionary.setEntry(attr.name, attr.defaultValue);
                                }
                            } else {
                                // attribute is not optional, we have to have a value, then set defaultValue
                                instance.dictionary.setEntry(attr.name, attr.defaultValue);
                            }
                        }
                    }
                }

                instance.start();
                this.log.debug(this.toString(), 'job done for '+instance.getName()+'@'+this.node.getName());
                return callback();

            } else {
                return callback(new Error(this.toString()+" error: unable to start instance "+this.modelElement.name));
            }
        }

        return callback();
    },

    undo: function (_super, callback) {
        _super.call(this, callback);

        var cmd = new StopInstance(this.node, this.mapper, this.adaptModel, this.modelElement);
        cmd.execute(callback);

        return;
    }
});
},{"./AdaptationPrimitive":5,"./StopInstance":14}],14:[function(require,module,exports){
var AdaptationPrimitive = require('./AdaptationPrimitive'),
    StartInstance       = require('./StartInstance');

module.exports = AdaptationPrimitive.extend({
    toString: 'StopInstance',

    execute: function (_super, callback) {
        _super.call(this, callback);

        var instance = this.mapper.getObject(this.modelElement.path());
        if (instance) {
            instance.stop();
            this.log.debug(this.toString(), 'job done on '+instance.getName()+'@'+this.node.getName());
        }
        return callback();
    },

    undo: function (_super, callback) {
        _super.call(this, callback);

        var cmd = new StartInstance(this.node, this.mapper, this.adaptModel, this.modelElement);
        cmd.execute(callback);

        return;
    }
});
},{"./AdaptationPrimitive":5,"./StartInstance":13}],15:[function(require,module,exports){
var AdaptationPrimitive = require('./AdaptationPrimitive');
var kevoree = require('kevoree-library').org.kevoree;
var Kotlin = require('kevoree-kotlin');

module.exports = AdaptationPrimitive.extend({
    toString: 'UpdateDictionary',

    construct: function () {
        this.oldDictionaryMap = null;
        this.instance = null;
    },

    execute: function (_super, callback) {
        _super.call(this, callback);

        var instance = this.findEntityInstance();
        var kDictionary = this.modelElement.eContainer();

        var updateDictionary = function (instance) {
            var dictionary = instance.getDictionary();
            this.oldDictionaryMap = dictionary.cloneMap();
            this.instance = instance;
            if (Kotlin.isType(kDictionary, kevoree.impl.FragmentDictionaryImpl)) {
                if (kDictionary.name == this.node.getName()) {
                    dictionary.setEntry(this.modelElement.name, this.modelElement.value);
                }
            } else {
                dictionary.setEntry(this.modelElement.name, this.modelElement.value);
            }

            this.log.debug(this.toString(), 'job done for attribute '+kDictionary.eContainer().name+'.'+this.modelElement.name+'@'+this.node.getName()+' = '+this.modelElement.value);
            return callback();
        }.bind(this);

        if (instance != null) {
            return updateDictionary(instance);

        } else {
            if (kDictionary.eContainer().name === this.node.getName()) {
                // this dictionary is for this platform node
                return updateDictionary(this.node);
            }
        }

        return callback();
    },

    undo: function (_super, callback) {
        _super.call(this, callback);

        if (this.instance != null && this.oldDictionaryMap != null) {
            this.instance.getDictionary().setMap(this.oldDictionaryMap);
        }

        callback();
    },

    findEntityInstance: function () {
        for (var path in this.mapper.getMap()) {
            if (this.modelElement.path().startsWith(path)) {
                return this.mapper.getObject(path);
            }
        }
        return null;
    }
});
},{"./AdaptationPrimitive":5,"kevoree-kotlin":"xe9q1n","kevoree-library":"xt4+u2"}],16:[function(require,module,exports){
(function (process){
/*global setImmediate: false, setTimeout: false, console: false */
(function () {

    var async = {};

    // global on the server, window in the browser
    var root, previous_async;

    root = this;
    if (root != null) {
      previous_async = root.async;
    }

    async.noConflict = function () {
        root.async = previous_async;
        return async;
    };

    function only_once(fn) {
        var called = false;
        return function() {
            if (called) throw new Error("Callback was already called.");
            called = true;
            fn.apply(root, arguments);
        }
    }

    //// cross-browser compatiblity functions ////

    var _each = function (arr, iterator) {
        if (arr.forEach) {
            return arr.forEach(iterator);
        }
        for (var i = 0; i < arr.length; i += 1) {
            iterator(arr[i], i, arr);
        }
    };

    var _map = function (arr, iterator) {
        if (arr.map) {
            return arr.map(iterator);
        }
        var results = [];
        _each(arr, function (x, i, a) {
            results.push(iterator(x, i, a));
        });
        return results;
    };

    var _reduce = function (arr, iterator, memo) {
        if (arr.reduce) {
            return arr.reduce(iterator, memo);
        }
        _each(arr, function (x, i, a) {
            memo = iterator(memo, x, i, a);
        });
        return memo;
    };

    var _keys = function (obj) {
        if (Object.keys) {
            return Object.keys(obj);
        }
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    //// exported async module functions ////

    //// nextTick implementation with browser-compatible fallback ////
    if (typeof process === 'undefined' || !(process.nextTick)) {
        if (typeof setImmediate === 'function') {
            async.nextTick = function (fn) {
                // not a direct alias for IE10 compatibility
                setImmediate(fn);
            };
            async.setImmediate = async.nextTick;
        }
        else {
            async.nextTick = function (fn) {
                setTimeout(fn, 0);
            };
            async.setImmediate = async.nextTick;
        }
    }
    else {
        async.nextTick = process.nextTick;
        if (typeof setImmediate !== 'undefined') {
            async.setImmediate = function (fn) {
              // not a direct alias for IE10 compatibility
              setImmediate(fn);
            };
        }
        else {
            async.setImmediate = async.nextTick;
        }
    }

    async.each = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        _each(arr, function (x) {
            iterator(x, only_once(function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed >= arr.length) {
                        callback(null);
                    }
                }
            }));
        });
    };
    async.forEach = async.each;

    async.eachSeries = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        var iterate = function () {
            iterator(arr[completed], function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed >= arr.length) {
                        callback(null);
                    }
                    else {
                        iterate();
                    }
                }
            });
        };
        iterate();
    };
    async.forEachSeries = async.eachSeries;

    async.eachLimit = function (arr, limit, iterator, callback) {
        var fn = _eachLimit(limit);
        fn.apply(null, [arr, iterator, callback]);
    };
    async.forEachLimit = async.eachLimit;

    var _eachLimit = function (limit) {

        return function (arr, iterator, callback) {
            callback = callback || function () {};
            if (!arr.length || limit <= 0) {
                return callback();
            }
            var completed = 0;
            var started = 0;
            var running = 0;

            (function replenish () {
                if (completed >= arr.length) {
                    return callback();
                }

                while (running < limit && started < arr.length) {
                    started += 1;
                    running += 1;
                    iterator(arr[started - 1], function (err) {
                        if (err) {
                            callback(err);
                            callback = function () {};
                        }
                        else {
                            completed += 1;
                            running -= 1;
                            if (completed >= arr.length) {
                                callback();
                            }
                            else {
                                replenish();
                            }
                        }
                    });
                }
            })();
        };
    };


    var doParallel = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.each].concat(args));
        };
    };
    var doParallelLimit = function(limit, fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [_eachLimit(limit)].concat(args));
        };
    };
    var doSeries = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.eachSeries].concat(args));
        };
    };


    var _asyncMap = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (err, v) {
                results[x.index] = v;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    };
    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);
    async.mapLimit = function (arr, limit, iterator, callback) {
        return _mapLimit(limit)(arr, iterator, callback);
    };

    var _mapLimit = function(limit) {
        return doParallelLimit(limit, _asyncMap);
    };

    // reduce only has a series version, as doing reduce in parallel won't
    // work in many situations.
    async.reduce = function (arr, memo, iterator, callback) {
        async.eachSeries(arr, function (x, callback) {
            iterator(memo, x, function (err, v) {
                memo = v;
                callback(err);
            });
        }, function (err) {
            callback(err, memo);
        });
    };
    // inject alias
    async.inject = async.reduce;
    // foldl alias
    async.foldl = async.reduce;

    async.reduceRight = function (arr, memo, iterator, callback) {
        var reversed = _map(arr, function (x) {
            return x;
        }).reverse();
        async.reduce(reversed, memo, iterator, callback);
    };
    // foldr alias
    async.foldr = async.reduceRight;

    var _filter = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.filter = doParallel(_filter);
    async.filterSeries = doSeries(_filter);
    // select alias
    async.select = async.filter;
    async.selectSeries = async.filterSeries;

    var _reject = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (!v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.reject = doParallel(_reject);
    async.rejectSeries = doSeries(_reject);

    var _detect = function (eachfn, arr, iterator, main_callback) {
        eachfn(arr, function (x, callback) {
            iterator(x, function (result) {
                if (result) {
                    main_callback(x);
                    main_callback = function () {};
                }
                else {
                    callback();
                }
            });
        }, function (err) {
            main_callback();
        });
    };
    async.detect = doParallel(_detect);
    async.detectSeries = doSeries(_detect);

    async.some = function (arr, iterator, main_callback) {
        async.each(arr, function (x, callback) {
            iterator(x, function (v) {
                if (v) {
                    main_callback(true);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(false);
        });
    };
    // any alias
    async.any = async.some;

    async.every = function (arr, iterator, main_callback) {
        async.each(arr, function (x, callback) {
            iterator(x, function (v) {
                if (!v) {
                    main_callback(false);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(true);
        });
    };
    // all alias
    async.all = async.every;

    async.sortBy = function (arr, iterator, callback) {
        async.map(arr, function (x, callback) {
            iterator(x, function (err, criteria) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, {value: x, criteria: criteria});
                }
            });
        }, function (err, results) {
            if (err) {
                return callback(err);
            }
            else {
                var fn = function (left, right) {
                    var a = left.criteria, b = right.criteria;
                    return a < b ? -1 : a > b ? 1 : 0;
                };
                callback(null, _map(results.sort(fn), function (x) {
                    return x.value;
                }));
            }
        });
    };

    async.auto = function (tasks, callback) {
        callback = callback || function () {};
        var keys = _keys(tasks);
        if (!keys.length) {
            return callback(null);
        }

        var results = {};

        var listeners = [];
        var addListener = function (fn) {
            listeners.unshift(fn);
        };
        var removeListener = function (fn) {
            for (var i = 0; i < listeners.length; i += 1) {
                if (listeners[i] === fn) {
                    listeners.splice(i, 1);
                    return;
                }
            }
        };
        var taskComplete = function () {
            _each(listeners.slice(0), function (fn) {
                fn();
            });
        };

        addListener(function () {
            if (_keys(results).length === keys.length) {
                callback(null, results);
                callback = function () {};
            }
        });

        _each(keys, function (k) {
            var task = (tasks[k] instanceof Function) ? [tasks[k]]: tasks[k];
            var taskCallback = function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (args.length <= 1) {
                    args = args[0];
                }
                if (err) {
                    var safeResults = {};
                    _each(_keys(results), function(rkey) {
                        safeResults[rkey] = results[rkey];
                    });
                    safeResults[k] = args;
                    callback(err, safeResults);
                    // stop subsequent errors hitting callback multiple times
                    callback = function () {};
                }
                else {
                    results[k] = args;
                    async.setImmediate(taskComplete);
                }
            };
            var requires = task.slice(0, Math.abs(task.length - 1)) || [];
            var ready = function () {
                return _reduce(requires, function (a, x) {
                    return (a && results.hasOwnProperty(x));
                }, true) && !results.hasOwnProperty(k);
            };
            if (ready()) {
                task[task.length - 1](taskCallback, results);
            }
            else {
                var listener = function () {
                    if (ready()) {
                        removeListener(listener);
                        task[task.length - 1](taskCallback, results);
                    }
                };
                addListener(listener);
            }
        });
    };

    async.waterfall = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor !== Array) {
          var err = new Error('First argument to waterfall must be an array of functions');
          return callback(err);
        }
        if (!tasks.length) {
            return callback();
        }
        var wrapIterator = function (iterator) {
            return function (err) {
                if (err) {
                    callback.apply(null, arguments);
                    callback = function () {};
                }
                else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    var next = iterator.next();
                    if (next) {
                        args.push(wrapIterator(next));
                    }
                    else {
                        args.push(callback);
                    }
                    async.setImmediate(function () {
                        iterator.apply(null, args);
                    });
                }
            };
        };
        wrapIterator(async.iterator(tasks))();
    };

    var _parallel = function(eachfn, tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            eachfn.map(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            eachfn.each(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.parallel = function (tasks, callback) {
        _parallel({ map: async.map, each: async.each }, tasks, callback);
    };

    async.parallelLimit = function(tasks, limit, callback) {
        _parallel({ map: _mapLimit(limit), each: _eachLimit(limit) }, tasks, callback);
    };

    async.series = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            async.mapSeries(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            async.eachSeries(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.iterator = function (tasks) {
        var makeCallback = function (index) {
            var fn = function () {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            };
            fn.next = function () {
                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
            };
            return fn;
        };
        return makeCallback(0);
    };

    async.apply = function (fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            return fn.apply(
                null, args.concat(Array.prototype.slice.call(arguments))
            );
        };
    };

    var _concat = function (eachfn, arr, fn, callback) {
        var r = [];
        eachfn(arr, function (x, cb) {
            fn(x, function (err, y) {
                r = r.concat(y || []);
                cb(err);
            });
        }, function (err) {
            callback(err, r);
        });
    };
    async.concat = doParallel(_concat);
    async.concatSeries = doSeries(_concat);

    async.whilst = function (test, iterator, callback) {
        if (test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.whilst(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.doWhilst = function (iterator, test, callback) {
        iterator(function (err) {
            if (err) {
                return callback(err);
            }
            if (test()) {
                async.doWhilst(iterator, test, callback);
            }
            else {
                callback();
            }
        });
    };

    async.until = function (test, iterator, callback) {
        if (!test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.until(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.doUntil = function (iterator, test, callback) {
        iterator(function (err) {
            if (err) {
                return callback(err);
            }
            if (!test()) {
                async.doUntil(iterator, test, callback);
            }
            else {
                callback();
            }
        });
    };

    async.queue = function (worker, concurrency) {
        if (concurrency === undefined) {
            concurrency = 1;
        }
        function _insert(q, data, pos, callback) {
          if(data.constructor !== Array) {
              data = [data];
          }
          _each(data, function(task) {
              var item = {
                  data: task,
                  callback: typeof callback === 'function' ? callback : null
              };

              if (pos) {
                q.tasks.unshift(item);
              } else {
                q.tasks.push(item);
              }

              if (q.saturated && q.tasks.length === concurrency) {
                  q.saturated();
              }
              async.setImmediate(q.process);
          });
        }

        var workers = 0;
        var q = {
            tasks: [],
            concurrency: concurrency,
            saturated: null,
            empty: null,
            drain: null,
            push: function (data, callback) {
              _insert(q, data, false, callback);
            },
            unshift: function (data, callback) {
              _insert(q, data, true, callback);
            },
            process: function () {
                if (workers < q.concurrency && q.tasks.length) {
                    var task = q.tasks.shift();
                    if (q.empty && q.tasks.length === 0) {
                        q.empty();
                    }
                    workers += 1;
                    var next = function () {
                        workers -= 1;
                        if (task.callback) {
                            task.callback.apply(task, arguments);
                        }
                        if (q.drain && q.tasks.length + workers === 0) {
                            q.drain();
                        }
                        q.process();
                    };
                    var cb = only_once(next);
                    worker(task.data, cb);
                }
            },
            length: function () {
                return q.tasks.length;
            },
            running: function () {
                return workers;
            }
        };
        return q;
    };

    async.cargo = function (worker, payload) {
        var working     = false,
            tasks       = [];

        var cargo = {
            tasks: tasks,
            payload: payload,
            saturated: null,
            empty: null,
            drain: null,
            push: function (data, callback) {
                if(data.constructor !== Array) {
                    data = [data];
                }
                _each(data, function(task) {
                    tasks.push({
                        data: task,
                        callback: typeof callback === 'function' ? callback : null
                    });
                    if (cargo.saturated && tasks.length === payload) {
                        cargo.saturated();
                    }
                });
                async.setImmediate(cargo.process);
            },
            process: function process() {
                if (working) return;
                if (tasks.length === 0) {
                    if(cargo.drain) cargo.drain();
                    return;
                }

                var ts = typeof payload === 'number'
                            ? tasks.splice(0, payload)
                            : tasks.splice(0);

                var ds = _map(ts, function (task) {
                    return task.data;
                });

                if(cargo.empty) cargo.empty();
                working = true;
                worker(ds, function () {
                    working = false;

                    var args = arguments;
                    _each(ts, function (data) {
                        if (data.callback) {
                            data.callback.apply(null, args);
                        }
                    });

                    process();
                });
            },
            length: function () {
                return tasks.length;
            },
            running: function () {
                return working;
            }
        };
        return cargo;
    };

    var _console_fn = function (name) {
        return function (fn) {
            var args = Array.prototype.slice.call(arguments, 1);
            fn.apply(null, args.concat([function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (typeof console !== 'undefined') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    }
                    else if (console[name]) {
                        _each(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            }]));
        };
    };
    async.log = _console_fn('log');
    async.dir = _console_fn('dir');
    /*async.info = _console_fn('info');
    async.warn = _console_fn('warn');
    async.error = _console_fn('error');*/

    async.memoize = function (fn, hasher) {
        var memo = {};
        var queues = {};
        hasher = hasher || function (x) {
            return x;
        };
        var memoized = function () {
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            var key = hasher.apply(null, args);
            if (key in memo) {
                callback.apply(null, memo[key]);
            }
            else if (key in queues) {
                queues[key].push(callback);
            }
            else {
                queues[key] = [callback];
                fn.apply(null, args.concat([function () {
                    memo[key] = arguments;
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) {
                      q[i].apply(null, arguments);
                    }
                }]));
            }
        };
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
    };

    async.unmemoize = function (fn) {
      return function () {
        return (fn.unmemoized || fn).apply(null, arguments);
      };
    };

    async.times = function (count, iterator, callback) {
        var counter = [];
        for (var i = 0; i < count; i++) {
            counter.push(i);
        }
        return async.map(counter, iterator, callback);
    };

    async.timesSeries = function (count, iterator, callback) {
        var counter = [];
        for (var i = 0; i < count; i++) {
            counter.push(i);
        }
        return async.mapSeries(counter, iterator, callback);
    };

    async.compose = function (/* functions... */) {
        var fns = Array.prototype.reverse.call(arguments);
        return function () {
            var that = this;
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            async.reduce(fns, args, function (newargs, fn, cb) {
                fn.apply(that, newargs.concat([function () {
                    var err = arguments[0];
                    var nextargs = Array.prototype.slice.call(arguments, 1);
                    cb(err, nextargs);
                }]))
            },
            function (err, results) {
                callback.apply(that, [err].concat(results));
            });
        };
    };

    var _applyEach = function (eachfn, fns /*args...*/) {
        var go = function () {
            var that = this;
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            return eachfn(fns, function (fn, cb) {
                fn.apply(that, args.concat([cb]));
            },
            callback);
        };
        if (arguments.length > 2) {
            var args = Array.prototype.slice.call(arguments, 2);
            return go.apply(this, args);
        }
        else {
            return go;
        }
    };
    async.applyEach = doParallel(_applyEach);
    async.applyEachSeries = doSeries(_applyEach);

    async.forever = function (fn, callback) {
        function next(err) {
            if (err) {
                if (callback) {
                    return callback(err);
                }
                throw err;
            }
            fn(next);
        }
        next();
    };

    // AMD / RequireJS
    if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return async;
        });
    }
    // Node.js
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = async;
    }
    // included directly via <script> tag
    else {
        root.async = async;
    }

}());

}).call(this,require("/home/leiko/dev/kevoree-js/library/kevoree-node-javascript/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/home/leiko/dev/kevoree-js/library/kevoree-node-javascript/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":19}],17:[function(require,module,exports){

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

}).call(this,require("/home/leiko/dev/kevoree-js/library/kevoree-node-javascript/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/home/leiko/dev/kevoree-js/library/kevoree-node-javascript/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":19}],21:[function(require,module,exports){
module.exports.Resolver      = require('./lib/Resolver');
module.exports.Bootstrapper  = require('./lib/Bootstrapper');
module.exports.KevoreeLogger = require('./lib/KevoreeLogger');
module.exports.FileSystem    = require('./lib/FileSystem');
},{"./lib/Bootstrapper":22,"./lib/FileSystem":23,"./lib/KevoreeLogger":24,"./lib/Resolver":25}],22:[function(require,module,exports){
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
},{"pseudoclass":39}],23:[function(require,module,exports){
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
},{"pseudoclass":39}],24:[function(require,module,exports){
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
},{"chalk":26,"pseudoclass":39}],25:[function(require,module,exports){
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
},{"./KevoreeLogger":24,"pseudoclass":39}],26:[function(require,module,exports){
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

},{"ansi-styles":27,"has-color":28,"strip-ansi":29}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

}).call(this,require("/home/leiko/dev/kevoree-js/library/kevoree-node-javascript/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/home/leiko/dev/kevoree-js/library/kevoree-node-javascript/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":19}],29:[function(require,module,exports){
'use strict';
module.exports = function (str) {
	return typeof str === 'string' ? str.replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g, '') : str;
};

},{}],30:[function(require,module,exports){
exports.KevoreeEntity       = require('./lib/KevoreeEntity');
exports.AbstractGroup       = require('./lib/AbstractGroup');
exports.AbstractChannel     = require('./lib/AbstractChannel');
exports.AbstractNode        = require('./lib/AbstractNode');
exports.AbstractComponent   = require('./lib/AbstractComponent');
exports.Port                = require('./lib/Port');
},{"./lib/AbstractChannel":31,"./lib/AbstractComponent":32,"./lib/AbstractGroup":33,"./lib/AbstractNode":34,"./lib/KevoreeEntity":36,"./lib/Port":38}],31:[function(require,module,exports){
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
},{"./KevoreeEntity":36}],32:[function(require,module,exports){
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
},{"./KevoreeEntity":36,"./KevoreeUI":37,"./Port":38}],33:[function(require,module,exports){
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
},{"./KevoreeEntity":36}],34:[function(require,module,exports){
var KevoreeEntity = require('./KevoreeEntity');

/**
 * AbstractNode entity
 *
 * @type {AbstractNode} extends KevoreeEntity
 */
module.exports = KevoreeEntity.extend({
    toString: 'AbstractNode'
});
},{"./KevoreeEntity":36}],35:[function(require,module,exports){
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
},{"events":18,"kevoree-library":"xt4+u2","pseudoclass":39}],36:[function(require,module,exports){
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
},{"./Dictionary":35,"pseudoclass":39}],37:[function(require,module,exports){
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
},{"events":18,"fs":17,"kevoree-commons":21,"path":20,"pseudoclass":39}],38:[function(require,module,exports){
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
},{"pseudoclass":39}],39:[function(require,module,exports){
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

},{}]},{},["+j62Bo"]);