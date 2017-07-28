let content;

TinyConf.set('registry', {
	host: 'kevoree.braindead.fr',
	port: 443,
	ssl: true,
	oauth: {
		client_id: 'kevoree_registryapp',
		client_secret: 'kevoree_registryapp_secret'
	}
});

const KevoreeModuleLoader = {
	modules: {},
	register: function register(name, version, module) {
		this.modules[name + '@' + version] = module;
	},
	require: function require(name, version) {
		const module = this.modules[name + '@' + version];
		if (module) {
			return module;
		}
		throw new Error('KevoreeModule "' + name + '@' + version + '" not found');
	}
};

try {
	const CoreUI = React.createClass({
		displayName: 'CoreUI',

		getInitialState: function getInitialState() {
			return { logs: [], comp: null };
		},

		componentDidMount: function componentDidMount() {
			const self = this;
			const logger = {
				info: function info(tag, msg) {
					console.log(tag, msg);
					self.setState({
						logs: []
              .concat(self.state.logs)
              .concat({ level: 'info', tag: tag, msg: msg })
					});
				},
				debug: function debug(tag, msg) {
					console.info(tag, msg);
					self.setState({
						logs: []
              .concat(self.state.logs)
              .concat({ level: 'debug', tag: tag, msg: msg })
					});
				},
				warn: function debug(tag, msg) {
					console.warn(tag, msg);
					self.setState({
						logs: []
              .concat(self.state.logs)
              .concat({ level: 'warn', tag: tag, msg: msg })
					});
				},
				error: function debug(tag, msg) {
					console.error(tag, msg);
					self.setState({
						logs: []
              .concat(self.state.logs)
              .concat({ level: 'error', tag: tag, msg: msg })
					});
				},
				setLevel: function noop() {},
				setFilter: function noop() {}
			};
			const kevs = new KevoreeKevscript(logger);
			this.core = new KevoreeCore(kevs, '_fake_', logger);

			this.core.on('error', function onError(err) {
				console.error('Core error', err);
			});
			this.core.on('stopped', function onStop() {});

			this.core.setBootstrapper({
				name: 'BrowserResolver',
				bootstrapNodeType: function bootstrapNodeType(nodeName, model, done) {
					let meta;
					let err;
					const node = model.findNodesByID(nodeName);
					if (node) {
						meta = node.typeDefinition
              .select('deployUnits[]/filters[name=platform,value=js]');
						if (meta.size() > 0) {
							this.resolve(meta.get(0).eContainer(), false, done);
						} else {
							err = new Error('No DeployUnit found for ' + nodeName + ' that matches the \'js\' platform');
							done(err);
						}
					} else {
						err = new Error('Unable to find ' + nodeName + ' in given model');
						done(err);
					}
				},
				bootstrap: function bootstrap(du, forceInstall, done) {
					this.resolve(du, forceInstall, done);
				},
				resolve: function resolve(du, forceInstall, done) {
					const script = document.createElement('script');
					let srcPath;
					if (du.name === 'kevoree-comp-ticker') {
						srcPath = '/browser/' + du.name + '.js';
					} else {
						srcPath = 'https://unpkg.com/' + du.name + '@' + du.version + '/browser/' + du.name + '.js';
					}
					script.setAttribute('src', srcPath);
					script.async = true;
					script.onload = function onLoader() {
						document.body.removeChild(script);
						done(null, KevoreeModuleLoader.require(du.name, du.version));
					};
					script.onerror = function onError() {
						document.body.removeChild(script);
						done(new Error('Unable to load script ' + srcPath));
					};
					logger.debug(this.name, 'Resolving ' + du.name + '@' + du.version + '...');
					document.body.appendChild(script);
				},
				uninstall: function uninstall(du, done) {
					logger.debug(this.name, 'Uninstalling ' + du.name + '@' + du.version + '...');
					done();
				}
			});

			this.core.start();
			this.core.submitScript(
        'add node0: JavascriptNode/LATEST/LATEST\nadd node0.ticker: Ticker/LATEST/LATEST',
        function onDone(err) {
	if (!err) {
		self.setState({
			comp: this.core.nodeInstance.adaptationEngine.modelObjMapper.map['/nodes[node0]/components[ticker]']
		});
	}
});
		},

		renderLogs: function renderLogs() {
			return React.createElement('ul', { className: 'list' },
        this.state.logs.map(function mapHandler(log, i) {
	return React.createElement('li', { key: i, className: 'list-item level-' + log.level },
            React.createElement('div', { className: 'log-tag' }, log.tag),
            React.createElement('div', { className: 'log-msg' }, log.msg));
}));
		},

		renderComponent: function renderComponent() {
			let compUi = null;
			if (this.state.core) {
				compUi = this.state.core.ui();
			}
			return React.createElement('div', { className: 'component-container' }, compUi);
		},

		render: function render() {
			return React.createElement('div', {},
        this.renderLogs(),
        this.renderComponent());
		}
	});

	content = React.createElement('div', null,
    React.createElement(CoreUI, null));
} catch (err) {
	content = React.createElement('pre', null,
    React.createElement('code', null, err.stack));
}

ReactDOM.render(
  React.createElement('div', null,
    React.createElement('h3', { className: 'title' }, 'Ticker Browser Tests'),
    content),
  document.getElementById('root'));
