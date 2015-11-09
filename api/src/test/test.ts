import {
    Component, Param, Input, Output, DataType, Start, Stop, Update, Callback
} from '../main/kevoree-api';

@Component()
class TestComp {

    @Param({ optional: true, datatype: DataType.STRING })
    private foo: string;

    @Input()
    input(): void {

    }

    @Start()
    start(): void {

    }

    @Stop()
    stop(): void {

    }

    @Update()
    update(): void {

    }

    @Update()
    update2(): void {

    }
}
