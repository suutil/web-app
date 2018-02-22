const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common'); // the settings that are common to prod and dev

module.exports = function (options) {
  return webpackMerge(commonConfig(options), {

    devtool: false,
    module: require('./module.prod'),
    plugins: require('./plugins.prod')

  });
}