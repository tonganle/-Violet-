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
    SUR_CODE: Random.word(2,5),
    SUR_NAME: Random.cword(5,10),
    SUR_EGSNAME: Random.name(2,5),
    SUR_CONTACT: Random.cname(2,5),
    SUR_CTCTEL: Random.string('number', 11),
    SUR_ACCOUNT: Random.string('number', 11),
    SUR_TAXNO: Random.string('number', 18),
    SUR_BANKNO: Random.cword(15,20),
    SUR_ADDRESS: Random.cparagraph(1),
    SUR_VLFLAG: Random.ISYN(),
    CREATED: Random.datetime(),
    CREATOR:  store.state.user.USR_CODE_DX_H,
    LASTMODIFIED: Random.datetime(),
    LASTMODIFIER:  store.state.user.USR_CODE_DX_H,
    VERSION: Random.string('number',1,2)
  }
  checkLists.push(checkListChild)
}

// 获取供应商列表
let getSupplierList = {
  BaseUrl: 'BaseUrl',
  url:   '/DXNXTD/ControlPath?act=list&actKey=Supplier&Section=lista&SessionId=' +
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



// 新增
let addSupplier = {
  BaseUrl: 'BaseUrl',
  url:  '/DXNXTD/ControlPath?act=add&actKey=Supplier&Section=AddSupplier&SessionId=' +
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
let editSupplier = {
  BaseUrl: 'BaseUrl',
  url:  '/DXNXTD/ControlPath?act=edit&actKey=Supplier&Section=EditSupplier&SessionId=' +
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

let delSupplier = {
  BaseUrl: 'BaseUrl',
  url:  '/DXNXTD/ControlPath?act=del&actKey=Supplier&Section=DelSupplier&SessionId=' +
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

export default [getSupplierList, delSupplier, addSupplier, editSupplier]
