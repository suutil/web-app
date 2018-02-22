'use strict';

const helpers = require('./helpers');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

let isProd = ENV === 'production';

module.exports = {

  rules: [

    /*
     * Typescript loader support for .ts and Angular 2 async routes via .async.ts
     * Replace templateUrl and stylesUrl with require()
     *
     * See: https://github.com/s-panferov/awesome-typescript-loader
     * See: https://github.com/TheLarkInn/angular2-template-loader
     */
    {
      test: /\.ts$/,
      include: [helpers.root('src/'), helpers.root('aot/node_modules')],
      loaders: [
        '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
        'awesome-typescript-loader',
        'angular2-template-loader'
      ],
      exclude: [/\.(spec|e2e)\.ts$/]
    },

    /*
     * Json loader support for *.json files.
     *
     * See: https://github.com/webpack/json-loader
     */
    {
      test: /\.json$/,
      loader: 'json-loader'
    },

    /*
     * to string and css loader support for *.css files
     * Returns file content as string
     *
     */
    /*        {
              test: /\.css$/,
              loaders: ['to-string-loader', 'css-loader']
            }, */

    /* Raw loader support for *.html
     * Returns file content as string
     *
     * See: https://github.com/webpack/raw-loader
     */
    {
      test: /\.html$/,
      loader: 'raw-loader',
      exclude: [helpers.root('src/index.html')]
    },

{ test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },

    /* File loader for supporting images, for example, in CSS files.
     */
    {
      test: /\.(jpg|png|gif)$/,
      loader: 'file'
    },

    /*
     * to string and css loader support for *.css files
     * Returns file content as string
     *
     */
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
    },

  ],

};
