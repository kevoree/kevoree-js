import 'reflect-metadata';
import {
    Component, StringParam, ChoiceParam, MetaData, StringParamMeta,
    ChoiceParamMeta
} from '../main/kevoree-api';
import * as Assert from 'assert';

describe('Params annotations', () => {
    describe('MetaData.PARAMS', () => {
        @Component()
        class MyComp {
            @StringParam() private foo: string;
            @ChoiceParam() private bar: string;
            @StringParam() private baz: string;
            @ChoiceParam() private beep: string;
        }

        it('contains every param name', () => {
            var params = Reflect.getMetadata(MetaData.PARAMS, MyComp.prototype);
            Assert.deepEqual(params, ['foo', 'bar', 'baz', 'beep']);
        });
    });

    describe('@StringParam', () => {
        @Component()
        class MyComp {
            @StringParam()
            private foo: string;

            @StringParam({ optional: false, default: 'bar' })
            private bar: string;
        }

        it('default values', () => {
            var data: StringParamMeta = Reflect.getMetadata(MetaData.PARAM, MyComp.prototype, 'foo');
            Assert.equal(data.optional, true);
            Assert.equal(data.fragment, false);
            Assert.equal(data.default, undefined);
        });

        it('custom values', () => {
            var data: StringParamMeta = Reflect.getMetadata(MetaData.PARAM, MyComp.prototype, 'bar');
            Assert.equal(data.optional, false);
            Assert.equal(data.fragment, false);
            Assert.equal(data.default, 'bar');
        });
    });

    describe('@ChoiceParam', () => {
        @Component()
        class MyComp {
            @ChoiceParam()
            private foo: string;

            @ChoiceParam({ optional: false, default: 1, choices: ['one', 'two', 'three'] })
            private bar: string;
        }

        it('default values', () => {
            var data: ChoiceParamMeta = Reflect.getMetadata(MetaData.PARAM, MyComp.prototype, 'foo');
            Assert.equal(data.optional, true);
            Assert.equal(data.fragment, false);
            Assert.deepEqual(data.choices, []);
            Assert.equal(data.default, undefined);
        });

        it('custom values', () => {
            var data: ChoiceParamMeta = Reflect.getMetadata(MetaData.PARAM, MyComp.prototype, 'bar');
            Assert.equal(data.optional, false);
            Assert.equal(data.fragment, false);
            Assert.deepEqual(data.choices, ['one', 'two', 'three']);
            Assert.equal(data.default, 1);
        });
    });
});
