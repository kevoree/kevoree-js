## kevoree-kevscript

Convert a KevScript file to a Kevoree model (ContainerRoot)

```sh
node kevs2model.js -k examples/test-parser.kevs
# will output `model.json` in current directory
```

### Kevscript API
Want to parse Kevscript programatically ?  
Then, you can do something like this:
```js
var Kevscript = require('kevoree-kevscript');

var myKevscript = 'include npm:kevoree-node-javascript\nadd node0 : JavascriptNode',
    kevs = new Kevscript();

kevs.parse(myKevscript, function (err, model) {
    if (err) throw err;

    // success
    // 'model' is the equivalent Kevoree model of your Kevscript input
});
```

You can also give a **context model** and/or **context variables**

#### Context Model
```js
var KevScript = require('kevoree-kevscript');
var kevs = new KevScript();
var script = 'add node : JavascriptNode';
kevs.parse(script, contextModel, function (err, model) {
  if (err) {
    throw err;
  } else {
    // success
    // this model is the contextModel + the interpretation of the given KevScript
    // so here, it will add a JavascriptNode "node" to the resulting model
    // Note that contextModel WILL NOT be modified
  }
});
```

#### Context Variables
You can use the naming convention `%NAME%` to dinamycally set variable content.  
If you use 2 `%` symbols, then the interpreter will randomly generate a value for those variables (eg. `%%RANDOM_NAME%%`)

```js
var KevScript = require('kevoree-kevscript');
var kevs = new KevScript();
var script =
  'add %node% : JavascriptNode\n' +
  'add %%grp%%: WSGroup\n' +
  'attach %node% %%grp%%';
var ctxVars = {
  node: 'myNode'
};
kevs.parse(script, null, ctxVars, function (err, model) {
  if (err) {
    throw err;
  } else {
    // success
    // KevScript parser has generated a random value for %%grp%% that you can
    // retrieve here: ctxVars.grp
  }
});
```

### Tests
To be sure that the parser works correctly, run:
```sh
npm test
```
This will try to parse the KevScript file from ```examples/test-parser.kevs``` showing the resulting AST on stdo

### Browserify
If you want to generate ```kevoree-kevscript.js``` for the browser, just run:
```sh
npm install
grunt
```
This will create a new folder named ```browser/``` in the project root containing a raw browserified version of
```kevoree-kevscript```  
Once loaded in your browser, you can access the `KevoreeKevscript` class from the global scope.
