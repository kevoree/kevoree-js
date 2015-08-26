var String: Statement<string> = (elem: Elem, stmts: Statements, model: org.kevoree.Model, cb: ElemCallback<string>) => {
  cb(null, elem.children.join(''));
};

export = String;
