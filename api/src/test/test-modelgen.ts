import { MyComp } from './MyComp'
import { MyOtherComp } from './MyOtherComp'
import { Types } from '../main/kevoree-api'

console.log('========== MyComp')
console.log('Type:    ', Types[Reflect.getMetadata('Type', MyComp)])
console.log('Name:    ', Reflect.getMetadata('Name', MyComp))
console.log('Params:  ', Reflect.getMetadata('Params', MyComp))
console.log('Inputs:  ', Reflect.getMetadata('Inputs', MyComp))
console.log('Outputs: ', Reflect.getMetadata('Outputs', MyComp))
console.log('Injects: ', Reflect.getMetadata('Injects', MyComp))
console.log('==========')

console.log('========== MyOtherComp')
console.log('Type:    ', Types[Reflect.getMetadata('Type', MyOtherComp)])
console.log('Name:    ', Reflect.getMetadata('Name', MyOtherComp))
console.log('Params:  ', Reflect.getMetadata('Params', MyOtherComp))
console.log('Inputs:  ', Reflect.getMetadata('Inputs', MyOtherComp))
console.log('Outputs: ', Reflect.getMetadata('Outputs', MyOtherComp))
console.log('Injects: ', Reflect.getMetadata('Injects', MyOtherComp))
console.log('==========')
