
const path = require('path');

module.exports = {
    dev: {
        // Assert Paths
        assertsSubDirecotry: 'static',
        assetsPublicPath: '/',
        proxyTable: {

        },

        // dev server setting
        host: 'localhost',
        port: 8010,
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,

        // use eslint loader,
        // If true, your code will be linted during bundling and
        // linting errors and warnings will be shown in the console.
        useEslint: true,
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false,

        // Source map
        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it may help
        cacheBusting: true,

        cssSourceMap: true
    },

    prod: {

    }
}
