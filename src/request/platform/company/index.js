import { post } from '@/request/http'
import store from '@/store'

/**
 * 企业管理
 *  1. 企业列表查询 getCompList
 */

export const getCompList = data =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=SysCompany&Section=lista&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            FLT_CODE: data.FLT_CODE,
            FLT_NAME: data.FLT_NAME
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

export const addComp = data =>
  post(
    '/DXNXTD/ControlPath?act=add&actKey=SysCompany&Section=AddSysCompany&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            FLT_CODE: data.FLT_CODE,
            FLT_NAME: data.FLT_NAME,
            FLT_URL: data.FLT_URL,
            FLT_STATUS: data.FLT_STATUS,
            FLT_LINKPERSON: data.FLT_LINKPERSON,
            FLT_LINKPHONE: data.FLT_LINKPHONE,
            FLT_REGADDRESS: data.FLT_REGADDRESS,
            FLT_INTRODUCTION: data.FLT_INTRODUCTION,
            CREATOR: store.state.user.USR_CODE_DX_H
          }
        }
      }
    }
  )

export const editComp = data =>
  post(
    '/DXNXTD/ControlPath?act=edit&actKey=SysCompany&Section=EditSysCompany&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            // 'UUID': store.state.user.FLT_UUID,
            UUID: data.UUID,
            FLT_NAME: data.FLT_NAME,
            FLT_URL: data.FLT_URL,
            FLT_STATUS: data.FLT_STATUS,
            FLT_LINKPERSON: data.FLT_LINKPERSON,
            FLT_LINKPHONE: data.FLT_LINKPHONE,
            FLT_REGADDRESS: data.FLT_REGADDRESS,
            FLT_INTRODUCTION: data.FLT_INTRODUCTION,
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            VERSION: data.VERSION.toString()
          }
        }
      }
    }
  )

export const delComp = data =>
  post(
    '/DXNXTD/ControlPath?act=del&actKey=SysCompany&Section=DelSysCompany&SessionId=' +
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
