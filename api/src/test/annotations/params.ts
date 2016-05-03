import 'reflect-metadata';
import {
    Component, MetaData, Param, Required, Multiline, Min, Max, Length
} from '../../main/kevoree-api';
import * as Assert from 'assert';

describe('Params annotations', () => {
    describe('MetaData.PARAMS', () => {
        @Component({ version: 1 })
        class MyComp {
            @Param() foo: string;
            @Param() bar: string;
            @Param() baz: string[];
            @Param() bloop: number;
            @Param() blap: boolean;
            @Param({ type: 'int' }) beep: number;
            @Param({ type: 'float' }) bleep: number;
            @Param({ type: 'long' }) bim: number;
            @Param({ type: 'short' }) bam: number;
            @Param({ type: 'double' }) boom: number;
        }

        it('contains every param name', () => {
            var params = Reflect.getMetadata(MetaData.PARAMS, MyComp.prototype);
            Assert.deepEqual(params, [
              { name: 'foo',    type: 'string'  },
              { name: 'bar',    type: 'string'  },
              { name: 'baz',    type: 'array'   },
              { name: 'bloop',  type: 'int'     },
              { name: 'blap',   type: 'boolean' },
              { name: 'beep',   type: 'int'     },
              { name: 'bleep',  type: 'float'   },
              { name: 'bim',    type: 'long'    },
              { name: 'bam',    type: 'short'   },
              { name: 'boom',   type: 'double'  }
            ]);
        });
    });

    describe('String param', () => {
        @Component({ version: 1 })
        class MyComp {
            @Param()
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

    describe('Number param', () => {
        @Component({ version: 1 })
        class MyComp {

            @Param({ type: 'int' })
            @Required
            private bar: number = 42;

            @Param({ type: 'int' })
            @Min(12)
            @Max(52)
            private range: number;
        }
        var comp = new MyComp();

        it('custom values', () => {
            Assert.equal(Reflect.getMetadata(MetaData.REQUIRED, MyComp.prototype, 'bar'), true, 'required should be true');
        });

        it('custom values with min & max', () => {
            var min: number = Reflect.getMetadata(MetaData.MIN, MyComp.prototype, 'range');
            var max: number = Reflect.getMetadata(MetaData.MAX, MyComp.prototype, 'range');
            Assert.equal(min, 12, 'min should be 12');
            Assert.equal(max, 52, 'max should be 52');
        });
    });

    describe('Enum param', () => {
        enum Foo { ONE = 1, TWO = 2, THREE = 3 }
        enum Bar { ONE, TWO, THREE }

        @Component({ version: 1 })
        class MyComp {
            @Param({ type: 'choice' })
            private foo: Foo;

            @Param({ type: 'choice' })
            @Required
            private bar: Bar = Bar.TWO;
        }
        var comp = new MyComp();

        it('custom values', () => {
            Assert.equal(Reflect.getMetadata(MetaData.REQUIRED, MyComp.prototype, 'bar'), true, 'required should be true');
        });
    });

    describe('Array param', () => {
        @Component({ version: 1 })
        class MyComp {
            @Param()
            private attrs: string[];
        }

        it('string array', () => {
          const metas = Reflect.getMetadata(MetaData.PARAMS, MyComp.prototype)[0];
          Assert.equal(metas.name, 'attrs');
          Assert.equal(metas.type, 'array');
        });
    });
});
