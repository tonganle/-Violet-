<template>
  <div>
    <el-form
      :model="passwordForm"
      :rules="passwordRules"
      ref="passwordForm"
      class="passwordForm"
      label-position="left"
      label-width="110px"
    >
      <el-form-item prop="username" label="用户名">
        <el-input v-model="passwordForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="原密码">
        <el-input
          v-model="passwordForm.password"
          auto-complete="new-password"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="newPassword" label="新密码">
        <el-input
          v-model="passwordForm.newPassword"
          auto-complete="new-password"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="confirmNewPassword" label="确认新密码">
        <el-input
          v-model="passwordForm.confirmNewPassword"
          auto-complete="new-password"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="companyCode" label="企业代码">
        <el-input v-model="passwordForm.companyCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="confirmChange('passwordForm')">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    // 判断两次新密码一致
    var confirmNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      passwordForm: {
        username: '',
        password: '',
        newPassword: '',
        confirmNewPassword: '',
        companyCode: ''
      },
      passwordRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmNewPassword: [
          { required: true, trigger: 'blur', validator: confirmNewPassword }
        ],
        companyCode: [
          { required: true, message: '请输入企业代码', trigger: 'blur' }
        ]
      },
      md5Pwd: ''
    }
  },
  methods: {
    confirmChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch('user/changePassword', this[formName])
            .then(response => {
              // if (response.data.code == 1) {
              this.$message.success({ message: response.data.msg })
              this.$store.dispatch('user/setPasswordPageStatus', false)
              // this.$store.commit('user/SET_PASSWORD_PAGE_STATUS', false)
              // } else {
              //   this.$message.error({message: response.data.msg})
              //   return false
              // }
            })
          // .catch((err) => {
          //   this.$message.error({message: '修改密码失败！'})
          // })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.passwordForm {
  width: 55%;
  margin: 0 auto;
}
</style>
