# Kevoree Browser Runtime #

Kevoree Runtime straight into your browser!

TODO

### Get started ###
```sh
git clone git@github.com:dukeboard/kevoree-js.git
cd kevoree-js/platform/browser/client
npm install
cd ..
npm install
grunt
```

By doing so, __Grunt__ will run three tasks:

*  __browserifying__ client/kevoree-browser-runtime.js into dist/kevoree-browser-runtime.browserify.js
*  __uglyfiying__ dist/kevoree-browser-runtime.browserify.js into site/js/kevoree-browser-runtime.min.js
*  __express__ start Kevoree Browser Runtime server