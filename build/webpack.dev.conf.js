// 设置开发环境
process.env.NODE_ENV = 'development'

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
const CleanWebpackPlugin = require('clean-webpack-plugin')

const devWebpackConfig = merge(baseWebpackConfig, {

  mode: process.env.NODE_ENV || 'development',

  // module: {
  //     // merge from baseWebpackConfig
  // },

  plugins: [
    // 可通过 --hot 替代
    // 模块热替换的插件，修改模块不需要刷新页面
    new webpack.HotModuleReplacementPlugin(),
    // 当使用HotModuleReplacementPlugin时，这个插件会显示模块正确的相对路径
    new webpack.NamedChunksPlugin(),
    // 在编译出错时，使用NoEmitOnErrorsPlugin来跳过输出阶段，这样可以确保输出资源不会包含错误
    new webpack.NoEmitOnErrorsPlugin(),

    new HtmlWebpackPlugin({
      template: utils.resolve('src/index.html'),
      favicon: utils.resolve('src/assets/logo.png')
    }),

    // copy custom static assets
    // 将static文件夹和里面的内容拷贝到开发模式下的路径,比如static下有个img文件夹，里面有张图片
    // 我们可以这样访问：localhost:8080/static/img/logo.png
    new CopyWebpackPlugin([{
      from: utils.resolve('static'),
      to: config.dev.assetsSubDirecotry,
      // 指定不copy项
      ignore: ['.*']
    }]),

    new CleanWebpackPlugin(['dist'], {
      root: utils.resolve('/'),
      verbose: true,
      dry: false
    })
  ],

  devtool: config.dev.devtool,

  devServer: {
    // use copy-webpack-plugin
    // contentBase是来告诉服务器在哪里提供静态的内容，
    // 这里我们使用false的原因是使用了“copy-webpack-plugin”插件，不需要使用contentBase了
    // contentBase: utils.resolve('dist'),
    contentBase: false,
    host: config.dev.host,
    port: config.dev.port,
    clientLogLevel: 'info',
    historyApiFallback: {
      rewrites: [{
        from: /.*/,
        to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
      }]
    },
    compress: true,
    hot: true,
    // quiet开启后(true)，除了初始启动信息之外的任何内容都不会被打印到控制台，
    // 即使是webpack 的错误或警告在控制台也不可见。
    // 不过我们用了'friendly-errors-webpack-plugin'插件，就可以设为true了
    quiet: true, // necessary for FriendlyErrorsPlugin
    open: config.dev.autoOpenBrowser,
    publicPath: config.dev.publicPath,
    proxy: config.dev.proxyTable,
    overlay: config.dev.errorOverlay ?
      {
        warnings: false,
        errors: true
      } :
      false,
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
        onErrors: config.dev.notifyOnErrors ?
          utils.createNotifierCallback() :
          undefined
      }));
      resolve(devWebpackConfig);
    }
  });
})
