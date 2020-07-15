import router from './index'
import store from '@/store'
import {getCookie} from '@/utils/utils'

router.beforeEach((to, from, next) => {

  let UserId = getCookie('UserId_DX_H')
  if (UserId) {
    if (to.path === '/login') {
      return next()
    } else {
      store.dispatch('app/process_login_status', false).then(() => {
        next()
      })
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      store.dispatch('app/process_login_status', true).then(() => {
        next()
      })
    }
  }
})
