const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { ProgressPlugin, NoEmitOnErrorsPlugin, NamedModulesPlugin } = require('webpack');

const config = {
  entry: {
    mode: resolve('src', 'mode', 'kevscript.js'),
    theme: resolve('src', 'theme', 'kevscript.css'),
    lint: resolve('src', 'lint', 'lint.js'),
    hint: resolve('src', 'hint', 'hint.js'),
  },
  output: {
    filename: '[name].js',
    path: resolve('dist'),
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        },
      },
    ]
  },
  externals: {
    'codemirror': 'CodeMirror',
  },
  plugins: [
    new ProgressPlugin(),
    new NoEmitOnErrorsPlugin(),
    new NamedModulesPlugin(),
  ],
};

if (process.env.NODE_ENV === 'development') {
  config.entry = {
    test: resolve('test', 'main.js')
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      "template": "./test/index.html",
      "filename": "./index.html",
      "inject": false,
      "compile": true,
      "favicon": false,
      "showErrors": true,
      "xhtml": true,
    })
  );
  config.devtool = 'source-map';
  config.externals = {
    'react': 'React',
    'react-dom': 'ReactDOM'
  };
} else {
  config.plugins.push(new ExtractTextPlugin('[name].css'));
}

module.exports = config;
