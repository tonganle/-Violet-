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
            <el-form-item label="港口代码" prop="compAccount">
              <el-input
                clearable
                maxlength="4"
                @keyup.native="checkCode"
                @change="uppercase('compAccount')"
                v-model="compForm.compAccount"
                placeholder="请输入英文字母"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="港口名称" prop="compName">
              <el-input
                clearable
                maxlength="32"
                v-model="compForm.compName"
                @keyup.native="checkCode01"
                placeholder="请输入中文"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="港口英文名" prop="compEngish">
              <el-input
                clearable
                maxlength="128"
                v-model="compForm.compEngish"
                @keyup.native="checkCode02"
                placeholder="请输入英文字母"
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
          <el-button v-if="item.MDL_CODE === 'add'" size="mini" type="primary" plain @click="add">新增</el-button>
          <el-button v-if="item.MDL_CODE === 'edit'" size="mini" type="primary" plain @click="edit">编辑</el-button>
          <el-button v-if="item.MDL_CODE === 'del'" size="mini" type="primary" plain @click="del">删除</el-button>
        </div>-->
        <el-button size="mini" type="primary" plain @click="add"
          >新增</el-button
        >
        <el-button size="mini" type="primary" plain @click="edit"
          >编辑</el-button
        >
        <el-button size="mini" type="primary" plain @click="del"
          >删除</el-button
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
            label="港口代码"
            prop="POT_CODE"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="left"
            label="港口名称"
            prop="POT_CNAME"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="left"
            label="港口英文名"
            prop="POT_ENAME"
            show-overflow-tooltip
          ></el-table-column>
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
      :current-page.sync="currentPage"
      :page-sizes="[30, 60, 90, 120]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next, jumper, total"
      :total="total"
    ></el-pagination>

    <el-dialog
      v-el-drag-dialog
      ref="dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="showDialog"
      v-if="showDialog"
      :title="operate"
      :before-close="handleClose"
    >
      <el-form
        :model="dialogForm"
        ref="dialogForm"
        label-width="10rem"
        size="mini"
        :rules="dialogFormRules"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="国家名称"
              :prop="messageDisabled == false ? 'CTY_UUID' : ''"
            >
              <el-select
                v-model="dialogForm.CTY_UUID"
                filterable
                clearable
                :disabled="messageDisabled"
              >
                <el-option
                  v-for="item in options"
                  :key="item.UUID"
                  :label="item.CTY_CNAME"
                  :value="item.UUID"
                  :title="item.CTY_CNAME"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="港口代码"
              :prop="messageDisabled == false ? 'POT_CODE' : ''"
            >
              <el-input
                placeholder="请输入英文字母"
                @change="uppercase01('POT_CODE')"
                maxlength="4"
                v-model="dialogForm.POT_CODE"
                :disabled="accountDisabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="港口名称"
              :prop="messageDisabled == false ? 'POT_CNAME' : ''"
            >
              <el-input
                maxlength="32"
                v-model="dialogForm.POT_CNAME"
                placeholder="请输入中文"
                :disabled="messageDisabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="港口英文名"
              :prop="messageDisabled == false ? 'POT_ENAME' : ''"
            >
              <el-input
                maxlength="128"
                v-model="dialogForm.POT_ENAME"
                placeholder="请输入英文字母"
                :disabled="messageDisabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="REMARK">
              <el-input
                maxlength="128"
                type="textarea"
                :autosize="{ minRows: 3 }"
                v-model="dialogForm.REMARK"
                :disabled="messageDisabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="close('dialogForm')">关闭</el-button>
        <el-button
          v-if="messageDisabled == false"
          size="mini"
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
  getPortMagList,
  addPortMag,
  editPortMag,
  delPortMag,
  listbPortMag
} from '@/request/api'
import resizeMixin from '@/mixins/resize'

export default {
  name: 'router.portManage',
  mixins: [resizeMixin],
  data() {
    var linkPersonvalidator = (rule, value, callback) => {
      var reg = /^[A-Za-z ]+$/
      if (value === '') {
        callback(new Error('港口英文名不能为空'))
      } else if (!reg.test(value)) {
        callback(new Error('只能输入字母'))
      } else {
        callback()
      }
    }
    var fltCodevalidator = (rule, value, callback) => {
      var reg = /^[A-Z]+$/
      if (value === '') {
        callback(new Error('港口代码不能为空'))
      } else if (!reg.test(value)) {
        callback(new Error('只能输入大写字母'))
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
      dialogFormStatus: '', //dialog 中 form 的状态 add/edit
      options: [],
      accountDisabled: true,
      messageDisabled: true,
      currentData: {},
      showDialog: false,
      maxHeight: -1,
      currentPage: 1,
      currentNumber: 1,
      pageSize: 30,
      total: 0,
      operate: '',
      compForm: {
        compAccount: '',
        compName: '',
        compEngish: ''
      },
      copyCompAccount: '',
      copyCompName: '',
      compFormRules: {
        compAccount: [{
          validator: fltCodevalidator2,
          trigger: 'blur'
        }],
        compName: [{
          pattern: /^[\u4e00-\u9fa5]+$/,
          message: '只能输入中文',
          trigger: 'blur'
        }],
        compEngish: [{
          pattern: /^[a-zA-Z ]+$/,
          message: '只能输入英文',
          trigger: 'blur'
        }]
      },
      dialogForm: {
        POT_CODE: '',
        POT_CNAME: '',
        CTY_UUID: '',
        POT_ENAME: '',
        FLT_LINKPHONE: '',
        FLT_REGADDRESS: '',
        REMARK: ''
      },
      dialogFormRules: {
        POT_CODE: [{
          required: true,
          validator: fltCodevalidator,
          trigger: 'blur'
        }],
        POT_CNAME: [
          {
            required: true,
            message: '港口名称不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: '只能输入中文',
            trigger: 'blur'
          }
        ],
        POT_ENAME: [{
          required: true,
          validator: linkPersonvalidator,
          trigger: 'blur'
        }],
        CTY_UUID: [{
          required: true,
          message: '国家名称不能为空',
          trigger: 'change'
        }
        ],
        REMARK: [{
          required: false,
          trigger: 'blur'
        }]
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
    this.getPortMagList()
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
      this.compForm.compName = this.compForm.compName.replace(/[^\u4e00-\u9fa5]/g, '')
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
      this.dialogForm.POT_ENAME = this.dialogForm.POT_ENAME.trim()
    },
    // 获取港口列表
    search() {
      this.trimECode()
      this.currentPage = 1
      this.$refs.pagination.lastEmittedPage = 1
      this.copyCompAccount = this.compForm.compAccount
      this.copyCompName = this.compForm.compName
      this.getPortMagList()
    },
    getPortMagList() {
      this.currentData = {}
      getPortMagList({
        POT_CODE: this.compForm.compAccount,
        POT_CNAME: this.compForm.compName,
        POT_ENAME: this.compForm.compEngish,
        currentPage: this.currentPage.toString(),
        pageSize: this.pageSize.toString()
      }).then(response => {
        // if(response.success==1){
        this.compList = response.data.DXNXTD
        this.total = Number(response.data.total.DXNXTD)
      })
    },
    listbPortMag() {
      // this.currentData = {}
      listbPortMag({}).then(response => {
        // if(response.success==1){
        this.options = response.data.DXNXTD
        if (this.dialogFormStatus === 'edit') {
          // let func = new Promise((resolve, reject) => {
          //   resolve("");
          // });
          new Promise(resolve => {
            resolve()
          })
            .then(() => {
              this.getChange()
            })

            .then(() => {
              this.$refs.dialogForm.clearValidate()
            })
        } else if (this.dialogFormStatus === 'storageDetail') {
          new Promise((resolve) => {
            resolve('')
          })
            .then(() => {
              this.getChanges()
            })

            .then(() => {
              this.$refs.dialogForm.clearValidate()
            })
        }
      })
    },
    add() {
      this.showDialog = true
      this.operate = '新增港口'
      this.accountDisabled = false
      this.messageDisabled = false
      this.dialogFormStatus = 'add'
      this.resetDialogForm()
      this.listbPortMag()
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
      this.operate = '编辑港口'
      this.listbPortMag()
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
          delPortMag(this.currentData).then(() => {
            this.$message.success({
              message: '删除成功！',
              showClose: true
            })
            this.getPortMagList()
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
    getChange() {
      var lists = []
      for (let i of this.options) {
        lists.push(i.UUID)
      }
      if (lists.indexOf(this.dialogForm.CTY_UUID) !== -1) {
        return
      } else {
        this.$set(this.dialogForm, 'CTY_UUID', '')
      }
    },
    getChanges() {
      var lists = []
      for (let i of this.options) {
        lists.push(i.UUID)
      }
      if (lists.indexOf(this.dialogForm.CTY_UUID) !== -1) {
        return
      } else {
        this.$set(this.dialogForm, 'CTY_UUID', this.dialogForm.CTY_CNAME)
      }
    },
    commitAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addPortMag(this.dialogForm).then(() => {
            this.$message.success({
              message: '新增数据成功！',
              showClose: true
            })
            this.showDialog = false
            this.getPortMagList()
          })
        }
      })
    },
    commitEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          editPortMag(this.dialogForm).then(() => {
            this.$message.success({
              message: '编辑数据成功！',
              showClose: true
            })
            this.showDialog = false
            this.getPortMagList()
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
        POT_CODE: '',
        POT_CNAME: '',
        POT_ENAME: '',
        CTY_UUID: '',
        REMARK: ''
      })
    },
    // 获取当前选中行
    getCurrentRow(row) {
      this.currentData = row
    },
    storageDetail() {
      this.showDialog = true
      this.operate = '港口信息'
      this.accountDisabled = true
      this.messageDisabled = true
      this.dialogFormStatus = 'storageDetail'
      this.listbPortMag()
      this.dialogForm = Object.assign({}, this.currentData)
    },
    handleSizeChange(pageSize) {
      this.currentPage = 1
      this.$refs.pagination.lastEmittedPage = 1
      this.pageSize = pageSize
      this.getPortMagList()
    },
    handleCurrentChange(currentPage) {
      if (currentPage == this.currentNumber) {
        return
      }
      this.currentNumber++
      this.currentPage = currentPage
      this.$refs.pagination.lastEmittedPage = currentPage
      this.getPortMagList()
    },
    indexMethod(index) {
      return 1 + index + (this.currentPage - 1) * this.pageSize
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
