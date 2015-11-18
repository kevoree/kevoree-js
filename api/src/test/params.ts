import 'reflect-metadata';
import {
    Component, StringParam, ChoiceParam, MetaData, StringParamMeta, IntParam,
    ChoiceParamMeta, ListParam, ListParamMeta, BooleanParam, DecimalParam,
    NumberParamMeta, ParamType
} from '../main/kevoree-api';
import * as Assert from 'assert';

describe('Params annotations', () => {
    describe('MetaData.PARAMS', () => {
        @Component()
        class MyComp {
            @StringParam() private foo: string;
            @ChoiceParam() private bar: string;
            @ListParam() private baz: string[];
            @IntParam() private beep: number;
            @DecimalParam() private bloop: number;
            @BooleanParam() private blap: boolean;
        }

        it('contains every param name', () => {
            var params = Reflect.getMetadata(MetaData.PARAMS, MyComp.prototype);
            Assert.deepEqual(params, ['foo', 'bar', 'baz', 'beep', 'bloop', 'blap'], "meta params should equal ['foo', 'bar', 'baz', 'beep', 'bloop', 'blap']");
        });
    });

    describe('@StringParam', () => {
        @Component()
        class MyComp {
            @StringParam()
            private foo: string;

            @StringParam({ optional: false, default: 'bar', multiline: true })
            private bar: string;
        }

        it('default values', () => {
            var data: StringParamMeta = Reflect.getMetadata(MetaData.PARAM, MyComp.prototype, 'foo');
            Assert.equal(data.optional, true, 'optional should be true');
            Assert.equal(data.fragment, false, 'fragment should be false');
            Assert.equal(data.multiline, false, 'multiline should be false');
            Assert.equal(data.default, undefined, 'default should be undefined');
        });

        it('custom values', () => {
            var data: StringParamMeta = Reflect.getMetadata(MetaData.PARAM, MyComp.prototype, 'bar');
            Assert.equal(data.optional, false, 'optional should be false');
            Assert.equal(data.fragment, false, 'fragment should be false');
            Assert.equal(data.multiline, true, 'multiline should be true');
            Assert.equal(data.default, 'bar', 'default should be bar');
        });
    });

    describe('@IntParam', () => {
        @Component()
        class MyComp {
            @IntParam()
            private foo: number;

            @IntParam({ optional: false, default: 42 })
            private bar: number;

            @IntParam({ min: 12, max: 52 })
            private range: number;
        }

        it('default values', () => {
            var data: NumberParamMeta = Reflect.getMetadata(MetaData.PARAM, MyComp.prototype, 'foo');
            Assert.equal(data.optional, true, 'optional should be true');
            Assert.equal(data.fragment, false, 'fragment should be false');
            Assert.equal(data.datatype, ParamType.INTEGER, 'datatype should be ParamType.INTEGER');
            Assert.equal(data.default, undefined, 'default should be undefined');
            Assert.equal(data.min, undefined, 'min should be undefined');
            Assert.equal(data.max, undefined, 'max should be undefined');
        });

        it('custom values', () => {
            var data: NumberParamMeta = Reflect.getMetadata(MetaData.PARAM, MyComp.prototype, 'bar');
            Assert.equal(data.optional, false, 'optional should be false');
            Assert.equal(data.fragment, false, 'fragment should be false');
            Assert.equal(data.default, 42, 'default should be 42');
            Assert.equal(data.min, undefined, 'min should be undefined');
            Assert.equal(data.max, undefined, 'max should be undefined');
        });

        it('custom values with min & max', () => {
            var data: NumberParamMeta = Reflect.getMetadata(MetaData.PARAM, MyComp.prototype, 'range');
            Assert.equal(data.optional, true, 'optional should be true');
            Assert.equal(data.fragment, false, 'fragment should be false');
            Assert.equal(data.default, undefined, 'default should be undefined');
            Assert.equal(data.min, 12, 'min should be 12');
            Assert.equal(data.max, 52, 'max should be 52');
        });

        it('min must be <= max or throw', () => {
            Assert.throws(() => {
                @Component()
                class WrongComp {
                    @IntParam({ min: 5, max: 0 })
                    private wrong: number;
                }
            });
        });

        it('default must be >= min or throw', () => {
            Assert.throws(() => {
                @Component()
                class WrongComp {
                    @IntParam({ min: 5, default: 0 })
                    private wrong: number;
                }
            });
        });

        it('default must be <= max or throw', () => {
            Assert.throws(() => {
                @Component()
                class WrongComp {
                    @IntParam({ max: 5, default: 10 })
                    private wrong: number;
                }
            });
        });
    });

    describe('@ChoiceParam', () => {
        @Component()
        class MyComp {
            @ChoiceParam()
            private foo: string;

            @ChoiceParam({ optional: false, defaultIndex: 1, choices: ['one', 'two', 'three'] })
            private bar: string;
        }

        it('default values', () => {
            var data: ChoiceParamMeta = Reflect.getMetadata(MetaData.PARAM, MyComp.prototype, 'foo');
            Assert.equal(data.optional, true, 'optional should be true');
            Assert.equal(data.fragment, false, 'fragment should be false');
            Assert.deepEqual(data.choices, [], 'choices should be []');
            Assert.equal(data.defaultIndex, undefined, 'defaultIndex should be undefined');
        });

        it('custom values', () => {
            var data: ChoiceParamMeta = Reflect.getMetadata(MetaData.PARAM, MyComp.prototype, 'bar');
            Assert.equal(data.optional, false, 'optional should be false');
            Assert.equal(data.fragment, false, 'fragment should be false');
            Assert.deepEqual(data.choices, ['one', 'two', 'three'], "choices should be ['one', 'two', 'three']");
            Assert.equal(data.defaultIndex, 1, 'defaultIndex should be 1');
        });

        it('wrong defaultIndex must throw', () => {
            Assert.throws(() => {
                @Component()
                class WrongComp {
                    @ChoiceParam({ choices: ['', ''], defaultIndex: 3 })
                    private foo: string;
                }
            }, 'defaultIndex out of bound must throw an error');
        });
    });

    describe('@ListParam', () => {
        @Component()
        class MyComp {
            @ListParam()
            private attrs: string[];

            @ListParam({ default: [1, 2, 3] })
            private bars: number[];
        }

        it('default values', () => {
            var data: ListParamMeta = Reflect.getMetadata(MetaData.PARAM, MyComp.prototype, 'attrs');
            Assert.equal(data.optional, true, 'optional should be true');
            Assert.equal(data.fragment, false, 'fragment should be false');
            Assert.deepEqual(data.default, [], 'default should be []');
        });

        it('custom values', () => {
            var data: ListParamMeta = Reflect.getMetadata(MetaData.PARAM, MyComp.prototype, 'attrs');
            Assert.equal(data.optional, true, 'optional should be true');
            Assert.equal(data.fragment, false, 'optional should be false');
            Assert.deepEqual(data.default, [], 'default should be []');
        });

        it('custom values with default list', () => {
            var data: ListParamMeta = Reflect.getMetadata(MetaData.PARAM, MyComp.prototype, 'bars');
            Assert.equal(data.optional, true, 'optional should be true');
            Assert.equal(data.fragment, false, 'optional should be false');
            Assert.deepEqual(data.default, [1, 2, 3], 'default should be [1, 2, 3]');
        });
    });
});
