import 'reflect-metadata';
import {
    Component, MetaData, NumberType, Param, Required, Multiline, Min, Max,
    Length, NumberTypeMeta, MinMaxMeta
} from '../main/kevoree-api';
import * as Assert from 'assert';

describe('Params annotations', () => {
    describe('MetaData.PARAMS', () => {
        @Component({ version: 1 })
        class MyComp {
            @Param private foo: string;
            @Param private bar: string;
            @Param private baz: string[];
            @Param private beep: number;
            @Param private bloop: number;
            @Param private blap: boolean;
        }

        it('contains every param name', () => {
            var params = Reflect.getMetadata(MetaData.PARAMS, MyComp.prototype);
            Assert.deepEqual(params, ['foo', 'bar', 'baz', 'beep', 'bloop', 'blap'], "meta params should equal ['foo', 'bar', 'baz', 'beep', 'bloop', 'blap']");
        });
    });

    describe('String param', () => {
        @Component({ version: 1 })
        class MyComp {
            @Param
            private foo: string;

            @Required
            @Multiline
            private bar: string = 'bar';
        }
        var comp = new MyComp();

        it('custom values', () => {
            var data = {
                required: Reflect.getMetadata(MetaData.REQUIRED, MyComp.prototype, 'bar'),
                multiline: Reflect.getMetadata(MetaData.MULTILINE, MyComp.prototype, 'bar')
            };
            Assert.equal(data.required, true, 'required should be true');
            Assert.equal(data.multiline, true, 'multiline should be true');
        });
    });

    describe('Int @Param', () => {
        @Component({ version: 1 })
        class MyComp {

            @Param
            @Required
            private bar: number = 42;

            @Param
            @Min(12)
            @Max(52)
            private range: number;
        }
        var comp = new MyComp();

        it('custom values', () => {
            Assert.equal(Reflect.getMetadata(MetaData.REQUIRED, MyComp.prototype, 'bar'), true, 'required should be true');
        });

        it('custom values with min & max', () => {
            var min: MinMaxMeta = Reflect.getMetadata(MetaData.MIN, MyComp.prototype, 'range');
            var max: MinMaxMeta = Reflect.getMetadata(MetaData.MAX, MyComp.prototype, 'range');
            Assert.equal(min.value, 12, 'min should be 12');
            Assert.equal(max.value, 52, 'max should be 52');
        });
    });

    describe('@ChoiceParam', () => {
        enum Foo { ONE = 1, TWO = 2, THREE = 3 }
        enum Bar { ONE, TWO, THREE }

        @Component({ version: 1 })
        class MyComp {
            @Param
            private foo: Foo;

            @Param
            @Required
            private bar: Bar = Bar.TWO;
        }
        var comp = new MyComp();

        it('custom values', () => {
            Assert.equal(Reflect.getMetadata(MetaData.REQUIRED, MyComp.prototype, 'bar'), true, 'required should be true');
        });
    });

    describe('@ListParam', () => {
        @Component({ version: 1 })
        class MyComp {
            @Param
            private attrs: string[];

            @Param
            private bars: number[] = [1, 2, 3];
        }
    });
});
