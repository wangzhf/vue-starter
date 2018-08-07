const path = require('path')
const config = require('../config')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const packageConfig = require('../package.json')

// 解析路径
exports.resolve = function (_dir) {
  return path.join(__dirname, '..', _dir)
}

// 解析路径
//function resolve(_dir){
//    return path.join(__dirname, '..', _dir);
//}

// 解析资源路径
exports.assetsPath = function (_path) {
  const assetsSubDirecotry = process.env.NODE_ENV === 'production' ?
    config.prod.assetsSubDirecotry :
    config.dev.assetsSubDirecotry
  return path.posix.join(assetsSubDirecotry, _path)
}

/**
 * 导出一个供vue-loader的options使用的一个配置
 * 因为vue-loader已经内置postcss，所以调用此方法时无需传入postcss相关配置
 */
exports.cssLoaders = function (options) {
  options = options || {}

  // css
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // postcss
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // 动态拼接指定的css相关的loaders
  const generateLoaders = function (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // 配置是否提取css
    if (options.extract) {
      return [{
        // https://vue-loader.vuejs.org/zh/guide/extract-css.html#webpack-4
        loader: MiniCssExtractPlugin.loader,
        options: {
          // 重写资源路径
          publicPath: '../../'
        }
      }].concat(loaders)
    } else {
      /**
       * 返回 ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
       * @import url(demo.less)为例子
       * less-loader先处理less语法
       * postcss-loader进行前缀添加等其他处理
       * css-loader处理@import将内容引入@import所在的css文件内
       * vue-style-loader将生成style标签插入head
       */
      return ['vue-style-loader'].concat(loaders)
    }
  }
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {
      indentedSyntax: true
    }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

/**
 * 处理`.vue`之外独立的样式文件
 */
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    // 生成相应的rules
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

/**
 * `node-notifier`是一个跨平台系统通知的页面，当遇到错误时，它能用系统原生的推送方式给你推送信息
 */
exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (serverity, errors) => {
    if (serverity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: serverity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
