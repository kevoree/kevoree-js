const express = require('express');
const routes = require('../../fixtures/registry/routes.json');
const resources = require('../../fixtures/registry/resources.json');

module.exports = () => new Promise((resolve) => {
	const app = express();
	Object.keys(routes).forEach((route) => {
		const ref = routes[route];
		if (typeof ref === 'number') {
			app.get(route, (req, res) => {
				res.sendStatus(ref);
			});
    } else if (typeof ref === 'object') {
      app.get(route, (req, res) => {
        const paramName = ref.param;
        const paramValue = req.query[ref.param];
        const computedRef = ref[paramName][paramValue];
        res.json(resources[computedRef]);
      });
		} else {
			app.get(route, (req, res) => {
				res.json(resources[ref]);
			});
		}
	});
	app.get('*', (req, res) => {
		console.error('!!! IF YOU SEE THIS IT MEANS THAT THERE ARE PROBLEMS IN THE TESTS !!!'); // eslint-disable-line
		console.error('Unable to find mocked route:', req.url); // eslint-disable-line
		res.sendStatus(404);
	});
	const server = app.listen(3000, () => {
		resolve(server);
	});
});
