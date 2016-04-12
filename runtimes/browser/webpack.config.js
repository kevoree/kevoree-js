var path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src', 'main', 'index.tsx'),

  output: {
    path: path.join(__dirname, 'built', 'browser'),
    filename: 'bundle.js',
    publicPath: ''
  },

  resolve: {
    extensions: ['', '.js', '.ts', '.tsx']
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },

  devtool: 'source-map'
}
