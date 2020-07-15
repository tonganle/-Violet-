// webpack dll config
// 将第三方库预编译 减少构建时间
const path = require('path')
const DllPlugin = require('webpack/lib/DllPlugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

const dllPath = 'public/vendor'
// import ParallelUglifyPlugin from 'webpack-parallel-uglify-plugin';
module.exports = {
  entry: {
    vendor: [
      'vue/dist/vue.esm.js',
      'vue-baidu-map',
      'vue-i18n',
      // 'element-ui',
      'axios',
      'xlsx',
      'echarts',
      'tinymce/tinymce',
      'vuex',
      'vue-router',
      'mockjs',
      '@tinymce/tinymce-vue',
      'echarts/extension/bmap/bmap',
      'coordtransform',
      'vue-awesome-swiper',
      'vue-splitpane'
    ]
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, dllPath),
    library: '[name]_[hash]'
  },
  plugins: [
    new DllPlugin({
      name: '[name]_[hash]',
      path: path.join(__dirname, dllPath, '[name].mainfest.json'),
      context: process.cwd()
    }),
    // new UglifyJsPlugin({
    //     uglifyOptions: {
    //         compress: {
    //             warnings: false,
    //             drop_console: true
    //         }
    //     },
    //     sourceMap: false
    // })
    new ParallelUglifyPlugin({
      uglifyES: {
        output: {
          // 是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，可以设置为false
          beautify: false,
          // 是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
          comments: false
        },
        compress: {
          // 是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出
          warnings: false,
          // 是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
          drop_console: true
        }
      }
    })
  ]
}
