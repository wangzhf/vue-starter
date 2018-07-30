/**
 * 构建生产环境
 * 参考： https://github.com/vuejs-templates/webpack
 */
// set production env
process.env.NODE_ENV = 'production'

const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
const rm = require('rimraf')
const ora = require('ora')
const chalk = require('chalk')

const spinner = ora('Building for production ... ')
spinner.start()

rm(path.join(config.prod.assetsRoot, config.prod.assetsSubDirecotry), err => {
  if (err) throw err;

  // webpack
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      // If you are using ts-loader,
      // setting this to true will make Typescript errors show up during build.
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
