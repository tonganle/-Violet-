import { post } from '@/request/http'
import store from '@/store'

/**
 * 企业管理
 *  1. 企业列表查询 getCountryList
 */

export const getCountryList = data =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=Countries&Section=lista&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            CTY_CD: data.CTY_CD,
            CTY_CNAME: data.CTY_CNAME,
            CTY_ENAME: data.CTY_ENAME,
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

export const addCountry = data =>
  post(
    '/DXNXTD/ControlPath?act=add&actKey=Countries&Section=AddCountries&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            CTY_CD: data.CTY_CD,
            CTY_CNAME: data.CTY_CNAME,
            CTY_ENAME: data.CTY_ENAME,
            CTY_ISVALID: data.CTY_ISVALID,
            REMARK: data.REMARK,
            CREATOR: store.state.user.USR_CODE_DX_H,
            FLT_UUID: store.state.user.FLT_UUID_DX_H
          }
        }
      }
    }
  )

export const editCountry = data =>
  post(
    '/DXNXTD/ControlPath?act=edit&actKey=Countries&Section=EditCountries&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            CTY_CNAME: data.CTY_CNAME,
            CTY_ENAME: data.CTY_ENAME,
            CTY_ISVALID: data.CTY_ISVALID,
            REMARK: data.REMARK,
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            FLT_UUID: data.FLT_UUID,
            VERSION: data.VERSION.toString()
          }
        }
      }
    }
  )

export const delCountry = data =>
  post(
    '/DXNXTD/ControlPath?act=del&actKey=Countries&Section=DelCountries&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            VERSION: data.VERSION.toString(),
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            FLT_UUID: data.FLT_UUID
          }
        }
      }
    }
  )
