const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
const pkg = require("./package.json");
const appName = pkg.name;
// const publicPath = '/' + appName;
const publicPath = "auto";

module.exports = defineConfig({
  publicPath,
  pages: {
    index: {
      entry: './src/main.ts',
    },
  },
  devServer: {
    // 关闭主机检查，使微应用可以被 fetch
    allowedHosts: "*", // webpack@4设置 disableHostCheck: true
    // 配置跨域请求头，解决开发环境的跨域问题
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'async',
            reuseExistingChunk: true,
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'async',
            reuseExistingChunk: true,
          },
        },
      },
    },
    experiments: {
      topLevelAwait: true,
    },
    output: {
      library: appName,
      libraryTarget: "umd",
      chunkLoadingGlobal: `webpackJsonp_${appName}`, // webpack@4设置 jsonpFunction: `webpackJsonp_${appName}`
    },
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: "app_exposes",
        filename: "remoteEntry.js",
        library: { type: "umd", name: "app_exposes" },
        exposes: {
          "./HelloWorld.vue": "./src/components/HelloWorld.vue",
          "./AboutView.vue": "./src/views/AboutView.vue",
          "./helloWord": "./src/components/helloWord.js",
        },
        shared: {
          vue: { singleton: true },
          lodash: { singleton: true, eager: true },
          // 其他共享的依赖模块
        },
      }),
    ],
  },

  transpileDependencies: true,
});
