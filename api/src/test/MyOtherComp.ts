import {
  Component, Input, Output, Param, ModelService
} from '../main/kevoree-api';
import { Inject } from 'ts-injector';

@Component({ desc: 'This other component does something' })
export class MyOtherComp {

  @Inject('ModelService')
  private modelService: ModelService
}
