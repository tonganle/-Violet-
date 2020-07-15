import { post } from '@/request/http'
import store from '@/store'

/**
 * 区县管理
 *  1. 区县列表查询 getPCList
 */

export const getDCList = data =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=City&Section=lista&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            CTY_CHNNAME: data.CTY_CHNNAME,
            FLT_UUID: store.state.user.FLT_UUID_DX_H
          }
        },
        Orderbys: {},
        PageIndexs: {
          DXNXTD: data.PageIndexs
        },
        PageSizes: {
          DXNXTD: data.PageSizes
        }
      }
    }
  )
/**
 * 区县管理
 *  2. 省市列表查询 getCountryLists
 */

export const getPCLists = () =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=City&Section=listb&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            FLT_UUID: store.state.user.FLT_UUID_DX_H
          }
        },
        Orderbys: {},
        PageIndexs: {},
        PageSizes: {}
      }
    }
  )
/**
 * 区县管理
 *  3. 新增区县 addDC
 */

export const addDC = data =>
  post(
    '/DXNXTD/ControlPath?act=add&actKey=City&Section=AddCity&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            CTV_PRV_UUID: data.CTV_PRV_UUID,
            CTY_CHNNAME: data.CTY_CHNNAME,
            CTY_EGSNAME: data.CTY_EGSNAME,
            CTY_CODE: data.CTY_CODE,
            CREATOR: store.state.user.USR_CODE_DX_H,
            FLT_UUID: store.state.user.FLT_UUID_DX_H
          }
        }
      }
    }
  )

/**
 * 区县管理
 *  4. 编辑区县 editDC
 */

export const editDC = data =>
  post(
    '/DXNXTD/ControlPath?act=edit&actKey=City&Section=EditCity&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            CTY_CHNNAME: data.CTY_CHNNAME,
            CTY_EGSNAME: data.CTY_EGSNAME,
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            VERSION: data.VERSION.toString()
          }
        }
      }
    }
  )
/**
 * 区县管理
 *  5. 删除区县 delDC
 */

export const delDC = data =>
  post(
    '/DXNXTD/ControlPath?act=del&actKey=City&Section=DelCity&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            VERSION: data.VERSION.toString(),
            LASTMODIFIER: store.state.user.USR_CODE_DX_H
          }
        }
      }
    }
  )
