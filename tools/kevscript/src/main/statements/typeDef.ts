var TypeDef: Statement<org.kevoree.TypeDefinition> = (elem: Elem, stmts: Statements, model: org.kevoree.Model, cb: ElemCallback<org.kevoree.TypeDefinition>) => {
  var typeFqn: Statement<string> = stmts[elem.children[0].type];
  typeFqn(elem.children[0], stmts, model, (err, fqn) => {
    if (err) {
      cb(err, null);
    } else {
      var version: Statement<string> = stmts[elem.children[1].type];
      version(elem.children[1], stmts, model, (err, version) => {
        if (err) {
          cb(err, null);
        } else {
          // TODO try to find a TypeDefinition using fqn/version
          console.log('tdef', fqn, version);
          cb(null, null);
        }
      });
    }
  });
};

export = TypeDef;
