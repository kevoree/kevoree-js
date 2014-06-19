function findChanNodeGroupByName(model, name) {
  function findByName(elem) {
    var elems = (model[elem]) ? model[elem].iterator() : null;
    if (elems != null) {
      while (elems.hasNext()) {
        var entity = elems.next();
        if (entity.name === name) return entity;
      }
    }
    return null;
  }

  return findByName('nodes') || findByName('groups') || findByName('hubs') || null;
}

function findComponent(model, nodeName, compName) {
  var node = model.findNodesByID(nodeName);
  if (node) {
    return node.findComponentsByID(compName);
  } else return null;
}

module.exports = {
  findEntityByName: findChanNodeGroupByName,
  findComponentByName: findComponent
};