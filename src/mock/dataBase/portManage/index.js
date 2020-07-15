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
    FLT_UUID: store.state.user.FLT_UUID_DX_H,
    CTY_UUID: Random.string('number', 11),
    CTY_CD: Random.word(2,3), 
    CTY_CNAME: Random.cword(2,5),
    CTY_ENAME: Random.word(1,10),
    POT_CODE: Random.string('upper', 3),
    POT_CNAME: Random.cword(5,10),
    POT_ENAME: Random.word(5,10),
    CREATED: Random.datetime(),
    CREATOR:  store.state.user.USR_CODE_DX_H,
    LASTMODIFIED: Random.datetime(),
    LASTMODIFIER:  store.state.user.USR_CODE_DX_H,
    REMARK: Random.cparagraph(2),
    VERSION: Random.string('number', 1)
  }
  checkLists.push(checkListChild)
  let checkListChild2 = {
    
    UUID: Random.string('number', 11),
    CTY_CD:  Random.word(2,3),
    CTY_CNAME: Random.cword(2,5)
    
  }
  checkLists2.push(checkListChild2)
}

let getPortMagList=  {
  BaseUrl: 'BaseUrl',
  url:   '/DXNXTD/ControlPath?act=list&actKey=Ports&Section=lista&SessionId=' +
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
let addPortMag ={
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=add&actKey=Ports&Section=AddPorts&SessionId=' +
    store.state.user.SessionId_DX_H,
  method: 'post',
  response: (options) => {
    let admin = JSON.parse(options.body).Data.Parameters.DXNXTD
    admin['UUID'] = `${new Date().getTime()}${Math.random() * 10000}`
    checkLists.unshift(admin)
    return {
      msg: '',
      success: '1',
      data: {
        result: 'OK'
      }
    }
  }
}
let editPortMag ={
  BaseUrl: 'BaseUrl',
  url:  '/DXNXTD/ControlPath?act=edit&actKey=Ports&Section=EditPorts&SessionId=' +
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
let delPortMag={
  BaseUrl: 'BaseUrl',
  url:   '/DXNXTD/ControlPath?act=del&actKey=Ports&Section=DelPorts&SessionId=' +
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
let listbPortMag = {
  BaseUrl: 'BaseUrl',
  url:  '/DXNXTD/ControlPath?act=list&actKey=Countries&Section=listb&SessionId=' +
  store.state.user.SessionId_DX_H,
  method: 'post',
  response:{
    data: {
      DXNXTD:checkLists2,
      total: { DXNXTD: checkLists2.length }
    },
    msg: '成功',
    success: '1'

  }
}
export default [
  listbPortMag,
  delPortMag,
  editPortMag,
  addPortMag,
  getPortMagList
]
