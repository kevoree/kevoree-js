'use strict';

const path = require('path');
const paths = require('./paths');
const pkg = require(paths.appPackageJson);

module.exports = {
  entry: path.resolve('..', 'browser', 'entry.js'),
  output: {
    filename: path.join(paths.appPath, 'browser', pkg.name + '.js')
  },
  module: {
    loaders: [
      { test: /\.json$/, exclude: /node_modules/, loader: 'json-loader'  },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ]
  },
  externals: {
    'kevoree-library': 'KevoreeLibrary',
    'kevoree-module-loader': 'KevoreeModuleLoader'
  }
};
