import { post } from '@/request/http'
import { toString } from '@/utils/utils'
import store from '@/store'

/**
 * 平台管理--角色管理 接口
 *
 */

/**
 * 获取列表数据
 */

export const checkRoleList = data =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=SysRole&Section=lista&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            RLE_CODE: data.USR_CODE,
            RLE_NAME: data.USR_NAME,
            FLT_UUID: store.state.user.FLT_UUID_DX_H
          }
        },
        Orderbys: {},
        PageIndexs: {
          DXNXTD: toString(data.PageIndexs)
        },
        PageSizes: {
          DXNXTD: toString(data.PageSizes)
        }
      }
    }
  )
/**
 * 新增一行数据
 */

export const addRoleList = data =>
  post(
    '/DXNXTD/ControlPath?act=add&actKey=SysRole&Section=AddSysRole&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            RLE_CODE: data.RLE_CODE,
            RLE_NAME: data.RLE_NAME,
            RLE_TYPE: data.RLE_TYPE,
            REMARK: data.REMARK,
            CREATOR: store.state.user.USR_CODE_DX_H,
            FLT_UUID: store.state.user.FLT_UUID_DX_H
          }
        }
      }
    }
  )
/**
 * 编辑一行数据
 */
export const editRoleList = data =>
  post(
    '/DXNXTD/ControlPath?act=edit&actKey=SysRole&Section=EditSysRole&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            RLE_CODE: data.RLE_CODE,
            RLE_NAME: data.RLE_NAME,
            RLE_TYPE: data.RLE_TYPE,
            REMARK: data.REMARK,
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            FLT_UUID: store.state.user.FLT_UUID_DX_H,
            VERSION: toString(data.VERSION)
          }
        }
      }
    }
  )
/**
 * 删除一行数据
 */
export const delRoleList = data =>
  post(
    '/DXNXTD/ControlPath?act=del&actKey=SysRole&Section=DelSysRole&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            FLT_UUID: store.state.user.FLT_UUID_DX_H,
            VERSION: toString(data.VERSION)
          }
        }
      }
    }
  )
/**
 * 角色类型下拉接口
 */

export const getRoleDown = () =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=PFRef_Code&Section=lista&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            RV_TYPE_DOMAIN: 'XTJS',
            RV_CODE_DOMAIN: '',
            FLT_UUID: store.state.user.FLT_UUID_DX_H
          }
        }
      }
    }
  )
