module.exports = function (Kevoree) {

    function FakeNode() {
        Kevoree.createNode(this);
    }

    Kevoree.registerNode('FakeNode', FakeNode);

    FakeNode.prototype.start = function (done) {
        console.log('node started');
        done();
    };

    FakeNode.prototype.stop = function (done) {
        console.log('node stop');
        done();
    };
};