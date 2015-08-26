import * as async from 'async';
import { org } from 'kevoree-model';
import * as shortid from 'shortid';
var Parser = require('./parser');
var Statements: Statements = require('./statements');

interface Callback {
  (err?: Error): void;
}

export interface ModelCallback {
  (err: Error, model?: org.kevoree.Model): void;
}

export interface KevScriptData {
  kevs: string;
  ctxModel?: org.kevoree.Model;
  ctxVars?: Object;
}

export class KevScript {

  /**
   * Converts a KevScript string to a Kevoree model
   */
  parse(data: KevScriptData, cb: ModelCallback) {
    if (!data.ctxVars) {
      data.ctxVars = {};
    }

    var toGenPattern = new RegExp('(%(%([a-zA-Z0-9_]+)%)%)', 'g');
    var match = toGenPattern.exec(data.kevs);
    while (match != null) {
      data.ctxVars[match[3]] = shortid.generate();
      data.kevs = data.kevs.replace(new RegExp(match[1], 'g'), match[2]);
      match = toGenPattern.exec(data.kevs);
    }

    Object.keys(data.ctxVars).forEach(function(key) {
      data.kevs = data.kevs.replace(new RegExp('%' + key + '%', 'g'), data.ctxVars[key]);
    });

    var res = /(%([a-zA-Z0-9_]+)%)/.exec(data.kevs);
    if (res) {
      cb(new Error(`Context variable ${res[1]} has no value (eg. {"${res[2]}": "foo"})`));
    }

    var dm = org.kevoree.modeling.memory.manager.DataManagerBuilder.buildDefault();
    var kModel = new org.KevoreeModel(dm);

    kModel.connect(() => {
      var kView = kModel.universe(0).time(0);
      var p = new Parser();
      var ast: Elem = p.parse(data.kevs);
      var model = kView.createModel();

      var tasks = ast.children.map((elem) => {
        return elem.children[0];
      }).map((elem) => {
        return function (done: AsyncResultCallback<any>) {
          var stmt = Statements[elem.type];
          stmt(elem, Statements, model, done);
        };
      });

      async.series(tasks, (err: Error) => {
        // console.log('async series done', err.message);
        cb(err, model);
      });
    });
  }

  /**
   * Converts a Kevoree model to a KevScript string
   */
  parseModel(model: org.kevoree.Model): string {
    // TODO
    return '// not implemented yet\n';
  }
}
