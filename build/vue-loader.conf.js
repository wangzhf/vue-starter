const utils = require('./utils')
const config = require('../config')

// 构建生产环境时，会先配置`process.env.NODE_ENV`
const isProduction = process.env.NODE_ENV === 'production'
// 配置不同环境是否开启sourceMap
const sourceMapEnabled = isProduction ?
  config.prod.productionSourceMap :
  config.dev.cssSourceMap

// 导出vue-loader的配置
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),

  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,

  // transformToRequire的作用是在模板编译的过程中，编译器可以将某些属性，如src转换为require调用
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
