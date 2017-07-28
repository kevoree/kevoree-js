const AbstractComponent = require('kevoree-entities/lib/AbstractComponent');

const UpdateInject = AbstractComponent.extend({
  toString: 'UpdateInject',
  tdef_version: 1,

  dic_filter: {},
  dic_kevs: {},

  construct: function () {
    this.nodes = {};
    this.modelDeployed = () => {
      const model = this.getKevoreeCore().getCurrentModel();
      const filter = new RegExp(this.getDictionary().getString('filter', '.*'), 'g');
      model.nodes.array
        .filter((node) => {
          return node.name.match(filter);
        })
        .forEach((node) => {
          const script = this.getDictionary().getString('kevs', '').replace(/\{nodeName\}/g, node.name).trim();
          if (script.length > 0) {
            if (!this.nodes[node.name]) {
              this.getKevoreeCore().off('deployed', this.modelDeployed);
              this.nodes[node.name] = true;
              this.submitScript(script, () => {
                this.getKevoreeCore().on('deployed', this.modelDeployed);
              });
            }
          }
        });
    };
  },

  start: function (done) {
    this.getKevoreeCore().on('deployed', this.modelDeployed);
    done();
  },

  stop: function (done) {
    this.getKevoreeCore().off('deployed', this.modelDeployed);
    done();
  }
});

module.exports = UpdateInject;
