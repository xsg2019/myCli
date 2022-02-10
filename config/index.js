"use strict";

const path = require("path");

module.exports = {
  dev: {
    // Paths
    assetsPublicPath: "/",
    proxyTable: {
      "/api": {
        target: "http://truthtest.questmobile.com.cn",
        secure: false,
        changeOrigin: true,
      },
      "/log": {
        target: "http://truthtest.questmobile.com.cn",
        secure: false,
        changeOrigin: true,
      },
    },

    // Various Dev Server settings
    host: "localhost", // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    
    cssSourceMap: true,
  },

  build: {
    // Template for index.html
    // index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    // assetsPublicPath: '/',

    assetsPublicPath: "/flash/",
    /**
     * 开启 Source Maps
     */

    productionSourceMap: false,
    // // https://webpack.js.org/configuration/devtool/#production
    // devtool: '#source-map',

    // 打包大小分析插件
    // bundleAnalyzerReport: process.env.npm_config_report
  },
};
