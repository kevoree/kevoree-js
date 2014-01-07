var kevoree = require('kevoree-library').org.kevoree;
var factory = new kevoree.impl.DefaultKevoreeFactory();
var helper  = require('../model-helper');

module.exports = function (model, statements, stmt, opts, cb) {
  var attr, node, value;
  if (stmt.children.length === 2) {
    attr  = statements[stmt.children[0].type](model, statements, stmt.children[0], opts, cb);
    value = statements[stmt.children[1].type](model, statements, stmt.children[1], opts, cb);

  } else if (stmt.children.length === 3) {
    attr  = statements[stmt.children[0].type](model, statements, stmt.children[0], opts, cb);
    node  = statements[stmt.children[1].type](model, statements, stmt.children[1], opts, cb);
    value = statements[stmt.children[2].type](model, statements, stmt.children[2], opts, cb);
  }

  function setAttribute2(attrName, dictionary) {
    var dicValue = dictionary.findValuesByID(attrName);
    if (dicValue) {
      // dictionary value for attribute named attrName already exists: overwrite it
      dicValue.value = value;

    } else {
      // dictionary value for attribute named attrName does not exist yet: create it and add it if possible
      var attrs = dictionary.eContainer().typeDefinition.dictionaryType.attributes.iterator();
      while (attrs.hasNext()) {
        // by doing this, we will kinda fail silently if you are trying to set an inexisting
        // attribute value in one of the instances
        if (attrs.next().name === attrName) {
          dicValue = factory.createDictionaryValue();
          dicValue.name = attrName;
          dicValue.value = value;
          dictionary.addValues(dicValue);
          break;
        }
      }
    }
  }

  function setAttribute1(attrName, instance) {
    if (node) {
      // fragDep attribute
      node.expect(1, 2, function (err, namespace, nodeName) {
        if (err) {
          err.message += ' (set '+attr.toString()+'/'+node.toString()+' = '+value+')';
          return cb(err);
        }

        if (namespace) {
          // TODO
          return cb(new Error('Namespaces are not handled yet :/ Sorry (set '+attr.toString()+'/'+node.toString()+' = '+value+')'));

        } else {
          if (nodeName === '*') {
            var dics = instance.fragmentDictionary.iterator();
            while (dics.hasNext()) setAttribute2(attrName, dics.next());

          } else {
            var fragDic = instance.findFragmentDictionaryByID(nodeName);
            if (fragDic) {
              setAttribute2(attrName, fragDic);
            } else {
              // fragment dictionary needs to be created and added
              fragDic = factory.createFragmentDictionary();
              fragDic.name = nodeName;
              instance.addFragmentDictionary(fragDic);
              setAttribute2(attrName, fragDic);
            }
          }
        }
      });

    } else {
      // non fragDep attribute
      if (!instance.dictionary) instance.dictionary = factory.createDictionary();
      setAttribute2(attrName, instance.dictionary);
    }
  }

  function setAttribute0(attrName, instance) {
    if (attrName === '*') {
      var attrs = instance.typeDefinition.dictionaryType.attributes.iterator();
      while (attrs.hasNext()) {
        setAttribute1(attrs.next().name, instance);
      }

    } else {
      setAttribute1(attrName, instance);
    }
  }

  attr.expect(2, 3, function (err, namespace, instanceName, attrName) {
    if (err) {
      err.message += ' (set '+attr.toString()+((node) ? '/'+node.toString() : '')+' = '+value+')';
      return cb(err);
    }

    if (namespace) {
      // TODO
      return cb(new Error('Namespaces are not handled yet :/ Sorry (set '+attr.toString()+((node) ? '/'+node.toString() : '')+' = '+value+')'));

    } else {
      if (instanceName === '*') {
        var groups = model.groups.iterator();
        while (groups.hasNext()) setAttribute0(attrName, groups.next());

        var chans = model.hubs.iterator();
        while (chans.hasNext()) setAttribute0(attrName, chans.next());

        var nodes = model.nodes.iterator();
        while (nodes.hasNext()) {
          var node = nodes.next();
          setAttribute0(attrName, node);

          var comps = node.components.iterator();
          while (comps.hasNext()) setAttribute0(attrName, comps.next());
        }

      } else {
        var instance = helper.findEntityByName(model, instanceName);
        if (instance) {
          setAttribute0(attrName, instance);
        } else {
          return cb(new Error('Unable to find instance "'+instanceName+'" in model (set '+attr.toString()+((node) ? '/'+node.toString() : '')+' = '+value+')'));
        }
      }
    }
  });

  cb();
}