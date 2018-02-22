'use strict';

const helpers = require('./helpers');

const env = helpers.requireEnviroments('development') || {};
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || (process.env.HOST = env.host) || 'localhost';
const PORT = process.env.PORT || (process.env.PORT = env.port) || 3000;

module.exports = {
    port: +PORT,
    host: HOST,
    historyApiFallback: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    inline: true,
    hot: false
    //publicPath: '/locales/'
};

 /**
     * Webpack Development Server configuration
     * Description: The webpack-dev-server is a little node.js Express server.
     * The server emits information about the compilation state to the client,
     * which reacts to those events.
     *
     * See: https://webpack.github.io/docs/webpack-dev-server.html
     */
