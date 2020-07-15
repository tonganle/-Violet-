import { post } from '@/request/http.js'
import { getCookie } from '@/utils/utils'
import store from '@/store'

/**
 * 基础代码管理
 */
// 上侧：

export const db_codeType = () =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=RefCode&Section=lista&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            FLT_UUID: store.state.user.FLT_UUID_DX_H,
            RV_DOMAIN: '',
            RV_ISVALID: ''
          }
        },
        Orderbys: {},
        PageIndexs: {},
        PageSizes: {}
      }
    }
  )

export const db_codeTypeList = data =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=RefCode&Section=lista&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            //  "UUID": "",
            RV_DOMAIN: data.RV_DOMAIN,
            FLT_UUID: store.state.user.FLT_UUID_DX_H,
            RV_NAME: data.RV_NAME
          }
        },
        Orderbys: {},
        PageIndexs: {
          DXNXTD: data.PageNo.toString()
        },
        PageSizes: {
          DXNXTD: data.PageSize.toString()
        }
      }
    }
  )

// 新增
export const db_addRefType = data =>
  post(
    '/DXNXTD/ControlPath?act=add&actKey=RefCodeType&Section=AddRefCodeType&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            RV_DOMAIN: data.RV_DOMAIN,
            RV_NAME: data.RV_NAME,
            RV_ISVALID: data.RV_ISVALID,
            RV_REMARK: data.RV_REMARK,
            CREATOR: store.state.user.USR_CODE_DX_H,
            FLT_UUID: getCookie('FLT_UUID_DX_H')
          }
        }
      }
    }
  )

// 编辑
export const db_editRefType = data =>
  post(
    '/DXNXTD/ControlPath?act=edit&actKey=RefCodeType&Section=EditRefCodeType&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            RV_DOMAIN: data.RV_DOMAIN,
            RV_NAME: data.RV_NAME,
            RV_ISVALID: data.RV_ISVALID,
            RV_REMARK: data.RV_REMARK,
            CREATED: data.CREATED,
            CREATOR: data.CREATOR,
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            FLT_UUID: data.FLT_UUID,
            VERSION: data.VERSION + ''
          }
        }
      }
    }
  )

// 删除
export const db_delRefType = data =>
  post(
    '/DXNXTD/ControlPath?act=del&actKey=RefCodeType&Section=DelRefCodeType&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            VERSION: data.VERSION + '',
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            FLT_UUID: data.FLT_UUID
          }
        }
      }
    }
  )

// 1.查询详情
export const db_getRefCode = data =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=RefCode&Section=listb&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            UUID: data.UUID
          }
        },
        Orderbys: {},
        PageIndexs: {
          DXNXTD: data.PageNo.toString()
        },
        PageSizes: {
          DXNXTD: data.PageSize.toString()
        }
      }
    }
  )
// 1.新增
export const db_addRefCode = data =>
  post(
    '/DXNXTD/ControlPath?act=add&actKey=RefCode&Section=AddRefCode&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            RV_DOMAIN: data.RV_DOMAIN,
            RV_NAME: data.RV_NAME,
            RV_ISVALID: data.RV_ISVALID,
            CREATOR: store.state.user.USR_CODE_DX_H,
            FLT_UUID: getCookie('FLT_UUID_DX_H'),
            RCT_UUID: data.RCT_UUID
          }
        }
      }
    }
  )

// 编辑
export const db_editRefCode = data =>
  post(
    '/DXNXTD/ControlPath?act=edit&actKey=RefCode&Section=EditRefCode&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            RV_NAME: data.RV_NAME,
            RV_ISVALID: data.RV_ISVALID,
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            FLT_UUID: data.FLT_UUID,
            VERSION: data.VERSION + ''
          }
        }
      }
    }
  )
// 删除
export const db_delRefCode = data =>
  post(
    '/DXNXTD/ControlPath?act=del&actKey=RefCode&Section=DelRefCode&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            VERSION: data.VERSION + '',
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            FLT_UUID: data.FLT_UUID
          }
        }
      }
    }
  )
