'use strict';

const path = require('path');
const pkg = require('./package.json');

module.exports = {
  entry: path.resolve(pkg.main),
  output: {
    filename: path.join('browser', pkg.name + '.js'),
    library: 'KevoreeModuleLoader',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};
