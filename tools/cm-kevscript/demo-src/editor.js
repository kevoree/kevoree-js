const React = require('react');
const PropTypes = require('prop-types');
const CodeMirror = require('codemirror');
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

CodeMirror.hint.kevscript.async = true;

class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.ctxVars = {};
  }

  componentDidMount() {
    this.editor = CodeMirror.fromTextArea(this.elem, {
      mode: 'kevscript',
      theme: 'kevscript',
      lineWrapping: true,
      lineNumbers: true,
      styleActiveLine: true,
      extraKeys: {
        'Ctrl-Space': (cm) => {
          cm.showHint({
            hint: CodeMirror.hint.kevscript,
            getModel: () => this.props.getModel(),
            completeSingle: false,
            alignWithWord: false
          });
        },
      },
      gutters: ['CodeMirror-lint-markers'],
      lint: {
        getAnnotations: CodeMirror.lint.kevscript(
          this.props.kevs,
          () => this.props.getModel(),
          this.ctxVars
        ),
        async: true
      }
    });

    this.editor.on('lintDone', ({ error, warnings, model }) => {
      if (error) {
        this.props.onLintError(error);
      } else {
        this.props.onLintSuccess({ model, warnings });
      }
    });

    this.editor.setValue(this.props.defaultScript);
  }

  componentWillReceiveProps(newProps) {
    if (this.editor) {
      if (newProps.defaultScript !== this.props.defaultScript) {
        this.editor.setValue(newProps.defaultScript);
      }
    }
  }

  render() {
    return <textarea ref={(elem) => this.elem = elem}></textarea>;
  }
}

Editor.propTypes = {
  kevs: PropTypes.object,
  defaultScript: PropTypes.string,
  getModel: PropTypes.func,
  onLintSuccess: PropTypes.func,
  onLintError: PropTypes.func,
};

module.exports = Editor;
