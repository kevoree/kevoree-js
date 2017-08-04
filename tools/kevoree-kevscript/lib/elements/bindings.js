function bindings(model) {
  const bindings = model.mBindings.iterator();

  let str = '';
  while (bindings.hasNext()) {
    const binding = bindings.next();
    if (str.length !== 0) {
      str += '\n';
    }

    str += 'bind ' +
      binding.port.eContainer().eContainer().name + '.' +
      binding.port.eContainer().name + '.' +
      binding.port.name + ' ' +
      binding.hub.name;
  }

  return str;
}

module.exports = bindings;
