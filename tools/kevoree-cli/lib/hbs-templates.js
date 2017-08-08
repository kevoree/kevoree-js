const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const Handlebars = require('handlebars');
const capitalize = require('./helpers/capitalize');
const is = require('./helpers/is');

Handlebars.registerHelper('helperMissing', function(/* [args, ] options */) {
  const options = arguments[arguments.length - 1];
  throw new Handlebars.Exception(`Unknown field "${options.name}" in template used for "${options.data.root}"`);
});

Handlebars.registerHelper('capitalize', capitalize);
Handlebars.registerHelper('is', is);

const templatesPath = path.resolve(__dirname, '..', '_templates');
const templates = fs
  .readdirSync(templatesPath)
  .reduce((templates, filename) => {
    const source = fs.readFileSync(path.join(templatesPath, filename), 'utf8');
    const tpl = Handlebars.compile(source);
    templates[filename.split('.')[0]] = tpl;
    return templates;
  }, {});

module.exports = {
  write(tpl, filepath, context) {
    const source = templates[tpl](context);
    mkdirp.sync(path.resolve(filepath, '..'));
    fs.writeFileSync(filepath, source, 'utf8');
    console.log(' ' + chalk.gray(filepath));
  }
};