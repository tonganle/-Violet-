
import Mock from 'mockjs'
const Random = Mock.Random
import store from '@/store'

var checkLists = [
]

for (let i = 0; i < 100; i++) {
  let checkListChild = {
    AD_CONTENT: Random.cword(10),
    AD_EMAIL: Random.email(),
    CREATED: Random.datetime(),
    CREATOR:  store.state.user.USR_CODE_DX_H,
    FLT_UUID: Random.string('number', 11),
    UUID: Random.string('number', 11),
    VERSION: '0',
  }
  checkLists.push(checkListChild)
}

let getAdviceList = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=list&actKey=Advice_info&Section=lista&SessionId='+store.state.user.SessionId_DX_H,
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
let delAdvice = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=del&actKey=Advice_info&Section=DelSysUser&SessionId=' +store.state.user.SessionId_DX_H,
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
  getAdviceList,
  delAdvice
]
