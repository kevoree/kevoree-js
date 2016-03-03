import 'reflect-metadata';
import {
    Component, Output, OutputPort, MetaData
} from '../main/kevoree-api';
import * as Assert from 'assert';

describe('Outputs annotations', () => {
    it('contains every attribute name', () => {
        @Component({ version: 1 })
        class MyComp {
            @Output()
            private out: OutputPort;

            @Output()
            private out2: OutputPort;

            @Output()
            private out3: OutputPort;
        }

        var outputs = Reflect.getMetadata(MetaData.OUTPUTS, MyComp.prototype);
        Assert.deepEqual(outputs, ['out', 'out2', 'out3']);
        outputs.forEach((output: string) => {
            var schema = Reflect.getMetadata(MetaData.MSG_SCHEMA, MyComp.prototype, output);
            Assert.equal(schema, undefined);
        });
    });

    it('MetaData.MSG_SCHEMA contains defined schema for specific method', () => {
        @Component({ version: 1 })
        class MyComp {
            @Output({ type: 'string' })
            private out: OutputPort;
        }

        var schema = Reflect.getMetadata(MetaData.MSG_SCHEMA, MyComp.prototype, 'out');
        Assert.deepEqual(schema, { type: 'string' });
    });
});
