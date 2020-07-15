/**
 * configList
 * 每一项如下
 * {
 *   url: '',      // 需要mock的URL
 *   method: '',   // mock拦截的方法 post/get/delete之类的
 *   response: {}  // mock返回的响应
 * }
 *
 * 这三个参数会传入Mock.mock(url, method, response)执行
 * 具体这三个参数支持的值参考 https://github.com/nuysoft/Mock/wiki/Mock.mock()
 */

import Mock from 'mockjs'

Mock.setup({
  timeout: '1000-1400'
})

const BaseUrl =
  process.env.NODE_ENV === 'development'
    ? window._$api.PROXYURL
    : window._$api.PRDURL

const mockFiles = [
  // 'example',
  'login', // 登陆
  
  'dataBase/advice', // 咨询建议
  'dataBase/countryAdm', // 国家管理
  'dataBase/custom', // 客户管理
  'dataBase/districtCounty', // 区县管理
  'dataBase/newManager', // 消息管理
  'dataBase/portManage', // 港口管理
  'dataBase/pressRelease', // 新闻公告
  'dataBase/provinceCity', // 省市管理
  'dataBase/supplier', // 供应商管理

  'platform/administrator', // 用户管理
  'platform/auth', // 权限管理
  'platform/code', // 基础代码管理
  'platform/company', // 企业管理
  'platform/rolemanager', // 角色管理
  'platform/sysmodule', // 系统模块管理
]

// 动态导入 mock 数据
export async function initMock () {
  for (let i = 0; i < mockFiles.length; i++) {
    let configList = (await import('./' + mockFiles[i])).default
    configList.forEach(config => {
      if (config.BaseUrl === 'BaseUrl') {
        Mock.mock(BaseUrl + config.url, config.method, config.response)
      }
    })
  }
}