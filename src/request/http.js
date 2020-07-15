/**
 *
 */

import axios from 'axios'
import { timestamp } from '@/utils/utils'
// import store from '@/store'

// 环境的切换
// if (process.env.NODE_ENV === 'development') {
//   axios.defaults.baseURL = api.BASEURL
// } else if (process.env.NODE_ENV === 'production') {
//   axios.defaults.baseURL = api.EGHURL
// }

// post 请求头设置
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.withCredentials = true
// 创建axios实例
const service = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.NODE_ENV === 'development' ? api.PROXYURL : api.PRDURL,
  timeout: 5000 // 请求超时时间
})
let serviceArr = []
service.interceptors.request.use(
  config => {
    if (serviceArr.length === 0) {
      window.parent._$store.dispatch('app/loading_status', true)
    }
    serviceArr.push('service')

    return config
  },
  err => {
    if (serviceArr.length === 1) {
      window.parent._$store.dispatch('app/loading_status', false)
    }
    serviceArr.pop()
    return Promise.reject(err)
  }
)

/**
 * http response 拦截器 两个对应不同的baseURL
 */
service.interceptors.response.use(
  response => {
    if (serviceArr.length === 1) {
      window.parent._$store.dispatch('app/loading_status', false)
    }
    serviceArr.pop()
    if (response.data.success === '2') {
      window._$message({
        message: response.data.msg,
        type: 'error',
        showClose: true
      })
      window.parent._$store.dispatch('app/process_login_status', true)
    } else if (response.data.success === '1') {
      return response
    } else {
      window._$message({
        message: response.data.msg,
        type: 'error',
        showClose: true
      })
    }
  },
  error => {
    if (serviceArr.length === 1) {
      window.parent._$store.dispatch('app/loading_status', false)
    }
    serviceArr.pop()
    window._$message({
      message: '请求失败!',
      type: 'error',
      showClose: true
    })
    return Promise.reject(error)
  }
)

export function get(url, params) {
  return new Promise((resolve, reject) => {
    service
      .get(timestamp(url), {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post方法，对应post请求,两个post对应不同的baseURL
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    service
      .post(url, JSON.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
/**
 * post方法，对应post请求,两个post对应不同的baseURL
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function postFormData(url, formData) {
  return new Promise((resolve, reject) => {
    service
      .post(timestamp(url), formData)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
