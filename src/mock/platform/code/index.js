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
    CREATED: Random.datetime(),
    CREATOR: store.state.user.USR_CODE_DX_H,
    LASTMODIFIED: Random.datetime(),
    LASTMODIFIER: store.state.user.USR_CODE_DX_H,
    FLT_UUID: Random.string('number', 11),
    RV_DOMAIN: Random.word(2, 4),
    RV_ISVALID: Random.ISYN(),
    RV_NAME: Random.cword(4, 10),
    RV_REMARK: Random.cparagraph(1),
    UUID: Random.string('number', 11),
    VERSION: Random.string('number', 1, 2)
  }
  checkLists.push(checkListChild)

  let checkListChild2 = {
    CREATED: Random.datetime(),
    CREATOR: store.state.user.USR_CODE_DX_H,
    LASTMODIFIED: Random.datetime(),
    LASTMODIFIER: store.state.user.USR_CODE_DX_H,
    FLT_UUID: Random.string('number', 11),
    RCT_NAME: Random.cword(4, 10),
    RCT_UUID: Random.string('number', 11),
    RV_DOMAIN: Random.word(2, 4),
    RV_ISVALID: Random.ISYN(),
    RV_NAME: Random.word(4, 10),
    UUID: Random.string('number', 11),
    VERSION: Random.string('number', 1, 2)
  }
  checkLists2.push(checkListChild2)

}

/**
 * 基础代码管理
 */
// 左侧：
// 1.查询：/api/values/ControlPath?act=list&actKey=RefCode&Section=FindRefType唯一值
// "msg：返回值信息 主要为错误信息
// success：返回值代码
// data：返回值



let db_codeType = {
  // 查询
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=list&actKey=RefCode&Section=lista&SessionId=' +
    store.state.user.SessionId_DX_H,
  method: 'post',
  response: (options) => {
    let pIndexs = Number(JSON.parse(options.body).Data.PageIndexs.DXNXTD) - 1
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
let db_addRefType = {
  // 新增
  BaseUrl: 'BaseUrl',
  url:
    '/DXNXTD/ControlPath?act=add&actKey=RefCodeType&Section=AddRefCodeType&SessionId=' +
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
let db_editRefType = {
  // 编辑
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=edit&actKey=RefCodeType&Section=EditRefCodeType&SessionId=' +
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
let db_delRefType = {
  // 删除
  BaseUrl: 'BaseUrl',
  url:
    '/DXNXTD/ControlPath?act=del&actKey=RefCodeType&Section=DelRefCodeType&SessionId=' +
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
let db_getRefCode = {
  // 查询
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=list&actKey=RefCode&Section=listb&SessionId=' +
    store.state.user.SessionId_DX_H,
  method: 'post',
  response: (options) => {
    let pIndexs2 = Number(JSON.parse(options.body).Data.PageIndexs.DXNXTD) - 1
    let pSize2 = Number(JSON.parse(options.body).Data.PageSizes.DXNXTD)
    let result2 = []
    for (var i = 0; i < checkLists2.length; i += pSize2) {
      result2.push(checkLists2.slice(i, i + pSize2))
    }
    return {
      data: {
        DXNXTD: result2[pIndexs2],
        total: { DXNXTD: checkLists2.length }
      },
      msg: '成功',
      success: '1'

    }
  }
}
let db_addRefCode = {
  // 新增
  BaseUrl: 'BaseUrl',
  url:
  '/DXNXTD/ControlPath?act=add&actKey=RefCode&Section=AddRefCode&SessionId=' +
  store.state.user.SessionId_DX_H,
  method: 'post',
  response: (options) => {
    let admin = JSON.parse(options.body).Data.Parameters.DXNXTD
    admin['UUID'] = `${new Date().getTime()}${Math.random() * 10000}`
    checkLists2.push(admin)
    return {
      msg: '',
      success: '1',
      data: {
        result: 'OK'
      }
    }
  }
}

let db_editRefCode = {
  // 编辑
  BaseUrl: 'BaseUrl',
  url:  '/DXNXTD/ControlPath?act=edit&actKey=RefCode&Section=EditRefCode&SessionId=' +
    store.state.user.SessionId_DX_H,
  method: 'post',
  response: (options) => {
    let find = false
    let admin = JSON.parse(options.body).Data.Parameters.DXNXTD
    for (let i = 0; i < checkLists2.length; i++) {
      if (checkLists2[i].UUID === admin.UUID) {
        checkLists2[i] = Object.assign(checkLists2[i], admin)
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
let db_delRefCode = {
  // 删除
  BaseUrl: 'BaseUrl',
  url:   '/DXNXTD/ControlPath?act=del&actKey=RefCode&Section=DelRefCode&SessionId=' +
    store.state.user.SessionId_DX_H,
  method: 'post',
  response: (options) => {
    let find = false
    let admin = JSON.parse(options.body).Data.Parameters.DXNXTD
    for (let i = 0; i < checkLists2.length; i++) {
      if (checkLists2[i].UUID === admin.UUID) {
        checkLists2.splice(i, 1)
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


export default [
  db_codeType,
  db_addRefType,
  db_editRefType,
  db_delRefType,
  db_getRefCode,
  db_addRefCode,
  db_editRefCode,
  db_delRefCode
]