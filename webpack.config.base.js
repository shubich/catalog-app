const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'app'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'public'),
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }, {
      test: /\.(ttf|eot|jpg|svg|png|woff(2)?)(\?[a-z0-9=&.-]+)?$/,
      loader: 'file-loader',
      options: {
        name: 'assets/[name].[ext]?[hash]',
      },
    }],
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HTMLWebpackPlugin({
      template: './index.html',
      favicon: './favicon.png',
      hash: true,
    }),
  ],
};
