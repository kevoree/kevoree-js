Kevoree Registry Client
=======================
A library to communicate with a Kevoree registry REST API

:warning: this is under development, use at your own risks :warning:

## Install
```sh
npm install kevoree-registry-client
```
or
```sh
yarn add kevoree-registry-client
```

## Usage
```ts
import * as api from 'kevoree-registry-client';
// list namespaces
api.namespace.all()
	.then((namespaces) => {
		namespaces.forEach(ns => console.log);
	})
	.catch(err => {
		console.error(err.message);
	});
```

## Bundles
The API is built for 3 different targets:
  - es6 (nodejs v6+)
    - `build/main`
  - browser (es5)
    - `build/browser`

## Clone
```sh
git clone git@github.com:kevoree/kevoree-js-registry-client.git
cd kevoree-js-registry-client
```

## Tests
```sh
npm install
npm run build
npm test
```

## Notes
This API makes an extensive use of `Promise` and `fetch` which means that it is only compatible with *real* browsers by default as it is not shipped with any polyfill.
If you want to make it work on *bad* browsers you'll need things like [github/fetch](https://github.com/github/fetch) and [stefanpenner/es6-promise](https://github.com/stefanpenner/es6-promise).
