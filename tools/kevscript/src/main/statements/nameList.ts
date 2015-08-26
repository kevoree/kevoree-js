import * as async from 'async';

var NameList: Statement<string[]> = (elem: Elem, stmts: Statements, model: org.kevoree.Model, cb: ElemCallback<string[]>) => {
  var tasks = elem.children.map((elem) => {
    return (done: AsyncResultCallback<string>) => {
      var instancePath: Statement<string> = stmts[elem.type];
      instancePath(elem, stmts, model, done);
    };
  });

  async.parallel(tasks, cb);
};

export = NameList;
