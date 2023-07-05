const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
const pkg = require("./package.json");

const appName = pkg.name;
const publicPath = `/${appName}`;

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
    experiments: {
      topLevelAwait: true,
    },
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
    output: {
      library: appName,
      libraryTarget: "umd",
      chunkLoadingGlobal: `webpackJsonp_${appName}`, // webpack@4设置 jsonpFunction: `webpackJsonp_${appName}`
    },
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: "app_general",
        filename: "remote.js",
        remotes: {
          app_exposes: "app_exposes@http://localhost:5552/remoteEntry.js",
          // app_exposes: `promise new Promise(resolve => {
          //   const urlParams = new URLSearchParams(window.location.search)
          //   const version = urlParams.get('app1VersionParam')
          //   // This part depends on how you plan on hosting and versioning your federated modules
          //   const remoteUrlWithVersion = 'http://localhost:5552'  + 'remoteEntry.js'
          //   const script = document.createElement('script')
          //   script.src = remoteUrlWithVersion
          //   script.onload = () => {
          //     // the injected script has loaded and is available on window
          //     // we can now resolve this Promise
          //     const proxy = {
          //       get: (request) => window['app_exposes'].get(request),
          //       init: (arg) => {
          //         try {
          //           return window.app1.init(arg)
          //         } catch(e) {
          //           console.log('remote container already initialized')
          //         }
          //       }
          //     }
          //     resolve(proxy)
          //   }
          //   // inject this script with the src set to the versioned remoteEntry.js
          //   document.head.appendChild(script);
          // })
          // `

        },
        shared: {
          vue: { singleton: true },
        },
      }),
    ],
  },
  transpileDependencies: true,
});
