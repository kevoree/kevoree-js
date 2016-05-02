var path = require('path');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx']
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }]
  },
  entry: path.join(__dirname, 'src', 'main', 'index.tsx'),
  output: {
    path: path.join('built', 'browser'),
    filename: 'kevoree-browser-testing.js',
    publicPath: 'built/browser'
  },
  externals: {
    'react': 'var React',
    'react-dom': 'var ReactDOM',
    'kevoree-model': 'var KevoreeModel'
  }
};
