'use strict';

const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

process.NODE_ENV = 'production';

module.exports = {
  entry: path.resolve('browser.js'),
  output: {
    filename: path.join('browser', pkg.name + '.js')
  },
  module: {
    loaders: [
        { test: /\.json$/, loader: 'json-loader' },
    ]
  },
  externals: {
    'kevoree-library': 'KevoreeLibrary'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};
