import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 路由懒加载
// 采用了 把组件按组分块
// 详情见 https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E8%B7%AF%E7%94%B1%E6%87%92%E5%8A%A0%E8%BD%BD

// bascViews
const loginPath = () =>
  import(/* webpackChunkName: "basicViews" */ '../views/basicViews/login/login.vue')
const homePath = () =>
  import(/* webpackChunkName: "basicViews" */ '../views/basicViews/home.vue')
const errorPage = () =>
  import(/* webpackChunkName: "basicViews" */ '../views/basicViews/Error/index.vue')

// layout
const layoutPath = () =>
  import(/* webpackChunkName: "layout" */ '../views/layout/index.vue')
const iframePath = () =>
  import(/* webpackChunkName: "layout" */ '../views/layout/main/iframe.vue')

// example
const componentExample = () =>
  import(/* webpackChunkName: "example" */ '../views/component-example/index.vue')
const tablePath = () =>
  import(/* webpackChunkName: "example" */ '../views/component-example/table-template/index.vue')
const uploadImage = () =>
  import(/* webpackChunkName: "example" */ '../views/component-example/upload/upload-image.vue')
const uploadFile = () =>
  import(/* webpackChunkName: "example" */ '../views/component-example/upload/upload-file.vue')
const echartsPath = () =>
  import(/* webpackChunkName: "example" */ '../views/component-example/echarts/index.vue')
const vuetinymce = () =>
  import(/* webpackChunkName: "example" */ '../views/component-example/tinymce/index.vue')
const tree = () =>
  import(/* webpackChunkName: "example" */ '../views/component-example/tree/index.vue')
const excelPath = () =>
  import(/* webpackChunkName: "example" */ '../views/component-example/excel/index.vue')
const exportExcel = () =>
  import(/* webpackChunkName: "example" */ '../views/component-example/excel/export-excel.vue')
const pdf = () =>
  import(/* webpackChunkName: "example" */ '../views/component-example/pdf/index.vue')
const uploadExcel = () =>
  import(/* webpackChunkName: "example" */ '../views/component-example/excel/upload-excel.vue')
const tool = () =>
  import(/* webpackChunkName: "example" */ '../views/component-example/tool/index.vue')
const clipboard = () =>
  import(/* webpackChunkName: "example" */ '../views/component-example/clipboard/index.vue')
const showVideo = () =>
  import(/* webpackChunkName: "example" */ '../views/component-example/showVideo/index.vue')
const jszipPath = () =>
  import(/* webpackChunkName: "platform" */ '../views/component-example/jszip/index.vue')
// dataBase
const dataBase = () =>
  import(/* webpackChunkName: "dataBase" */ '../views/dataBase/index.vue')
const advice = () =>
  import(/* webpackChunkName: "dataBase" */ '../views/dataBase/advice/index.vue')
const countryAdm = () =>
  import(/* webpackChunkName: "dataBase" */ '../views/dataBase/countryAdm/index.vue')
const portManage = () =>
  import(/* webpackChunkName: "dataBase" */ '../views/dataBase/portManage/index.vue')
const newManager = () =>
  import(/* webpackChunkName: "dataBase" */ '../views/dataBase/newManager/index.vue')
const pressRelease = () =>
  import(/* webpackChunkName: "dataBase" */ '../views/dataBase/pressRelease/index.vue')
const provinceCity = () =>
  import(/* webpackChunkName: "dataBase" */ '../views/dataBase/provinceCity/index.vue')
const districtCounty = () =>
  import(/* webpackChunkName: "dataBase" */ '../views/dataBase/districtCounty/index.vue')
const supplier = () =>
  import(/* webpackChunkName: "dataBase" */ '../views/dataBase/supplier/index.vue')
const custom = () =>
  import(/* webpackChunkName: "dataBase" */ '../views/dataBase/custom/index.vue')

// platform
const platform = () =>
  import(/* webpackChunkName: "platform" */ '../views/platform/index.vue')
const platformCode = () =>
  import(/* webpackChunkName: "dataBase" */ '../views/platform/code/index.vue')
const sysmodule = () =>
  import(/* webpackChunkName: "platform" */ '../views/platform/sysmodule/index.vue')
const rolemanager = () =>
  import(/* webpackChunkName: "platform" */ '../views/platform/rolemanager/index.vue')
const administrator = () =>
  import(/* webpackChunkName: "platform" */ '../views/platform/administrator/index.vue')
const auth = () =>
  import(/* webpackChunkName: "platform" */ '../views/platform/auth/index.vue')
const company = () =>
  import(/* webpackChunkName: "platform" */ '../views/platform/company/index.vue')

// dataBase 子路由
const dataBaseChildren = [
  {
    path: 'advice',
    name: 'router.advice',
    component: advice
  },
  {
    path: 'countryAdm',
    name: 'router.countryAdm',
    component: countryAdm
  },
  {
    path: 'portManage',
    name: 'router.portManage',
    component: portManage
  },
  {
    path: 'newManager',
    name: 'router.newManager',
    component: newManager
  },
  {
    path: 'pressRelease',
    name: 'router.pressRelease',
    component: pressRelease
  },
  {
    path: 'provinceCity',
    name: 'router.provinceCity',
    component: provinceCity
  },
  {
    path: 'districtCounty',
    name: 'router.districtCounty',
    component: districtCounty
  },
  {
    path: 'supplier',
    name: 'router.supplier',
    component: supplier
  },
  {
    path: 'custom',
    name: 'router.custom',
    component: custom
  }
]

// example 子路由
const exampleChildren = [
  {
    path: 'excel',
    component: excelPath,
    name: 'excel.export',
    redirect: 'excel/export-excel',
    children: [
      {
        path: 'export-excel',
        name: 'router.export',
        component: exportExcel
      }, // name: '导出excel',
      {
        path: 'upload-excel',
        name: 'router.import',
        component: uploadExcel
      }
    ] // name: '导入excel',
  },
  {
    path: 'table',
    name: 'router.table',
    component: tablePath
  },
  {
    path: 'tool',
    name: '工具样例页面',
    component: tool
  },
  {
    path: 'pdf',
    name: '导出pdf',
    component: pdf
  },
  {
    path: 'uploadImage',
    name: 'router.upImg',
    component: uploadImage
  },
  {
    path: 'uploadFile',
    name: 'router.upFile',
    component: uploadFile
  },
  {
    path: 'echarts',
    name: 'router.echarts',
    component: echartsPath
  },
  {
    path: 'vuetinymce',
    name: 'router.tinymce',
    component: vuetinymce
  },
  {
    path: 'showVideo',
    name: '视频样例展示',
    component: showVideo
  },
  {
    path: 'jszip',
    component: jszipPath,
    name: 'router.jszip',
  },
]

// platform 子路由
const platformChildren = [
  {
    path: 'sysmodule',
    component: sysmodule,
    name: 'router.systemModule'
  },
  {
    path: 'code',
    name: 'router.baseCode',
    component: platformCode
  },
  {
    path: 'rolemanager',
    component: rolemanager,
    name: 'router.roleManagement'
  },
  {
    path: 'administrator',
    component: administrator,
    name: 'router.enterpriseAdministrator'
  },
  {
    path: 'auth',
    component: auth,
    name: 'router.auth'
  },
  {
    path: 'company',
    component: company,
    name: 'router.company'
  }
]

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'router.home',
      component: homePath
    },
    {
      path: '/errorPage',
      name: '错误页面',
      component: errorPage
    },
    {
      path: '/dataBase',
      name: 'router.dataBase',
      component: dataBase,
      redirect: '/dataBase/code',
      children: dataBaseChildren
    },
    {
      path: '/example',
      name: 'router.example',
      component: componentExample,
      children: exampleChildren
    },
    {
      path: '/platform',
      name: 'router.platformManagement',
      component: platform,
      redirect: '/platform/rolemanager',
      children: platformChildren
    },
    {
      path: '/login',
      component: loginPath
    },
    {
      path: '/layout',
      name: 'router.homes',
      component: layoutPath,
      redirect: '/layout/dataBase/countryAdm',
      children: [
        {
          path: 'iframe',
          name: 'router.iframe',
          component: iframePath
        },
        {
          path: 'home',
          name: 'router.home',
          component: homePath
        },
        {
          path: 'example',
          name: 'router.example',
          component: componentExample,
          children: exampleChildren
        },
        // dataBase start
        {
          path: '/layout/dataBase/advice',
          name: 'router.advice',
          component: advice
        },
        {
          path: '/layout/dataBase/countryAdm',
          name: 'router.countryAdm',
          component: countryAdm
        },
        {
          path: '/layout/dataBase/portManage',
          name: 'router.portManage',
          component: portManage
        },
        {
          path: '/layout/dataBase/newManager',
          name: 'router.newManager',
          component: newManager
        },
        {
          path: '/layout/dataBase/pressRelease',
          name: 'router.pressRelease',
          component: pressRelease
        },
        {
          path: '/layout/dataBase/provinceCity',
          name: 'router.provinceCity',
          component: provinceCity
        },
        {
          path: '/layout/dataBase/districtCounty',
          name: 'router.districtCounty',
          component: districtCounty
        },
        {
          path: '/layout/dataBase/supplier',
          name: 'router.supplier',
          component: supplier
        },
        {
          path: '/layout/dataBase/custom',
          name: 'router.custom',
          component: custom
        },
        // dataBase end
        // platform start
        {
          path: '/layout/platform/sysmodule',
          component: sysmodule,
          name: 'router.systemModule'
        },
        {
          path: '/layout/platform/code',
          name: 'router.baseCode',
          component: platformCode
        },
        {
          path: '/layout/platform/rolemanager',
          component: rolemanager,
          name: 'router.roleManagement'
        },
        {
          path: '/layout/platform/administrator',
          component: administrator,
          name: 'router.enterpriseAdministrator'
        },
        {
          path: '/layout/platform/auth',
          component: auth,
          name: 'router.auth'
        },
        {
          path: '/layout/platform/company',
          component: company,
          name: 'router.company'
        },
        // platform end

        //  example start
        {
          path: '/layout/example/excel',
          component: excelPath,
          name: 'router.export',
          Children: [
            {
              path: '/export-excel',
              component: exportExcel,
              name: 'router.export'
            },
            {
              path: '/upload-excel',
              component: uploadExcel,
              name: 'router.import'
            }
          ]
        },
        {
          path: '/layout/example/tool',
          name: '工具样例页面',
          component: tool
        },
        {
          path: '/layout/example/showVideo',
          name: '视频样例展示',
          component: showVideo
        },
        {
          path: '/layout/example/jszip',
          component: jszipPath,
          name: 'router.jszip',
        },
        {
          path: '/layout/example/clipboard',
          name: 'router.clipboard',
          component: clipboard
        },
        {
          path: '/layout/example/table',
          component: tablePath,
          name: 'router.table'
        },
        {
          path: '/layout/example/uploadImage',
          component: uploadImage,
          name: 'router.upImg'
        },
        {
          path: '/layout/example/uploadFile',
          component: uploadFile,
          name: 'router.upFile'
        },
        {
          path: '/layout/example/echarts',
          component: echartsPath,
          name: 'router.echarts'
        },
        {
          path: '/layout/example/vuetinymce',
          component: vuetinymce,
          name: 'router.tinymce'
        },
        {
          path: '/layout/example/tree',
          component: tree,
          name: 'router.tree'
        },
        //  example end
        {
          path: '*',
          name: '错误页面',
          component: errorPage
        }
      ]
    },
    {
      path: '*',
      component: errorPage
    }
  ]
})
