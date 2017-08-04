const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

const config = {
  entry: path.resolve(pkg.main),
  output: {
    filename: path.join('browser', pkg.name + '.js'),
    library: 'KevoreeKevscript',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  externals: {
    'kevoree-library': 'KevoreeLibrary',
    'kevoree-validator': 'KevoreeValidator',
    'kevoree-registry-client': 'KevoreeRegistryClient',
    'tiny-conf': 'TinyConf'
  },
  plugins: [],
  devServer: {
    contentBase: path.join(__dirname),
    watchContentBase: true,
    compress: true,
    hot: true,
    overlay: {
      warnings: true,
      errors: true
    }
  }
};

if (process.env.NODE_ENV === 'development') {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.devtool = 'eval';
}

module.exports = config;
