const CompressionWebpackPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const path = require('path')

const dllPath = 'public/vendor'

module.exports = {
  // 生产环境关闭sourcemap
  productionSourceMap: false,
  // 将vue-baidu-map使用polyfill处理，解决IE不兼容问题
  transpileDependencies: ['vue-baidu-map'],
  css: {
    loaderOptions: {
      sass: {
        // 统一导入css变量
        data: `
          @import "@/assets/css/variable.scss";
        `
      }
    }
  },
  // 部署 服务器 的相对路径 判断是生产还是 开发环境
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist', // 构建输出目录(npm run build 或 yarn build 时 ，生成文件的目录名称)
  assetsDir: 'static', // 用于放置生成的静态资源(js、css、img、fonts)的;（项目打包之后，静态资源会放在这个文件夹下）
  //  开发过程中 用于解决跨域问题
  devServer: {
    proxy: {
      '/proxy': {
        target:'http://db.winjoinit.com:9514',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/proxy': ''
        }
      }
    },

    // host: 'localhost', // can be overwritten by process.env.HOST
    port: 8100, // 项目运行时的端口号 请每次项目修改
    https: false,
    open: true,
    hotOnly: false // hotOnly 某些模块不支持热更新的情况下，不会刷新页面，在控制台输出热更新失败
  },
  pluginOptions: {}, // 第三方插件配置

  // eslint-loader 是否在保存的时候检查 默认 true 生产环境 配置不展示
  lintOnSave: process.env.NODE_ENV !== 'production',

  runtimeCompiler: true,
  configureWebpack: () => {
    let plugins = [
      // 使用动态链接库
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('./' + dllPath + '/vendor.mainfest.json')
      }),
      // 插入动态链接库到index.html
      new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, './' + dllPath + '/*.js'),
        publicPath: 'vendor',
        outputPath: 'vendor'
      })
    ]
    // 生产环境启用gzip压缩
    if (process.env.NODE_ENV === 'production') {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          // 压缩js、css文件
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          // 不压缩中英文资源文件
          exclude: new RegExp('(' + ['en', 'zh_CN'].join('|') + ')\\.js$')
        })
      )
    }
    return {
      plugins: plugins
    }
  },
  chainWebpack: () => {
    // if (process.env.NODE_ENV === 'production') {
    //   // 生产环境压缩图片
    //   config.module
    //     .rule('image-webpack-loader')
    //     .test(/\.(gif|png|jpe?g|svg)$/i)
    //     .use('image-webpack-loader')
    //     .loader('image-webpack-loader')
    //     .options({
    //       // ie内核不支持webp格式 故放弃
    //       // webp: {
    //       //   quality: 75
    //       // }
    //       // pngquant: {
    //       //   quality: '65-90',
    //       //   speed: 10
    //       // }
    //     })
    //     .end()
    // }
    // 'src/lib' 目录下为外部库文件，不参与 eslint 检测
    // config.module
    //   .rule('eslint')
    //   .exclude
    //   .add('/Users/maybexia/Downloads/FE/community_built-in/src/lib')
    //   .end()
  }
}
