
import Mock from 'mockjs'
const Random = Mock.Random
import store from '@/store'
import '@/mock/mockRandom'

var checkLists = [
]
var checkLists2 = [
]
var checkLists3 = [
]
var checkLists4 = [
]
for (let i = 0; i < 100; i++) {
  let checkListChild =
  {
    UUID: Random.string('number', 11),
    FLT_UUID: Random.string('number', 11),
    USR_CODE: Random.word(5),
    USR_NAME: Random.cname(2,4),
    ROLE_UUID: Random.string('number', 11),
    USR_PASSWORD: Random.string('number',6),
    USR_CELLPHONE: Random.string('number', 11),
    USR_EMAIL: Random.email('@qq.com'),
    USR_STATUS: Random.ISYN(),
    CREATED: Random.datetime(),
    CREATOR:  store.state.user.USR_CODE_DX_H,
    LASTMODIFIED: Random.datetime(),
    LASTMODIFIER:  store.state.user.USR_CODE_DX_H,
    REMARK: Random.cparagraph(1),
    VERSION: Random.string('number',1,2),
  }
  checkLists.push(checkListChild)
  let checkListChild2 =
  {
    UUID: Random.string('number', 11),
    RLE_CODE: Random.word(2,4),
    RLE_NAME: Random.cword(2,4)
  }

  checkLists2.push(checkListChild2)
  let checkListChild3 =
  {
    UUID: Random.string('number', 11),
    SUR_NAME: Random.cword(4,10)
  }

  checkLists3.push(checkListChild3)
  let checkListChild4=
  {
    CLT_NAME:Random.cword(4,10),
    UUID: Random.string('number', 11)
  }

  checkLists4.push(checkListChild4)
}


// 获取管理员列表
let getAdminList = {
  BaseUrl: 'BaseUrl',
  url:  '/DXNXTD/ControlPath?act=list&actKey=SysUser&Section=lista&SessionId=' +
  store.state.user.SessionId_DX_H,
  method: 'post',
  response: (options) => {
    let pIndexs = Number(JSON.parse(options.body).Data.PageIndexs.DXNXTD)-1
    let pSize = Number(JSON.parse(options.body).Data.PageSizes.DXNXTD)
    let result = []
    for (var i = 0; i < checkLists.length; i += pSize) {
      result.push(checkLists.slice(i, i + pSize))
    }
    return {
      data: {
        DXNXTD: result[pIndexs],
        total: { DXNXTD: checkLists.length }
      },
      msg: '成功',
      success: '1'

    }
  }
}

// 获取角色下拉列表
let getRoleList = {
  BaseUrl: 'BaseUrl',
  url:  '/DXNXTD/ControlPath?act=list&actKey=SysRole&Section=listb&SessionId=' +
  store.state.user.SessionId_DX_H,
  method: 'post',
  response: {
    data: {
      DXNXTD: checkLists2,
      total: { DXNXTD: checkLists2.length }
    },
    msg: '成功',
    success: '1'

  }
}
// 新增
let addAdminList = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=add&actKey=SysUser&Section=AddSysUser&SessionId=' +
  store.state.user.SessionId_DX_H,
  method: 'post',
  response: (options) => {
    let admin = JSON.parse(options.body).Data.Parameters.DXNXTD
    admin['UUID'] = `${new Date().getTime()}${Math.random() * 10000}`
    checkLists.push(admin)
    return {
      msg: '',
      success: '1',
      data: {
        result: 'OK'
      }
    }
  }
}
// 编辑
let editAdminList = {
  BaseUrl: 'BaseUrl',
  url:  '/DXNXTD/ControlPath?act=edit&actKey=SysUser&Section=EditSysUser&SessionId=' +
  store.state.user.SessionId_DX_H,
  method: 'post',
  response: (options) => {
    let find = false
    let admin = JSON.parse(options.body).Data.Parameters.DXNXTD
    for (let i = 0; i < checkLists.length; i++) {
      if (checkLists[i].UUID === admin.UUID) {
        checkLists[i] = Object.assign(checkLists[i], admin)
        find = true
        break
      }
    }
    if (!find) {
      return {
        msg: 'Not Found',
        success: 0,
        data: {
          result: 'Not Found'
        }
      }
    } else {
      return {
        msg: '',
        success: '1',
        data: {
          result: 'OK'
        }
      }
    }
  }
}


// 删除

let delAdminList = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=del&actKey=SysUser&Section=DelSysUser&SessionId=' +
  store.state.user.SessionId_DX_H,
  method: 'post',
  response: (options) => {
    let find = false
    let admin = JSON.parse(options.body).Data.Parameters.DXNXTD
    for (let i = 0; i < checkLists.length; i++) {
      if (checkLists[i].UUID === admin.UUID) {
        checkLists.splice(i, 1)
        find = true
        break
      }
    }
    if (!find) {
      return {
        msg: 'Not Found',
        success: 0,
        data: {
          result: 'Not Found'
        }
      }
    } else {
      return {
        msg: '',
        success: '1',
        data: {
          result: 'OK'
        }
      }
    }
  }
}
// 删除

let changePwd = {
  BaseUrl: 'BaseUrl',
  url:
  '/DXNXTD/ControlPath?act=edit&actKey=SysUser&Section=EditSysUserPassword&SessionId=' +
  store.state.user.SessionId_DX_H,
  method: 'post',
  response: {
    msg: '',
    success: 1,
    data: {
      DXNXTD: 'OK'
    }
  }
}
let getClientInfo = {
  BaseUrl: 'BaseUrl',
  url:
  '/DXNXTD/ControlPath?act=list&actKey=Client&Section=listc&SessionId=' +
  store.state.user.SessionId_DX_H,
  method: 'post',
  response: {
    msg: '',
    success: 1,
    data: {
      DXNXTD:  checkLists4
    }
  }
}
// 所属公司
let getSupplierInfo = {
  BaseUrl: 'BaseUrl',
  url:
  '/DXNXTD/ControlPath?act=list&actKey=Supplier&Section=listd&SessionId=' +
  store.state.user.SessionId_DX_H,
  method: 'post',
  response: {
    msg: '',
    success: 1,
    data: {
      DXNXTD: checkLists3
    }
  }
}
export default [
  getAdminList,
  getRoleList,
  editAdminList,
  addAdminList,
  delAdminList,
  changePwd,
  getSupplierInfo,
  getClientInfo
]
