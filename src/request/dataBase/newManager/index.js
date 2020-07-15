import { post } from '@/request/http'
import store from '@/store'

/**
 * 企业管理
 *  1. 企业列表查询 getPortMagList
 */
 
export const getNewManager = data =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=MessageInfo&Section=lista&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            MESSAGE_TITLE: data.MESSAGE_TITLE,
            FLT_UUID: store.state.user.FLT_UUID_DX_H
          }
        },
        Orderbys: {},
        PageIndexs: {
          DXNXTD: data.currentPage
        },
        PageSizes: {
          DXNXTD: data.pageSize
        }
      }
    }
  )

export const addNewManager = data =>
  post(
    '/DXNXTD/ControlPath?act=add&actKey=MessageInfo&Section=AddMessageInfo&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            MESSAGE_TITLE: data.MESSAGE_TITLE,
            MESSAGE_CONTENT: data.MESSAGE_CONTENT,
            CREATOR: store.state.user.USR_CODE_DX_H,
            FLT_UUID: store.state.user.FLT_UUID_DX_H
          }
        }
      }
    }
  )

export const editNewManager = data =>
  post(
    '/DXNXTD/ControlPath?act=edit&actKey=MessageInfo&Section=EditMessageInfo&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            MESSAGE_TITLE: data.MESSAGE_TITLE,
            MESSAGE_CONTENT: data.MESSAGE_CONTENT,
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            VERSION: data.VERSION.toString()
          }
        }
      }
    }
  )

export const delNewManager = data =>
  post(
    '/DXNXTD/ControlPath?act=del&actKey=MessageInfo&Section=DelMessageInfo&SessionId=' +
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
