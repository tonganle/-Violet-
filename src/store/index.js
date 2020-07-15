import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import tagViews from './modules/tagViews'
import user from './modules/user'

Vue.config.devtools = true

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  editable: false
}

const getters = {}

const mutations = {
  CHANGE_EDITABLE(state, editable) {
    state.editable = editable
  }
}

const actions = {
  changeEditable({ commit, state }, editable) {
    return new Promise(resolve => {
      commit('CHANGE_EDITABLE', editable)
      resolve(state.editable)
    })
  }
}

export default new Vuex.Store({
  modules: {
    app,
    tagViews,
    user
  },
  state,
  mutations,
  actions,
  getters,
  strict: debug
})
