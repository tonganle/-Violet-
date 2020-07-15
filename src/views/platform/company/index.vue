<template>
  <div class="app-container">
    <div class="cbox">
      <el-form
        :model="compForm"
        label-width="7rem"
        ref="compForm"
        size="mini"
        :rules="compFormRules"
      >
        <el-row>
          <el-col :span="4">
            <el-form-item label="企业账号" prop="compAccount">
              <el-input
                clearable
                maxlength="8"
                v-model="compForm.compAccount"
                placeholder
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="企业名称">
              <el-input
                clearable
                maxlength="64"
                v-model="compForm.compName"
                placeholder
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
          <el-button v-if="item.MDL_CODE === 'delete'" size="mini" type="primary" plain @click="del">删除</el-button>
        </div>-->
        <el-button size="mini" @click="add" type="primary" plain
          >新增</el-button
        >
        <el-button size="mini" @click="edit" type="primary" plain
          >编辑</el-button
        >
        <el-button size="mini" @click="del" type="primary" plain
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
            label="企业账号"
            prop="FLT_CODE"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="left"
            label="企业名称"
            prop="FLT_NAME"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="left"
            label="联系人"
            prop="FLT_LINKPERSON"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="left"
            label="联系电话"
            prop="FLT_LINKPHONE"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="left"
            label="网址"
            prop="FLT_URL"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="left"
            label="地址"
            prop="FLT_REGADDRESS"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="left"
            label="状态"
            prop="FLT_STATUS"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.FLT_STATUS == 'Y'">激活</span>
              <span v-if="scope.row.FLT_STATUS == 'N'">未激活</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="企业介绍"
            prop="FLT_INTRODUCTION"
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
      modal-append-to-body
      v-el-drag-dialog
      ref="dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="showDialog"
      v-if="showDialog"
      :title="operate"
      :before-close="handleClose">
      <!-- <el-dialogComp :loading='saveloading' :visible="showDialog" :title="operate" :handleClose="handleClose"> -->
      <el-form
        :model="dialogForm"
        ref="dialogForm"
        label-width="10rem"
        size="mini"
        :rules="dialogFormRules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业账号" prop="FLT_CODE">
              <el-input
                maxlength="8"
                v-model="dialogForm.FLT_CODE"
                :disabled="accountDisabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业名称" prop="FLT_NAME">
              <el-input maxlength="64" v-model="dialogForm.FLT_NAME"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业网址" prop="FLT_URL">
              <el-input maxlength="128" v-model="dialogForm.FLT_URL"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="FLT_STATUS">
              <el-select v-model="dialogForm.FLT_STATUS">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :title="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人" prop="FLT_LINKPERSON">
              <el-input
                maxlength="16"
                v-model="dialogForm.FLT_LINKPERSON"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="FLT_LINKPHONE">
              <el-input
                maxlength="20"
                v-model="dialogForm.FLT_LINKPHONE"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="地址" prop="FLT_REGADDRESS">
              <el-input
                maxlength="256"
                v-model="dialogForm.FLT_REGADDRESS"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="企业介绍" prop="FLT_INTRODUCTION">
              <el-input
                maxlength="1000"
                type="textarea"
                :autosize="{ minRows: 3 }"
                v-model="dialogForm.FLT_INTRODUCTION"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="el-dialog__footer">
        <el-button size="mini" @click="close('dialogForm')">关闭</el-button>
        <el-button size="mini" @click="save" type="primary">保存</el-button>
      </div>
      <!-- </el-dialogComp> -->
    </el-dialog>
  </div>
</template>

<script>
import { getCompList, addComp, editComp, delComp } from '@/request/api'
import resizeMixin from '@/mixins/resize'
import paginationMixin from '@/mixins/pagination'

export default {
  name: 'router.company',
  mixins: [resizeMixin, paginationMixin],
  data() {
    var linkPersonvalidator = (rule, value, callback) => {
      var reg = /^[A-Za-z\u4e00-\u9fa5]+$/
      if (value === '') {
        callback(new Error('联系人不能为空'))
      } else if (!reg.test(value)) {
        callback(new Error('只能输入汉字和字母'))
      } else {
        callback()
      }
    }
    var fltCodevalidator = (rule, value, callback) => {
      var reg = /^[0-9a-zA-Z]+$/
      if (value === '') {
        callback(new Error('企业账号不能为空'))
      } else if (!reg.test(value)) {
        callback(new Error('只能输入字母和数字'))
      } else {
        callback()
      }
    }
    var fltCodevalidator2 = (rule, value, callback) => {
      var reg = /^[0-9a-zA-Z]+$/
      if (value === '') {
        callback()
      } else if (!reg.test(value)) {
        callback(new Error('只能输入字母和数字'))
      } else {
        callback()
      }
    }
    return {
      dialogFormStatus: '', //dialog 中 form 的状态 add/edit
      options: [{ value: 'Y', label: '激活' }, { value: 'N', label: '未激活' }],
      accountDisabled: true,
      currentData: {},
      showDialog: false,
      maxHeight: -1,
      operate: '',
      compForm: {
        compAccount: '',
        compName: ''
      },
      copyCompAccount: '',
      copyCompName: '',
      compFormRules: {
        compAccount: [{ validator: fltCodevalidator2, trigger: 'blur' }]
      },
      dialogForm: {
        FLT_CODE: '',
        FLT_NAME: '',
        FLT_URL: '',
        FLT_STATUS: 'Y',
        FLT_LINKPERSON: '',
        FLT_LINKPHONE: '',
        FLT_REGADDRESS: '',
        FLT_INTRODUCTION: ''
      },
      dialogFormRules: {
        FLT_CODE: [
          { required: true, validator: fltCodevalidator, trigger: 'blur' }
        ],
        FLT_NAME: [
          { required: true, message: '企业名称不能为空', trigger: 'blur' }
        ],
        FLT_URL: [{ required: false, trigger: 'blur' }],
        FLT_STATUS: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ],
        FLT_LINKPERSON: [
          { required: true, validator: linkPersonvalidator, trigger: 'blur' }
        ],
        FLT_LINKPHONE: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' }
        ],
        FLT_REGADDRESS: [{ required: false, trigger: 'blur' }],
        FLT_INTRODUCTION: [{ required: false, trigger: 'blur' }]
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
    // 获取企业列表
    search() {
      this.searchList()
    },
    getList(currentPage, pageSize, updateTotal) {
      this.currentData = {}
      getCompList({
        FLT_CODE: this.compForm.compAccount,
        FLT_NAME: this.compForm.compName,
        currentPage: currentPage.toString(),
        pageSize: pageSize.toString()
      }).then(response => {
        // if(response.success=="1"){
        this.compList = response.data.DXNXTD
        updateTotal(Number(response.data.total.DXNXTD))
        // }
        // else{
        //     if(response.msg){
        //         this.$message.error({message:response.msg,showClose:true})
        //     }else{
        //         this.$message.error({message:'获取企业列表失败！',showClose:true})
        //     }
        // }
      })
      // .catch(error=>{
      //     this.$message.error({message:'获取企业列表失败！',showClose:true})
      // })
    },
    add() {
      this.showDialog = true
      this.operate = '新增企业'
      this.accountDisabled = false
      this.dialogFormStatus = 'add'
      this.resetDialogForm()
    },
    edit() {
      this.dialogFormStatus = 'edit'
      if (Object.keys(this.currentData).length == 0) {
        this.$alert('请选择需要编辑的数据', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      this.showDialog = true
      this.operate = '编辑企业'
      this.accountDisabled = true
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
          delComp(this.currentData).then(() => {
            this.$message.success({ message: '删除成功！', showClose: true })
            this.refreshList()
          })
        })
        .catch(() => {})
    },
    save() {
      if (this.dialogFormStatus === 'add') {
        this.commitAdd('dialogForm')
      } else if (this.dialogFormStatus === 'edit') {
        this.commitEdit('dialogForm')
      }
    },
    commitAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addComp(this.dialogForm).then(() => {
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
          editComp(this.dialogForm).then(() => {
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
        FLT_CODE: '',
        FLT_NAME: '',
        FLT_URL: '',
        FLT_STATUS: 'Y',
        FLT_LINKPERSON: '',
        FLT_LINKPHONE: '',
        FLT_REGADDRESS: '',
        FLT_INTRODUCTION: ''
      })
    },
    // 获取当前选中行
    getCurrentRow(row) {
      this.currentData = row
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
