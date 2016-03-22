import { org } from '../main/model';

describe('Kevoree model tests', () => {
    var dm = org.kevoree.modeling.memory.manager.DataManagerBuilder.buildDefault();
    var kModel = new org.KevoreeModel(dm);

    kModel.connect(() => {
        var kView = kModel.universe(0).time(0);
        var model = kView.createModel();

        it('create and add node', () => {
            var node = kView.createNode();
            node.setName('myNode');
            model.addNodes(node);
        });

        it('create and add component inside the node', (done: MochaDone) => {
            model.getNodes(nodes => {
                var comp = kView.createComponent();
                comp.setName('myComp');
                comp.addHost(nodes[0]);
                nodes[0].addComponents(comp);
                done();
            });
        });

        // it('create and add subNode inside the node', (done: MochaDone) => {
        //     model.getNodes(nodes => {
        //         var subNode = kView.createNode();
        //         subNode.setName('mySubNode');
        //         subNode.addHost(nodes[0]);
        //         nodes[0].addSubNodes(subNode);
        //         done();
        //     });
        // });

        // it('create and add group', () => {
        //     var group = kView.createConnector();
        //     group.setName('myGroup');
        //     node.addC(group);
        // });

        it('create and add channel', () => {
            var channel = kView.createChannel();
            channel.setName('myChan');
            model.addChannels(channel);
        });

        it('create and add a namespace', () => {
            var ns = kView.createNamespace();
            ns.setName('kevoree');
            model.addNamespaces(ns);
        });

        it('create and add a node typeDef inside the namespace', (done: MochaDone) => {
            model.getNamespaces(namespaces => {
                var type = kView.createNodeType();
                type.setName('JavascriptNode');
                type.setVersion(1);
                namespaces[0].addTypeDefinitions(type);
                done();
            });
        });

        // it('create and add a group typeDef inside the namespace', (done: MochaDone) => {
        //     model.getNamespaces(namespaces => {
        //         var type = kView.createGroupType();
        //         type.setName('WSGroup');
        //         type.setVersion(1);
        //         namespaces[0].addTypeDefinitions(type);
        //         done();
        //     });
        // });

        it('create and add a channel typeDef inside the namespace', (done: MochaDone) => {
            model.getNamespaces(namespaces => {
                var type = kView.createChannelType();
                type.setName('WSChan');
                type.setVersion(1);
                namespaces[0].addTypeDefinitions(type);
                done();
            });
        });

        it('create and add a component typeDef inside the namespace', (done: MochaDone) => {
            model.getNamespaces(namespaces => {
                var type = kView.createComponentType();
                type.setName('Ticker');
                type.setVersion(1);
                namespaces[0].addTypeDefinitions(type);
                done();
            });
        });
    })
});
