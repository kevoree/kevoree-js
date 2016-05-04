import 'reflect-metadata';
import { Factory, Services, MetaData, TypeEnum } from '../../main/kevoree-api';
import { MetaData as InjectMeta } from 'ts-injector';
import * as Assert from 'assert';

describe('ES5', () => {
  describe('Component', () => {
    it('simple component', () => {
      const MyComp = Factory.Component({
        name: 'MyComp',
        version: 1,
        description: 'desc'
      }).Class({
        name: null,
        getName: (): string => {
          return this.name;
        },
        setName: (name: string) => {
          this.name = name;
        }
      });
      Assert.equal(Reflect.getMetadata(MetaData.TYPE, MyComp.prototype), TypeEnum.COMPONENT);
      Assert.equal(MyComp.name, 'MyComp');
      const c = new MyComp();
      c.setName('foo');
      Assert.equal(c.getName(), 'foo');
    });

    it('component with inject', () => {
      const MyComp = Factory.Component({
        name: 'MyComp',
        version: 1,
        description: 'desc'
      }).Inject({
        logger: Services.Logger,
        other: { name: 'foo' }
      }).Class({});

      const injects = Reflect.getMetadata(InjectMeta.INJECTS, MyComp.prototype);
      Assert.deepEqual(injects, [
        { name: 'logger', type: Services.Logger.name },
        { name: 'other', type: 'foo' }
      ]);
    });

    it('component with inputs', () => {
      const MyComp = Factory.Component({
        name: 'MyComp',
        version: 1,
        description: 'desc'
      }).Input({
        input0: null,
        input1: { type: 'string' }
      }).Class({});

      const inputs = Reflect.getMetadata(MetaData.INPUTS, MyComp.prototype);
      Assert.deepEqual(inputs, ['input0', 'input1']);
      Assert.equal(Reflect.getMetadata(MetaData.MSG_SCHEMA, MyComp.prototype, 'input0'), null);
      Assert.deepEqual(Reflect.getMetadata(MetaData.MSG_SCHEMA, MyComp.prototype, 'input1'), { type: 'string' });
    });

    it('component with outputs', () => {
      const MyComp = Factory.Component({
        name: 'MyComp',
        version: 1,
        description: 'desc'
      }).Output({
        output0: null,
        output1: { type: 'string' }
      }).Class({});

      const outputs = Reflect.getMetadata(MetaData.OUTPUTS, MyComp.prototype);
      Assert.deepEqual(outputs, ['output0', 'output1']);
      Assert.equal(Reflect.getMetadata(MetaData.MSG_SCHEMA, MyComp.prototype, 'output0'), null);
      Assert.deepEqual(Reflect.getMetadata(MetaData.MSG_SCHEMA, MyComp.prototype, 'output1'), { type: 'string' });
    });
  });

  describe('Node', () => {
    it('simple node', () => {
      const MyNode = Factory.Node({
        name: 'MyNode',
        version: 1,
        description: 'desc'
      }).Class({
        name: null,
        getName: (): string => {
          return this.name;
        },
        setName: (name: string) => {
          this.name = name;
        }
      });
      Assert.equal(Reflect.getMetadata(MetaData.TYPE, MyNode.prototype), TypeEnum.NODE);
      Assert.equal(MyNode.name, 'MyNode');
      const c = new MyNode();
      c.setName('foo');
      Assert.equal(c.getName(), 'foo');
    });

    it('node with inject', () => {
      const MyNode = Factory.Node({
        name: 'MyNode',
        version: 1,
        description: 'desc'
      }).Inject({
        logger: Services.Logger,
        other: { name: 'foo' }
      }).Class({});

      const injects = Reflect.getMetadata(InjectMeta.INJECTS, MyNode.prototype);
      Assert.deepEqual(injects, [
        { name: 'logger', type: Services.Logger.name },
        { name: 'other', type: 'foo' }
      ]);
    });
  });

  describe('Channel', () => {
    it('simple chan', () => {
      const MyChan = Factory.Channel({
        name: 'MyChan',
        version: 1,
        description: 'desc'
      }).Class({
        name: null,
        getName: (): string => {
          return this.name;
        },
        setName: (name: string) => {
          this.name = name;
        }
      });
      Assert.equal(Reflect.getMetadata(MetaData.TYPE, MyChan.prototype), TypeEnum.CHANNEL);
      Assert.equal(MyChan.name, 'MyChan');
      const c = new MyChan();
      c.setName('foo');
      Assert.equal(c.getName(), 'foo');
    });

    it('chan with inject', () => {
      const MyChan = Factory.Channel({
        name: 'MyChan',
        version: 1,
        description: 'desc'
      }).Inject({
        logger: Services.Logger,
        other: { name: 'foo' }
      }).Class({});

      const injects = Reflect.getMetadata(InjectMeta.INJECTS, MyChan.prototype);
      Assert.deepEqual(injects, [
        { name: 'logger', type: Services.Logger.name },
        { name: 'other', type: 'foo' }
      ]);
    });
  });

  describe('ModelConnector', () => {
    it('simple mcon', () => {
      const MyMCon = Factory.ModelConnector({
        name: 'MyMCon',
        version: 1,
        description: 'desc'
      }).Class({
        name: null,
        getName: (): string => {
          return this.name;
        },
        setName: (name: string) => {
          this.name = name;
        }
      });
      Assert.equal(Reflect.getMetadata(MetaData.TYPE, MyMCon.prototype), TypeEnum.MCON);
      Assert.equal(MyMCon.name, 'MyMCon');
      const c = new MyMCon();
      c.setName('foo');
      Assert.equal(c.getName(), 'foo');
    });

    it('mcon with inject', () => {
      const MyMCon = Factory.ModelConnector({
        name: 'MyMCon',
        version: 1,
        description: 'desc'
      }).Inject({
        logger: Services.Logger,
        other: { name: 'foo' }
      }).Class({});

      const injects = Reflect.getMetadata(InjectMeta.INJECTS, MyMCon.prototype);
      Assert.deepEqual(injects, [
        { name: 'logger', type: Services.Logger.name },
        { name: 'other', type: 'foo' }
      ]);
    });
  });
});
