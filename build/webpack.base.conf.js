/*
 * @Author: Chris Liu
 * @Date: 2020-04-08 11:54:09
 * @Last Modified by: your name
 * @Last Modified time: 2020-05-08 14:02:05
 */
const path = require("path");
const config = require("../config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tsImportPluginFactory = require("ts-import-plugin");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const commonCssLoader = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      // only enable hot in development
      hmr: true,
      // if hmr does not work, this is a forceful method.
      reloadAll: true,
    },
  },
  "css-loader",
  {
    loader: "postcss-loader",
    options: {
      ident: "postcss",
      plugins: () => [
        // postcss的插件
        require("postcss-preset-env")(),
      ],
    },
  },
];

module.exports = {
  entry: {
    app: "./src/main.tsx",
  },
  // devtool: "source-map",

  output: {
    filename: "[name].js",
    path: config.build.assetsRoot,
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
  },

  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
    alias: {
      "@": resolve("src"),
      public: resolve("public"),
      "rc-picker": resolve("patches/rc-picker"),
      "reactour": resolve("patches/reactour"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        include: [resolve("src")],
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },

          {
            loader: "ts-loader",
            options: {
              happyPackMode: true,
              // 可以跳过 ts编译，加快打包时间，开发模式不建议开启
              // transpileOnly: true,
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory({
                    libraryName: "antd",
                    libraryDirectory: "lib",
                    style: true,
                  }),
                ],
              }),
            },
          },
          // {
          //     loader: 'eslint-loader',
          //     options: {
          //         // 自动修复eslint的错误
          //         fix: true,
          //         cache: true,
          //     }
          // },
        ],
      },
      {
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        test: /\.less$/,
        include: [resolve("src"), resolve("node_modules/antd")],
        use: [
          ...commonCssLoader,
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              modifyVars: {
                hack: `true; @import "${resolve("src/styles/theme.less")}";`, // Override with less file
              },
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          /* config.module.rule('media').use('url-loader') */
          {
            loader: "url-loader",
            options: {
              limit: 4096,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "media/[name].[hash:8].[ext]",
                  esModule: false,
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          /* config.module.rule('fonts').use('url-loader') */
          {
            loader: "url-loader",
            options: {
              limit: 4096,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "fonts/[name].[hash:8].[ext]",
                  esModule: false,
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          /* config.module.rule('images').use('url-loader') */
          {
            loader: "url-loader",
            options: {
              limit: 4096,
              esModule: false,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "images/[name].[hash:8].[ext]",
                  esModule: false,
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[hash:8].[ext]",
              esModule: false,
            },
          },
        ],
      },
    ],
  },
};
