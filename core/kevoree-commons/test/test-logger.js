var Logger = require('./../lib/KevoreeLogger');

var log = new Logger('MyTag');

function doLog(level) {
    log.setLevel(level);

    log.info('This is an info');
    log.debug('This is a debug');
    log.warn('This is a warn');
    log.error('This is a error');

    log.info('NewTag', 'This is an info');
    log.debug('VeryLongTagToMessWithLogger', 'This is a debug');
    log.warn('MMMMWWWWWMMMMWWWW', 'This is a warn');
    log.error('Potato With Space', 'This is a error');
}

console.log('============= Level Logger.ALL');
doLog(Logger.ALL);
console.log('============= Level Logger.INFO');
doLog(Logger.INFO);
console.log('============= Level Logger.DEBUG');
doLog(Logger.DEBUG);
console.log('============= Level Logger.WARN');
doLog(Logger.WARN);
console.log('============= Level Logger.ERROR');
doLog(Logger.ERROR);
console.log('============= Level Logger.QUIET');
doLog(Logger.QUIET);