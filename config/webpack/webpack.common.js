module.exports = function (options) {

  return {
    //cache: false,
    entry: require('./entry'),
    resolve: require('./resolve'),
    output: require('./output'),
    plugins: require('./plugins.common')(options),

    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  };
}