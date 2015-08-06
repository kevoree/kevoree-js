import { Core } from '../main/Core'
import { Logger } from 'kevoree-logger'

var logger = new Logger()
var core = new Core(logger)
core.start('node0')
