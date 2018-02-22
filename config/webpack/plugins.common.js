const helpers = require('./helpers');
const package = require('../../package.json');

const AssetsPlugin = require('assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlElementsPlugin = require('../html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');


module.exports = function (options) {
  const env = helpers.requireEnviroments(options.env) || {};

  const METADATA = {
    title: package.name,
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer(),
    HOST: process.env.HOST || (process.env.HOST = env.host) || 'localhost',
    PORT: process.env.PORT || (process.env.PORT = env.port) || 3000,
    ENV: process.env.ENV = process.env.NODE_ENV = options.env,
    HMR: helpers.hasProcessFlag('hot'),
    APP_CONFIG: process.env.APP_CONFIG || (process.env.APP_CONFIG = env.config) || {}
  };

  //const LANGUAGES = METADATA.APP_CONFIG.webtranslateit ? METADATA.APP_CONFIG.webtranslateit.langs : ['es'];

  return [
    new AssetsPlugin({
      path: helpers.root('dist'),
      filename: 'webpack-assets.json',
      prettyPrint: true
    }),

    /*
     * Plugin: CopyWebpackPlugin
     * Description: Copy files and directories in webpack.
     *
     * Copies project static assets.
     *
     * See: https://www.npmjs.com/package/copy-webpack-plugin
     */
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets',
    }]),


    new CopyWebpackPlugin([{
      from: 'src/styles',
      to: 'styles',
    }]),

    new DefinePlugin({
      'process.env': {
        'HOST': JSON.stringify(METADATA.HOST),
        'PORT': JSON.stringify(METADATA.PORT),
        'ENV': JSON.stringify(METADATA.ENV),
        //'LANG': JSON.stringify(LANGUAGES[0]),
        'NODE_ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'APP_CONFIG': JSON.stringify(METADATA.APP_CONFIG)
      }
    }),

    /*
     * Plugin: HtmlWebpackPlugin
     * Description: Simplifies creation of HTML files to serve your webpack bundles.
     * This is especially useful for webpack bundles that include a hash in the filename
     * which changes every compilation.
     *
     * See: https://github.com/ampedandwired/html-webpack-plugin
     */
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: METADATA.title,
      chunksSortMode: 'dependency',
      metadata: METADATA,
      inject: 'head'
    }),

    /*
     * Plugin: HtmlElementsPlugin
     * Description: Generate html tags based on javascript maps.
     *
     *
     * Dependencies: HtmlWebpackPlugin
     */
    new HtmlElementsPlugin({
      headTags: require('./head-config.common')
    }),

    new ProvidePlugin({
      ScrollReveal: 'scrollreveal',
      jQuery: 'jquery',
      $: 'jquery',
      jquery: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Popper: ['popper.js', 'default'],
      Tether: "tether",
      "window.Tether": "tether",
      Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
      Button: "exports-loader?Button!bootstrap/js/dist/button",
      Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
      Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
      Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
      Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
      Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: "exports-loader?Util!bootstrap/js/dist/util",
    }),

    /*
     * Plugin: ScriptExtHtmlWebpackPlugin
     * Description: Enhances html-webpack-plugin functionality
     * with different deployment options for your scripts including:
     *
     * See: https://github.com/numical/script-ext-html-webpack-plugin
     */
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),

  ];
}
