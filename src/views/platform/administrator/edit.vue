<template>
  <el-form ref="fltForm" label-width="110px" :model="ADMIN_INFO" size="mini">
    <el-row>
      <el-col :span="24">
        <el-form-item label="用户代码:" prop="USR_CODE" :rules="rules.USR_CODE">
          <el-input
            maxlength="8"
            :disabled="isEditMode"
            v-model="ADMIN_INFO.USR_CODE"
            placeholder="请输入英文字母"
            @change="uppercase('USR_CODE')"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="用户名称:" prop="USR_NAME" :rules="rules.USR_NAME">
          <el-input
            maxlength="32"
            auto-complete="new-password"
            v-model="ADMIN_INFO.USR_NAME"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item
          label="用户密码:"
          prop="USR_PASSWORD"
          :rules="rules.USR_PASSWORD"
        >
          <el-input
            maxlength="16"
            auto-complete="new-password"
            type="password"
            v-model="ADMIN_INFO.USR_PASSWORD"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="所属角色:" prop="USR_RLES" :rules="rules.USR_RLES">
          <el-select
            filterable
            v-model="ADMIN_INFO.USR_RLES"
            @change="getCompany"
          >
            <el-option
              v-for="item in adminStatusList"
              :key="item.UUID"
              :label="item.RLE_NAME"
              :title="item.RLE_NAME"
              :value="item.UUID"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :span="24" v-if="isCompanyInfo">
      <el-col>
        <el-form-item
          label="所属公司:"
          clearable
          prop="USR_COMPANY_UUID"
          ref="againValue"
          :rules="rules.USR_COMPANY_UUID"
        >
          <el-select filterable v-model="ADMIN_INFO.USR_COMPANY_UUID">
            <el-option
              v-for="item in companyList"
              :key="item.UUID"
              :label="item.CLT_NAME"
              :title="item.CLT_NAME"
              :value="item.UUID"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="isCompanyInfos">
      <el-col :span="24">
        <el-form-item
          label="所属公司:"
          clearable
          prop="USR_COMPANY_UUID"
          ref="againValue"
          :rules="rules.USR_COMPANY_UUID"
        >
          <el-select filterable v-model="ADMIN_INFO.USR_COMPANY_UUID">
            <el-option
              v-for="item in companyList"
              :key="item.UUID"
              :label="item.SUR_NAME"
              :title="item.SUR_NAME"
              :value="item.UUID"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item
          label="联系电话:"
          prop="USR_CELLPHONE"
          :rules="rules.USR_CELLPHONE"
        >
          <el-input
            maxlength="11"
            v-model="ADMIN_INFO.USR_CELLPHONE"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="邮箱:" prop="USR_EMAIL" :rules="rules.USR_EMAIL">
          <el-input maxlength="32" v-model="ADMIN_INFO.USR_EMAIL"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="有效状态:">
          <el-select v-model="ADMIN_INFO.USR_STATUS">
            <el-option value="Y" label="可用" title="可用"></el-option>
            <el-option value="N" label="不可用" title="不可用"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="备注:" prop="REMARK">
          <el-input
            maxlength="128"
            type="textarea"
            :autosize="{ minRows: 3 }"
            v-model="ADMIN_INFO.REMARK"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item class="el-dialog__footer">
      <el-button @click="close">关闭</el-button>
      <el-button @click="save" type="primary">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { setMd5 } from '@/utils/utils'
import { getSupplierInfo, getClientInfo } from '@/request/api'
export default {
  name: 'editform',
  props: {
    admin_info: {
      type: Object,
      required: true
    },
    isEditMode: {
      required: true,
      type: Boolean
    },
    adminStatusList: {
      required: true,
      type: Array
    },
    adminEnterpriseList: {
      required: true,
      type: Array
    },
    rolePwd: {
      required: true,
      type: String
    },
    showDialog: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      ADMIN_INFO: this.admin_info,
      isCompanyInfo: false,
      isCompanyInfos: false,
      companyList: []
    }
  },
  watch: {
    adminStatusList: n => {
      this.adminStatusList = JSON.parse(JSON.stringify(n))
    },

    admin_info() {
      this.ADMIN_INFO = this.admin_info
    },
    showDialog(value) {
      if (value == false) {
        this.$refs.fltForm.resetFields()
      } else {
        if (this.$refs['fltForm']) {
          this.$refs['fltForm'].resetFields()
        }
        this.getCompanys()
        this.getChanges()
        this.getChange()
      }
    }
  },
  computed: {
    rules() {
      return {
        nowRoleType: '',
        USR_CODE: [
          { required: true, message: '请输入用户代码', trigger: 'blur' },
          { min: 1, max: 8, message: '输入至多8个字符', trigger: 'blur' },
          { pattern: /^[a-zA-Z]+$/, message: '请输入英文字母', trigger: 'blur' }
        ],
        USR_NAME: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 1, max: 32, message: '至多输入32个字符', trigger: 'blur' }
        ],
        USR_PASSWORD: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 1, max: 16, message: '至多输入16个字符', trigger: 'blur' }
        ],
        USR_RLES: [
          {
            required: true,
            message: '请选择所属角色名称',
            trigger: 'change'
          }
        ],
        USR_CELLPHONE: [
          // {required: true, message: '请输入联系电话', trigger: 'blur'},
          {
            pattern: /(\d)+$/,
            message: '请输入正确的手机号！',
            trigger: 'blur'
          },
          { min: 1, max: 11, message: '至多输入11个字符', trigger: 'blur' }
        ],
        USR_EMAIL: [
          // {required: true, message: '请输入邮箱', trigger: 'blur'},
          { min: 1, max: 32, message: '至多输入32个字符', trigger: 'blur' },
          {
            pattern: /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$/,
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ],
        USR_STATUS: [
          { required: true, message: '请选择用户状态', trigger: 'change' }
        ],

        REMARK: [
          { min: 1, max: 128, message: '至多输入128个字符', trigger: 'blur' }
        ],
        USR_COMPANY_UUID: [
          { required: true, message: '请选择所属公司', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    new Promise(resolve => {
      resolve('')
    })
      .then(() => {
        this.getCompanys()
      })
      .then(() => {
        this.getChanges()
      })
      .then(() => {
        this.$refs.fltForm.clearValidate()
      })
  },

  methods: {
    getChanges() {
      var lists = []

      for (let i of this.adminStatusList) {
        lists.push(i.UUID)
      }
      console.log('sadasdsa', this.adminStatusList)
      if (lists.indexOf(this.ADMIN_INFO.USR_RLES) === -1) {
        this.$set(this.ADMIN_INFO, 'USR_RLES', '')
      }
    },
    getChange() {
      var lists = []
      for (let i of this.companyList) {
        lists.push(i.UUID)
      }
      if (lists.indexOf(this.ADMIN_INFO.USR_COMPANY_UUID) === -1) {
        this.$set(this.ADMIN_INFO, 'USR_COMPANY_UUID', '')
      }
    },
    uppercase(key) {
      if (!this.ADMIN_INFO[key]) return
      this.ADMIN_INFO[key] = this.ADMIN_INFO[key].toUpperCase()
    },
    close() {
      // 关闭时清除验证信息
      this.$refs.fltForm.resetFields()
      this.$emit('close')
    },
    getCompany() {
      this.isCompanyInfo = false
      this.isCompanyInfos = false
      if (this.ADMIN_INFO.USR_COMPANY_UUID) {
        this.ADMIN_INFO.USR_COMPANY_UUID = ''
      }
      if (this.ADMIN_INFO.USR_RLES) {
        for (let i of this.adminStatusList) {
          if (i.UUID === this.ADMIN_INFO.USR_RLES) {
            this.nowRoleType = i.RLE_TYPE
            if (this.nowRoleType === 'KH') {
              this.getKH()
            } else if (this.nowRoleType === 'GYS') {
              this.getGYS()
            } else {
              this.isCompanyInfo = false
              this.isCompanyInfos = false
            }
            break
          }
        }
      } else {
        this.isCompanyInfo = false
        this.isCompanyInfos = false
      }
    },
    getCompanys() {
      if (this.ADMIN_INFO.USR_RLES) {
        if (this.ADMIN_INFO.USR_RLE_TYPE === 'KH') {
          getClientInfo({}).then(response => {
            this.companyList = response.data.DXNXTD
            this.isCompanyInfo = true
            this.isCompanyInfos = false
          })
        } else if (this.ADMIN_INFO.USR_RLE_TYPE === 'GYS') {
          getSupplierInfo({}).then(response => {
            this.companyList = response.data.DXNXTD
            this.isCompanyInfos = true
            this.isCompanyInfo = false
            this.getChange()
          })
        } else {
          this.isCompanyInfo = false
          this.isCompanyInfos = false
        }
      } else {
        this.isCompanyInfo = false
        this.isCompanyInfos = false
      }
    },
    getKH() {
      getClientInfo({}).then(response => {
        this.companyList = response.data.DXNXTD
        this.isCompanyInfo = true
        this.isCompanyInfos = false
      })
    },
    getGYS() {
      getSupplierInfo({}).then(response => {
        this.companyList = response.data.DXNXTD
        this.isCompanyInfos = true
        this.isCompanyInfo = false
        return
      })
    },
    save() {
      this.$refs['fltForm'].validate(valid => {
        if (valid) {
          if (this.rolePwd !== this.ADMIN_INFO.USR_PASSWORD) {
            this.$set(
              this.ADMIN_INFO,
              'USR_PASSWORD',
              setMd5(this.ADMIN_INFO['USR_PASSWORD'])
            )
          } else {
            this.$set(this.ADMIN_INFO, 'USR_PASSWORD', this.rolePwd)
          }
          if (this.isCompanyInfo) {
            this.$emit('save', this.ADMIN_INFO)
          } else if (this.isCompanyInfos) {
            this.$emit('save', this.ADMIN_INFO)
          } else {
            this.ADMIN_INFO[
              'USR_COMPANY_UUID'
            ] = this.$store.state.user.FLT_UUID_DX_H
            this.$emit('save', this.ADMIN_INFO)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
