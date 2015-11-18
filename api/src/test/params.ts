import 'reflect-metadata';
import {
    Component, StringParam, ChoiceParam, MetaData, StringParamMeta, IntParam,
    ChoiceParamMeta, ListParam, ListParamMeta, BooleanParam, DecimalParam
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
