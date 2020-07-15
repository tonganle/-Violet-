import { post } from '@/request/http.js'
import store from '@/store'

// export const getUserList = data => post('/Api/adminData/getList', data) // 系统管理中/获取管理员列表
export const getUserList = () =>
  post('/DXNXTD/GetMoudle?SessionId=' + store.state.user.SessionId_DX_H, {
    Data: {
      Filters: {
        DXNXTD: {
          FLT_UUID: store.state.user.FLT_UUID_DX_H,
          ROLE_UUID: store.state.user.USR_RLES_DX_H
        }
      },
      Orderbys: {},
      PageIndexs: {},
      PageSizes: {}
    }
  })
