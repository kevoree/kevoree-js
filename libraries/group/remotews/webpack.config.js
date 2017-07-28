'use strict';

var path = require('path');
var webpack = require('webpack');

var pkg = require('./package.json');

module.exports = {
  entry: './browser.js',
  output: {
    filename: path.join('browser', pkg.name + '.js')
  },
  module: {
    loaders: [
        { test: /\.json$/, loader: 'json' },
    ]
  },
  externals: {
    'kevoree-library': 'KevoreeLibrary'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};
