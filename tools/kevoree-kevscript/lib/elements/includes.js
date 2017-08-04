function includes(model) {
  const tdefs = model.typeDefinitions.iterator();
  let str = '';
  while (tdefs.hasNext()) {
    const du = tdefs.next().deployUnit;
    let type = 'mvn';
    if (du.type === 'npm') {
      type = 'npm';
    }

    let def = '';
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
}

module.exports = includes;
