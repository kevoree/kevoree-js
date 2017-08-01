!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("KevoreeLibrary")):"function"==typeof define&&define.amd?define(["KevoreeLibrary"],t):"object"==typeof exports?exports.KevoreeCore=t(require("KevoreeLibrary")):e.KevoreeCore=t(e.KevoreeLibrary)}(this,function(e){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,r){"use strict";function n(e,t,r){if(!e||!t||!r)throw new Error("KevoreeCore constructor needs: Resolver, KevScript engine and a LoggerFactory");this.resolver=e,this.loggerFactory=r,this.log=r.create("Core"),this.kevs=t,this.stopping=!1,this.currentModel=null,this.deployModel=null,this.nodeName=null,this.nodeInstance=null,this.firstBoot=!0,this.scriptQueue=[],this.emitter=new l}function o(e){var t=0;if(0===e.length)return t+"";for(var r=0;r<e.length;r++){t=(t<<5)-t+e.charCodeAt(r),t&=t}return(268435455&t)+""}function i(e){return o((e.hub?e.hub.path():"UNDEFINED")+"_"+(e.port?e.port.path():"UNDEFINED"))}function s(e){e.mBindings.array.forEach(function(e){e.generated_KMF_ID=i(e)})}var a=r(1),l=r(2).EventEmitter,c=r(3),u=/^[\w]+$/;n.prototype={start:function(e){if(e&&0!==e.length||(e="node0"),!e.match(u))throw new Error("Platform node name must match this regex "+u.toString());this.nodeName=e;var t=new a.factory.DefaultKevoreeFactory;this.currentModel=t.createContainerRoot(),t.root(this.currentModel);var r=t.createContainerNode();r.name=this.nodeName,r.started=!1,this.currentModel.addNodes(r),this.loopId=setInterval(function(){},1e11),this.log.info("Platform node name: "+e)},stop:function(){var e=this;if(this.log.info("Stopping Kevoree..."),null===this.nodeInstance)return clearInterval(this.loopId),this.emitter.emit("stopped"),Promise.reject(new Error("Platform stopped before bootstrapped"));var t=new a.factory.DefaultKevoreeFactory,r=t.createModelCloner(),n=r.clone(this.currentModel,!1),o=n.findNodesByID(this.nodeName);if(o.started){o.started=!1;for(var i=o.hosts.iterator();i.hasNext();)i.next().delete();for(var s=o.groups.iterator();s.hasNext();)s.next().delete();for(var l=n.mBindings.iterator();l.hasNext();){var c=l.next();c.port.eContainer()&&c.port.eContainer().eContainer()&&c.port.eContainer().eContainer().name===o.name&&c.hub&&c.hub.delete()}for(var u=o.components.iterator();u.hasNext();)u.next().delete();return this.stopping=!0,this.deploy(n).then(function(){e.log.info("Platform stopped: "+e.nodeInstance.getName()),clearInterval(e.loopId),e.emitter.emit("stopped")}).catch(function(t){throw e.log.error(t),e.log.error("Something went wrong while stopping Kevoree. Force stop."),clearInterval(e.loopId),e.emitter.emit("stopped"),t})}},deploy:function(e){var t=this;return this.deployModel?(this.log.warn("New deploy process requested: aborted because another one is in process (retry later?)"),Promise.reject(new Error("New deploy process requested: aborted because another one is in process (retry later?)"))):(this.emitter.emit("deploying",e),e&&!e.findNodesByID(this.nodeName)?Promise.reject(new Error("Deploy model failure: unable to find "+this.nodeName+" in given model")):(this.log.debug((this.stopping?"Stopping":"Deploy")+" process started..."),e?this.checkBootstrapNode(e).then(function(){if(!t.nodeInstance)throw new Error("There is no instance to bootstrap on");var r=void 0;try{s(e);var n=new a.factory.DefaultKevoreeFactory,o=n.createModelCloner();t.deployModel=o.clone(e,!0),t.deployModel.setRecursiveReadOnly();var i=n.createModelCompare().diff(t.currentModel,t.deployModel);return r=t.nodeInstance.processTraces(i,t.deployModel),c(t,e,r)}catch(e){t.log.error(e.stack);var l=new Error("Something went wrong while creating adaptations (deployment ignored)");throw t.log.warn(l.message),t.deployModel=null,t.firstBoot?(t.log.warn("Shutting down Kevoree because bootstrap failed..."),t.emitter.emit("error",l),l):(t.emitter.emit("error",l),l)}},function(){return t.log.error("Unable to bootstrap '"+t.nodeName+"'"),t.deployModel=null,t.stop()}).catch(function(e){throw t.emitter.emit("error",e),e}):Promise.reject(new Error("Model is not defined or null. Deploy aborted."))))},submitScript:function(e){var t=this;if(null===this.deployModel)return this.kevs.parse(e,this.currentModel).then(function(e){var r=e.model;return t.deploy(r)}).then(function(){t.log.info("KevScript submission succeeded")}).catch(function(e){throw t.log.warn("KevScript submission threw an error"),t.log.warn(e.stack),e});var r=Promise.resolve();return this.scriptQueue.push({script:e,promise:r}),this.log.debug("Script added to queue at position "+this.scriptQueue.length-1),r},processScriptQueue:function(){var e=this;if(this.scriptQueue.length>0){var t=this.scriptQueue[0];this.scriptQueue.splice(0,1),this.log.debug("Core.processScriptQueue parsing "+t.script),t.promise.then(function(){return e.submitScript(t.script)})}},checkBootstrapNode:function(e){var t=this;if(this.nodeInstance)return Promise.resolve();this.log.debug("Start '"+this.nodeName+"' bootstrapping...");var r=e.findNodesByID(this.nodeName);if(r){var n=r.typeDefinition.select("deployUnits[]/filters[name=platform,value=js]");return n.size()>0?this.resolver.resolve(n.get(0).eContainer()).then(function(r){var n=e.findNodesByID(t.nodeName),o=t.currentModel.findNodesByID(t.nodeName);t.nodeInstance=new r(t,n,t.nodeName);var i=new a.factory.DefaultKevoreeFactory;o.dictionary=i.createDictionary().withGenerated_KMF_ID("0"),n.typeDefinition.dictionaryType&&n.typeDefinition.dictionaryType.attributes.array.forEach(function(e){if(!e.fragmentDependant){var r=i.createValue();r.name=e.name;n.dictionary.findValuesByID(r.name)||(r.value=e.defaultValue,o.dictionary.addValues(r),t.log.debug("Set default node param: "+r.name+"="+r.value))}})}).catch(function(e){throw t.log.error(e),new Error("Unable to bootstrap '"+t.nodeName+"'")}):Promise.reject(new Error("No DeployUnit found for '"+this.nodeName+"' that matches the 'js' platform"))}return Promise.reject(new Error("Unable to find '"+this.nodeName+"' in the given model."))},on:function(e,t){this.emitter.on(e,t)},once:function(e,t){this.emitter.once(e,t)},off:function(e,t){this.emitter.off(e,t)},getResolver:function(){return this.resolver},getCurrentModel:function(){return this.currentModel},getDeployModel:function(){return this.deployModel},getLastModel:function(){return this.deployModel?this.deployModel:this.currentModel},getNodeName:function(){return this.nodeName},getLoggerFactory:function(){return this.loggerFactory}},e.exports=n},function(t,r){t.exports=e},function(e,t){function r(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function n(e){return"function"==typeof e}function o(e){return"number"==typeof e}function i(e){return"object"==typeof e&&null!==e}function s(e){return void 0===e}e.exports=r,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._maxListeners=void 0,r.defaultMaxListeners=10,r.prototype.setMaxListeners=function(e){if(!o(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},r.prototype.emit=function(e){var t,r,o,a,l,c;if(this._events||(this._events={}),"error"===e&&(!this._events.error||i(this._events.error)&&!this._events.error.length)){if((t=arguments[1])instanceof Error)throw t;var u=new Error('Uncaught, unspecified "error" event. ('+t+")");throw u.context=t,u}if(r=this._events[e],s(r))return!1;if(n(r))switch(arguments.length){case 1:r.call(this);break;case 2:r.call(this,arguments[1]);break;case 3:r.call(this,arguments[1],arguments[2]);break;default:a=Array.prototype.slice.call(arguments,1),r.apply(this,a)}else if(i(r))for(a=Array.prototype.slice.call(arguments,1),c=r.slice(),o=c.length,l=0;l<o;l++)c[l].apply(this,a);return!0},r.prototype.addListener=function(e,t){var o;if(!n(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,n(t.listener)?t.listener:t),this._events[e]?i(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,i(this._events[e])&&!this._events[e].warned&&(o=s(this._maxListeners)?r.defaultMaxListeners:this._maxListeners)&&o>0&&this._events[e].length>o&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace()),this},r.prototype.on=r.prototype.addListener,r.prototype.once=function(e,t){function r(){this.removeListener(e,r),o||(o=!0,t.apply(this,arguments))}if(!n(t))throw TypeError("listener must be a function");var o=!1;return r.listener=t,this.on(e,r),this},r.prototype.removeListener=function(e,t){var r,o,s,a;if(!n(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(r=this._events[e],s=r.length,o=-1,r===t||n(r.listener)&&r.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(i(r)){for(a=s;a-- >0;)if(r[a]===t||r[a].listener&&r[a].listener===t){o=a;break}if(o<0)return this;1===r.length?(r.length=0,delete this._events[e]):r.splice(o,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},r.prototype.removeAllListeners=function(e){var t,r;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(r=this._events[e],n(r))this.removeListener(e,r);else if(r)for(;r.length;)this.removeListener(e,r[r.length-1]);return delete this._events[e],this},r.prototype.listeners=function(e){return this._events&&this._events[e]?n(this._events[e])?[this._events[e]]:this._events[e].slice():[]},r.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(n(t))return 1;if(t)return t.length}return 0},r.listenerCount=function(e,t){return e.listenerCount(t)}},function(e,t,r){"use strict";e.exports=function(e,t,r){var n=(new Date).getTime(),o=[];return r.reduce(function(t,r,n,i){return t.then(function(){return n>0&&o.unshift(i[n-1]),r.execute()}).catch(function(t){if(!e.stopping)throw t;e.log.error("Adaptation error while stopping core...\n"+t.stack)})},Promise.resolve()).then(function(){e.currentModel=t,e.deployModel=null,e.log.info((e.stopping?"Stop model":"Model")+" deployed successfully: "+r.length+" adaptations ("+((new Date).getTime()-n)+"ms)"),e.processScriptQueue(),e.firstBoot=!1;try{e.emitter.emit("deployed")}catch(t){e.log.error("Error catched\n"+t.stack)}}).catch(function(t){return t.message="Something went wrong while executing adaptations.\n"+t.message,e.log.error(t),e.firstBoot?(e.log.warn("Shutting down Kevoree because bootstrap failed..."),e.deployModel=null,e.stop()):o.reduce(function(e,t){return e.then(function(){return t.undo()})},Promise.resolve()).then(function(){e.log.info("Rollback succeed: "+o.length+" adaptations ("+((new Date).getTime()-n)+"ms)"),e.deployModel=null,e.emitter.emit("rollbackSucceed")}).catch(function(t){return t.message="Something went wrong while rollbacking. Process will exit.\n"+t.message,e.log.error(t),e.deployModel=null,e.emitter.emit("error",t),e.stop()})})}}])});