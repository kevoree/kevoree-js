'use strict';

const path = require('path');

const pkg = require('./package.json');

module.exports = {
  entry: './browser.js',
  output: {
    filename: path.join('browser', pkg.name + '.js')
  },
  module: {
    loaders: [
      { test: /\.json$/, exclude: /node_modules/, loader: 'json-loader' },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ]
  },
  externals: {
    'kevoree-library': 'KevoreeLibrary'
  }
};
