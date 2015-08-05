import {
  Component, Inject, Input, Output, Param, Services, ModelService
} from '../main/api'

@Component({ desc: 'This other component does something' })
export class MyOtherComp {

  @Inject(Services.ModelService)
  private modelService: ModelService
}
