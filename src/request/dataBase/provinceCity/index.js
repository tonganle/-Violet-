import { post } from '@/request/http'
import store from '@/store'

/**
 * 省市管理
 *  1. 省市列表查询 getPCList
 */

export const getPCList = data =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=Province&Section=lista&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            PRV_CHNNAME: data.PRV_CHNNAME,
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
 * 省市管理
 *  2. 国家列表查询 getCountryLists
 */

export const getCountryLists = () =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=Province&Section=listb&SessionId=' +
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
 * 省市管理
 *  3. 新增省市 addPC
 */

export const addPC = data =>
  post(
    '/DXNXTD/ControlPath?act=add&actKey=Province&Section=AddProvince&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            PRV_CTY_UUID: data.PRV_CTY_UUID,
            PRV_CHNNAME: data.PRV_CHNNAME,
            PRV_EGSNAME: data.PRV_EGSNAME,
            PRV_CODE: data.PRV_CODE,
            CREATOR: store.state.user.USR_CODE_DX_H,
            FLT_UUID: store.state.user.FLT_UUID_DX_H
          }
        }
      }
    }
  )

/**
 * 省市管理
 *  4. 编辑省市 editPC
 */

export const editPC = data =>
  post(
    '/DXNXTD/ControlPath?act=edit&actKey=Province&Section=EditProvince&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            PRV_CHNNAME: data.PRV_CHNNAME,
            PRV_EGSNAME: data.PRV_EGSNAME,
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            VERSION: data.VERSION.toString()
          }
        }
      }
    }
  )
/**
 * 省市管理
 *  5. 删除省市 delPC
 */

export const delPC = data =>
  post(
    '/DXNXTD/ControlPath?act=del&actKey=Province&Section=DelProvince&SessionId=' +
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
