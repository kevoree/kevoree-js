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
    // common files & dirs for all entities
    this.mkdir('lib');
    this.template('entities/_'+this.entityType+'.js', 'lib/'+this.entityName+'.js');
    this.template('_README.md', 'README.md');
    this.mkdir('kevs');

    // type dependant config
    switch (this.rawEntityType) {
        case 'comp':
            this.mkdir('ui');
            this.copy('compGruntfile.js', 'Gruntfile.js');
            this.template('_compPackage.json', 'package.json');
            this.template('_compMain.kevs', 'kevs/main.kevs');
            break;

        case 'chan':
            this.copy('defaultGruntfile.js', 'Gruntfile.js');
            this.template('_defaultPackage.json', 'package.json');
            this.template('_chanMain.kevs', 'kevs/main.kevs');
            break;

        case 'group':
            this.copy('defaultGruntfile.js', 'Gruntfile.js');
            this.template('_defaultPackage.json', 'package.json');
            this.template('_groupMain.kevs', 'kevs/main.kevs');
            break;
    }
};

function matcher(input, pattern) {
    var match = input.match(pattern);
    return (match && match.length && match.length == 1 && match[0] == input);
}
