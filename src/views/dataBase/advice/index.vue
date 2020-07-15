<template>
  <div class="app-container">
    <div class="cbox">
      <el-form :model="compForm" ref="compForm" size="mini" label-width="4rem">
        <el-row>
          <el-col :span="4">
            <el-form-item label="邮箱">
              <el-input
                clearable
                v-model.trim="compForm.AD_EMAIL"
                placeholder
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="2rem">
              <el-button type="primary" @click="searchList()">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row :gutter="10" class="btn-area">
      <el-col :span="24">
        <!-- <el-button size="mini" @click="add">新增</el-button> -->
        <!-- <el-button size="mini" @click="edit">编辑</el-button> -->
        <!-- <div v-for="(item,index) in grandson" :key="index">
          <el-button v-if="item.MDL_CODE === 'delete' " size="mini" @click="del" type="primary" plain>删除</el-button>
        </div>-->
        <el-button size="mini" @click="del" type="primary" plain
          >删除</el-button
        >
      </el-col>
    </el-row>
    <div class="table">
      <div class="inner" ref="inner">
        <!-- @row-dblclick="getCurrentRow" -->
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
            label="邮箱"
            prop="AD_EMAIL"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="left"
            label="内容"
            prop="AD_CONTENT"
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
      :page-sizes="Pagination.pageSizeList"
      :page-size="Pagination.pageSize"
      :current-page="Pagination.currentPage"
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
      title="留言详情"
      :before-close="handleClose"
    >
      <el-form
        :model="dialogForm"
        ref="dialogForm"
        label-width="10rem"
        size="mini"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="邮箱">
              <el-input v-model="dialogForm.AD_EMAIL" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="内容">
              <el-input
                type="textarea"
                autosize
                v-model="dialogForm.AD_CONTENT"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="创建时间">
              <el-input v-model="dialogForm.CREATED" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="close('dialogForm')">关闭</el-button>
        <!-- <el-button size="mini" @click="save" type="primary" :loading='saveloading' :disabled="saveloading">保存</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAdviceList, addComp, editComp, delAdvice } from '@/request/api'
import resizeMixin from '@/mixins/resize'
import paginationMixin from '@/mixins/pagination'

export default {
  name: 'router.advice',
  mixins: [resizeMixin, paginationMixin],
  data() {
    return {
      dialogFormStatus: '', //dialog 中 form 的状态 add/edit
      options: [{ value: 'Y', label: '激活' }, { value: 'N', label: '未激活' }],
      accountDisabled: true,
      currentData: {},
      showDialog: false,
      maxHeight: -1,
      operate: '',
      compForm: {
        AD_EMAIL: ''
        // compName:''
      },
      copyEmail: '',
      dialogForm: {
        AD_EMAIL: '',
        AD_CONTENT: '',
        CREATED: ''
      },
      compList: []
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
  methods: {
    getList(currentPage, pageSize, updateTotal) {
      this.currentData = {}
      getAdviceList({
        FLT_CODE: this.compForm.AD_EMAIL,
        currentPage: currentPage.toString(),
        pageSize: pageSize.toString()
      }).then(response => {
        this.compList = response.data.DXNXTD
        console.log('ssssssssssssssss',  this.compList)

        updateTotal(Number(response.data.total.DXNXTD))
      })
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
          delAdvice(this.currentData).then(() => {
            // if (response.success == 1) {
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
            // if (response.success == 1) {
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
    storageDetail() {
      this.showDialog = true
      this.operate = '港口信息'

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
