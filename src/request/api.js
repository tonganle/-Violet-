/**
 * 统一管理接口
 */
import { setMd5 } from '@/utils/utils'
import { post, postFormData } from '@/request/http'
import store from '@/store'

export const login = loginData =>
  post('/DXNXTD/login', {
    Data: {
      Filters: {
        userinfo: {
          USER: loginData.username,
          PASSWORD: setMd5(loginData.password),
          // password: loginData.password,
          ETP: loginData.companyCode
        },
        licenseinfo: {
          ETP: loginData.companyCode
        }
      }
    }
  }) // 登录接口 真实接口

export const logout = data => post('/Api/logout', data) // 登出接口
export const changePassword = data => post('/Api/changePassword', data) // 修改密码接口
export const getNewsList = data => post('/Api/news/getList', data) // 获取新闻列表接口
export const getIEData = data => post('/Api/GetIEData', data) // 首页图表二的数据来源
export const getIEYearData = data => post('/Api/GetIEYearData', data) // 首页图表三的数据来源
export const upImage = formData => postFormData('/DXNXTD/upload&SessionId=' + store.state.user.SessionId_DX_H, formData) // 首页图表三的数据来源

export * from './platform/rolemanager' // 平台管理--角色管理 接口
export * from './platform/administrator' // 平台管理--管理员 接口
export * from './platform/code' // 基础代码管理--管理员 接口
export * from './platform/sysmodule' // 平台管理--模块管理 接口
export * from './platform/auth' // 平台管理--权限管理 接口
export * from './platform/company' // 平台管理--权限管理 接口
export * from './dataBase/advice' // 平台管理--权限管理 接口
export * from './dataBase/countryAdm' // 平台管理--国家管理 接口
export * from './dataBase/portManage' // 平台管理--港口管理 接口
export * from './dataBase/newManager' // 平台管理--消息管理 接口
export * from './dataBase/pressRelease' // 平台管理--新闻公告 接口
export * from './dataBase/provinceCity' // 平台管理--省市管理 接口
export * from './dataBase/districtCounty' // 平台管理--区县管理 接口
export * from './dataBase/supplier' // 平台管理--供应商管理 接口
export * from './dataBase/custom' // 平台管理--客户管理 接口
