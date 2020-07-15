<template>
  <div class="login">
    <div class="loginTop">
      <div class="login_top_center">
        <img src="@/assets/images/login/NXTD.png" alt />
      </div>
    </div>
    <div class="user-border">
      <div class="user-login">
        <div class="user-loginBg">
          <img src="@/assets/images/login/loginBg.png" alt />
        </div>
        <div class="user-loginForm">
          <div class="user-loginCenter">
            <el-form
              @keyup.enter.native="login"
              class="loginForm"
              :model="loginForm"
              :rules="loginRules"
              ref="loginForm"
            >
              <el-form-item prop="username">
                <el-input
                  type="text"
                  placeholder="用户账号"
                  v-model="loginForm.username"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  placeholder="密码"
                  v-model="loginForm.password"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox
                  v-model="checked"
                  style="margin-right:10px"
                ></el-checkbox
                >记住密码
              </el-form-item>
              <!-- <el-form-item prop="companyCode">
                <el-input type="text" placeholder="企业代码" v-model="loginForm.companyCode" clearable></el-input>
              </el-form-item>-->
              <el-form-item class="userLogin-btn">
                <el-button size="small" type="primary" @click="login">{{
                  $t('message.login')
                }}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { encrypt, decrypt } from '@/utils/crypto'
// import { login } from '@/request/system/administrators'
import { setCookie, getCookie } from '@/utils/utils'
export default {
  data() {
    return {
      loginForm: {
        username: 'tadmin',
        password: '123456',
        companyCode: 'TEST'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        companyCode: [
          { required: true, message: '请输入企业代码', trigger: 'blur' }
        ]
      },
      md5Pwd: '',
      checked: false
    }
  },

  // 页面加载调用获取cookie值
  mounted() {
    this.$nextTick(() => {
      if (getCookie('UPWD_DX_H') && getCookie('UNAME_DX_H')) {
        this.checked = true
        this.loginForm.username = getCookie('UNAME_DX_H')
        this.loginForm.password = decrypt(
          getCookie('UPWD_DX_H'),
          'qsczsewaxd123456'
        )
      }
    })
  },
  methods: {
    login() {
      // this.$router.replace({
      //   path: '/layout'
      // })
      // this.setCookie()

      // return
      let _this = this
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.$store.dispatch('user/logIn', this.loginForm).then(() => {
            // _this.setCookie()
            if (_this.checked) {
              _this.setCookie('Y')
            } else {
              _this.setCookie('N')
            }
            _this.$router.replace({
              path: '/layout'
            })
          })
          // .catch(err => {
          //   _this.$message({
          //     showClose: true,
          //     message: err.message,
          //     type: "error"
          //   });
          // this.$message({message: '登录失败！', type: 'error'})
          // });
        }
      })
    },
    setCookie(data) {
      // var encryptPwd = AES.encrypt(this.loginForm.password, 'qwertyuiopasdfgh')
      // if (this.checked == true) {
      //   this.setCookie('EGHUSERNAME', this.loginForm.username, 7)
      //   // this.setCookie('EGHPASSWORD', encryptPwd, 7)
      // } else {
      //   this.setCookie('EGHUSERNAME', '', -1)
      //   this.setCookie('EGHPASSWORD', '', -1)
      // }
      if (data === 'Y') {
        setCookie('UNAME_DX_H', this.loginForm.username)
        setCookie(
          'UPWD_DX_H',
          encrypt(this.loginForm.password, 'qsczsewaxd123456')
        )
      } else {
        setCookie('UNAME_DX_H', '')
        setCookie('UPWD_DX_H', '')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '../../assets/css/common.scss';
.login {
  width: 100%;
  height: 100%;
  min-height: 500px;
  position: relative;
}
.user-login {
  // height: calc(100vh - 100px);
  // position: relative;
  width: 76%;
  height: 100%;
  margin: 0 auto;
  font-size: 0;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  justify-content: center;
  .user-loginBg {
    height: 100%;
    border-top: 1px solid #0066a6;
    border-bottom: 1px solid #0066a6;
    border-left: 1px solid #0066a6;
    border-radius: 10px 0 0 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.user-border {
  position: absolute;
  bottom: 8rem;
  top: 110px;
  right: 0;
  left: 0;
}
.loginTop {
  width: 100%;
  background-color: #fff;
  .login_top_center {
    width: 70%;
    margin: 0 auto;
    height: 100px;
    line-height: 100px;
    padding: 20px 0;
    img {
      width: auto;
      max-width: 100%;
      height: auto;
      max-height: 100%;
    }
  }
}
.loginForm {
  margin-top: 2rem;
  .el-form-item {
    margin-bottom: 20px !important;
    // border-bottom:1px solid 1px solid #0066A6;
  }
  .el-input {
    border: none;
  }
}

.user-loginForm {
  // width: 350px;
  // background: rgba(0, 0, 0, 0.5);
  // border-radius: 5px;
  // position: absolute;
  // right: 10%;
  // top: 10%;
  // overflow: hidden;
  height: 100%;
  min-width: 500px;
  float: right;
  display: flex;
  align-items: center;
  border-top: 1px solid #0066a6;
  border-bottom: 1px solid #0066a6;
  border-right: 1px solid #0066a6;
  border-radius: 0 10px 10px 0;
  .user-loginCenter {
    // margin: 40px;
    width: 70%;
    margin: 0 auto;
  }
}

.loginForm-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
  text-align: center;
  span {
    border-bottom: 1px solid #ccc;
  }
}
.user-login .creatAccount {
  color: #ccc;
  font-size: 1.4rem;
  text-align: right;
  margin: 10px 0;
  a {
    color: #0081cf;
  }
}
.user-login .status {
  font-size: 1.4rem;
  color: #ccc;
  margin-bottom: 10px;
  overflow: hidden;
  .autoLogin {
    float: left;
  }
  .forgotPwd {
    float: right;
    a {
      color: #0081cf;
    }
  }
}
.user-login .userLogin-btn {
  margin-top: 10px;
  .el-button {
    width: 100%;
    background: #175993;
    //   color: #fff;
    //   text-align: center;
    //   outline: none;
    //   border: 0 none;
  }
}
</style>
