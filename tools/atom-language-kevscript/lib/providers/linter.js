'use babel';

const TOKENS = ['repoToken', 'includeToken', 'addToken', 'removeToken', 'moveToken',
          'setToken', 'attachToken', 'detachToken', 'networkToken', 'bindToken',
          'unbindToken', 'namespaceToken', 'startToken', 'stopToken',
          'pauseToken', 'comment'];

export default {
  name: 'KevScript',
  grammarScopes: ['source.kevs'],
  scope: 'file',
  lintsOnChange: false,

  init(kScript, statusView) {
    this.kScript = kScript;
    this.statusView = statusView;
    console.log('linter initiated');
  },

  lint(textEditor) {
    const text = textEditor.getText();

    let start = 0;
    const lines = text.split('\n').map((line, i) => {
      const obj = {
        index: i,
        start: start,
        end: start + line.length
      };
      start += line.length + 1;
      return obj;
    });

    const ctxVars = {};
    const enabled = atom.config.get('language-kevscript.enableLinter');
    if (enabled) {
      const start = Date.now();
      this.statusView.setStatus('linting...');
      // ==== CODEMIRROR
      return this.kScript.parse(text, null, ctxVars)
        .then(({ warnings }) => {
          return warnings.map((warn) => {
            return {
              severity: 'warning',
              excerpt: warn.message,
              location: {
                file: textEditor.getPath(),
                position: [
                  [findLine(warn.pos[0], lines), relativeToLine(warn.pos[0], lines)],
                  [findLine(warn.pos[1], lines), relativeToLine(warn.pos[1], lines)]
                ],
              },
            };
          });
        })
        .catch((err) => {
          console.log('Interpretation error', err);

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
              excerpt: message,
              location: {
                file: textEditor.getPath(),
                position: [
                  [err.parser.line - 1, relativeToLine((err.parser.col === 0) ? 0 : err.parser.col - 1, lines)],
                  [err.parser.line - 1, relativeToLine((err.parser.col === 0) ? 1 : err.parser.col, lines)]
                ],
              },
            });
          } else {
            if (err.pos) {
              lintErrors.push({
                severity: 'error',
                excerpt: err.message,
                location: {
                  file: textEditor.getPath(),
                  position: [
                    [findLine(err.pos[0], lines), relativeToLine(err.pos[0], lines)],
                    [findLine(err.pos[1], lines), relativeToLine(err.pos[1], lines)]
                  ],
                },
              });
            }
          }

          if (err.warnings) {
            err.warnings.forEach((warning) => {
              lintErrors.push({
                severity: 'warning',
                excerpt: warning.message,
                location: {
                  file: textEditor.getPath(),
                  position: [
                    [findLine(warning.pos[0], lines), relativeToLine(warning.pos[0], lines)],
                    [findLine(warning.pos[1], lines), relativeToLine(warning.pos[1], lines)]
                  ],
                },
              });
            });
          }

          return lintErrors;
        })
        .then((lintErrors) => {
          const end = Date.now();
          this.statusView.setStatus('Linted (' + (end - start) + 'ms)');
          return lintErrors;
        });
    } else {
      this.statusView.setStatus('linter disabled');
      return Promise.resolve([]);
    }
  }
};

function relativeToLine(ch, lines) {
  let val = 0;
  for (let i = 0; i < lines.length; i++) {
    const tmp = val + (lines[i].end - lines[i].start) + 1; // + 1 is for \n
    if (tmp >= ch) {
      return ch - val;
    } else {
      val = tmp;
    }
  }
  return ch - val;
}

function findLine(pos, lines) {
  for (let i = 0; i < lines.length; i++) {
    if (pos >= lines[i].start && pos <= lines[i].end) {
      return lines[i].index;
    }
  }
  return -1;
}
