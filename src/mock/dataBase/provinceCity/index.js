
import Mock from 'mockjs'
const Random = Mock.Random
import store from '@/store'
import '@/mock/mockRandom'
var checkLists = [
]
var checkLists2 = [
]

for (let i = 0; i < 100; i++) {
  let checkListChild = {
    CREATED: Random.datetime(),
    CREATOR:  store.state.user.USR_CODE_DX_H,
    FLT_UUID: store.state.user.FLT_UUID_DX_H,
    LASTMODIFIED: Random.now(),
    LASTMODIFIER:  store.state.user.USR_CODE_DX_H,
    PRV_CHNNAME:  Random.cword(2, 4),
    PRV_CODE: Random.word(2,4),
    PRV_CTY_CNAME: Random.cword(2, 4),
    PRV_CTY_UUID: Random.string('number', 11),
    PRV_EGSNAME:  Random.word(2,4),
    UUID: Random.string('number', 11),
    VERSION:Random.string('number',1)
  }
  checkLists.push(checkListChild)
  let checkListChild2 = {
    CTY_CNAME: Random.cword(2, 4),
    UUID: Random.string('number', 11)
  }
  checkLists2.push(checkListChild2)
}

let getPCList = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=list&actKey=Province&Section=lista&SessionId=' +
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
let getCountryLists = {
  BaseUrl: 'BaseUrl',
  url:   '/DXNXTD/ControlPath?act=list&actKey=Province&Section=listb&SessionId=' +
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
//新增
let addPC = {
  BaseUrl: 'BaseUrl',
  url:  '/DXNXTD/ControlPath?act=add&actKey=Province&Section=AddProvince&SessionId=' +
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
let editPC = {
  BaseUrl: 'BaseUrl',
  url:  '/DXNXTD/ControlPath?act=edit&actKey=Province&Section=EditProvince&SessionId=' +
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

let delPC = {
  BaseUrl: 'BaseUrl',
  url:   '/DXNXTD/ControlPath?act=del&actKey=Province&Section=DelProvince&SessionId=' +
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

export default [
  getPCList,
  getCountryLists,
  addPC,
  editPC,
  delPC
]
