const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common'); // the settings that are common to prod and dev

module.exports = function (options) {
  return webpackMerge(commonConfig(options), {

    devtool: 'cheap-module-source-map',
    plugins: require('./plugins.dev'),
    module: require('./module.dev'),
    devServer: require('./dev-server')

  });
}