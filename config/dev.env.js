const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',

    entry: {
        main: './src/index.js'
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js?[chunkhash]',
        chunkFilename: '[name].js?[chunkhash]'
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader']
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
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

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin([
            'dist/*.js',
            'dist/*.html',
            'dist/*.css'
        ]),
        new VueLoaderPlugin()
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    minChunks: 1
                }
            }
        }
    }

}
