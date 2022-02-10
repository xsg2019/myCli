/*
 * @Author: Chris Liu
 * @Date: 2020-04-08 11:54:20
 * @Last Modified by: your name
 * @Last Modified time: 2020-04-17 14:38:35
 */
const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const config = require('../config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

process.env.NODE_ENV = 'development'

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    filename: 'js/[name].[hash:8].js',
  },
  devtool: 'source-map',
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    // history模式刷新重定向到index.html页面
    historyApiFallback: {
      rewrites: [{ from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') }],
    },
    progress: true,
    inline: true,
    contentBase: [path.join(__dirname, 'public')],
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true,
    watchOptions: {
      poll: config.dev.poll,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
      minify: {
        html5: true,
      },
    }),

    new MiniCssExtractPlugin({
      // 生成对应的css文件
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`,
            ],
          },
        })
      )

      resolve(devWebpackConfig)
    }
  })
})
