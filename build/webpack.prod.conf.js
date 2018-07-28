const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config');
const utils = require('./utils');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const webpackConfig = merge(baseWebpackConfig, {

    mode: process.env.NODE_ENV || 'production',

    devtool: config.prod.productionSourceMap ? config.prod.devtool : false,

    output: {
        path: config.prod.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash:7].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:7].js')
    },

    plugins: [

        // extract css into its own file
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[hash:7].css'),
            chunkFilename: utils.assetsPath('css/[name].[hash:7].css')
        }),

        new OptimizeCSSAssetsPlugin({}),

        new HtmlWebpackPlugin({
            filename: config.prod.index,
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            }
        }),

        new CopyWebpackPlugin([
            {
                from: utils.resolve('static'),
                to: config.prod.assetsSubDirectory
            }
        ])

    ],

})

module.exports = webpackConfig;
