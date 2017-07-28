#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var config = require('tiny-conf');
var KevScript = require('./../lib/KevScript');
var kevoree = require('kevoree-library');
var kConst = require('kevoree-const');
var optimist = require('optimist').usage('Usage: echo "add node0: JavascriptNode" | $0')
	// -c, --ctxModel
		.alias('c', 'ctxModel').describe('ctxModel', 'A context model to apply KevScript on')
	// --ctxVar
		.describe('ctxVar', 'A context variable to replace a %NAME% in the script (usage: --ctxVar NAME=foo)')
	// --log.level
		.describe('log.level', 'Change logger level (ALL|DEBUG|INFO|WARN|ERROR|QUIET) (default: INFO)')
		.describe('h', 'Display help');

require('tiny-conf-plugin-file')(config, kConst.CONFIG_PATH);
require('tiny-conf-plugin-argv')(config);

config.set('cache', {
	root: path.join(kConst.CONFIG_PATH, '..', 'tdefs'),
	ttl: 1000 * 60 * 60 * 24 // 24 hours
});

if (optimist.argv.h) {
	console.log(optimist.help());
} else {
	var script = '';
	process.stdin.on('data', function (data) {
		script += data;
	});
	process.stdin.on('end', function () {
		var factory = new kevoree.factory.DefaultKevoreeFactory();
		var serializer = factory.createJSONSerializer();
		var logger = {
			info: function () {},
			debug: function () {},
			warn: function () {},
			error: function () {},
			setLevel: function () {},
			setFilter: function () {}
		};

		var registryResolver = KevScript.Resolvers.registryResolverFactory(logger);
		var fsResolver = KevScript.Resolvers.fsResolverFactory(logger, registryResolver);
		var modelResolver = KevScript.Resolvers.modelResolverFactory(logger, fsResolver);
		var rootResolver = KevScript.Resolvers.tagResolverFactory(logger, modelResolver);

		var kevs = new KevScript(logger, { resolver: rootResolver });
		var ctxVars = {};
		if (optimist.argv.ctxVar) {
			[].concat(optimist.argv.ctxVar).forEach(function(ctxvar) {
				var data = ctxvar.split('=');
				ctxVars[data[0]] = data[1];
			});
		}

		function onKevScriptInterpreted(err, model, warnings) {
			if (err) {
				if (err.nt) {
					console.log(chalk.red('Unable to parse KevScript'));
					console.log('Unexpected token "' + err.nt + '" (l' + err.line + ':' + err.col + ')');
				} else {
					console.log(chalk.red('KevScript execution error'));
					console.log(err.stack);
				}
				process.exit(1);
			} else {
				warnings.forEach(function (warn) {
					console.log(chalk.yellow(warn));
				});

				try {
					var modelStr = JSON.stringify(JSON.parse(serializer.serialize(model)), null, 2);
					console.log(modelStr);
				} catch (err) {
					console.log(chalk.red('Unable to serialize generated model') + '\n' + err.stack);
				}
			}
		}

		if (optimist.argv.c) {
			var loader = factory.createJSONLoader();
			fs.readFile(path.resolve(optimist.argv.c), 'utf8', function(err, ctxModelSrc) {
				if (err) {
					console.log(chalk.red('Unable to read context model file') + '\n' + err.stack);
					process.exit(1);
				} else {
					try {
						kevs.parse(script, loader.loadModelFromString(ctxModelSrc).get(0), ctxVars, onKevScriptInterpreted);
					} catch (err) {
						console.log(chalk.red('Unable to load context model') + '\n' + err.stack);
						process.exit(1);
					}
				}
			});
		} else {
			kevs.parse(script, null, ctxVars, onKevScriptInterpreted);
		}
	});
}
