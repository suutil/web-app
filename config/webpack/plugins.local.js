const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const helpers = require('./helpers');
let path = require('path');

module.exports = [

  /*
   * Plugin: CommonsChunkPlugin
   * Description: Shares common code between the pages.
   * It identifies common modules and put them into a commons chunk.
   *
   * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
   * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
   */
  new CommonsChunkPlugin({
    name: ['polyfills', 'vendor'].reverse()
  }),

  /**
   * Plugin: ContextReplacementPlugin
   * Description: Provides context to Angular's use of System.import
   *
   * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
   * See: https://github.com/angular/angular/issues/11580
   */
  new ContextReplacementPlugin(
    // The (\\|\/) piece accounts for path separators in *nix and Windows
    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    helpers.root('src') // location of your src
  ),



  new NamedModulesPlugin(),


  /**
   * Plugin LoaderOptionsPlugin (experimental)
   *
   * See: https://gist.github.com/sokra/27b24881210b56bbaff7
   */
  new LoaderOptionsPlugin({
    debug: true,
    options: {
      sassLoader: {
        includePaths: [helpers.root('src/**/.scss')]
      },
      context: '/',

      /**
       * Static analysis linter for TypeScript advanced options configuration
       * Description: An extensible linter for the TypeScript language.
       *
       * See: https://github.com/wbuchwalter/tslint-loader
       */
      tslint: {
        emitErrors: false,
        failOnHint: false,
        resourcePath: 'src'
      },
      context: __dirname,
      output: {
        path: path.join(__dirname, 'dist')
      }

    }
  }),


];