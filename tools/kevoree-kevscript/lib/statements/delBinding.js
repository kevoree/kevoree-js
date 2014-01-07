module.exports = function (model, statements, stmt, opts, cb) {
  var port = statements[stmt.children[0].type](model, statements, stmt.children[0], opts, cb);
  var chan = statements[stmt.children[1].type](model, statements, stmt.children[1], opts, cb);

  function unbindPortFromChan2(portName, comp, node, chanName) {
    var bindings = model.mBindings.iterator();
    while (bindings.hasNext()) {
      var binding = bindings.next();
      if (binding.port.portTypeRef.name === portName &&              // binding's port matches portName
        binding.port.eContainer().name === comp.name &&              // port's component matches comp.name
        binding.port.eContainer().eContainer().name === node.name && // component's container matches node.name
        binding.hub.name === chanName) {                             // binding's hub name matches chanName
        model.removeMBindings(binding);
      }
    }
  }

  function unbindPortFromChan1(portName, comp, node, chanName) {
    if (portName === '*') {
      var inputRefs = comp.typeDefinition.provided.iterator();
      var outputRefs = comp.typeDefinition.required.iterator();

      while (inputRefs.hasNext()) {
        unbindPortFromChan2(inputRefs.next().name, comp, node, chanName);
      }

      while (outputRefs.hasNext()) {
        unbindPortFromChan2(outputRefs.next().name, comp, node, chanName);
      }

    } else {
      unbindPortFromChan2(portName, comp, node, chanName);
    }
  }

  function unbindPortFromChan0(portName, compName, node, chanName) {
    if (compName === '*') {
      var compz = node.components.iterator();
      while (compz.hasNext()) {
        unbindPortFromChan1(portName, compz.next(), node, chanName);
      }

    } else {
      var comp = node.findComponentsByID(compName);
      if (comp) {
        unbindPortFromChan1(portName, comp, node, chanName);
      } else {
        return cb(new Error('Unable to find component instance "'+compName+'" in node instance "'+node.name+'" (unbind '+port.toString()+' '+chan.toString()+')'));
      }
    }
  }

  function preUnbindProcess(chanInst) {
    port.expect(3, 4, function (err, namespace, nodeName, compName, portName) {
      if (err) {
        err.message += ' (unbind '+port.toString()+' '+chan.toString()+')';
        return cb(err);
      }

      if (namespace) {
        // TODO
        return cb(new Error('Namespaces are not handled yet :/ Sorry (unbind '+port.toString()+' '+chan.toString()+')'));

      } else {
        if (nodeName === '*') {
          var nodes = model.nodes.iterator();
          while (nodes.hasNext()) {
            unbindPortFromChan0(portName, compName, nodes.next(), chanInst.name);
          }

        } else {
          var node = model.findNodesByID(nodeName);
          if (node) {
            unbindPortFromChan0(portName, compName, node, chanInst.name);
          } else {
            return cb(new Error('Unable to find node instance "'+nodeName+'" in model (unbind '+port.toString()+' '+chan.toString()+')'));
          }
        }
      }
    });
  }

  chan.expect(1, 2, function (err, namespace, name) {
    if (err) {
      err.message += ' (unbind '+port.toString()+' '+chan.toString()+')';
      return cb(err);
    }

    if (namespace) {
      // TODO
      return cb(new Error('Namespaces are not handled yet :/ Sorry (unbind '+port.toString()+' '+chan.toString()+')'));

    } else {
      if (name === '*') {
        var chanz = model.hubs.iterator();
        while (chanz.hasNext()) {
          preUnbindProcess(chanz.next());
        }

      } else {
        var chanInst = model.findHubsByID(name);
        if (chanInst) {
          preUnbindProcess(chanInst);
        } else {
          return cb(new Error('Unable to find channel instance "'+name+'" in model (unbind '+port.toString()+' '+chan.toString()+')'));
        }
      }
    }
  });

  cb();
}