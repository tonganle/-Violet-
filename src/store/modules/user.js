/* eslint-disable */ 
import {
  login,
  changePassword
} from '@/request/api'
import {
  setCookie,
  getCookie
} from '@/utils/utils'


const state = {
  Grandson: [],
  permList: [],
  SessionId_DX_H: getCookie('SessionId_DX_H'),
  FLT_UUID_DX_H: getCookie('FLT_UUID_DX_H'),
  UserId_DX_H: getCookie('UserId_DX_H'),
  FLT_NAME_DX_H: getCookie('FLT_NAME_DX_H'),
  USR_CODE_DX_H: getCookie('USR_CODE_DX_H'),
  USR_RLES_DX_H: getCookie('USR_RLES_DX_H'),
  USERNAME_DX_H: getCookie('USERNAME_DX_H'), // 用户名
  // SessionId: getLoginCookie('SessionId'),
  // FLT_UUID: getLoginCookie('FLT_UUID'), // 企业代码
  // UserId: getLoginCookie('UserId'),
  passwordPageStatus: false // 修改密码页面的是否打开的状态
}

const getters = {
  // doneTodosCount: (state, getters) => {
  //   return state.Grandson
  // }
}

const mutations = {
  SET_COOKIE(state, UserInfo) {
    state.FLT_NAME_DX_H = UserInfo.FLT_NAME
    state.FLT_UUID_DX_H = UserInfo.FLT_UUID
    state.SessionId_DX_H = UserInfo.SessionId
    state.USERNAME_DX_H = UserInfo.USERNAME
    state.USR_CODE_DX_H = UserInfo.USR_CODE
    state.USR_RLES_DX_H = UserInfo.USR_RLES
    state.UserId_DX_H = UserInfo.UserId
    setCookie('FLT_NAME_DX_H', UserInfo.FLT_NAME)
    setCookie('SessionId_DX_H', UserInfo.SessionId)
    setCookie('FLT_UUID_DX_H', UserInfo.FLT_UUID)
    setCookie('USERNAME_DX_H', UserInfo.USERNAME)
    setCookie('USR_CODE_DX_H', UserInfo.USR_CODE)
    setCookie('USR_RLES_DX_H', UserInfo.USR_RLES)
    setCookie('UserId_DX_H', UserInfo.UserId)
    // setCookie('cookiestest', 'SessionId=4474bd77ca0e49af9977448ac5c143d4&UserId=FC652E7AA1BA4EB1AC82308DE5D85340&UserCode=CSUSER&FLT_UUID=B1C25689738A41B2982B37C714B5C4F0')
  },
  SET_PASSWORD_PAGE_STATUS(state, status) {
    state.passwordPageStatus = status
  },
  REMOVE_ALL_COOKIES(state) {
    state.FLT_NAME_DX_H = ''
    state.FLT_UUID_DX_H = ''
    state.SessionId_DX_H = ''
    state.USERNAME_DX_H = ''
    state.USR_CODE_DX_H = ''
    state.USR_RLES_DX_H = ''
    state.UserId_DX_H = ''
    setCookie('USERNAME_DX_H', '')
    setCookie('FLT_UUID_DX_H', '')
    setCookie('SessionId_DX_H', '')
    setCookie('USERNAME_DX_H', '')
    setCookie('USR_CODE_DX_H', '')
    setCookie('USR_RLES_DX_H', '')
    setCookie('UserId_DX_H', '')
    setCookie('SESSION', '')
  },
  BUT_PER(state, UserInfo) {
    state.Grandson = UserInfo
  },
  PERM_LIST(state, UserInfo) {
    state.permList = UserInfo
  }
}
const actions = {
  // set password page status
  setPasswordPageStatus({
    commit,
    state
  }, status) {
    return new Promise((resolve, reject) => {
      commit('SET_PASSWORD_PAGE_STATUS', status)
      resolve(state.passwordPageStatus)
    })
  },

  // 登录
  logIn({
    commit,
    dispatch
  }, userInfo) {
    return new Promise((resolve, reject) => {

      // 周普接口测试 poolLogin(userInfo).then((response) => {
      login(userInfo).then((response) => {
        if (response.success == "1") {
          commit('SET_COOKIE', response.data)
          resolve()
          // return
        } else {
          if (response.success == '0') {
            let err = new Error();
            err.message = response.msg;
            reject(err)
            // return
          } else {
            let err = new Error();
            err.message = '登录失败，请核对后再登录';
            reject(err)
            // return
            // this.$message.warning({message: '登录失败，请核对后再登录！'})
          }
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 登出
  logOut({
    commit
  }) {
    return new Promise((resolve, reject) => {
      commit('REMOVE_ALL_COOKIES')
      // 清除tagViews
      commit('tagViews/DEL_ALL_TAGS', {}, {
        root: true
      })
      resolve()
      // logout(state.SessionId).then(() => {
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  //按钮权限
  buttonPerm({
    commit,
    dispatch
  }, userInfo) {
    // new Promise((resolve, reject)=>{
    commit('BUT_PER', userInfo)
    // console.log('userInfo',userInfo)
    //   resolve(state.Grandson)
    // })
  },
  //模块列表
  permList({
    commit,
    dispatch
  }, userInfo) {
    commit('PERM_LIST', userInfo)
    // console.log('userInfo',userInfo)
    // })
  },
  // 修改密码
  changePassword({
    commit,
    state
  }, changePwdFormData) {
    var data = {
      username: changePwdFormData.username,
      password: changePwdFormData.password,
      passwordNew: changePwdFormData.passwordNew,
      companyCode: changePwdFormData.companyCode
    }
    return new Promise((resolve, reject) => {
      changePassword({
        data: data
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
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
