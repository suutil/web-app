'use strict';

const helpers = require('./helpers');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

let isProd = ENV === 'production';

module.exports = {

  rules: [
    {
      test: /\.ts$/,
      loaders: ['@ngtools/webpack']
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },

    {
      test: /\.html$/,
      loader: 'raw-loader',
      exclude: [helpers.root('src/index.html')]
    },

    {
      test: /\.(jpg|png|gif)$/,
      loader: 'file'
    },
    {
      test: /\.scss$/,
      loaders: ['raw-loader', 'sass-loader?sourceMap']
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url?limit=10000&minetype=application/font-woff"
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file"
    }
  ]
};