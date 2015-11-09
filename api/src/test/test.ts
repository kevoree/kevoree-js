import {
    Component, Param, Input, Output, DataType
} from '../main/kevoree-api';

@Component()
class TestComp {

    @Param({ optional: true, datatype: DataType.STRING })
    private foo: string;

    @Input()
    input(): void {

    }
}
