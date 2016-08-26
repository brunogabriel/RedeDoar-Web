var webpack = require('webpack');
var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: PROD ? 'bundle.min.js' : 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
      loader: 'file'
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react', 'stage-1']
      }
    }]
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : []
};
