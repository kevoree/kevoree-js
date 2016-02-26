//#!/usr/bin/env node
import * as commander from 'commander';
import * as chalk from 'chalk';
import { tmpdir } from 'os';
import { readFile } from 'fs';
import { LoggerFactory, LogLevel } from 'kevoree-logger';

import { Runtime } from '../main/runtime';
var pkg = require('./../../package.json');

var program: any = commander
    .command('kevoreejs')
    .version(pkg.version)
    .option('-n, --node <name>', 'This runtime will be identified with this node name', 'node0')
    .option('-p, --install-path <path>', 'Where the Deploy Units will be installed', tmpdir())
    .option('-l, --log-level <DEBUG|INFO|WARN|ERROR|QUIET>', 'The logger level (before the node changes it)', 'INFO')
    .option('-j, --json <path>', 'A JSON model file to start on')
    .option('-k, --kevscript <path>', 'A KevScript model file to start on')
    .parse(process.argv);

var log = LoggerFactory.createLogger((<any> Runtime).name, 'runtime');
if (program.logLevel) {
    switch (program.logLevel.toUpperCase()) {
        case 'DEBUG':
            log.setLevel(LogLevel.DEBUG);
            break;
        case 'INFO':
            log.setLevel(LogLevel.INFO);
            break;
        case 'WARN':
            log.setLevel(LogLevel.WARN);
            break;
        case 'ERROR':
            log.setLevel(LogLevel.ERROR);
            break;
        case 'QUIET':
            log.setLevel(LogLevel.QUIET);
            break;
        default:
            log.error(`Unknown log level "${program.logLevel}", available levels are DEBUG|INFO|WARN|ERROR|QUIET`);
            process.exit(1);
    }
}

// TODO check if there are -j or -k and if they are valid models
var modelPath = program.json || program.kevscript;
modelPath = program.kevscript || null;
if (modelPath) {
    readFile(modelPath, { encoding: 'utf8' }, (e: NodeJS.ErrnoException, data: string) => {
        if (e) {
            if (e.code === 'ENOENT') {
                log.error(`Unable to find the file "${modelPath}" (ENOENT)`);
            } else if (e.code === 'EACCES') {
                log.error(`Unable to read the file "${modelPath}" (EACCES)`);
            } else {
                log.error('Something went wrong');
                log.error(e.stack);
            }
        } else {
            log.debug(`File "${modelPath}" loaded successfully`);
            startRuntime(data);
        }
    });
}

function startRuntime(model: string) {
    var runtime = new Runtime();
    runtime.start(program.node, (e: Error) => {
        if (e) {
            // TODO proper error log
            throw e;
        } else {
            // ok started
        }
    });
}
