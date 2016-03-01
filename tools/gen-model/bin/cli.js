#!/usr/bin/env node

var minimist = require('minimist');
var fs = require('fs');
var path = require('path');

var model = require('../built/main/GenModel');
var pkg = require('../package.json');

var argv = minimist(process.argv.slice(2), {
  'default': {
    p: process.cwd()
  },
  'boolean': ['h', 'v'],
  'string': ['p'],
  'alias': {
    h: 'help',
    p: 'path',
    v: 'version'
  }
});

if (argv.h) {
  var help = '\n' +
  '  Usage: kevoree-gen-model [options]\n\n' +
  '  Options:\n\n' +
  '    -h, --help      output usage information\n' +
  '    -v, --version   output the version number\n' +
  '    -p, --path <.>  Where to save the generated file (default: current directory)\n';
  console.log(help);
} else if (argv.v) {
  console.log(pkg.version);
} else {
  var dir = path.resolve(argv.p);
  var g = new model.GenModel();
  g.generate(dir, function (err, model) {
      if (err) {
          throw err;
      } else {
          var modelPath = path.join(dir, 'kevlib.json');
          fs.writeFile(modelPath, model + '\n', 'utf8', function (err) {
              if (err) {
                  throw err;
              } else {
                  console.log('Kevoree model successfully generated: '+path.relative(process.cwd(), modelPath));
              }
          });
      }
  });
}
