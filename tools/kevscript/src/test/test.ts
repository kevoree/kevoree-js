import { KevScript } from '../main/KevScript';
import { org } from 'kevoree-model';

describe('KevScript', () => {
  var kevs = new KevScript();

  var dm = org.kevoree.modeling.memory.manager.DataManagerBuilder.buildDefault();
  var kModel = new org.KevoreeModel(dm);
  var kView = kModel.universe(0).time(0);

  kModel.connect(() => {
    var ctxModel = kView.createModel();
    var node = kView.createNode();
    node.setName('node');
    ctxModel.addNodes(node);

    it('parse without ctxModel nor ctxVars', (done: MochaDone) => {
      var data = {
        kevs: 'add node0, node1, node2: JavascriptNode/1.2.3'
      };
      kevs.parse(data, (err: Error, model: org.kevoree.Model) => {
        if (err) {
          done(err);
        } else {

          done();
        }
      });
    });

    // it('parse with ctxModel', (done: MochaDone) => {
    //   var data = {
    //     kevs: 'add node0: JavascriptNode',
    //     ctxModel: ctxModel
    //   };
    //   kevs.parse(data, (err: Error, model: org.kevoree.Model) => {
    //     if (err) {
    //       done(err);
    //     } else {
    //       var kView = model.manager().model().universe(0).time(0);
    //       kView.json().save(model, (model: string) => {
    //         console.log(model);
    //         done();
    //       });
    //     }
    //   });
    // });
    //
    // it('parse without ctxModel but with ctxVars', (done: MochaDone) => {
    //   var data = {
    //     kevs: 'add node0: JavascriptNode',
    //     ctxVars: {
    //       foo: 'bar'
    //     }
    //   };
    //   kevs.parse(data, (err: Error, model: org.kevoree.Model) => {
    //     if (err) {
    //       done(err);
    //     } else {
    //
    //       done();
    //     }
    //   });
    // });
  });
});
