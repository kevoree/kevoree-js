var Logger = require('./../lib/KevoreeLogger');

var log = new Logger('MyTag');

function doLog(level) {
    level = level || 0;
    log.setLevel(level);

    log.debug('This is a debug');
    log.info('This is an info');
    log.warn('This is a warn');
    log.error('This is a error');

    log.debug('VeryLongTagToMessWithLogger', 'This is a debug');
    log.info('NewTag', 'This is an info');
    log.warn('MMMMWWWWWMMMMWWWW', 'This is a warn');
    log.error('Potato With Spaces', 'This is a error');
}

console.log('============= Level Logger.ALL');
doLog(Logger.ALL);
console.log('============= Level Logger.DEBUG');
doLog(Logger.DEBUG);
console.log('============= Level Logger.INFO');
doLog(Logger.INFO);
console.log('============= Level Logger.WARN');
doLog(Logger.WARN);
console.log('============= Level Logger.ERROR');
doLog(Logger.ERROR);
console.log('============= Level Logger.QUIET');
doLog(Logger.QUIET);

console.log('\n');

console.log('============= Filter "NewTag", Level Logger.ALL');
log.setFilter('NewTag');
doLog(Logger.ALL);
console.log('============= Filter "", Level Logger.ALL');
log.setFilter('');
doLog(Logger.ALL);
console.log('============= Filter "Potato With Spaces", Level Logger.ERROR');
log.setFilter('Potato With Spaces');
doLog(Logger.ERROR);