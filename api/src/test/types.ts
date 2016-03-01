import 'reflect-metadata';
import {
    Node, Group, Channel, Component, MetaData, TypeEnum, TypeMeta
} from '../main/kevoree-api';
import * as Assert from 'assert';

describe('TypeDefinition annotations', () => {
    const DESC = "Some description";

    @Component({ description: DESC, version: 1 })
    class MyComp {}

    @Node({ description: DESC, version: 1 })
    class MyNode {}

    @Group({ description: DESC, version: 1 })
    class MyGroup {}

    @Channel({ description: DESC, version: 1 })
    class MyChannel {}

    it('@Component', () => {
        var type = Reflect.getMetadata(MetaData.TYPE, MyComp.prototype);
        var meta: TypeMeta = Reflect.getMetadata(MetaData.META, MyComp.prototype);
        var name = Reflect.getMetadata(MetaData.NAME, MyComp.prototype);

        Assert.equal(type, TypeEnum.COMPONENT);
        Assert.equal(meta.description, DESC);
        Assert.equal(name, (<any> MyComp).name);
    });

    it('@Node', () => {
        var type = Reflect.getMetadata(MetaData.TYPE, MyNode.prototype);
        var meta: TypeMeta = Reflect.getMetadata(MetaData.META, MyNode.prototype);
        var name = Reflect.getMetadata(MetaData.NAME, MyNode.prototype);

        Assert.equal(type, TypeEnum.NODE);
        Assert.equal(meta.description, DESC);
        Assert.equal(name, (<any> MyNode).name);
    });

    it('@Group', () => {
        var type = Reflect.getMetadata(MetaData.TYPE, MyGroup.prototype);
        var meta: TypeMeta = Reflect.getMetadata(MetaData.META, MyGroup.prototype);
        var name = Reflect.getMetadata(MetaData.NAME, MyGroup.prototype);

        Assert.equal(type, TypeEnum.GROUP);
        Assert.equal(meta.description, DESC);
        Assert.equal(name, (<any> MyGroup).name);
    });

    it('@Channel', () => {
        var type = Reflect.getMetadata(MetaData.TYPE, MyChannel.prototype);
        var meta: TypeMeta = Reflect.getMetadata(MetaData.META, MyChannel.prototype);
        var name = Reflect.getMetadata(MetaData.NAME, MyChannel.prototype);

        Assert.equal(type, TypeEnum.CHANNEL);
        Assert.equal(meta.description, DESC);
        Assert.equal(name, (<any> MyChannel).name);
    });
});
