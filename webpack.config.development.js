const path = require('path');
const webpack = require('webpack');

const baseConfig = require('./webpack.config.base');

const config = Object.create(baseConfig);

config.entry = {
  client: ['babel-polyfill', './entry'],
};

config.devtool = 'source-map';

config.watch = true;

module.exports = [config];
