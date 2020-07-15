import { getCookie } from '@/utils/utils'

const state = {
  collapse: getCookie('COOLLAPSE'),
  processLogin: false, // 系统内登录框的状态
  iframeURL: '',
  isLoading: false // 全屏loading

}

const getters = {

}

const mutations = {
  PROCESS_LOGIN_STATUS(state, status) {
    state.processLogin = status
  },
  CHANGE_IFRAME_URL(state, url) {
    state.iframeURL = url
  },
  LOADING_STATUS(state, status) {
    state.isLoading = status
  }
}

const actions = {
  process_login_status({ commit, state }, status) {
    return new Promise(resolve => {
      commit('PROCESS_LOGIN_STATUS', status)
      // console.log(state)
      resolve(state.processLogin)
    })
  },
  loading_status({ commit, state }, status) {
    return new Promise(resolve => {
      commit('LOADING_STATUS', status)
      resolve(state.isLoading)
    })
  },
  change_iframe_url({ commit }, url) {
    return new Promise(resolve => {
      commit('CHANGE_IFRAME_URL', url)
      resolve(state.iframeURL)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
