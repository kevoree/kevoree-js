const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { ProgressPlugin, NoEmitOnErrorsPlugin, NamedModulesPlugin } = require('webpack');

const config = {
  entry: resolve('demo-src', 'main.js'),
  output: {
    filename: '[name].js',
    path: resolve('demo'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        },
      },
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new ProgressPlugin(),
    new NoEmitOnErrorsPlugin(),
    new NamedModulesPlugin(),
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      'template': './demo-src/index.html',
      'filename': './index.html',
      'inject': false,
      'compile': true,
      'favicon': false,
      'showErrors': true,
      'xhtml': true,
    })
  ],
};

if (process.env.NODE_ENV === 'development') {
  config.devtool = 'source-map';
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
