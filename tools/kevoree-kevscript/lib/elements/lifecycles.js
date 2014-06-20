/**
 * Created by leiko on 20/06/14.
 */
module.exports = function (model) {
    var str = '';
    var toStop = [];

    function addElems(instances) {
        while (instances.hasNext()) {
            var instance = instances.next();
            if (!instance.started) {
                // instance is stopped => add to toStop array
                if (instance.host) {
                    toStop.push(instance.host.name+'.'+instance.name);
                } else {
                    toStop.push(instance.name);
                }
                // if instance has components => check for their state too
                if (instance.components) {
                    addElems(instance.components.iterator());
                }
                // if instance has hosts => check for their state too
                if (instance.hosts) {
                    addElems(instance.hosts.iterator());
                }
            }
        }
    }

    addElems(model.nodes.iterator());
    addElems(model.groups.iterator());
    addElems(model.hubs.iterator());

    // generate statement
    if (toStop.length > 0) {
        str = 'stop ' + toStop.join(', ');
    }

    return str;
};