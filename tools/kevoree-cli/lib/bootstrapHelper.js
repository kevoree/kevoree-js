const hbsTemplates = require('./hbs-templates');

function bootstrapHelper(kevs, options, callback) {
  if (options.model) {
    if (options.model.findNodesByID(options.nodeName)) {
      callback(null, options.model);
    } else {
      callback(new Error('Unable to find node instance "' + options.nodeName + '" in given model.'));
    }
  } else {
    // generates a default model
    const script = hbsTemplates.render('bootstrap', options);
    options.logger.warn('No bootstrap model given, using default:\n' + script);
    kevs.parse(script)
      .then(({ model }) => callback(null, model))
      .catch(callback);
  }
}

module.exports = bootstrapHelper;
