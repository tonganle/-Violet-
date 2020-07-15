import { post } from '@/request/http'
import { toString } from '@/utils/utils'
import store from '@/store'

/**
 * 平台管理--管理员管理 接口
 * 1. 获取管理员列表 pf_getAdminList
 * 2. 新增管理员 pf_addAdmin
 * 3. 编辑管理员 pf_editAdmin
 * 4. 删除管理员 pf_delAdmin
 * 5. 密码重置 pf_resetPassword
 * 6. 获取管理员状态（下拉列表） pf_getAdminStatusList
 * 7. 获取管理员所属企业（下拉列表） pf_getAdminEnterpriseList
 */

/**
 * 获取列表数据
 */
export const getAdminList = data =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=SysUser&Section=lista&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            USR_CODE: data.USR_CODE,
            USR_NAME: data.USR_NAME,
            USR_CELLPHONE: data.USR_CELLPHONE,
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
// 获取角色下拉列表
export const getRoleList = () =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=SysRole&Section=listb&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            FLT_UUID: store.state.user.FLT_UUID_DX_H
          }
        }
      }
    }
  )
/**
 * 新增一行数据
 */
export const addAdminList = data =>
  post(
    '/DXNXTD/ControlPath?act=add&actKey=SysUser&Section=AddSysUser&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            USR_CODE: data.USR_CODE,
            USR_NAME: data.USR_NAME,
            USR_RLES: data.USR_RLES,
            USR_CELLPHONE: data.USR_CELLPHONE,
            USR_EMAIL: data.USR_EMAIL,
            USR_STATUS: data.USR_STATUS,
            USR_PASSWORD: data.USR_PASSWORD,
            REMARK: data.REMARK,
            FLT_UUID: store.state.user.FLT_UUID_DX_H,
            CREATOR: store.state.user.USR_CODE_DX_H,
            USR_COMPANY_UUID: data.USR_COMPANY_UUID
          }
        }
      }
    }
  )
/**
 * 编辑一行数据
 */
export const editAdminList = data =>
  post(
    '/DXNXTD/ControlPath?act=edit&actKey=SysUser&Section=EditSysUser&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            USR_CODE: data.USR_CODE,
            USR_NAME: data.USR_NAME,
            USR_RLES: data.USR_RLES,
            USR_CELLPHONE: data.USR_CELLPHONE,
            USR_EMAIL: data.USR_EMAIL,
            USR_STATUS: data.USR_STATUS,
            USR_PASSWORD: data.USR_PASSWORD,
            REMARK: data.REMARK,
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            FLT_UUID: store.state.user.FLT_UUID_DX_H,
            USR_COMPANY_UUID: data.USR_COMPANY_UUID,
            VERSION: toString(data.VERSION)
          }
        }
      }
    }
  )
/**
 * 删除一行数据
 */
export const delAdminList = data =>
  post(
    '/DXNXTD/ControlPath?act=del&actKey=SysUser&Section=DelSysUser&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            VERSION: toString(data.VERSION),
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            FLT_UUID: store.state.user.FLT_UUID_DX_H
          }
        }
      }
    }
  )
/**
 * 重置密码用户接口
 */

export const changePwd = data =>
  post(
    '/DXNXTD/ControlPath?act=edit&actKey=SysUser&Section=EditSysUserPassword&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Parameters: {
          DXNXTD: {
            UUID: data.UUID,
            VERSION: toString(data.VERSION),
            LASTMODIFIER: store.state.user.USR_CODE_DX_H,
            FLT_UUID: store.state.user.FLT_UUID_DX_H
          }
        }
      }
    }
  )
// 所属公司 客户下拉接口
export const getClientInfo = () =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=Client&Section=listc&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            FLT_UUID: store.state.user.FLT_UUID_DX_H
          }
        }
      }
    }
  )
// 所属公司 供应商下拉接口
export const getSupplierInfo = () =>
  post(
    '/DXNXTD/ControlPath?act=list&actKey=Supplier&Section=listd&SessionId=' +
      store.state.user.SessionId_DX_H,
    {
      Data: {
        Filters: {
          DXNXTD: {
            FLT_UUID: store.state.user.FLT_UUID_DX_H
          }
        }
      }
    }
  )
