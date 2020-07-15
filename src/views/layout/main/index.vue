<template>
  <div class="main">
    <main-left class="main-left"></main-left>
    <main-right class="main-right"></main-right>
        <el-dialog
      title
      :visible.sync="changePwdDialogVisible"
      :before-close="passwordHandleClose"
      width="40%"
    >
      <change-password></change-password>
    </el-dialog>
    <el-dialog title :visible.sync="loginDialogVisible" :before-close="handleClose" width="60%" v-if="!loginDialogVisible">
      <process-login></process-login>
    </el-dialog>

  </div>
</template>

<script>
import mainLeft from '@/views/layout/main/main-left'
import mainRight from '@/views/layout/main/main-right'
import processLogin from '@/views/basicViews/login/login-innerSYS'
import changePassword from '@/views/basicViews/change-password'
import { getCookie } from '@/utils/utils'
export default {
  computed: {
    loginDialogVisible() {
      return this.$store.state.app.processLogin
    },
    changePwdDialogVisible() {
      return this.$store.state.user.passwordPageStatus
    },
    isloading() {
      return this.$store.state.app.isLoading
    }
  },
  data() {
    return {
      loading: '',
    }
  },
  watch: {
    isloading(data) {
      if (data) {
        this.openLoading()
      } else {
        this.closeLoading()
      }
    }
  },
  components: {
    mainLeft,
    mainRight,
    processLogin,
    changePassword
  },
  methods: {
    handleClose(done) {
      if (getCookie('UserId_DX_H')) {
        this.$store.dispatch('app/process_login_status', false)
      } else {
        this.$router.push('/login')
      }
      done()
    },
    passwordHandleClose(done) {
      console.log('1', this.loginDialogVisible)

      console.log('sssssssssssssss', this.$store.state.app.processLogin)
      done()
      this.$store.dispatch('user/setPasswordPageStatus', false)
      // this.$store.commit('user/SET_PASSWORD_PAGE_STATUS', false)
    },
    openLoading() {
      this.loading = this.$loading({
        background: 'rgba(255, 255, 255, 0)'
      })
    },
    closeLoading() {
      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        this.loading.close()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  display: flex;
}
.main-left {
  flex: 0 0 auto;
  height: 100%;
  background-color: #545c64;
}
.main-right {
  flex: 1;
  height: 100%;
  overflow: hidden;
  background-color: #f9f9f9;
}
</style>
