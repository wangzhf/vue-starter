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

    // 压缩JS代码
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.prod.productionSourceMap,
      parallel: true
    }),

    // extract css into its own file
    new MiniCssExtractPlugin({
      // For long term caching use filename: "[contenthash].css". Optionally add [name]
      // https://github.com/webpack-contrib/mini-css-extract-plugin#long-term-caching
      filename: utils.assetsPath('css/[name].[contenthash:7].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash:7].css')
    }),
    // 压缩css
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

    /**
     * https://zhuanlan.zhihu.com/p/35093098
     * https://github.com/pigcan/blog/issues/9
     * vue-cli webpack中也有此配置
     * 正常来讲，引用node_modules不变的话，vender的hash应该是不变的，
     * 但是引用其他的模块，模块id变化会引起vender中模块id变化，引起hash变化，
     * 使用此插件对引入路径进行hash截取最后几位做模块标识可解决这个问题
     *
     * 开发模式有另一个插件NamedModulesPlugin
     */
    new webpack.HashedModuleIdsPlugin(),

    new CopyWebpackPlugin([{
      from: utils.resolve('static'),
      to: config.prod.assetsSubDirectory,
      ignore: ['.*']
    }])

  ],

})

// 配置webpack-bundle-analyzer
if (config.prod.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig;
