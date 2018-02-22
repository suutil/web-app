const webpack = require('webpack');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const webpackMerge = require('webpack-merge'); // used to merge webpack configs

var CompressionPlugin = require('compression-webpack-plugin');

const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const helpers = require('./helpers');

let ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: true,
    beautify: false,
    mangle: {
      screw_ie8: true,
      keep_fnames: true
    },
    comments: false
  }),
  new CompressionPlugin({
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  }),

  new AotPlugin({
    tsConfigPath: helpers.root('tsconfig.aot.json'),
    entryModule: helpers.root('src/app/app.module#AppModule'),
    // skipCodeGeneration: true,
    // mainPath: helpers.root('src/main.aot.ts'),
  }),
  
  
];