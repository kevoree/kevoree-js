'use babel';

const fs = require('fs');
const path = require('path');

module.exports = {
  selector: '.source.kevs',
  disableForSelector: '.source.kevs .comment',
  statements: [],
  getSuggestions (arg) {
    let completions = [];
    const tagCompletions = this.getStatementCompletions({
      bufferPosition: arg.bufferPosition,
      editor: arg.editor,
      prefix: arg.prefix
    });
    completions = completions.concat(tagCompletions);
    return completions;
  },
  getStatementCompletions (arg) {
    const completions = [];
    if (arg.prefix) {
      for (let i = 0, len = this.statements.length; i < len; i++) {
        const statement = this.statements[i];
        if (statement.name.substr(0, 1).toLowerCase() === arg.prefix.substr(0, 1).toLowerCase()) {
          completions.push(this.buildStatementCompletion(statement));
        }
      }
    }
    return completions;
  },
  buildStatementCompletion (statement) {
    return {
      type: 'keyword',
      displayText: statement.name,
      description: statement.description,
      snippet: statement.snippet,
      rightLabel: ''
    };
  },
  dispose () {
    this.statements = null;
    return this.statements;
  },
  loadProperties () {
    const completions = path.resolve('..', '..', 'completions.json');
    fs.readFile(completions, (err, content) => {
      if (!err) {
        this.statements = JSON.parse(content).statements;
      }
    });
  }
};
