
import Mock from 'mockjs'
const Random = Mock.Random
import store from '@/store'
import '@/mock/mockRandom'
var checkLists = [
]

for (let i = 0; i < 100; i++) {
  let checkListChild = {
    CREATED: Random.datetime(),
    CREATOR:  store.state.user.USR_CODE_DX_H,
    CTY_CD: Random.word(2),
    CTY_CNAME: Random.cword(2, 4),
    CTY_ENAME: Random.word(2, 4),
    CTY_ISVALID: Random.ISYN(),
    FLT_UUID: Random.string('number', 11),
    LASTMODIFIED: Random.now(),
    LASTMODIFIER:  store.state.user.USR_CODE_DX_H,
    REMARK: Random.cparagraph(1, 3),
    UUID: Random.string('number', 11),
    VERSION: '0'
  }
  checkLists.push(checkListChild)
}

let getCountryList = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=list&actKey=Countries&Section=lista&SessionId=' + store.state.user.SessionId_DX_H,
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

//新增
let addCountry = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=add&actKey=Countries&Section=AddCountries&SessionId=' + store.state.user.SessionId_DX_H,
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
let editCountry = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=edit&actKey=Countries&Section=EditCountries&SessionId=' + store.state.user.SessionId_DX_H,
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

let delCountry = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=del&actKey=Countries&Section=DelCountries&SessionId=' + store.state.user.SessionId_DX_H,
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
  addCountry,
  editCountry,
  delCountry,
  getCountryList
]
