'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

var ENTITY_TYPES = ['comp', 'chan', 'group', 'node'],
    ENTITY_REAL_TYPES = {
        comp:  'AbstractComponent',
        chan:  'AbstractChannel',
        group: 'AbstractGroup',
        node:  'AbstractNode'
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
        },
        {
            name: 'kevoreePackage',
            message: 'Choose a package name for your module? (i.e my.package.name)',
            validate: function (answer) {
                var pattern = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*/g;
                if (matcher(answer, pattern)) return true;
                else return 'Allowed pattern for package is '+pattern.toString();
            }
        }
    ];

    this.prompt(prompts, function (props) {
        this.rawEntityType  = props.entityType;
        this.entityType     = ENTITY_REAL_TYPES[this.rawEntityType];
        this.kevoreePackage = props.kevoreePackage;
        this.entityName     = props.entityName;
        this.fqn            = this.entityName;
        if (this.kevoreePackage !== 'org.kevoree.library') {
            this.fqn = this.kevoreePackage + '.' + props.entityName;
        }

        this.prompt([
            {
                name: 'moduleName',
                message: 'Choose a module name:',
                default: 'kevoree-' + this.rawEntityType + '-' + _.slugify(this.entityName),
                validate: function (answer) {
                    var pattern = /[a-z0-9_-]+/;
                    if (matcher(answer, pattern)) return true;
                    else return 'Allowed pattern for module name is ' + pattern.toString();
                }
            }
        ], function (props) {
            this.moduleName = props.moduleName;

            if (this.rawEntityType === 'comp') {
                this.prompt([
                    {
                        name: 'browserCompat',
                        message: 'Do you plan on using this component with a browser runtime?',
                        type: 'confirm',
                        default: false
                    }
                ], function (props) {
                    this.browserCompat = props.browserCompat;
                    cb();

                }.bind(this));
            } else {
                cb();
            }

        }.bind(this));
    }.bind(this));
};

KevoreeGenerator.prototype.app = function app() {
    // common files & dirs for all entities
    this.mkdir('lib');
    this.template('_README.md', 'README.md');
    this.copy('_.npmignore', '.npmignore');
    this.mkdir('kevs');

    // type dependant config
    switch (this.rawEntityType) {
        case 'comp':
            if (this.browserCompat) {
                this.mkdir('ui');
                this.mkdir('resources/css');

                this.copy('compGruntfileUI.js', 'Gruntfile.js');
                this.template('_compPackageUI.json', 'package.json');
                this.template('entities/_'+this.entityType+'WithUI.js', 'lib/'+this.entityName+'.js');
                this.template('main.css', 'resources/css/main.css');
                this.template('view.jade', 'ui/view.jade');
            } else {
                this.template('entities/_'+this.entityType+'.js', 'lib/'+this.entityName+'.js');
                this.copy('compGruntfile.js', 'Gruntfile.js');
                this.template('_compPackage.json', 'package.json');
            }

            this.template('_compMain.kevs', 'kevs/main.kevs');
            break;

        case 'chan':
            this.template('entities/_'+this.entityType+'.js', 'lib/'+this.entityName+'.js');
            this.copy('defaultGruntfile.js', 'Gruntfile.js');
            this.template('_chanPackage.json', 'package.json');
            this.template('_chanMain.kevs', 'kevs/main.kevs');
            break;

        case 'group':
            this.template('entities/_'+this.entityType+'.js', 'lib/'+this.entityName+'.js');
            this.copy('defaultGruntfile.js', 'Gruntfile.js');
            this.template('_groupPackage.json', 'package.json');
            this.template('_groupMain.kevs', 'kevs/main.kevs');
            break;

        case 'node':
            this.template('entities/_'+this.entityType+'.js', 'lib/'+this.entityName+'.js');
            this.copy('defaultGruntfile.js', 'Gruntfile.js');
            this.template('_nodePackage.json', 'package.json');
            this.template('_nodeMain.kevs', 'kevs/main.kevs');
            break;
    }
};

function matcher(input, pattern) {
    var match = input.match(pattern);
    return (match && match.length && match.length == 1 && match[0] == input);
}
