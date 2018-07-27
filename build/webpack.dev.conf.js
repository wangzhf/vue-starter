const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');
const merge = require('webpack-merge');
const portfinder = require('portfinder');
const FriendlyErrorPlugin = require('friendly-errors-webpack-plugin');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',

    // module: {
    //     // merge from baseWebpackConfig
    // },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false
        }),
        new VueLoaderPlugin(),
        // 可通过 --hot 替代
        //new webpack.NamedChunksPlugin(),
        //new webpack.HotModuleReplacementPlugin()
    ],

    devtool: config.dev.devtool,

    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        host: config.dev.host,
        port: config.dev.port,
        compress: true,
        hot: true,
        open: config.dev.autoOpenBrowser,
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
