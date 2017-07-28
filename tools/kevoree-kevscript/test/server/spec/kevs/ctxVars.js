const assert = require('assert');
const readKevs = require('../../lib/readKevs');

describe('KevScript - ctxVars', function () {
  require('../../init')(this);

  // it('simple.kevs', () => {
  // 	const script = readKevs('ctxVars/simple.kevs');
  // 	return new Promise((resolve, reject) => {
  // 		const ctxVars = {
  // 			node: 'foo'
  // 		};
  // 		this.kevs.parse(script, null, ctxVars, (err, model) => {
  // 			if (err) {
  // 				reject(err);
  // 			} else {
  // 				setTimeout(() => {
  // 					assert.ok(model.findNodesByID(ctxVars.node));
  // 					resolve();
  // 				});
  // 			}
  // 		});
  // 	});
  // });
  //
  // it('component.kevs', () => {
  // 	const script = readKevs('ctxVars/component.kevs');
  // 	return new Promise((resolve, reject) => {
  // 		const ctxVars = {
  // 			comp: 'ticker'
  // 		};
  // 		this.kevs.parse(script, null, ctxVars, (err, model) => {
  // 			if (err) {
  // 				reject(err);
  // 			} else {
  // 				setTimeout(() => {
  // 					const node = model.findNodesByID('node');
  // 					assert.ok(node.findComponentsByID(ctxVars.comp));
  // 					resolve();
  // 				});
  // 			}
  // 		});
  // 	});
  // });
  //
  // it('multiple.kevs', () => {
  // 	const script = readKevs('ctxVars/multiple.kevs');
  // 	return new Promise((resolve, reject) => {
  // 		const ctxVars = {
  // 			node0: 'foo',
  // 			node1: 'bar'
  // 		};
  // 		this.kevs.parse(script, null, ctxVars, (err, model) => {
  // 			if (err) {
  // 				reject(err);
  // 			} else {
  // 				setTimeout(() => {
  // 					assert.ok(model.findNodesByID(ctxVars.node0));
  // 					assert.ok(model.findNodesByID(ctxVars.node1));
  // 					resolve();
  // 				});
  // 			}
  // 		});
  // 	});
  // });
  //
  // it('set.kevs', () => {
  // 	const script = readKevs('ctxVars/set.kevs');
  // 	return new Promise((resolve, reject) => {
  // 		const ctxVars = {
  // 			LEVEL: 'DEBUG'
  // 		};
  // 		this.kevs.parse(script, null, ctxVars, (err, model) => {
  // 			if (err) {
  // 				reject(err);
  // 			} else {
  // 				setTimeout(() => {
  // 					const node = model.findNodesByID('node');
  // 					const logLevelParam = node.dictionary.findValuesByID('logLevel');
  // 					assert.equal(logLevelParam.value, ctxVars.LEVEL);
  // 					resolve();
  // 				});
  // 			}
  // 		});
  // 	});
  // });
  //
  // it('set-in-string.kevs', () => {
  // 	const script = readKevs('ctxVars/set-in-string.kevs');
  // 	return new Promise((resolve, reject) => {
  // 		const ctxVars = {
  // 			LEVEL: 'DEBUG'
  // 		};
  // 		this.kevs.parse(script, null, ctxVars, (err, model) => {
  // 			if (err) {
  // 				reject(err);
  // 			} else {
  // 				setTimeout(() => {
  // 					const node = model.findNodesByID('node');
  // 					const logLevelParam = node.dictionary.findValuesByID('logLevel');
  // 					// assert that even if something looks like a ctxVar in a string it won't be transformed
  // 					assert.equal(logLevelParam.value, '%LEVEL%');
  // 					resolve();
  // 				});
  // 			}
  // 		});
  // 	});
  // });
  //
  // it('network.kevs', () => {
  // 	const script = readKevs('ctxVars/network.kevs');
  // 	return new Promise((resolve, reject) => {
  // 		const ctxVars = {
  // 			ip: '1.2.3.4'
  // 		};
  // 		this.kevs.parse(script, null, ctxVars, (err, model) => {
  // 			if (err) {
  // 				reject(err);
  // 			} else {
  // 				setTimeout(() => {
  // 					const node = model.findNodesByID('node');
  // 					const network = node.findNetworkInformationByID('foo').findValuesByID('bar');
  // 					assert.equal(network.value, ctxVars.ip);
  // 					resolve();
  // 				});
  // 			}
  // 		});
  // 	});
  // });
  //
  // it('tdef-version.kevs', () => {
  // 	const script = readKevs('ctxVars/tdef-version.kevs');
  // 	return new Promise((resolve, reject) => {
  // 		const ctxVars = {
  // 			TDEF_VERS: '42'
  // 		};
  // 		this.kevs.parse(script, null, ctxVars, (err, model) => {
  // 			if (err) {
  // 				reject(err);
  // 			} else {
  // 				setTimeout(() => {
  // 					const node = model.findNodesByID('node');
  // 					assert.equal(node.typeDefinition.version, ctxVars.TDEF_VERS);
  // 					resolve();
  // 				});
  // 			}
  // 		});
  // 	});
  // });

  it('du-version.kevs', () => {
    const script = readKevs('ctxVars/du-version.kevs');
    const ctxVars = {
      DU_VERS: 'RELEASE'
    };
    return this.kevs.parse(script, null, ctxVars)
      .then(({ model }) => {
        const node = model.findNodesByID('node');
        assert.equal(node.typeDefinition.select('deployUnits[]/filters[name=platform,value=js]').array[0].eContainer().version, '5.4.0');
      });
  });
});
