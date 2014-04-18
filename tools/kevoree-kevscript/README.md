## kevoree-kevscript

Convert a KevScript file to a Kevoree model (ContainerRoot)

```sh
node kevs2model.js -k examples/test-parser.kevs
# will output `model.json` in current directory
```

### Kevscript API
Want to parse Kevscript programatically ?
You will need to install `kevoree-resolvers` too
```sh
npm install kevoree-resolvers --save
```
Then, you can do something like that:
```js
var Kevscript = require('kevoree-kevscript'),
    NPMResolver = require('kevoree-resolver').NPMResolver;

var myKevscript = 'include npm:kevoree-node-javascript\nadd node0 : JavascriptNode',
    kevs = new Kevscript({resolvers: {npm: new NPMResolver()});

kevs.parse(myKevscript, function (err, model) {
    if (err) throw err;

    // success
    // 'model' is the equivalent Kevoree model of your Kevscript input
});
```

### Tests
To be sure that the parser works correctly, run:
```sh
npm test
```
This will try to parse the KevScript file from ```examples/test-parser.kevs``` showing the resulting AST on stdo

### Browserify (deprecated)
If you want to generate ```kevoree-kevscript.js``` for the browser, just run:
```sh
npm install
grunt browser
```
This will create a new folder named ```browser/``` in the project root containing a raw browserified version of
```kevoree-kevscript``` and an uglified one.
> ie. Default ```grunt browser``` task will generate an AMD bundle using ```browserify```
