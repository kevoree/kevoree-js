const CodeMirror = require('codemirror');
const config = require('tiny-conf');
const KevScript = require('kevoree-kevscript');
const kevoree = require('kevoree-library');
const logger = require('./logger');

config.set('registry', {
  host: 'registry.kevoree.org',
  port: 443,
  ssl: true
});

require('codemirror/lib/codemirror.css');
require('codemirror/addon/mode/simple');
require('codemirror/addon/lint/lint');
require('codemirror/addon/lint/lint.css');
require('codemirror/addon/hint/show-hint');
require('codemirror/addon/hint/show-hint.css');
require('../src/mode/kevscript');
require('../src/theme/kevscript.css');
require('../src/lint/lint');
require('../src/hint/hint');
require('../src/hint/hint.css');

const factory = new kevoree.factory.DefaultKevoreeFactory();
const kevs = new KevScript(logger);
const ctxVars = {};

function getModel() {
  const model = factory.createContainerRoot().withGenerated_KMF_ID('0.0');
  factory.root(model);
  return model;
}

const elem = document.getElementById('editor');
CodeMirror.hint.kevscript.async = true;
const editor = CodeMirror.fromTextArea(elem, {
  mode: 'kevscript',
  theme: 'kevscript',
  lineWrapping: true,
  lineNumbers: true,
  styleActiveLine: true,
  extraKeys: {
    'Ctrl-Space': function (cm) {
      cm.showHint({
        hint: CodeMirror.hint.kevscript,
        getModel: getModel,
        completeSingle: false,
        alignWithWord: false
      });
    },
  },
  gutters: ['CodeMirror-lint-markers'],
  lint: {
    getAnnotations: CodeMirror.lint.kevscript(kevs, getModel, ctxVars),
    async: true
  }
});

editor.on('lintDone', ({ error, warnings, model }) => {
  console.log('Lint done');
  if (error) {
    console.log(' => NOK');
    console.log(' - warnings:', warnings);
    console.log(' - error:', error);
  } else {
    console.log(' => OK');
    console.log(' - warnings:', warnings);
    console.log(' - model:', model);
  }
});

editor.setValue('add node0: JavascriptNode/LATEST/LATEST' +
  '\nadd node0.ticker: Ticker/LATEST/LATEST' +
  '\nadd node0.printer: ConsolePrinter/LATEST/LATEST' +
  '\nadd chan: LocalChannel/LATEST/LATEST' +
  '\n\nbind node0.ticker.tick chan' +
  '\nbind node0.printer.input chan');
