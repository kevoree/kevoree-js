'use strict';

module.exports = function (model) {
  var tdefs = model.typeDefinitions.iterator();
  var str = '';
  while (tdefs.hasNext()) {
    var du = tdefs.next().deployUnit;
    var type = 'mvn';
    if (du.type === 'npm') {
      type = 'npm';
    }

    var def = '';
    if (du.groupName) {
      def += du.groupName + ':';
    }
    def += du.name + ':';
    def += du.version;

    if (str.indexOf(def) === -1) {
      if (str.length !== 0) {
        str += '\n';
      }
      str += '// DEPRECATED: include ' + type + ':' + def;
    }
  }

  return str;
};
