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
    FLT_UUID: Random.string('number', 11),
    BI_TITLE: Random.cword(5),
    BI_TYPE: Random.ISXWTYPE(),
    BI_ABSTRACT: Random.cword(15),
    BI_CONTENT: Random.cparagraph(2),
    BI_ISHOT: Random.ISYN(),
    BI_SOURCE:Random.IS01(),
    BI_PVIEWS: Random.string('number', 3),
    BI_STATE: Random.ISYN(),
    CREATED: Random.datetime(),
    CREATOR:  store.state.user.USR_CODE_DX_H,
    LASTMODIFIED: Random.datetime(),
    LASTMODIFIER:  store.state.user.USR_CODE_DX_H,
    VERSION: '0'
  }
  checkLists.push(checkListChild)
}



let getPressRelease = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=list&actKey=BulletInfo&Section=lista&SessionId=' +
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
let addPressRelease = {
  BaseUrl: 'BaseUrl',
  url:
    '/DXNXTD/ControlPath?act=add&actKey=BulletInfo&Section=AddBulletInfo&SessionId=' +
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
let editPressRelease = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=edit&actKey=BulletInfo&Section=EditBulletInfo&SessionId=' +
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
let delPressRelease = {
  BaseUrl: 'BaseUrl',
  url:
    '/DXNXTD/ControlPath?act=del&actKey=BulletInfo&Section=DelBulletInfo&SessionId=' +
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
  getPressRelease,
  addPressRelease,
  editPressRelease,
  delPressRelease
]
