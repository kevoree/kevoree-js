import React from 'react';
import PropTypes from 'prop-types';

import CodeMirror from 'codemirror';
import 'codemirror/addon/mode/simple';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/hint/show-hint';
import 'cm-mode-kevscript/src/mode/kevscript';
import 'cm-mode-kevscript/src/lint/lint';
import 'cm-mode-kevscript/src/hint/hint';

import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/hint/show-hint.css';
import 'cm-mode-kevscript/src/theme/kevscript.css';
import 'cm-mode-kevscript/src/hint/hint.css';

import './KevScript.css';

export default class KevScript extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: props.defaultScript };
    this.ctxVars = {};
  }

  componentDidMount() {
    CodeMirror.hint.kevscript.async = true;
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
        if (this.props.onLintError) {
          this.props.onLintError(error);
        }
      } else {
        if (this.props.onLintSuccess) {
          this.props.onLintSuccess({ model, warnings });
        }
      }
    });

    this.editor.on('changes', (editor, changes) => {
      if (this.props.onChange) {
        this.props.onChange(editor.getValue());
      }
    });
  }

  render() {
    return (
      <textarea
        ref={(elem) => this.elem = elem}
        defaultValue={this.state.value}>
      </textarea>
    );
  }
}

KevScript.propTypes = {
  kevs: PropTypes.object.isRequired,
  defaultScript: PropTypes.string,
  getModel: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onLintSuccess: PropTypes.func,
  onLintError: PropTypes.func,
};
