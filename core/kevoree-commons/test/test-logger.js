var Logger = require('./../lib/KevoreeLogger');

var log = new Logger('MyTag');
log.info('This is an info');
log.debug('This is an debug');
log.warn('This is an warn');
log.error('This is an error');

log.info('NewTag', 'This is an info');
log.debug('VeryLongTagToMessWithLogger', 'This is an debug');
log.warn('MMMMWWWWWMMMMWWWW', 'This is an warn');
log.error('Potato With Space', 'This is an error');