const React = require('react');
const config = require('tiny-conf');
const kevoree = require('kevoree-library');
const KevScript = require('kevoree-kevscript');
const LoggerService = require('./logger-service');
const Editor = require('./editor');
const Logger = require('./logger');
const Model = require('./model');

const DEFAULT_REGISTRY = new URL('https://registry.kevoree.org');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.factory = new kevoree.factory.DefaultKevoreeFactory();
    this.serializer = this.factory.createJSONSerializer();
    this.loader = this.factory.createJSONLoader();
    const model = this.factory.createContainerRoot().withGenerated_KMF_ID('0.0');
    this.factory.root(model);

    this.state = {
      model,
      defaultScript: `add node0: JavascriptNode
add node0.ticker: Ticker
add node0.printer: ConsolePrinter
add chan: LocalChannel

bind node0.ticker.tick chan
bind node0.printer.input chan`
    };
  }

  componentWillMount() {
    this.loggerService = new LoggerService();
    this.kevs = new KevScript(this.loggerService);
  }

  onLintSuccess({ warnings, model }) {
    this.loggerService.info('=== Interpretation OK ===');
    this.setState({ model });
    if (warnings.length) {
      warnings.forEach((warn) => {
        this.loggerService.warn(warn.message);
      });
    }
  }

  onLintError(error) {
    this.loggerService.error('=== Interpretation NOK ===');
    if (error.warnings.length) {
      error.warnings.forEach((warn) => {
        this.loggerService.warn(warn.message);
      });
    }
    this.loggerService.error(error);
  }

  getModel() {
    return this.state.model;
  }

  reset() {
    this.loggerService.debug('Reset: empty script & model');
    const model = this.factory.createContainerRoot().withGenerated_KMF_ID('0.0');
    this.factory.root(model);
    this.setState({ model, defaultScript: '' });
  }

  clearLogs() {
    this.loggerService.clear();
  }

  render() {
    let jsonModel = null;
    if (this.state.model) {
      jsonModel = JSON.stringify(JSON.parse(this.serializer.serialize(this.state.model)), null, 2);
    }

    return (
      <div>
        <div className="header">
          <h2>KevScript demo</h2>
          <div className="panel">
            {/*<input type="text" name="registry" placeholder="http://registry.kevoree.org" onChange={(event) => this.changeRegistry(event.target.value)} />*/}
            <button onClick={() => this.reset()}>Reset</button>
            <button onClick={() => this.clearLogs()}>Clear logs</button>
          </div>
        </div>
        <div className="container">
          <div className="left-panel">
            <div className="editor-container">
              <Editor
                kevs={this.kevs}
                defaultScript={this.state.defaultScript}
                getModel={() => this.getModel()}
                onLintSuccess={(result) => this.onLintSuccess(result)}
                onLintError={(err) => this.onLintError(err)} />
            </div>
            <Logger logger={this.loggerService} />
          </div>
          <div className="right-panel">
            <div className="model-container">
              <Model model={jsonModel} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function updateConfig(url) {
  config.set('registry.host', url.host);
  config.set('registry.port', url.port ? url.port : (url.protocol === 'https:') ? 443 : 80);
  config.set('registry.ssl',  (url.protocol === 'https:'));
}

updateConfig(DEFAULT_REGISTRY);

module.exports = App;
