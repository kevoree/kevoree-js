import { Logger }       from 'kevoree-logger'
import { ModelServiceImpl } from './ModelServiceImpl'
import { MyComp }       from './MyComp'
import { MyOtherComp }  from './MyOtherComp'
import { Services }     from '../main/api'

var c1    = new MyComp(),
    c2    = new MyOtherComp(),
    name1 = 'comp0',
    name2 = 'comp1'

var loggers = {}

init('node0', c1, name1)
init('node0', c2, name2)

function init(nodeName: string, instance: any, name: string) {
  var injects = Reflect.getMetadata('Injects', instance.constructor) || []
  injects.forEach((item: { propertyKey: string, service: Services }) => {
    switch (item.service) {
      case Services.ModelService:
        Object.defineProperty(instance.constructor.prototype, item.propertyKey, {
          value: new ModelServiceImpl(nodeName, name, {}, null)
        })
        console.info(`ModelService injected in ${name}`)
        break;

      case Services.LoggerService:
        loggers[instance.constructor.name] = loggers[instance.constructor.name] || new Logger(instance.constructor.name)
        Object.defineProperty(instance.constructor.prototype, item.propertyKey, {
          value: loggers[instance.constructor.name]
        })
        console.info(`LoggerService injected in ${name}`)
        break;
    }
  })

  if (typeof instance.start === 'function') {
    instance.start((err: Error) => {
      if (err) {
        console.log('error', name)
      } else {
        console.log('ok', name)
      }
    })
  } else {
    console.log('no start() for', name);
  }
}
