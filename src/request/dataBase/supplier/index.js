import { post } from '@/request/http'
import store from '@/store'

/**
 * 供应商管理
 *  1. 供应商列表查询 getPCList
 */

export const getSupplierList = data =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=Supplier&Section=lista&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            SUR_NAME: data.SUR_NAME,
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
 * 供应商管理
 *  2. 新增供应商 addPC
 */

export const addSupplier = data =>
  post(
    '/DXNXTD/ControlPath?act=add&actKey=Supplier&Section=AddSupplier&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            SUR_CODE: data.SUR_CODE,
            SUR_NAME: data.SUR_NAME,
            SUR_EGSNAME: data.SUR_EGSNAME,
            SUR_VLFLAG: data.SUR_VLFLAG,
            SUR_CONTACT: data.SUR_CONTACT,
            SUR_CTCTEL: data.SUR_CTCTEL,
            SUR_ACCOUNT: data.SUR_ACCOUNT,
            SUR_TAXNO: data.SUR_TAXNO,
            SUR_BANKNO: data.SUR_BANKNO,
            SUR_ADDRESS: data.SUR_ADDRESS,
            CREATOR: store.state.user.USR_CODE_DX_H,
            FLT_UUID: store.state.user.FLT_UUID_DX_H
          }
        }
      }
    }
  )

/**
 * 供应商管理
 *  3. 编辑供应商 editSupplier
 */

export const editSupplier = data =>
  post(
    '/DXNXTD/ControlPath?act=edit&actKey=Supplier&Section=EditSupplier&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            SUR_NAME: data.SUR_NAME,
            SUR_EGSNAME: data.SUR_EGSNAME,
            SUR_VLFLAG: data.SUR_VLFLAG,
            SUR_CONTACT: data.SUR_CONTACT,
            SUR_CTCTEL: data.SUR_CTCTEL,
            SUR_ACCOUNT: data.SUR_ACCOUNT,
            SUR_TAXNO: data.SUR_TAXNO,
            SUR_BANKNO: data.SUR_BANKNO,
            SUR_ADDRESS: data.SUR_ADDRESS,
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            VERSION: data.VERSION.toString()
          }
        }
      }
    }
  )
/**
 * 供应商管理
 *  4. 删除供应商 delSupplier
 */

export const delSupplier = data =>
  post(
    '/DXNXTD/ControlPath?act=del&actKey=Supplier&Section=DelSupplier&SessionId=' +
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
