// Created by leiko on 10/09/14 14:16
var chalk = require('chalk');
var fs = require('fs');
var pushModel = require('../post');

function post(argv, callback) {
    if (argv.h) {
        post.help();
        callback(null);
    } else {
        if (argv._.length <= 1) {
            post.help();
            callback(null);
        } else {
            var type = argv.t ? argv.t : 'json';
            var host = argv.host ? argv.host : 'registry.kevoree.org';
            var port = argv.port ? argv.port : 80;

            fs.readFile(argv._[1], 'utf8', function (err, modelData) {
                if (err) {
                    callback(err);
                } else {
                    pushModel({model: modelData, type: type, host: host, port: port}, function (err) {
                        if (err) {
                            callback(err);
                        } else {
                            process.stdout.write(chalk.green('Post')+' '+argv._[1]);
                            process.stdout.write('\n');
                            callback(null);
                        }
                    });
                }
            });
        }
    }
}

post.help = function () {
    process.stdout.write('Usage:');
    process.stdout.write('\n\n');
    process.stdout.write('    '+chalk.cyan('kevoree-registry')+' '+chalk.yellow('post')+' path/to/your/model [<options>]');
    process.stdout.write('\n\n');
    process.stdout.write('Options:');
    process.stdout.write('\n\n');
    process.stdout.write('    -t, --type=TYPE       Model type TYPE = [json (default), xmi, trace]');
    process.stdout.write('\n');
    process.stdout.write('    --host                Kevoree registry host (default: registry.kevoree.org)');
    process.stdout.write('\n');
    process.stdout.write('    --port                Kevoree registry port (default: 80)');
    process.stdout.write('\n');
};

module.exports = post;