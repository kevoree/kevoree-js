'use strict';

var DEV = (process.env.NODE_ENV !== 'production');

var path = require('path');
var webpack = require('webpack');

var pkg = require('./package.json');

var config = {
  entry: path.resolve(pkg.kevoree.browser),
  output: {
    filename: path.join('browser', pkg.name + '.js')
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  externals: {
    'kevoree-library': 'KevoreeLibrary',
    react: 'React'
  },
  plugins: []
};

if (!DEV) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
