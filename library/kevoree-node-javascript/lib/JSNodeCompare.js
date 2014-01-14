var Class = require('pseudoclass');
var kevoree = require('kevoree-library').org.kevoree;
var Kotlin = require('kevoree-kotlin');

var JSNodeCompare = Class({
  toString: 'JSNodeCompare',
  
  construct: function (nodeName) {
    this.nodeName = nodeName;
    this.compare = new kevoree.compare.DefaultModelCompare();
  },
  
  plan: function (currentModel, targetModel, diffSeq) {
    var currentNode = currentModel.findNodesByID(this.nodeName);
    var targetNode = targetModel.findNodesByID(this.nodeName);
    
    function fillAdditional() {
      var hosts = targetNode.hosts.iterator();
      while (hosts.hasNext()) {
        var host = hosts.next();
        var previousNode = currentModel.findByPath(host.path());
        if (previousNode) {
          diffSeq.append(this.compare.diff(previousNode, host));
        } else {
          diffSeq.populate(host.toTraces(true, true));
        }
      }

      var groups = targetNode.groups.iterator();
      while (groups.hasNext()) {
        var group = groups.next();
        var previousGroup = currentModel.findByPath(group.path());
        if (previousGroup) {
          diffSeq.append(this.compare.diff(previousGroup, group));
        } else {
          diffSeq.populate(group.toTraces(true, true));
        }
      }

      // this process can really be slow
      var components = targetNode.components.iterator();
      while (components.hasNext()) {
        var comp = components.next();

        function fillPort(ports) {
          while (ports.hasNext()) {
            var port = ports.next();
            var bindings = port.bindings.iterator();
            while (bindings.hasNext()) {
              var binding = bindings.next();
              if (binding.hub) {
                var previousChannel = currentModel.findByPath(binding.hub.path());
                if (previousChannel) {
                  diffSeq.append(this.compare.diff(previousChannel, binding.hub));
                } else {
                  diffSeq.populate(binding.hub.toTraces(true, true));
                }
              }
            }
          }
        }
        fillPort.bind(this)(comp.provided.iterator());
        fillPort.bind(this)(comp.required.iterator());
      }
    }
    
    if (currentNode && targetNode) {
      fillAdditional.bind(this)();
    } else {
      if (targetNode) {
        fillAdditional.bind(this)();
      }
    }
  }
});

module.exports = JSNodeCompare;