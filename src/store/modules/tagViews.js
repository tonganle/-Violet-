const state = {
  visitedTags: [], // tagViews数组
  cachedViews: [], // router-view 被缓存的页面
  currentFrameTag: ''
}

const getters = {}

const mutations = {
  // 向state.visitedTags添加新标签
  ADD_VISITED_TAGS(state, route) {
    var routeHash = decodeURIComponent(route.hash)
    var routeFullPath = decodeURIComponent(route.fullPath)
    if (state.visitedTags.some(v => v.fullPath === routeFullPath)) return
    if (route.query.url && route.query.url.indexOf('http') !== -1) {
      var title
      var perm = route.query.perm
      if (routeHash && routeHash !== '') {
        title = routeHash.slice(routeHash.indexOf('&title=') + 7)
        var arr = title.split('&')
        title = arr[0]
      } else {
        title = route.query.title
      }
      state.visitedTags.push(
        Object.assign(
          { tagName: title, perm: perm },
          {
            fullPath: routeFullPath,
            hash: routeHash,
            name: route.name,
            params: route.params,
            path: route.path,
            query: route.query
          }
        )
      )
      state.cachedViews.push(route.name)
    } else {
      perm = route.query.perm
      state.visitedTags.push(
        Object.assign(
          { tagName: route.name, perm: perm },
          {
            fullPath: routeFullPath,
            hash: routeHash,
            name: route.name,
            params: route.params,
            path: route.path,
            query: route.query
          }
        )
      )
      state.cachedViews.push(route.name)
    }
  },
  // 向state.visitedTags删除标签
  DEL_SELECTED_TAG(state, route) {
    var routeFullPath = decodeURIComponent(route.fullPath)
    for (const i in state.visitedTags) {
      if (decodeURIComponent(state.visitedTags[i].fullPath) === routeFullPath) {
        state.visitedTags.splice(i, 1)
        state.cachedViews.splice(i, 1)
        break
      }
    }
  },

  DEL_OTHER_TAGS(state, route) {
    var routeFullPath = decodeURIComponent(route.fullPath)
    for (const [i, v] of state.visitedTags.entries()) {
      if (v.fullPath === routeFullPath) {
        state.visitedTags = state.visitedTags.splice(i, 1)
        state.cachedViews = state.cachedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_ALL_TAGS(state) {
    state.visitedTags = []
    state.cachedViews = []
  },
  // 改变iframe的链接地址（state.currentFrameTag）
  CHANGE_FRAME_URL(state, url) {
    state.currentFrameTag = url
  }
}

const actions = {
  addVisitedTags({ commit }, route) {
    commit('ADD_VISITED_TAGS', route)
  },
  delSelectedTag({ commit, state }, route) {
    return new Promise(resolve => {
      commit('DEL_SELECTED_TAG', route)
      // 向标签栏传回新的state.visitedTags
      resolve(state.visitedTags)
    })
  },
  closeOtherTags({ commit, state }, route) {
    return new Promise(resolve => {
      commit('DEL_OTHER_TAGS', route)
      resolve(state.visitedTags)
    })
  },
  closeAllTags({ commit }) {
    return new Promise(() => {
      commit('DEL_ALL_TAGS')
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
