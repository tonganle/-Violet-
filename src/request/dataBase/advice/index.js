import { post } from '@/request/http'
import store from '@/store'

/**
 * 资讯建议
 *  1. 企业列表查询 getCompList
 */

export const getAdviceList = data =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=Advice_info&Section=lista&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            AD_EMAIL: data.FLT_CODE,
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

export const delAdvice = data =>
  post(
    '/DXNXTD/ControlPath?act=del&actKey=Advice_info&Section=DelSysUser&SessionId=' +
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
