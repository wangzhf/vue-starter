const utils = require('./utils');
const config = require('../config');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const vueLoaderConfig = require('./vue-loader.conf')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  // 返回项目的根路径
  context: utils.resolve('./'),
  // 入口
  entry: {
    main: './src/index.js'
  },

  output: {
    path: config.prod.assetsRoot,
    filename: '[name].js?[hash]',
    chunkFilename: '[name].js?[hash]',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.prod.assetsPublicPath :
      config.dev.assetsPublicPath
  },

  resolve: {
    // 自动解析扩展，比如引入对应的文件，js,vue,json的后缀名就可以省略了
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 精准匹配，使用vue来替代vue/dist/vue.esm.js
      'vue$': 'vue/dist/vue.esm.js',
      // 使用@替代src路径，当你引入src下的文件是可以使用import XXfrom "@/xx"
      '@': utils.resolve('src')
    }
  },

  // module
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: [utils.resolve('src'), utils.resolve('test')]
        //exclude: /node_modules/
      },
      // 配置css, postcss, sass...的rule
      ...utils.styleLoaders({
        sourceMap: isProduction ? config.prod.productionSourceMap :
          config.dev.cssSourceMap,
        extract: isProduction ? true : false,
        usePostCSS: true
      }),
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },

  // node里的这些选项是都是Node.js全局变量和模块，这里主要是防止webpack注入一些Node.js的东西到vue中
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
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
    new VueLoaderPlugin()
  ]
}
