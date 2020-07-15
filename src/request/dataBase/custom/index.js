import { post } from '@/request/http'
import store from '@/store'

/**
 * 客户管理
 *  1. 客户列表查询 getCustomList
 */

export const getCustomList = data =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=Client&Section=lista&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            CLT_NAME: data.CLT_NAME,
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
 * 客户管理
 *  2. 新增客户addPC
 */

export const addCustom = data =>
  post(
    '/DXNXTD/ControlPath?act=add&actKey=Client&Section=AddClient&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            CLT_CODE: data.CLT_CODE,
            CLT_NAME: data.CLT_NAME,
            CLT_EGSNAME: data.CLT_EGSNAME,
            CLT_VLFLAG: data.CLT_VLFLAG,
            CLT_CONTACT: data.CLT_CONTACT,
            CLT_CTCTEL: data.CLT_CTCTEL,
            CLT_ACCOUNT: data.CLT_ACCOUNT,
            CLT_TAXNO: data.CLT_TAXNO,
            CLT_BANKNO: data.CLT_BANKNO,
            CLT_ADDRESS: data.CLT_ADDRESS,
            CREATOR: store.state.user.USR_CODE_DX_H,
            FLT_UUID: store.state.user.FLT_UUID_DX_H
          }
        }
      }
    }
  )

/**
 * 客户管理
 *  3. 编辑客户editSupplier
 */

export const editCustom = data =>
  post(
    '/DXNXTD/ControlPath?act=edit&actKey=Client&Section=EditClient&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            CLT_NAME: data.CLT_NAME,
            CLT_EGSNAME: data.CLT_EGSNAME,
            CLT_VLFLAG: data.CLT_VLFLAG,
            CLT_CONTACT: data.CLT_CONTACT,
            CLT_CTCTEL: data.CLT_CTCTEL,
            CLT_ACCOUNT: data.CLT_ACCOUNT,
            CLT_TAXNO: data.CLT_TAXNO,
            CLT_BANKNO: data.CLT_BANKNO,
            CLT_ADDRESS: data.CLT_ADDRESS,
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            VERSION: data.VERSION.toString()
          }
        }
      }
    }
  )
/**
 * 客户管理
 *  4. 删除客户delCustom
 */

export const delCustom = data =>
  post(
    '/DXNXTD/ControlPath?act=del&actKey=Client&Section=DelClient&SessionId=' +
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
