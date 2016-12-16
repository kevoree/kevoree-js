'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var semver = require('semver');
var validateNpmPkgName = require('validate-npm-package-name');

var classTypes = {
  component: 'AbstractComponent',
  node: 'AbstractNode',
  channel: 'AbstractChannel',
  group: 'AbstractGroup'
};

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.props = {};
  },

  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the groovy ' + chalk.red('generator-kevoree') + ' generator!'
    ));

    var prompts = [
      {
        type: 'list',
        name: 'type',
        choices: Object.keys(classTypes),
        message: 'What type of entity do you want to create?'
      },
      {
        type: 'input',
        name: 'name',
        message: function (props) {
          return 'What is your ' + props.type + ' name?';
        },
        validate: function (val) {
          if (val.match(/^[A-Z][\w]*$/)) {
            return true;
          }
          return 'The name must be PascalCased (eg. MyFooThing)';
        }
      },
      {
        type: 'input',
        name: 'version',
        default: 1,
        message: function (props) {
          return 'What is your ' + props.type + ' ' + props.name + ' version?';
        },
        validate: function (val) {
          if (parseInt(val, 10)) {
            return true;
          }
          return 'Type version must be a positive integer';
        }
      },
      {
        type: 'input',
        name: 'description',
        message: function (props) {
          return 'What is the purpose of your ' + props.type + ' ' + props.name + '?';
        },
        validate: function (val) {
          if (val.trim().length) {
            return true;
          }
          return 'You must give a description';
        }
      },
      {
        type: 'input',
        name: 'namespace',
        message: 'What is your Kevoree namespace?',
        validate: function (val) {
          var NS_REGEX = /^[a-z0-9]+(\\.[a-z0-9]+)*$/;
          if (val.match(NS_REGEX)) {
            if (val.length > 0 && val.length < 51) {
              return true;
            }
            return 'Namespace length must be > 0 and <= 50';
          }
          return 'Namespace is not valid (regex: ' + NS_REGEX + ')';
        }
      },
      {
        type: 'input',
        name: 'moduleName',
        message: 'What is your Node.js module name?',
        default: function (props) {
          return 'kevoree-comp-' + props.name.toLowerCase();
        },
        validate: function (val) {
          var res = validateNpmPkgName(val);
          if (res.validForNewPackages) {
            return true;
          }
          return res.errors;
        }
      },
      {
        type: 'input',
        name: 'moduleVersion',
        message: 'What is your Node.js module version?',
        default: '1.0.0-alpha',
        validate: function (val) {
          if (semver.valid(val)) {
            return true;
          }
          return val + ' is not a valid Semantic Version';
        }
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Author name?'
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author email?'
      },
      {
        type: 'input',
        name: 'repository',
        message: 'Repository?'
      },
      {
        type: 'input',
        name: 'license',
        message: 'License?',
        default: 'MIT'
      }
    ];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  default: function () {
    this.config.set(this.props);

    // enhance props
    this.props.classType = classTypes[this.props.type];
  },

  writing: function () {
    this.template(
      path.join('lib', '_' + this.props.type + '.ejs'),
      path.join('lib', this.props.name + '.js'),
      this.props
    );

    this.template(
      path.join('kevs', '_main_' + this.props.type + '.ejs'),
      path.join('kevs', 'main.kevs'),
      this.props
    );

    this.template('package.ejs', 'package.json', this.props);
    this.template('Gruntfile.ejs', 'Gruntfile.js', this.props);
  },

  install: function () {
    this.npmInstall();
  }
});
