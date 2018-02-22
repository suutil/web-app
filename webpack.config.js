/**
 * @author: @AngularClass
 */

// Look in ./config folder for webpack.dev.js
module.exports = function (env) {
  switch (env) {
    case 'prod':
    case 'production':
      return require('./config/webpack/webpack.prod')({
        env: 'production'
      });
    case 'test':
    case 'testing':
      return require('./config/webpack/webpack.test')({
        env: 'test'
      });
    case 'local':
      return require('./config/webpack/webpack.local')({
        env: 'local'
      });
    case 'dev':
    case 'development':
    default:
      return require('./config/webpack/webpack.dev')({
        env: 'development'
      });
  }
}