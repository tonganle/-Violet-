
import Mock from 'mockjs'
const Random = Mock.Random
import store from '@/store'
import '@/mock/mockRandom'

var checkLists = [{
  MDL_CODE: 'dataBase',
  MDL_NAME: '基础数据',
  MDL_PARENT: null,
  UUID: Random.string('number', 11),
  Children: []

}
]
var checkLists2 = [{
  MDL_CODE: 'provinceCity',
  MDL_ICONCLS: null,
  MDL_ISP: 'Y',
  MDL_NAME: '省市管理',
  MDL_SEQ: 5,
  MDL_TYPE: 'M',
  MDL_URL: '/dataBase/provinceCity',
  MDL_VALID:  Random.ISYN(),
  UUID: '09a21f566acb49c0a479ffc79236a325',
  Children: []

}
]
for (let i = 0; i < 10; i++) {
  let checkListChild =
  {
    MDL_CODE: Random.word(2, 5),
    MDL_NAME: Random.cword(2, 5),
    MDL_PARENT: 'dataBase',
    UUID: Random.string('number', 11),
  }
  checkLists[0].Children.push(checkListChild)
  let checkListChild2 =
  {
    MDL_CODE: Random.word(2, 5),
    MDL_NAME: Random.cword(2, 5),
    MDL_SEQ: 1,
    MDL_TYPE: 'B',
    MDL_VALID: Random.ISYN(),
    UUID: Random.string('number', 11),
    VERSION: Random.string('number', 1, 2),
  }
  checkLists2[0].Children.push(checkListChild2)
}

let checkSysList = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=listChild&actKey=SysModule&Section=lista&SessionId=' +
    store.state.user.SessionId_DX_H,
  method: 'post',
  response: {
    data: {
      DXNXTD: checkLists,
      total: { DXNXTD: checkLists.length }
    },
    msg: '成功',
    success: '1'

  }
}
let checkInfoList = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/ControlPath?act=list&actKey=SysModule&Section=listb&SessionId=' +
    store.state.user.SessionId_DX_H,
  method: 'post',
  response: {
    data: {
      DXNXTD: checkLists,
      total: { DXNXTD: checkLists.length }
    },
    msg: '成功',
    success: '1'

  }
}

export default [
  checkSysList,
  checkInfoList

]