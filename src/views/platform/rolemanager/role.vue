<template>
  <el-form ref="fltForm" label-width="100px" :model="FLT_INFO" size="mini">
    <el-row>
      <el-col :span="24">
        <el-form-item label="角色代码" prop="RLE_CODE" :rules="rules.RLE_CODE">
          <el-input
            maxlength="8"
            :disabled="isEditMode"
            style="width: 100%"
            v-model="FLT_INFO.RLE_CODE"
            placeholder="请输入英文字母"
            @change="uppercase('RLE_CODE')"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="角色名称" prop="RLE_NAME" :rules="rules.RLE_NAME">
          <el-input
            maxlength="32"
            style="width: 100%"
            v-model="FLT_INFO.RLE_NAME"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="角色类型" prop="RLE_TYPE" :rules="rules.RLE_TYPE">
          <el-select style="width: 100%" v-model="FLT_INFO.RLE_TYPE">
            <el-option
              v-for="(item, index) in roleStatusList"
              :value="item.UUID"
              :key="index"
              :label="item.RV_NAME"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="备注" prop="REMARK" :rules="rules.REMARK">
          <el-input
            maxlength="128"
            style="width: 100%"
            v-model="FLT_INFO.REMARK"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="el-dialog__footer">
      <el-col :span="24">
        <el-form-item>
          <el-button @click="close">关闭</el-button>
          <el-button @click="save" type="primary">保存</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'roleform',
  props: {
    showDialog: {
      type: Boolean,
      required: false
    },
    flt_info: {
      type: Object,
      required: true
    },
    isEditMode: {
      required: true,
      type: Boolean
    },
    roleStatusList: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      FLT_INFO: this.flt_info,
      fltType: []
    }
  },
  watch: {
    flt_info() {
      this.FLT_INFO = this.flt_info
    },
    showDialog(value) {
      if (value === false) {
        this.$refs.fltForm.resetFields()
      } else {
        if (this.$refs['fltForm']) {
          this.$refs['fltForm'].resetFields()
        }
        this.getChanger()
      }
    }
  },
  computed: {
    rules() {
      return {
        RLE_CODE: [
          { required: true, message: '请输入角色代码', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z]+$/,
            message: '请输入英文字母',
            trigger: 'blur'
          },
          { min: 1, max: 8, message: '输入至多8个字符', trigger: 'blur' }
        ],
        RLE_NAME: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 32, message: '至多输入32个字符', trigger: 'blur' }
        ],
        RLE_TYPE: [
          { required: true, message: '请选择角色类型', trigger: 'change' }
        ],
        REMARK: [
          { min: 0, max: 128, message: '至多输入128个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // checkCodes() {
    //   this.FLT_INFO.RLE_CODE = this.FLT_INFO.RLE_CODE.replace(/[^a-zA-Z]/g, "");
    // },
    getChanger() {
      var lists = []
      console.log(this.roleStatusList)
      for (let i of this.roleStatusList) {
        lists.push(i.UUID)
      }
      if (lists.indexOf(this.FLT_INFO.RLE_TYPE) === -1) {
        this.$set(this.FLT_INFO, 'RLE_TYPE', '')
      }
    },
    uppercase(key) {
      if (!this.FLT_INFO[key]) return
      this.FLT_INFO[key] = this.FLT_INFO[key].toUpperCase()
    },
    close() {
      // 关闭时清楚验证信息
      this.$refs['fltForm'].resetFields()
      this.$emit('close')
    },
    save() {
      this.$refs['fltForm'].validate(valid => {
        if (valid) {
          this.$emit('save', this.FLT_INFO)
        }
      })
    }
  },
  mounted() {
    new Promise(resolve => {
      resolve('')
    })
      .then(() => {
        this.getChanger()
      })
      .then(() => {
        this.$refs.fltForm.clearValidate()
      })
  }
}
</script>

<style lang="scss" scoped></style>
