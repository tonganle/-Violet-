import Mock from 'mockjs'
const Random = Mock.Random
import store from '@/store'

var checkLists = [
]

for (let i = 0; i < 100; i++) {
  let checkListChild =

  {
    UUID: Random.string('number', 11),
    FLT_UUID: Random.string('number', 11),
    MESSAGE_TITLE: Random.cword(5),
    MESSAGE_CONTENT: Random.cword(10),
    CREATED: Random.datetime(),
    CREATOR:  store.state.user.USR_CODE_DX_H,
    LASTMODIFIED: Random.datetime(),
    LASTMODIFIER: store.state.user.USR_CODE_DX_H,
    REMARK: Random.cparagraph(2),
    VERSION: '0'
  }

  checkLists.push(checkListChild)
}



let getNewManager=  {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=list&actKey=MessageInfo&Section=lista&SessionId=' + store.state.user.SessionId_DX_H,
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

let addNewManager={
  BaseUrl: 'BaseUrl',
  url:
      '/DXNXTD/ControlPath?act=add&actKey=MessageInfo&Section=AddMessageInfo&SessionId=' +
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
let editNewManager={
  BaseUrl: 'BaseUrl',
  url:
      '/DXNXTD/ControlPath?act=edit&actKey=MessageInfo&Section=EditMessageInfo&SessionId=' +
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
let delNewManager= {
  BaseUrl: 'BaseUrl',
  url:
      '/DXNXTD/ControlPath?act=del&actKey=MessageInfo&Section=DelMessageInfo&SessionId=' +
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

export default [
  getNewManager,
  addNewManager,
  editNewManager,
  delNewManager
]
