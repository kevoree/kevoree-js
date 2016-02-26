import { org } from 'kevoree-model';

var Add: Statement<void> = (elem: Elem, stmts: Statements, model: org.kevoree.Model, cb: ElemCallback<void>) => {
  var nameList: Statement<string[]> = stmts[elem.children[0].type];
  nameList(elem.children[0], stmts, model, (err, namelist) => {
    if (err) {
      cb(err, null);
    } else {
      var typeDef: Statement<org.kevoree.TypeDefinition> = stmts[elem.children[1].type];
      typeDef(elem.children[1], stmts, model, (err, tdef) => {
        if (err) {
          cb(err, null);
        } else {
          namelist.every((name) => {
            if (name.split('.').length > 2) {
              // there is no way an instancePath could contain more than 2 fragments
              // TODO this case should have been handled by the grammer parser..not here
              err = new Error(`"${name}" is not a valid name.`);
              return false;
            } else {
              // supposed to be a component or a subNode
              // TODO find if this instance exists in the model
              // TODO if does not exist: create it using tdef & return true
              // TODO if it does exist: callback with error & return false
              return true;
            }
          });

          cb(err, null);
        }
      });
    }
  });
};

export = Add;
