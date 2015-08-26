import * as async from 'async';

var InstancePath: Statement<string> = (elem: Elem, stmts: Statements, model: org.kevoree.Model, cb: ElemCallback<string>) => {
  var tasks = elem.children.map((elem) => {
    return (done: AsyncResultCallback<any>) => {
      var string: Statement<string> = stmts[elem.type];
      string(elem, stmts, model, done);
    };
  });

  async.parallel(tasks, (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result.join('.'));
    }
  });
};

export = InstancePath;
