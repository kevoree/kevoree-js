'use strict';

const paths = require('./paths');
const pkg = require(paths.appPackageJson);

module.exports = {
  bail: true,
  entry: paths.appBrowserEntry,
  output: {
    path: paths.appBrowser,
    filename: pkg.name + '.js',
  },
  module: {
    loaders: [
      { test: /\.json$/, exclude: /node_modules/, loader: 'json-loader' },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ]
  },
  externals: {
    'kevoree-library': 'KevoreeLibrary',
    'kevoree-module-loader': 'KevoreeModuleLoader'
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  performance: {
    hints: false,
  },
};
