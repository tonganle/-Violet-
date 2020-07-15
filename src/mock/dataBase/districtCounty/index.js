
import Mock from 'mockjs'
const Random = Mock.Random
import store from '@/store'
import '@/mock/mockRandom'
var checkLists = [
]
var checkLists2 = [
]

for (let i = 0; i < 100; i++) {
  let checkListChild =   {
    UUID: Random.string('number', 11),
    FLT_UUID: store.state.user.FLT_UUID_DX_H,
    CTY_CODE: Random.word(2,4),
    CTV_PRV_UUID: Random.word(2,4),
    CTV_PRV_CNAME: Random.cname(2,4),
    CTY_CHNNAME: Random.cname(5,10),
    CTY_EGSNAME:Random.name(5,10),
    CREATED: Random.datetime(),
    CREATOR:  store.state.user.USR_CODE_DX_H,
    LASTMODIFIED: Random.now(),
    LASTMODIFIER:  store.state.user.USR_CODE_DX_H,
    VERSION:Random.string('number',1)
  }
  checkLists.push(checkListChild)
  let checkListChild2 =   {
    UUID: Random.string('number', 11),
    PRV_CHNNAME: Random.cname(2,4),
  }
  checkLists2.push(checkListChild2)
}
// 获取管理员列表
let getDCList = {
  BaseUrl: 'BaseUrl',
  url:  '/DXNXTD/ControlPath?act=list&actKey=City&Section=lista&SessionId=' +
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
let getPCLists = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=list&actKey=City&Section=listb&SessionId=' +
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
let addDC = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=add&actKey=City&Section=AddCity&SessionId=' +
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
let editDC = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=edit&actKey=City&Section=EditCity&SessionId=' +
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
        success: '0',
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

let delDC = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=del&actKey=City&Section=DelCity&SessionId=' +
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
        success: '0',
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

export default [getDCList, delDC, addDC, editDC, getPCLists]
