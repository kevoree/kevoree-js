const instances = require('./elements/instances');
const attaches = require('./elements/attaches');
const lifecycles = require('./elements/lifecycles');
const bindings = require('./elements/bindings');
const sets = require('./elements/sets');
const networks = require('./elements/networks');

/**
 * Created by leiko on 10/04/14.
 */
module.exports = function modelInterpreter(model) {
  const blocks = [
		// order matters !
		// repos(model),
		//        includes(model),
		instances(model),
		lifecycles(model),
		attaches(model),
		bindings(model),
		sets(model),
		networks(model)
	];

  let kevscript = '';
  for (const i in blocks) {
    if (blocks.hasOwnProperty(i)) {
      kevscript += blocks[i];
      if (blocks[i].length > 0) {
        kevscript += '\n\n';
      }
    }
  }

  return kevscript.replace(/^([\n\t\r])+/, '').replace(/([\n\t\r])+$/, '\n');
};
