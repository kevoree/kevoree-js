import 'reflect-metadata';
import {
    Component, Input, MetaData
} from '../main/kevoree-api';
import * as Assert from 'assert';

describe('Inputs annotations', () => {
    describe('MetaData.INPUTS', () => {
        @Component()
        class MyComp {
            @Input()
            in(msg: string): void {}

            @Input()
            in2(msg: string): void {}

            @Input()
            in3(msg: string): void {}
        }

        it('contains every method name', () => {
            var inputs = Reflect.getMetadata(MetaData.INPUTS, MyComp.prototype);
            Assert.deepEqual(inputs, ['in', 'in2', 'in3']);
            inputs.forEach((input: string) => {
                var schema = Reflect.getMetadata(MetaData.MSG_SCHEMA, MyComp.prototype, input);
                Assert.equal(schema, undefined);
            });
        });
    });

    describe('@Input({ type: \'string\' })', () => {
        @Component()
        class MyComp {
            @Input({ type: 'string' })
            in(msg: string): void {}
        }

        it('MetaData.MSG_SCHEMA contains defined schema for specific method', () => {
            var schema = Reflect.getMetadata(MetaData.MSG_SCHEMA, MyComp.prototype, 'in');
            Assert.deepEqual(schema, { type: 'string' });
        });
    });
});
