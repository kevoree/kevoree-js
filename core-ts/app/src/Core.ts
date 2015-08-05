import { EventEmitter } from 'events'

var NAME_PATTERN = /^[\w-]+$/;

export class Core extends EventEmitter implements Core {

  private logger: LoggerService
  private nodeName: string
  private nodeInstance: Object
  private currentModel: kevoree.ContainerRoot
  private deployingModel: kevoree.ContainerRoot
  private emitter: EventEmitter

  constructor(logger: LoggerService) {
    super()
    this.logger = logger
    this.emitter = new EventEmitter()
  }

  start(name: string): void {
    if (!name || name.length === 0) {
      name = 'node0'
    }

    if (name.match(NAME_PATTERN)) {
      this.nodeName = name
      var factory = new kevoree.factory.DefaultKevoreeFactory()
      this.currentModel = factory.createContainerRoot()
      factory.root(this.currentModel)

      var node = factory.createContainerNode()
      node.name = this.nodeName
      node.started = false

      this.currentModel.addNodes(node)

      var id = setInterval(() => {
        
      }, 10e10)

      this.emitter.on('stopped', () => {
        clearInterval(id)
        this.emit('stopped')
      });

    } else {
      throw new Error('')
    }
  }

  stop(done: Callback): void {

  }

  deploy(model: Object, done: Callback): void {

  }
}
