'use strict';

angular.module('app', [])
  .controller('Controller', function ($scope, $timeout) {
    $scope.logs = [];

    TinyConf.set('registry', {
      host: 'registry.kevoree.org',
      port: 443,
      ssl: true
    });

    var DEFAULT_TAG = 'BrowserTest';
    var kLogger = new KevoreeCommons.KevoreeLogger(DEFAULT_TAG);
    function log(type) {
      return function (tag, msg) {
        if (!msg) {
          msg = tag;
          tag = DEFAULT_TAG;
        }
        kLogger[type](tag, msg);
        var uiType = '';
        if (type === 'info') {
          uiType = 'default';
        } else if (type === 'debug') {
          uiType = 'info';
        } else if (type === 'warn') {
          uiType = 'warning';
        } else if (type === 'error') {
          uiType = 'danger';
        }
        $timeout(function () {
          if (tag.length > 20) {
            tag = tag.substr(0, 20) + '.';
          }
          $scope.logs.push({ type: uiType, tag: tag, msg: msg });
          setTimeout(function () {
            window.scrollTo(0, document.body.scrollHeight);
          }, 100);
        });
      };
    }
    var logger = {
      info: log('info'),
      error: log('error'),
      warn: log('warn'),
      debug: log('debug'),
      all: log('all'),
      setLevel: function () {},
      setFilter: function () {},
      toString: function () {
        return 'BrowserLogger';
      }
    };

    var KevoreeModuleLoader = window.KevoreeModuleLoader = {
      modules: {},
      register: function (name, version, module) {
        this.modules[name+'@'+version] = module;
      },
      require: function (name, version) {
        return this.modules[name+'@'+version];
      }
    };

    var kevs = new KevoreeKevscript(logger);
    var core = new KevoreeCore(kevs, '__FAKE_BROWSER_NODE_MODULES', logger);
    core.setBootstrapper(new KevoreeCommons.Bootstrapper(logger, {
      resolve: function (du, forceInstall, callback) {
        logger.debug(this.toString(), 'resolving ' + du.name + '@' + du.version + '...');
        var srcPath = `https://unpkg.com/${du.name}@${du.version}/browser/${du.name}.js`;
        var script = document.createElement('script');
        script.setAttribute('src', srcPath);
        script.async = true;
        script.onload = function () {
          document.body.removeChild(script);
          callback(null, KevoreeModuleLoader.require(du.name, du.version));
        };
        script.onerror = function () {
          document.body.removeChild(script);
          callback(new Error(`Unable to load script ${srcPath}`));
        };
        document.body.appendChild(script);
      },
      uninstall: function (du, callback) {
        logger.debug(this.toString(), 'uninstalling ' + du.name + '@' + du.version + '... (does nothing in browser ...)');
        callback();
      },
      toString: function () {
        return 'BrowserResolver';
      }
    }));

    core.start('node0');

    var script = 'add node0: JavascriptNode/LATEST/LATEST\n' +
      'set node0.logLevel = "DEBUG"\n' +
      'add sync: RemoteWSGroup/LATEST/LATEST\n' +
      'attach node0 sync\n' +
      'set sync.host = "ws.kevoree.org"\n' +
      'set sync.path = "1235484945645"\n';
    log('info')('Runtime', 'Starting runtime using:\n' + script);
    kevs.parse(script, function (err, model) {
      if (err) {
        log('error')('KevScript', err.message);
      } else {
        core.deploy(model);
      }
    });
  });
