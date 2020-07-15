<template>
  <div class="app-container">
    <div class="cbox">
      <el-form
        :model="compForm"
        label-width="8.2rem"
        ref="compForm"
        size="mini"
        :rules="compFormRules"
      >
        <el-row>
          <el-col :span="4">
            <el-form-item label="国家代码" prop="compAccount">
              <el-input
                clearable
                maxlength="2"
                placeholder="请输入英文字母"
                @keyup.native="checkCode"
                @change="uppercase('compAccount')"
                v-model.trim="compForm.compAccount"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="国家中文名" prop="compName">
              <el-input
                clearable
                maxlength="64"
                placeholder="请输入中文"
                @keyup.native="checkCode01"
                v-model.trim="compForm.compName"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="国家英文名" prop="compEngish">
              <el-input
                clearable
                maxlength="256"
                placeholder="请输入英文字母"
                @keyup.native="checkCode02"
                v-model="compForm.compEngish"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="2rem">
              <el-button type="primary" @click="search()">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row :gutter="10" class="btn-area">
      <el-col :span="24">
        <!-- <div v-for="(item,index) in grandson" :key='index'>
          <el-button v-if="item.MDL_CODE === 'add'" size="mini" type="primary" plain @click="add">新增国家</el-button>
          <el-button v-if="item.MDL_CODE === 'edit'" size="mini" type="primary" plain @click="edit">编辑国家</el-button>
          <el-button v-if="item.MDL_CODE === 'delete'" size="mini" type="primary" plain @click="del">删除国家</el-button>
        </div>-->
        <el-button size="mini" type="primary" plain @click="add"
          >新增国家</el-button
        >
        <el-button size="mini" type="primary" plain @click="edit"
          >编辑国家</el-button
        >
        <el-button size="mini" type="primary" plain @click="del"
          >删除国家</el-button
        >
      </el-col>
    </el-row>
    <div class="table">
      <div class="inner" ref="inner">
        <el-table
          :data="compList"
          :highlight-current-row="true"
          @row-click="getCurrentRow"
          @row-dblclick="storageDetail()"
          border
          :header-cell-style="{
            textAlign: 'center'
          }"
          :height="maxHeight"
        >
          <el-table-column
            align="center"
            label="序号"
            type="index"
            :index="indexMethod"
            show-overflow-tooltip
            width="60"
          ></el-table-column>
          <el-table-column
            align="left"
            label="国家代码"
            prop="CTY_CD"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="left"
            label="国家中文名"
            prop="CTY_CNAME"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="left"
            label="国家英文名"
            prop="CTY_ENAME"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="left"
            label="是否有效"
            prop="CTY_ISVALID"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.CTY_ISVALID == 'Y'">有效</span>
              <span v-if="scope.row.CTY_ISVALID == 'N'">无效</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="创建人"
            prop="CREATOR"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="center"
            label="创建时间"
            prop="CREATED"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="left"
            label="修改人"
            prop="LASTMODIFIER"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="center"
            label="修改时间"
            prop="LASTMODIFIED"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="left"
            label="备注"
            prop="REMARK"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <el-pagination
      class="pagination"
      small
      background
      ref="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="Pagination.currentPage"
      :page-sizes="Pagination.pageSizeList"
      :page-size="Pagination.pageSize"
      :layout="Pagination.layout"
      :total="Pagination.total"
    ></el-pagination>

    <el-dialog
      v-el-drag-dialog
      ref="dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="showDialog"
      v-if="showDialog"
      :title="operate"
      :before-close="handleClose">
      <el-form
        :model="dialogForm"
        ref="dialogForm"
        label-width="10rem"
        size="mini"
        :rules="dialogFormRules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="国家代码"
              :prop="messageDisabled == false ? 'CTY_CD' : ''"
            >
              <el-input
                minlength="2"
                placeholder="请输入英文字母"
                @change="uppercase01('CTY_CD')"
                maxlength="2"
                v-model.trim="dialogForm.CTY_CD"
                :disabled="accountDisabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="国家中文名"
              :prop="messageDisabled == false ? 'CTY_CNAME' : ''"
            >
              <el-input
                maxlength="64"
                :disabled="messageDisabled"
                placeholder="请输入中文"
                v-model.trim="dialogForm.CTY_CNAME"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="国家英文名"
              :prop="messageDisabled == false ? 'CTY_ENAME' : ''"
            >
              <el-input
                maxlength="256"
                :disabled="messageDisabled"
                placeholder="请输入英文字母"
                v-model="dialogForm.CTY_ENAME"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="是否有效"
              :disabled="messageDisabled"
              :prop="messageDisabled == false ? 'CTY_ISVALID' : ''"
            >
              <el-radio-group
                :disabled="messageDisabled"
                v-model="dialogForm.CTY_ISVALID"
              >
                <el-radio label="Y">是</el-radio>
                <el-radio label="N">否</el-radio>
              </el-radio-group>
              <!-- <el-select v-model.trim="dialogForm.CTY_ISVALID">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :title="item.label" :value="item.value">
                            </el-option>
              </el-select>-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="REMARK">
              <el-input
                maxlength="128"
                :disabled="messageDisabled"
                type="textarea"
                :autosize="{ minRows: 3 }"
                v-model="dialogForm.REMARK"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="close('dialogForm')">关闭</el-button>
        <el-button
          size="mini"
          v-if="messageDisabled == false"
          @click="save"
          type="primary"
          >保存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCountryList,
  addCountry,
  editCountry,
  delCountry
} from '@/request/api'

import resizeMixin from '@/mixins/resize'
import paginationMixin from '@/mixins/pagination'
export default {
  name: 'router.countryAdm',
  mixins: [resizeMixin, paginationMixin],
  data() {
    var linkPersonvalidator = (rule, value, callback) => {
      var reg = /^[A-Za-z ]+$/
      if (value === '') {
        callback(new Error('国家英文名不能为空'))
      } else if (!reg.test(value)) {
        callback(new Error('只能输入英文字母'))
      } else {
        callback()
      }
    }
    var fltCodevalidator = (rule, value, callback) => {
      var reg = /^[A-Z]+$/
      if (value === '') {
        callback(new Error('国家代码不能为空'))
      } else if (!reg.test(value)) {
        callback(new Error('只能输入英文字母'))
      } else {
        callback()
      }
    }
    var fltCodevalidator2 = (rule, value, callback) => {
      var reg = /^[0-9a-zA-Z]+$/
      if (value === '') {
        callback()
      } else if (!reg.test(value)) {
        callback(new Error('只能输入字母'))
      } else {
        callback()
      }
    }
    return {
      // grandson:[],
      dialogFormStatus: '', //dialog 中 form 的状态 add/edit
      options: [
        {
          value: 'Y',
          label: '激活'
        },
        {
          value: 'N',
          label: '未激活'
        }
      ],
      accountDisabled: true,
      messageDisabled: true,
      currentData: {},
      showDialog: false,
      maxHeight: -1,
      operate: '',
      compForm: {
        compAccount: '',
        compName: '',
        compEngish: ''
      },
      compFormRules: {
        compAccount: [
          {
            validator: fltCodevalidator2,
            trigger: 'blur'
          }
        ],
        compName: [
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: '只能输入中文',
            trigger: 'change'
          }
        ],
        compEngish: [
          {
            pattern: /^[a-zA-Z ]+$/,
            message: '只能输入英文字母',
            trigger: 'change'
          }
        ]
      },
      dialogForm: {
        CTY_CD: '',
        CTY_CNAME: '',
        CTY_ISVALID: 'Y',
        CTY_ENAME: '',
        FLT_LINKPHONE: '',
        FLT_REGADDRESS: '',
        REMARK: ''
      },
      dialogFormRules: {
        CTY_CD: [
          {
            required: true,
            validator: fltCodevalidator,
            trigger: 'blur'
          }
        ],
        CTY_CNAME: [
          {
            required: true,
            message: '国家中文名不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: '只能输入中文',
            trigger: 'blur'
          }
        ],
        CTY_ENAME: [
          {
            required: true,
            validator: linkPersonvalidator,
            trigger: 'blur'
          }
        ],
        CTY_ISVALID: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        REMARK: [
          {
            required: false,
            trigger: 'blur'
          }
        ]
      },
      compList: []
    }
  },
  computed: {
    grandson() {
      var dataList = []
      var number
      var arr = this.$route.path.split('/')
      number = arr.length - 1
      dataList = this.$store.state.user.permList
      for (var i = 0; i < dataList.length; i++) {
        for (var f = 0; f < dataList[i].Children.length; f++) {
          if (dataList[i].Children[f].MDL_CODE == arr[number]) {
            return dataList[i].Children[f].Grandson
          }
        }
      }
      return []
    }
  },
  mounted() {
    this.refreshList()
  },
  created() {
    this.resize = () => {
      this.maxHeight = this.$refs.inner.offsetHeight
    }
  },
  methods: {
    checkCode() {
      this.compForm.compAccount = this.compForm.compAccount.replace(
        /[^a-zA-Z]/g,
        ''
      )
    },
    uppercase(key) {
      this.compForm[key] = this.compForm[key].toUpperCase()
    },
    uppercase01(key) {
      this.dialogForm[key] = this.dialogForm[key].toUpperCase()
    },
    checkCode01() {
      this.compForm.compName = this.compForm.compName.replace(
        /[^\u4e00-\u9fa5]/g,
        ''
      )
    },
    checkCode02() {
      this.compForm.compEngish = this.compForm.compEngish.replace(
        /[^a-zA-Z ]/g,
        ''
      )
    },
    trimECode() {
      this.compForm.compEngish = this.compForm.compEngish.trim()
    },
    trimECode2() {
      this.dialogForm.CTY_ENAME = this.dialogForm.CTY_ENAME.trim()
    },

    // 获取国家列表
    search() {
      this.trimECode()
      this.checkCode01()
      this.searchList()
    },
    getList(currentPage, pageSize, updateTotal) {
      this.currentData = {}
      getCountryList({
        CTY_CD: this.compForm.compAccount,
        CTY_CNAME: this.compForm.compName,
        CTY_ENAME: this.compForm.compEngish,
        currentPage: currentPage.toString(),
        pageSize: pageSize.toString()
      }).then(response => {
        this.compList = response.data.DXNXTD
        updateTotal(Number(response.data.total.DXNXTD))
      })
    },
    add() {
      this.showDialog = true
      this.operate = '新增国家'
      this.accountDisabled = false
      this.messageDisabled = false
      this.dialogFormStatus = 'add'
      this.resetDialogForm()
    },
    edit() {
      this.dialogFormStatus = 'edit'
      if (Object.keys(this.currentData).length == 0) {
        this.$alert('请选择需要编辑的数据！', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      this.showDialog = true
      this.operate = '编辑国家'
      this.accountDisabled = true
      this.messageDisabled = false
      this.dialogForm = Object.assign({}, this.currentData)
    },
    del() {
      if (Object.keys(this.currentData).length == 0) {
        this.$alert('请选择需要删除的数据', '提示', {
          confirmButtonText: '确定'
        })
        return
      }

      this.$confirm('您确认要删除此数据吗?', '提示', {
        closeOnClickModal: false
      })
        .then(() => {
          delCountry(this.currentData).then(() => {
            this.$message.success({
              message: '删除成功！',
              showClose: true
            })
            this.refreshList()
          })
        })
        .catch(() => {})
    },
    save() {
      this.trimECode2()
      if (this.dialogFormStatus === 'add') {
        this.commitAdd('dialogForm')
      } else if (this.dialogFormStatus === 'edit') {
        this.commitEdit('dialogForm')
      }
    },
    commitAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addCountry(this.dialogForm).then(() => {
            this.$message.success({
              message: '新增数据成功！',
              showClose: true
            })
            this.showDialog = false
            this.refreshList()
          })
        }
      })
    },
    commitEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          editCountry(this.dialogForm).then(() => {
            this.$message.success({
              message: '编辑数据成功！',
              showClose: true
            })
            this.showDialog = false
            this.refreshList()
          })
        }
      })
    },
    close(formName) {
      this.$refs[formName].resetFields()
      this.showDialog = false
    },
    resetDialogForm() {
      return (this.dialogForm = {
        CTY_CD: '',
        CTY_CNAME: '',
        CTY_ENAME: '',
        CTY_ISVALID: 'Y',
        REMARK: ''
      })
    },
    // 获取当前选中行
    getCurrentRow(row) {
      this.currentData = row
    },
    storageDetail() {
      this.showDialog = true
      this.operate = '查看国家'
      this.accountDisabled = true
      this.messageDisabled = true
      this.dialogForm = Object.assign({}, this.currentData)
    },
    handleClose(done) {
      if (this.$refs.dialogForm) {
        this.$refs.dialogForm.resetFields()
        done()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}

.app-container {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  .table {
    flex: 1;
    position: relative;
    overflow: hidden;

    .inner {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .el-pagination {
      height: 4rem;
      flex: 0 0 auto;
      margin: 1rem 0;
    }
  }
}
</style>
