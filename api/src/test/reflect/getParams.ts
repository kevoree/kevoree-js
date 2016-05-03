import {
  ReflectUtils, Param, Min, Max, Multiline, Length, Choices
} from '../../main/kevoree-api';
import * as Assert from 'assert';

describe('ReflectUtils.getParams', () => {

  it('simple string', () => {
    class MyComp {
      @Param() param: string;
    }

    const c = new MyComp();
    const params = ReflectUtils.getParams(c);
    Assert.equal(params.length, 1);
    Assert.equal(params[0].name, 'param');
    Assert.equal(params[0].type, 'string');
    Assert.equal(params[0].fragment, false);
    Assert.equal(params[0].required, false);
    Assert.equal(params[0].min, undefined);
    Assert.equal(params[0].max, undefined);
    Assert.equal(params[0].multi, undefined);
  });

  it('simple number', () => {
    class MyComp {
      @Param({ type: 'int' }) param: number;
    }

    const c = new MyComp();
    const params = ReflectUtils.getParams(c);
    Assert.equal(params.length, 1);
    Assert.equal(params[0].name, 'param');
    Assert.equal(params[0].type, 'int');
    Assert.equal(params[0].fragment, false);
    Assert.equal(params[0].required, false);
    Assert.equal(params[0].min, undefined);
    Assert.equal(params[0].max, undefined);
    Assert.equal(params[0].multi, undefined);
    Assert.equal(params[0].length, undefined);
  });

  it('simple boolean', () => {
    class MyComp {
      @Param() param: boolean;
    }

    const c = new MyComp();
    const params = ReflectUtils.getParams(c);
    Assert.equal(params.length, 1);
    Assert.equal(params[0].name, 'param');
    Assert.equal(params[0].type, 'boolean');
    Assert.equal(params[0].fragment, false);
    Assert.equal(params[0].required, false);
    Assert.equal(params[0].min, undefined);
    Assert.equal(params[0].max, undefined);
    Assert.equal(params[0].multi, undefined);
    Assert.equal(params[0].length, undefined);
  });

  it('simple string[]', () => {
    class MyComp {
      @Param() param: string[];
    }

    const c = new MyComp();
    const params = ReflectUtils.getParams(c);
    Assert.equal(params.length, 1);
    Assert.equal(params[0].name, 'param');
    Assert.equal(params[0].type, 'array');
    Assert.equal(params[0].fragment, false);
    Assert.equal(params[0].required, false);
    Assert.equal(params[0].min, undefined);
    Assert.equal(params[0].max, undefined);
    Assert.equal(params[0].multi, undefined);
    Assert.equal(params[0].length, undefined);
  });

  it('simple choice', () => {
    enum Color { BLUE, RED, BLACK };

    class MyComp {
      @Param({ type: 'choice' })
      @Choices(Color)
      param: Color;
    }

    const c = new MyComp();
    const params = ReflectUtils.getParams(c);
    Assert.equal(params.length, 1);
    Assert.equal(params[0].name, 'param');
    Assert.equal(params[0].type, 'choice');
    Assert.equal(params[0].fragment, false);
    Assert.equal(params[0].required, false);
    Assert.equal(params[0].min, undefined);
    Assert.equal(params[0].max, undefined);
    Assert.equal(params[0].multi, undefined);
    Assert.equal(params[0].length, undefined);
    Assert.deepEqual(params[0].choices, ['BLUE', 'RED', 'BLACK']);
  });

  it('complex choice', () => {
    const choices = ['one', 2, 'three'];

    class MyComp {
      @Param({ type: 'choice' })
      @Choices(choices)
      param: string|number;
    }

    const c = new MyComp();
    const params = ReflectUtils.getParams(c);
    Assert.equal(params.length, 1);
    Assert.equal(params[0].name, 'param');
    Assert.equal(params[0].type, 'choice');
    Assert.equal(params[0].fragment, false);
    Assert.equal(params[0].required, false);
    Assert.equal(params[0].min, undefined);
    Assert.equal(params[0].max, undefined);
    Assert.equal(params[0].multi, undefined);
    Assert.equal(params[0].length, undefined);
    Assert.deepEqual(params[0].choices, ['one', 2, 'three']);
  });

  it('complex string', () => {
    class MyComp {
      @Param()
      @Length(5)
      param: string;
    }

    const c = new MyComp();
    const params = ReflectUtils.getParams(c);
    Assert.equal(params.length, 1);
    Assert.equal(params[0].name, 'param');
    Assert.equal(params[0].type, 'string');
    Assert.equal(params[0].fragment, false);
    Assert.equal(params[0].required, false);
    Assert.equal(params[0].min, undefined);
    Assert.equal(params[0].max, undefined);
    Assert.equal(params[0].multi, undefined);
    Assert.equal(params[0].length, 5);
  });

  it('complex string 2', () => {
    class MyComp {
      @Param()
      @Length(5)
      @Multiline
      param: string;
    }

    const c = new MyComp();
    const params = ReflectUtils.getParams(c);
    Assert.equal(params.length, 1);
    Assert.equal(params[0].name, 'param');
    Assert.equal(params[0].type, 'string');
    Assert.equal(params[0].fragment, false);
    Assert.equal(params[0].required, false);
    Assert.equal(params[0].min, undefined);
    Assert.equal(params[0].max, undefined);
    Assert.equal(params[0].multi, true);
    Assert.equal(params[0].length, 5);
  });

  it('complex number', () => {
    class MyComp {
      @Param({ type: 'int' })
      @Min(0)
      @Max(100)
      param: number;
    }

    const c = new MyComp();
    const params = ReflectUtils.getParams(c);
    Assert.equal(params.length, 1);
    Assert.equal(params[0].name, 'param');
    Assert.equal(params[0].type, 'int');
    Assert.equal(params[0].fragment, false);
    Assert.equal(params[0].required, false);
    Assert.equal(params[0].min, 0);
    Assert.equal(params[0].max, 100);
    Assert.equal(params[0].multi, undefined);
    Assert.equal(params[0].length, undefined);
  });
});
