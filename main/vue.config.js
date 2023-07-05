const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    headers: { // 重点1: 允许跨域访问子应用页面
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    externals: {
      vue: 'Vue'
    }
  }
})
