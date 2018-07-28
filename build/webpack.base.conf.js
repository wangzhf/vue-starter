const path = require('path');
const utils = require('./utils');
const config = require('../config');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

console.log('============>> base config env', process.env.NODE_ENV);
module.exports = {

    entry: {
        main: './src/index.js'
    },

    output: {
        path: config.prod.assetsRoot,
        filename: '[name].js?[hash]',
        chunkFilename: '[name].js?[hash]'
    },

    // module
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV !== 'production'
                    ? 'vue-style-loader'
                    : MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240
                        }
                    }
                ]
            }
        ]
    },

    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'vendor',
                    minChunks: 1
                }
            }
        }
    },

    plugins: [
        new VueLoaderPlugin(),

        new CleanWebpackPlugin(['dist'], {
            root: utils.resolve('/'),
            verbose: true,
            dry: false
        })
    ]
}
