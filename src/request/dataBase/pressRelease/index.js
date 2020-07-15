import { post } from '@/request/http'
import store from '@/store'

/**
 * 企业管理
 *  1. 企业列表查询 getPortMagList
 */

export const getPressRelease = data =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=BulletInfo&Section=lista&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            BI_TITLE: data.BI_TITLE,
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

export const addPressRelease = data =>
  post(
    '/DXNXTD/ControlPath?act=add&actKey=BulletInfo&Section=AddBulletInfo&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            BI_TITLE: data.BI_TITLE,
            BI_TYPE: data.BI_TYPE,
            BI_ABSTRACT: data.BI_ABSTRACT,
            BI_ISHOT: data.BI_ISHOT,
            BI_SOURCE: data.BI_SOURCE,
            BI_PVIEWS: data.BI_PVIEWS,
            BI_STATE: data.BI_STATE,
            CREATOR: store.state.user.USR_CODE_DX_H,
            FLT_UUID: store.state.user.FLT_UUID_DX_H,
            BI_CONTENT: data.BI_CONTENT,
            BI_SHOWIMAGEURL: data.BI_SHOWIMAGEURL
          }
        }
      }
    }
  )

export const editPressRelease = data =>
  post(
    '/DXNXTD/ControlPath?act=edit&actKey=BulletInfo&Section=EditBulletInfo&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            BI_TITLE: data.BI_TITLE,
            BI_TYPE: data.BI_TYPE,
            BI_ABSTRACT: data.BI_ABSTRACT,
            BI_ISHOT: data.BI_ISHOT,
            BI_SOURCE: data.BI_SOURCE,
            BI_PVIEWS: data.BI_PVIEWS,
            BI_STATE: data.BI_STATE,
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            VERSION: data.VERSION.toString(),
            BI_CONTENT: data.BI_CONTENT,
            BI_SHOWIMAGEURL: data.BI_SHOWIMAGEURL
          }
        }
      }
    }
  )

export const delPressRelease = data =>
  post(
    '/DXNXTD/ControlPath?act=del&actKey=BulletInfo&Section=DelBulletInfo&SessionId=' +
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
