
import Mock from 'mockjs'
const Random = Mock.Random
import store from '@/store'
import '@/mock/mockRandom'

var checkLists = [
]
var checkLists2 = [
]
for (let i = 0; i < 1; i++) {
  let checkListChild =
  {
    UUID: Random.string('number', 11),
    FLT_UUID:store.state.user.FLT_UUID_DX_H,
    RLE_NAME: Random.cword(3,5),
  }
  checkLists.push(checkListChild)
  let checkListChild2 = {
    MDL_CODE: 'dataBase',
    MDL_NAME: '基础数据',
    MDL_PARENT: null,
    MDL_SEQ: 1,
    MDL_TYPE: 'M',
    MDL_URL: null,
    MDL_UUID: Random.string('number', 11),
    Children: [
      {
        MDL_CODE:'advice',
        MDL_NAME:'咨询建议',
        MDL_PARENT: 'dataBase',
        MDL_SEQ: 1,
        MDL_TYPE: 'M',
        MDL_URL: '/dataBase/advice',
        MDL_UUID:  Random.string('number', 11),
        Grandson:[
          {
            MDL_CODE: 'delete',
            MDL_NAME: '删除',
            MDL_PARENT: 'advice',
            MDL_SEQ: 1,
            MDL_TYPE: 'B',
            MDL_URL: null,
            MDL_UUID:Random.string('number', 11),
          }
        ]
      }
    ]
  }
  checkLists2.push(checkListChild2)

}

let  getAuthList = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=list&actKey=SysRights&Section=lista&SessionId=' +
    store.state.user.SessionId_DX_H,
  method: 'post',
  response: {
    msg: '',
    success: '1',
    data: {
      DXNXTD: checkLists
    }
  }
}
let getAuthMenu ={
  BaseUrl: 'BaseUrl',
  url:   '/DXNXTD/ControlPath?act=listGrandSon&actKey=SysRights&Section=listb&SessionId=' +
    store.state.user.SessionId_DX_H,
  method: 'post',
  response: {
    msg: '',
    success: '1',
    data:{
      DXNXTD: checkLists2
    }
  }
}
let saveAuth={
  BaseUrl: 'BaseUrl',
  url:   '/DXNXTD/ControlPath?act=add&actKey=SysRights&Section=AddSysRights&SessionId=' +
    store.state.user.SessionId_DX_H,
  method: 'post',
  response: {
    msg: '',
    success: '1',
    data: {
      DXNXTD: 'OK'
    }
  }
}
export default [
  getAuthList,
  getAuthMenu,
  saveAuth
]
