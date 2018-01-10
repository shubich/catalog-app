const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const baseConfig = require('./webpack.config.base');

const config = Object.create(baseConfig);

config.entry = {
  client: ['babel-polyfill', './entry'],
};

config.plugins.push(
  new UglifyJSPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
    },
  }),
);

module.exports = [config];
