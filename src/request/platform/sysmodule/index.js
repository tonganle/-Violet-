import { post } from '@/request/http'

import store from '@/store'

/**
 * 平台管理--角色管理 接口
 *
 */

/**
 * 获取列表数据
 */

export const checkSysList = () =>
  post(
    '/DXNXTD/ControlPath?act=listChild&actKey=SysModule&Section=lista&SessionId=' +
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
// 右边查询详情
export const checkInfoList = data =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=SysModule&Section=listb&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            FLT_UUID: store.state.user.FLT_UUID_DX_H,
            UUID: data.UUID
          }
        },
        Orderbys: {},
        PageIndexs: {},
        PageSizes: {}
      }
    }
  )

// 右边数据编辑
export const editInfoList = data =>
  post(
    '/DXNXTD/ControlPath?act=edit&actKey=SysModule&Section=EditSysModule&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            VERSION: data.VERSION,
            MDL_NAME: data.MDL_NAME,
            MDL_CODE: data.MDL_CODE,
            MDL_TYPE: 'M',
            MDL_URL: data.MDL_URL,
            MDL_SEQ: data.MDL_SEQ,
            MDL_VALID: data.MDL_VALID,
            MDL_ICONCLS: '',
            MDL_ISP: data.MDL_ISP,
            Children: data.Children
          }
        }
      }
    }
  )
// 右边数据删除delInfoList
export const delInfoList = data =>
  post(
    '/DXNXTD/ControlPath?act=del&actKey=SysModule&Section=DelSysModule&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            VERSION: data.VERSION,
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            FLT_UUID: store.state.user.FLT_UUID_DX_H
          }
        }
      }
    }
  )
// 右边数据新增addInfoList
export const addInfoList = data =>
  post(
    '/DXNXTD/ControlPath?act=add&actKey=SysModule&Section=AddSysModule&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            CREATOR: store.state.user.USR_CODE_DX_H,
            MDL_NAME: data.MDL_NAME,
            MDL_CODE: data.MDL_CODE,
            MDL_TYPE: data.MDL_TYPE,
            MDL_URL: data.MDL_URL,
            MDL_SEQ: data.MDL_SEQ,
            MDL_VALID: data.MDL_VALID,
            MDL_ICONCLS: '',
            MDL_ISP: data.MDL_ISP,
            Children: data.Children
          }
        }
      }
    }
  )
