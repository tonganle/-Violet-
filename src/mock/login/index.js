
import Mock from 'mockjs'
import store from '@/store'
const Random = Mock.Random
var checkLists = [
]

for (let i = 0; i < 1; i++) {
  let checkListChild = {
    FLT_NAME: Random.cname(),
    FLT_UUID: Random.string('number', 11),
    SessionId: '',
    USERNAME: Random.cword(5),
    USR_CODE: Random.word(5),
    USR_RLES: Random.string('number', 11),
    UserId: Random.string('number', 11),
  }
  checkLists.push(checkListChild)
}

let login = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/login',
  method: 'post',
  response: {

    data: checkLists[0],
    msg: '成功',
    success: '1'
  }
}
let uploadImg = {
  BaseUrl: 'BaseUrl',
  url: '/DXNXTD/upload?SessionId=' + store.state.user.SessionId_DX_H,
  // url: '/DXNXTD/upload',
  method: 'post',
  response: {
    data: [],
    msg: '成功',
    success: '1'
  }
}

export default [
  login,
  uploadImg
]
