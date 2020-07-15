import Mock from 'mockjs'
const Random = Mock.Random
import store from '@/store'
import '@/mock/mockRandom'

var checkLists = [
]
var checkLists2 = [
]
for (let i = 0; i < 100; i++) {
  let checkListChild =
  {
    UUID: Random.string('number', 11),
    FLT_UUID: Random.string('number', 11),
    RLE_CODE:  Random.word(5),
    RLE_NAME: Random.cname(2,4),
    RLE_TYPE: Random.YSTYPE(),
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
    RV_DOMAIN:  Random.word(2,4),
    RV_NAME:  Random.YSTYPE()
  }
  checkLists2.push(checkListChild2)
}


// 获取管理员列表
let checkRoleList = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=list&actKey=SysRole&Section=lista&SessionId=' +
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

// 编辑
let editRoleList = {
  BaseUrl: 'BaseUrl',
  url:  '/DXNXTD/ControlPath?act=edit&actKey=SysRole&Section=EditSysRole&SessionId=' +
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

// 新增
let addRoleList = {
  BaseUrl: 'BaseUrl',
  url:   '/DXNXTD/ControlPath?act=add&actKey=SysRole&Section=AddSysRole&SessionId=' +
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
// 删除

let delRoleList = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=del&actKey=SysRole&Section=DelSysRole&SessionId=' +
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
// 获得下拉框数据

let getRoleDown = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=list&actKey=PFRef_Code&Section=lista&SessionId=' +
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
export default [
  checkRoleList,
  editRoleList,
  addRoleList,
  delRoleList,
  getRoleDown
]
