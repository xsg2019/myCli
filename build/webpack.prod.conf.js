/*
 * @Author: Chris Liu
 * @Date: 2020-04-08 11:54:31
 * @Last Modified by: your name
 * @Last Modified time: 2020-04-08 15:02:46
 */
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

process.env.NODE_ENV = "production";

module.exports = merge(baseWebpackConfig, {
  mode: "production",
  output: {
    filename: "js/[name].[hash:8].js",
    chunkFilename: "js/[id].[hash:8].js",
    path: config.build.assetsRoot,
  },

  optimization: {
    // 压缩css,js
    minimizer: [
      new TerserJSPlugin({
        sourceMap: config.build.productionSourceMap,
        parallel: true,
        cache: true,
        terserOptions: {
          compress: {
            drop_console: true,
          },

          warnings: false,
        },
      }),
      new OptimizeCSSPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      inject: "body",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:7].css",
      chunkFilename: "css/[id].[contenthash:7].css",
      ignoreOrder: true,
    }),
    // new AddAssetHtmlWebpackPlugin({
    //     filepath: resolve(__dirname, 'dll/library.js')
    // }),
    // 删除旧dist目录
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
});
