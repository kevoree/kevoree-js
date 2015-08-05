import { Logger } from '../main/Logger'

var log = new Logger('MyTag')


log.info('test')
log.info('AnotherTag', 'youpi')

log.debug('test')
log.debug('AnotherTag', 'youpi')

log.warn('test')
log.warn('AnotherTag', 'youpi')

log.error('test')
log.error('AnotherTag', 'youpi')
