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
            <el-form-item label="消息标题">
              <el-input
                clearable
                maxlength="64"
                v-model.trim="compForm.compAccount"
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
        </div> -->
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
            label="消息标题"
            prop="MESSAGE_TITLE"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="left"
            label="消息内容"
            prop="MESSAGE_CONTENT"
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
              label="消息标题"
              :prop="messageDisabled == false ? 'MESSAGE_TITLE' : ''"
            >
              <el-input
                maxlength="64"
                placeholder
                v-model.trim="dialogForm.MESSAGE_TITLE"
                :disabled="messageDisabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="消息内容"
              :prop="messageDisabled == false ? 'MESSAGE_CONTENT' : ''"
            >
              <el-input
                maxlength="256"
                type="textarea"
                :autosize="{ minRows: 3 }"
                v-model.trim="dialogForm.MESSAGE_CONTENT"
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
  getNewManager,
  addNewManager,
  editNewManager,
  delNewManager
} from '@/request/api'
import resizeMixin from '@/mixins/resize'
import paginationMixin from '@/mixins/pagination'

export default {
  name: 'router.newManager',
  mixins: [resizeMixin, paginationMixin],
  data() {
    return {
      dialogFormStatus: '', //dialog 中 form 的状态 add/edit
      options: [],
      accountDisabled: true,
      messageDisabled: true,
      currentData: {},
      showDialog: false,
      maxHeight: -1,
      operate: '',
      compForm: {
        compAccount: ''
      },
      copyCompAccount: '',
      copyCompName: '',
      compFormRules: {
        // compAccount:[{validator: fltCodevalidator2,trigger:'blur'}],
      },
      dialogForm: {
        MESSAGE_TITLE: '',
        MESSAGE_CONTENT: ''
      },
      dialogFormRules: {
        MESSAGE_TITLE: [
          { required: true, message: '消息标题不能为空', trigger: 'blur' }
        ],
        MESSAGE_CONTENT: [
          { required: true, message: '消息内容不能为空', trigger: 'blur' }
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

    // 获取消息列表
    search() {
      this.searchList()
    },
    getList(currentPage, pageSize, updateTotal) {

      this.currentData = {}
      getNewManager({
        MESSAGE_TITLE: this.compForm.compAccount,
        currentPage: currentPage.toString(),
        pageSize: pageSize.toString()
      }).then(response => {
        this.compList = response.data.DXNXTD
        updateTotal(Number(response.data.total.DXNXTD))
      })
    },
    add() {
      this.showDialog = true
      this.operate = '新增消息'
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
      this.operate = '编辑消息'
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
          delNewManager(this.currentData).then(() => {
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
          addNewManager(this.dialogForm).then(() => {
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
          editNewManager(this.dialogForm).then(() => {
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
        MESSAGE_TITLE: '',
        MESSAGE_CONTENT: ''
      })
    },
    // 获取当前选中行
    getCurrentRow(row) {
      this.currentData = row
    },
    storageDetail() {
      this.showDialog = true
      this.operate = '消息信息'
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
