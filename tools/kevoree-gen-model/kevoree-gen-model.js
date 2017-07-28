'use strict';

var path = require('path'),
  fs = require('fs'),
  chalk = require('chalk'),
  Table = require('cli-table'),
  generator = require('./lib/generator'),
  kevoree = require('kevoree-library');

module.exports = function (dirPath, quiet, callback) {
  if (typeof (quiet) === 'function') {
    callback = quiet;
    quiet = false;
  }

  if (typeof (quiet) === 'undefined') {
    quiet = false;
  }

  /**
   * Handles Error object
   * @param err
   */
  function errHandler(err) {
    process.stderr.write(chalk.red('Model generation failed!') + '\n');

    switch (err.code) {
      default:
        case 'PARSE_FAIL':
        if (!quiet) {
          process.stderr.write('\n' + err.stack + '\n');
        }
      break;

      case 'ENOENT':
          if (!quiet) {
            process.stderr.write('\n' + err.stack.replace('ENOENT, lstat ', 'unable to find ') + '\n');
          }
        break;
    }
    callback(err);
  }

  /**
   * Handles generation logs & file
   * @param model
   * @param pkg
   * @param tdef
   * @param deployUnit
   */
  function genLogsAndFile(model, pkg, tdef, deployUnit) {
    var descMeta = tdef.findMetaDataByID('description');
    var desc = chalk.gray.italic('-none-');
    if (descMeta) {
      if (descMeta.value.length > 50) {
        desc = descMeta.value.substr(0, 50) + '...';
      } else {
        desc = descMeta.value;
      }
    }

    console.log(chalk.yellow('TypeDefinition'));
    console.log('     ' + chalk.gray('namespace ') + pkg);
    console.log('     ' + chalk.gray('name      ') + tdef.name);
    console.log('     ' + chalk.gray('version   ') + tdef.version);
    console.log('     ' + chalk.gray('desc      ') + desc);
    console.log();

    if (tdef.dictionaryType) {
      // dictionary logging
      var dicTable = new Table({
        head: [chalk.yellow('Dictionary'), chalk.cyan('Datatype'), chalk.cyan('Default value'), chalk.cyan('Optional?'), chalk.cyan('Fragmented?')]
      });
      tdef.dictionaryType.attributes.array.forEach(function (attr) {
        dicTable.push([
          attr.name,
          attr.datatype,
          attr.defaultValue ? attr.defaultValue : chalk.gray.italic('-none-'),
          attr.optional ? chalk.green('✔'):chalk.yellow('✘'),
          attr.fragmentDependant ? chalk.green('✔'):chalk.yellow('✘')
        ]);
      });
      if (dicTable.length > 0) {
        console.log(dicTable.toString());
      }
    }

    if (tdef.provided) {
      // inputs port logging
      var inputs = tdef.provided.array.map(function (port) {
        return chalk.white(port.name);
      });
      if (inputs.length > 0) {
        var inputsTable = new Table({
          head: [chalk.yellow('Inputs')].concat(inputs)
        });
        console.log(inputsTable.toString());
      }
    }
    if (tdef.required) {
      // outputs port logging
      var outputs = tdef.required.array.map(function (port) {
        return chalk.white(port.name);
      });
      if (outputs.length > 0) {
        var outputsTable = new Table({
          head: [chalk.yellow('Outputs')].concat(outputs)
        });
        console.log(outputsTable.toString());
      }
    }

    console.log();
    console.log(chalk.yellow('DeployUnit'));
    console.log('     ' + chalk.gray('hashcode  ') + deployUnit.hashcode);
    console.log('     ' + chalk.gray('name      ') + deployUnit.name);
    console.log('     ' + chalk.gray('version   ') + deployUnit.version);
    console.log('     ' + chalk.gray('platform  ') + deployUnit.findFiltersByID('platform').value);

    if (!quiet) {
      process.stdout.write((!quiet ? '\n' : '') + chalk.green('Model generation done'));
    }

    var factory = new kevoree.factory.DefaultKevoreeFactory(),
      jsonSerializer = factory.createJSONSerializer(),
      filepath = path.resolve(dirPath, 'kevlib.json'),
      prettyModel = JSON.stringify(JSON.parse(jsonSerializer.serialize(model)), null, 4);

    fs.writeFile(filepath, prettyModel, function (err) {
      if (err) {
        errHandler(err);
      } else {
        if (!quiet) {
          console.log('\nModel saved at %s', path.relative(process.cwd(), filepath));
        }
        callback();
      }
    });
  }

  fs.lstat(dirPath, function (err, stats) {
    if (err) {
      errHandler(err);
    } else {
      if (stats.isFile() || stats.isDirectory()) {
        if (stats.isFile()) {
          dirPath = path.resolve(dirPath, '..'); // use this file's folder as root folder
        }

        // execute model generator
        try {
          generator(dirPath, quiet, function (err, model, pkg, tdef, deployUnit) {
            if (err) {
              errHandler(err);
            } else {
              genLogsAndFile(model, pkg, tdef, deployUnit);
            }
          });
        } catch (err) {
          errHandler(err);
        }
      } else {
        errHandler(new Error('You should give the path to a folder in argument'));
      }
    }
  });
};
