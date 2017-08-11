const CodeMirror = require('codemirror');

CodeMirror.registerHelper('lint', 'kevscript', validator);

const TOKENS = [
  'repoToken',
  'includeToken',
  'addToken',
  'removeToken',
  'moveToken',
  'setToken',
  'attachToken',
  'detachToken',
  'networkToken',
  'bindToken',
  'unbindToken',
  'namespaceToken',
  'startToken',
  'stopToken',
  'pauseToken',
  'comment'
];

function validator(kevs, getModel, ctxVars) {
  return (text, updateLinting, options, cm) => {
    CodeMirror.signal(cm, 'lintStart');
    let start = 0;
    const lines = text.split('\n').map((line, i) => {
      const obj = {
        index: i,
        start: start,
        end: start + line.length,
      };
      start += line.length + 1;
      return obj;
    });

    kevs.parse(text, getModel(), ctxVars)
      .then(({ model, warnings }) => {
        const lintErrors = [];
        options.lintedModel = model;

        warnings.forEach((warning) => {
          lintErrors.push({
            severity: 'warning',
            message: warning.message,
            from: CodeMirror.Pos(findLine(warning.pos[0], lines), relativeToLine(warning.pos[0], lines)),
            to: CodeMirror.Pos(findLine(warning.pos[1], lines), relativeToLine(warning.pos[1], lines))
          });
        });

        return { lintErrors, model };
      })
      .catch((err) => {
        const lintErrors = [];
        if (err.parser) {
          let message = 'Unable to match \'' + err.parser.nt + '\'';
          if (err.parser.nt === 'ws') {
            message = 'Unable to match \'whitespace\'';
          } else if (err.parser.nt === 'kevScript') {
            message = 'A line must start with a statement (add, attach, set, etc.)';
          } else if (TOKENS.indexOf(err.parser.nt) >= 0) {
            message = 'Expected statement or comment (do you mean \'' + (err.parser.nt.split('Token').shift()) + '\'?)';
          }
          lintErrors.push({
            severity: 'error',
            message: message,
            from: CodeMirror.Pos(err.parser.line - 1, (err.parser.col === 0) ? 0 : err.parser.col - 1),
            to: CodeMirror.Pos(err.parser.line - 1, (err.parser.col === 0) ? 1 : err.parser.col)
          });
        } else {
          if (err.pos) {
            lintErrors.push({
              severity: 'error',
              message: err.message,
              from: CodeMirror.Pos(findLine(err.pos[0], lines), relativeToLine(err.pos[0], lines)),
              to: CodeMirror.Pos(findLine(err.pos[1], lines), relativeToLine(err.pos[1], lines))
            });
          }
        }

        if (err.warnings) {
          err.warnings.forEach((warning) => {
            lintErrors.push({
              severity: 'warning',
              message: warning.message,
              from: CodeMirror.Pos(findLine(warning.pos[0], lines), relativeToLine(warning.pos[0], lines)),
              to: CodeMirror.Pos(findLine(warning.pos[1], lines), relativeToLine(warning.pos[1], lines))
            });
          });
        }

        return { error: err, lintErrors };
      })
      .then(({ error, lintErrors, model }) => {
        CodeMirror.signal(cm, 'lintDone', {
          error,
          model,
          warnings: lintErrors.filter((error) => error.severity === 'warning'),
        });
        updateLinting(cm, lintErrors);
      });
  };
}

function findLine(pos, lines) {
  for (let i = 0; i < lines.length; i++) {
    if ((pos >= lines[i].start) && (pos <= lines[i].end)) {
      return lines[i].index;
    }
  }
  return -1;
}

function relativeToLine(ch, lines) {
  let val = 0;
  for (let i = 0; i < lines.length; i++) {
    const tmp = val + (lines[i].end - lines[i].start) + 1; // + 1 is for \n
    if (tmp > ch) {
      return ch - val;
    } else {
      val = tmp;
    }
  }
  return ch - val;
}
