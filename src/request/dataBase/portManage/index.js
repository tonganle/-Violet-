import { post } from '@/request/http'
import store from '@/store'

/**
 * 企业管理
 *  1. 企业列表查询 getPortMagList
 */

export const getPortMagList = data =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=Ports&Section=lista&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            POT_CODE: data.POT_CODE,
            POT_CNAME: data.POT_CNAME,
            POT_ENAME: data.POT_ENAME,
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

export const addPortMag = data =>
  post(
    '/DXNXTD/ControlPath?act=add&actKey=Ports&Section=AddPorts&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            CTY_UUID: data.CTY_UUID,
            POT_CNAME: data.POT_CNAME,
            POT_CODE: data.POT_CODE,
            POT_ENAME: data.POT_ENAME,
            REMARK: data.REMARK,
            CREATOR: store.state.user.USR_CODE_DX_H,
            FLT_UUID: store.state.user.FLT_UUID_DX_H
          }
        }
      }
    }
  )

export const editPortMag = data =>
  post(
    '/DXNXTD/ControlPath?act=edit&actKey=Ports&Section=EditPorts&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            CTY_UUID: data.CTY_UUID,
            POT_CNAME: data.POT_CNAME,
            POT_ENAME: data.POT_ENAME,
            REMARK: data.REMARK,
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            VERSION: data.VERSION.toString()
          }
        }
      }
    }
  )

export const delPortMag = data =>
  post(
    '/DXNXTD/ControlPath?act=del&actKey=Ports&Section=DelPorts&SessionId=' +
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

export const listbPortMag = () =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=Countries&Section=listb&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            FLT_UUID: store.state.user.FLT_UUID_DX_H
          }
        }
      }
      // "Data": {
      //     "Parameters": {
      //      "DXNXTD": {
      //       "UUID":data.UUID,
      //       "VERSION":data.VERSION.toString(),
      //       "LASTMODIFIER":store.state.user.USR_CODE_DX_H
      //      }
      //     }
      //    }
    }
  )
