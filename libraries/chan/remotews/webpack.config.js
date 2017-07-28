'use strict';

var path = require('path');
var webpack = require('webpack');

var pkg = require('./package.json');

var config = {
  entry: './browser.js',
  output: {
    filename: path.join('browser', pkg.name + '.js')
  },
  module: {
    rules: [
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  externals: {
    'kevoree-library': 'KevoreeLibrary'
  },
  plugins: []
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
