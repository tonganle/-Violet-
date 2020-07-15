
import Mock from 'mockjs'
const Random = Mock.Random
import store from '@/store'
import '@/mock/mockRandom'

var checkLists = [
]
for (let i = 0; i < 100; i++) {
  let checkListChild =
  {
    UUID: Random.string('number', 11),
    FLT_CODE: Random.word(2,5),
    FLT_NAME: Random.word(5,10),
    FLT_URL: Random.url(),
    FLT_STATUS: Random.ISYN(),
    FLT_LINKPERSON: Random.cname(),
    FLT_LINKPHONE: Random.string('number', 11),
    FLT_REGADDRESS:Random.cparagraph(1),
    FLT_INTRODUCTION: Random.cparagraph(1),
    CREATED: Random.datetime(),
    CREATOR:  store.state.user.USR_CODE_DX_H,
    LASTMODIFIED: Random.datetime(),
    LASTMODIFIER:  store.state.user.USR_CODE_DX_H,
    VERSION: Random.string('number',1,2),
  }
  checkLists.push(checkListChild)
}

let getCompList= {
  BaseUrl: 'BaseUrl',
  url:  '/DXNXTD/ControlPath?act=list&actKey=SysCompany&Section=lista&SessionId=' +
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
let addComp={
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=add&actKey=SysCompany&Section=AddSysCompany&SessionId=' +
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
let editComp= {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=edit&actKey=SysCompany&Section=EditSysCompany&SessionId=' +
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
let delComp = {
  BaseUrl: 'BaseUrl',
  url:   '/DXNXTD/ControlPath?act=del&actKey=SysCompany&Section=DelSysCompany&SessionId=' +
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
  getCompList,
  addComp,
  editComp,
  delComp
]