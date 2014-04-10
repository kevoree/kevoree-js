/**
 * Created by leiko on 10/04/14.
 */
module.exports = function (model) {
    var bindings = model.mBindings.iterator();

    var str = '';
    while (bindings.hasNext()) {
        var binding = bindings.next();
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
};