'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

var ENTITY_TYPES = ['comp', 'chan', 'group'],
    ENTITY_REAL_TYPES = {
      comp:  'AbstractComponent',
      chan:  'AbstractChannel',
      group: 'AbstractGroup'
    };

var KevoreeGenerator = module.exports = function KevoreeGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(KevoreeGenerator, yeoman.generators.Base);

KevoreeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'entityType',
      message: 'What kind of entity would you like to create? ('+ENTITY_TYPES.join('|')+')',
      choices: ENTITY_TYPES,
      validate: function (answer) {
        if (ENTITY_TYPES.indexOf(answer) != -1) return true;
        else return 'Choose between ('+ENTITY_TYPES.join('|')+')';
      }
    },
    {
      name: 'entityName',
      message: 'Choose a name for this entity? (Java camel case naming convention)',
      validate: function (answer) {
        var pattern = /[A-Z][\w]*/;
        if (matcher(answer, pattern)) return true;
        else return 'Allowed pattern for name is '+pattern.toString();
      }
    }
  ];

  this.prompt(prompts, function (props) {
    this.rawEntityType = props.entityType;
    this.entityType    = ENTITY_REAL_TYPES[this.rawEntityType];
    this.entityName    = props.entityName;

    cb();
  }.bind(this));
};

KevoreeGenerator.prototype.app = function app() {
  this.mkdir('lib');
  this.template('_package.json', 'package.json');
  this.template('_README.md', 'README.md');
  if (this.rawEntityType == 'comp') {
    this.template('_Gruntfile.js', 'Gruntfile.js');
    this.mkdir('ui');
  }
  this.template('entities/_'+this.entityType+'.js', 'lib/'+this.entityName+'.js');
  this.template('_kevoree-letype-lename.js', 'kevoree-'+this.rawEntityType+'-'+ _.slugify(this.entityName)+'.js');
};

var matcher = function matcher(input, pattern) {
  var match = input.match(pattern);
  if (match && match.length && match.length == 1 && match[0] == input) return true;
  return false;
}
