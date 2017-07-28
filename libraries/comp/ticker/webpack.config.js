const webpack = require('webpack');
const { resolve } = require('path');
const pkg = require('./package.json');

const config = {
	entry: resolve(pkg.kevoree.browser),
	output: {
		filename: `${pkg.name}.js`,
		path: resolve('browser')
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	externals: {
		'kevoree-library': 'KevoreeLibrary',
		'react': 'React',
		'react-dom': 'ReactDOM'
	},
	plugins: [],
};

if (process.env.NODE_ENV !== 'production') {
	config.plugins.push(new webpack.HotModuleReplacementPlugin());
	config.devtool = 'source-map';
}

module.exports = config;
