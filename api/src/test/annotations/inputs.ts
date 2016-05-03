import 'reflect-metadata';
import {
    Component, Input, MetaData
} from '../../main/kevoree-api';
import * as Assert from 'assert';

describe('Inputs annotations', () => {
    it('contains every method name', () => {
        @Component({ version: 1 })
        class MyComp {
            @Input()
            in(msg: string): void {}

            @Input()
            in2(msg: string): void {}

            @Input()
            in3(msg: string): void {}
        }

        var inputs = Reflect.getMetadata(MetaData.INPUTS, MyComp.prototype);
        Assert.deepEqual(inputs, ['in', 'in2', 'in3']);
        inputs.forEach((input: string) => {
            var schema = Reflect.getMetadata(MetaData.MSG_SCHEMA, MyComp.prototype, input);
            Assert.equal(schema, undefined);
        });
    });

    it('MetaData.MSG_SCHEMA contains defined schema for specific method', () => {
        @Component({ version: 1 })
        class MyComp {
            @Input({ type: 'string' })
            in(msg: string): void {}
        }

        var schema = Reflect.getMetadata(MetaData.MSG_SCHEMA, MyComp.prototype, 'in');
        Assert.deepEqual(schema, { type: 'string' });
    });

    it('missing string parameter in signature must throw', () => {
        Assert.throws(() => {
            @Component({ version: 1 })
            class MyComp {
                @Input()
                in(): void {}
            }
        });
    });
});
