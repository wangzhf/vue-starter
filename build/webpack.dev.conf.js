const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');
const merge = require('webpack-merge');
const portfinder = require('portfinder');
const FriendlyErrorPlugin = require('friendly-errors-webpack-plugin');
const utils = require('./utils');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const devWebpackConfig = merge(baseWebpackConfig, {

    mode: process.env.NODE_ENV || 'development',

    // module: {
    //     // merge from baseWebpackConfig
    // },

    plugins: [
        new HtmlWebpackPlugin({
            template: utils.resolve('src/index.html'),
            favicon: utils.resolve('src/assets/logo.png')
        }),

        // 可通过 --hot 替代
        //new webpack.NamedChunksPlugin(),
        //new webpack.HotModuleReplacementPlugin()

        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: utils.resolve('static'),
                to: config.dev.assetsSubDirecotry,
                // 指定不copy项
                // ignore: ['.*']
            }
        ])
    ],

    devtool: config.dev.devtool,

    devServer: {
        // use copy-webpack-plugin
        // contentBase: utils.resolve('dist'),
        contentBase: false,
        host: config.dev.host,
        port: config.dev.port,
        clientLogLevel: 'info',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') }
            ]
        },
        compress: true,
        hot: true,
        quiet: true, // necessary for FriendlyErrorsPlugin
        open: config.dev.autoOpenBrowser,
        publicPath: config.dev.publicPath,
        watchOptions: {
            poll: config.dev.poll
        }
    }

})

module.exports = new Promise((resolve, reject) => {
    // 从参数中获取端口号，如果端口号不可用，报错
    portfinder.basePort = process.env.PORT || config.dev.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err);
        } else {
            // 更新端口号
            process.env.PORT = port;
            // 更改webpack配置中的端口号
            devWebpackConfig.devServer.port = port;

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: undefined
            }));
            resolve(devWebpackConfig);
        }
    });
})
