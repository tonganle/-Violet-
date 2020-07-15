<template>
  <div class="popup">
    <el-form
      label-position="left"
      :model="addUserForm"
      ref="addUserForm"
      :rules="addUserRules"
      label-width="100px"
    >
      <el-form-item prop="userCode" label="用户代码">
        <el-input v-model="addUserForm.userCode"></el-input>
      </el-form-item>
      <el-form-item prop="userName" label="用户名称">
        <el-input v-model="addUserForm.userName"></el-input>
      </el-form-item>
      <el-form-item prop="userRole" label="所属角色">
        <el-input v-model="addUserForm.userRole"></el-input>
      </el-form-item>
      <el-form-item prop="contactTel" label="联系电话">
        <el-input v-model="addUserForm.contactTel"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="addUserForm.email"></el-input>
      </el-form-item>
      <el-form-item prop="statusIsValid" label="有效状态">
        <el-switch v-model="addUserForm.statusIsValid"></el-switch>
      </el-form-item>
    </el-form>
    <div class="dialog-footer-container">
      <el-button type="primary" @click="confirm">确认</el-button>
      <el-button @click="$emit('changeDialogVisible', false)">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userData: {
      default: {
        userCode: '',
        userName: '',
        userRole: '',
        contactTel: '',
        email: '',
        statusIsValid: ''
      }
    }
  },
  data() {
    return {
      addUserForm: this.userData,
      addUserRules: {
        userCode: [
          { required: true, message: '请填写用户代码', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请填写用户名称', trigger: 'blur' }
        ],
        userRole: [
          { required: true, message: '请填写所属角色', trigger: 'blur' }
        ],
        contactTel: [
          { required: true, message: '请填写联系电话', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请填写邮箱', trigger: 'blur' }],
        statusIsValid: [
          { required: true, message: '请填写有效状态', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer-container {
  overflow: hidden;
  .popup {
    margin-left: 5rem;
  }
  .el-button {
    float: right;
    margin-right: 2rem;
    &:first-child {
      margin-right: 0;
    }
  }
}
</style>
