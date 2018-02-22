'use strict';

module.exports = {
    globals: [
        'zone.js',
        'reflect-metadata'
    ],
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts',
    app: ['bootstrap-loader', 'main.ts']
};
