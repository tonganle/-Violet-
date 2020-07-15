// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import Vuex from 'vuex'
import elementUI from 'element-ui'
import '@babel/polyfill'
import coordtransform from 'coordtransform'
import i18n from '@/plugins/i18n' // 国际化语言选择
import 'element-ui/lib/theme-chalk/index.css' // element-ui初始的主题色，我们自行定义了
import '@/assets/css/reset.scss'
import 'swiper/dist/css/swiper.css'
import '@/router/permission'
// 引入echarts以及百度地图底图
import echarts from 'echarts'
import 'echarts/extension/bmap/bmap' // 注册window.BMap
import splitPane from 'vue-splitpane'
import elDragDialog from '@/plugins/el-dragDialog'
import VueClipboard from 'vue-clipboard2'
import Print from 'vue-print-nb'   //打印页面

Vue.use(Print)
Vue.use(VueClipboard)

// 开发环境开启devtools
Vue.config.devtools = (process.env.NODE_ENV === 'development')

// 生产环境关闭警告域提示
Vue.config.silent = (process.env.NODE_ENV === 'production')

Vue.config.productionTip = false
window.addEventListener('resize', () => {
  // console.log('123')
  // console.log(document.documentElement.clientWidth / 1920)
  document.getElementsByTagName('html')[0].style.zoom = document.documentElement.clientWidth / 1920
})
document.getElementsByTagName('html')[0].style.zoom = document.documentElement.clientWidth / 1920
// 全局注册echarts，可以通过this.$echarts使用
Object.defineProperties(Vue.prototype, {
  $echarts: {
    get: () => echarts
  },
  $Y: {
    get: () => 'Y'
  },
  $N: {
    get: () => 'N'
  },
  $homeURL: {
    get: () =>
      '/layout/iframe?url=' +
      window.location.origin +
      '#/home&title=router.home'
  },
  coordtransform: {
    get: () => coordtransform
  }
})

Vue.use(elementUI)
Vue.use(Vuex)
// 注册可拖动弹窗插件（指令）
Vue.use(elDragDialog)

Vue.component('split-pane', splitPane)
router.afterEach(()=> {
  window.scrollTo(0, 0)
})

window._$store = store
window._$message = elementUI.Message

;(async function () {
  // 初始化 mock 数据
  // 如果不需要注释或移除即可
  await (await import('@/mock')).initMock()

  new Vue({
    el: '#app',
    i18n, // 使用 i18n 插件
    router,
    store: store,
    components: { App },
    template: '<App/>'
  })
})()


