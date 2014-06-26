## kevoree-js/library

Every `kevoree-js` standard library source-code module is there.

### Manage libraries

```sh
npm i
```  

This will install `grunt-version`, `grunt-deps-manager` and `grunt-publish`

```sh
grunt release
```  

This will update the version of each module using the `package.json` version.  
Plus, it will update the version of all the `kevoree-js`related dependencies according to the version set in `../package.json` (from the root).  
Finally, it will release (publish) every module to `registry.npmjs.org`. 