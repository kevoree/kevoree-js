const kevsTpl = require('../util/kevs-tpl');

/*
 * Called when a client disconnects or becomes unreachable
 */
module.exports = function unregister(logger, client2name, client, instance, normalClose) {
  const clientName = client2name[client.id];
  if (clientName) {
    // client is registered
    delete client2name[client.id];
    delete client.id;

    if (!normalClose) {
      // a registered node disconnected from master => execute onDisconnect kevscript if any
      let onDisconnectKevs = instance.getDictionary().getString('onDisconnect', instance.dic_onDisconnect.defaultValue).trim();
      if (onDisconnectKevs.length > 0) {
        onDisconnectKevs = kevsTpl(onDisconnectKevs, instance.getName(), clientName);
        logger.debug('submitting onDisconnect KevScript:');
        logger.debug(onDisconnectKevs);
        try {
          instance.getKevoreeCore().submitScript(onDisconnectKevs);
        } catch (err) {
          logger.warn('onDisconnect KevScript interpretation error: ' + instance.getName());
          logger.warn(err.stack);
        }
      }
    }
  }
};
