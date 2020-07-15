import { post } from '@/request/http'
import store from '@/store'

/**
 * 权限管理
 *  1. 角色列表查询 getAuthList
 */

export const getAuthList = () =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=SysRights&Section=lista&SessionId=' +
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

export const getAuthMenu = data =>
  post(
    '/DXNXTD/ControlPath?act=listGrandSon&actKey=SysRights&Section=listb&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            FLT_UUID: store.state.user.FLT_UUID_DX_H,
            ROLE_UUID: data.ROLE_UUID
          }
        },
        Orderbys: {},
        PageIndexs: {},
        PageSizes: {}
      }
    }
  )

export const saveAuth = data =>
  post(
    '/DXNXTD/ControlPath?act=add&actKey=SysRights&Section=AddSysRights&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            FLT_UUID: store.state.user.FLT_UUID_DX_H,
            ROLE_UUID: data.ROLE_UUID,
            CREATOR: store.state.user.USR_CODE_DX_H,
            MENU: data.MENU
          }
        }
      }
    }
  )
