const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  //基本路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  //输出目录
  outputDir: 'dist',
  //指定生成的文件
  indexPath: 'index.html',
  //vue兼容ie
  transpileDependencies: true,
  //是否启用eslint验证
  lintOnSave: false,
  //开发环境配置
  devServer: {
    //允许别人访问自己的ip地址
    host: '0.0.0.0',
    //代理配置
    proxy: {
      '/api': {
        target: 'https://www.fastmock.site/mock/9d12c14426b750d73d484c14876cc29f/vue3',//接口的域名
        ws: true,//是否代理websockets
        secure: false,//是否是https接口
        changeOrigin: true,//是否跨域
        pathRewrite: {//重写地址，将前缀/api转为""
          '^/api': ""
        }
      }
    }
  },
  // 加载svg图标
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config.module
      .rule('element-plus-2')
      .test(/\.mjs$/)
      // https://webpack.docschina.org/configuration/module/#ruletype
      .type('javascript/auto')
      .include.add(/node_modules/)
      .end()
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.

    resolve: {
      alias: {
        path: require.resolve("path-browserify"),
      },
    },
  },
})
