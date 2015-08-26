import { org } from '../main/kevoree-model';

describe('Kevoree model tests', () => {
  var dm = org.kevoree.modeling.memory.manager.DataManagerBuilder.buildDefault();
  var kModel = new org.KevoreeModel(dm);

  kModel.connect(() => {
    var kView = kModel.universe(0).time(0);
    var model = kView.createModel();
    var listener = kModel.createListener(0);
    listener.listen(model);
    listener.then((o: org.kevoree.NamedElement) => {
      console.log('update', o.getName());
    });

    it('add node', (done: MochaDone) => {
      var node = kView.createNode();
      node.setName('myNode');
      model.addNodes(node);
      done();
    });


  })
})
