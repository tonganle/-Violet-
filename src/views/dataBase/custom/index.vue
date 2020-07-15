// 客户管理页面
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
            <el-form-item label="客户名称" prop="cName">
              <el-input
                clearable
                maxlength="64"
                @keyup.native="checkCode"
                v-model="compForm.cName"
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
            label="客户代码"
            prop="CLT_CODE"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="left"
            label="客户名称"
            prop="CLT_NAME"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="left"
            label="客户英文名称"
            prop="CLT_EGSNAME"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="left"
            label="联系人"
            prop="CLT_CONTACT"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="left"
            label="联系电话"
            prop="CLT_CTCTEL"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            align="left"
            label="客户地址"
            prop="CLT_ADDRESS"
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
            align="center"
            label="是否有效"
            prop="CLT_VLFLAG"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.CLT_VLFLAG"
                true-label="Y"
                false-label="N"
                :key="scope.$index"
                disabled
              ></el-checkbox>
            </template>
          </el-table-column>
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
      :modal-append-to-body="false"
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
          <el-col :span="8">
            <el-form-item
              label="客户代码"
              :prop="messageDisabled == false ? 'CLT_CODE' : ''"
            >
              <el-input
                minlength="1"
                maxlength="6"
                v-model.trim="dialogForm.CLT_CODE"
                @change="uppercase('CLT_CODE')"
                :disabled="accountDisabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="客户名称"
              :prop="messageDisabled == false ? 'CLT_NAME' : ''"
            >
              <el-input
                minlength="1"
                maxlength="64"
                v-model.trim="dialogForm.CLT_NAME"
                :disabled="messageDisabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="客户英文名称"
              :prop="messageDisabled == false ? 'CLT_EGSNAME' : ''"
            >
              <el-input
                minlength="1"
                maxlength="64"
                v-model="dialogForm.CLT_EGSNAME"
                :disabled="messageDisabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="有效标识"
              :prop="messageDisabled == false ? 'CLT_VLFLAG' : ''"
            >
              <el-radio-group
                :disabled="messageDisabled"
                v-model.trim="dialogForm.CLT_VLFLAG"
              >
                <el-radio label="Y">是</el-radio>
                <el-radio label="N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="联系人"
              :prop="messageDisabled == false ? 'CLT_CONTACT' : ''"
            >
              <el-input
                minlength="1"
                maxlength="16"
                v-model.trim="dialogForm.CLT_CONTACT"
                :disabled="messageDisabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="联系电话"
              :prop="messageDisabled == false ? 'CLT_CTCTEL' : ''"
            >
              <el-input
                minlength="1"
                maxlength="24"
                :disabled="messageDisabled"
                v-model.trim="dialogForm.CLT_CTCTEL"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="客户账户"
              :prop="messageDisabled == false ? 'CLT_ACCOUNT' : ''"
            >
              <el-input
                maxlength="24"
                v-model.trim="dialogForm.CLT_ACCOUNT"
                :disabled="messageDisabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="税务号"
              :prop="messageDisabled == false ? 'CLT_TAXNO' : ''"
            >
              <el-input
                maxlength="24"
                v-model.trim="dialogForm.CLT_TAXNO"
                :disabled="messageDisabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="开户银行"
              :prop="messageDisabled == false ? 'CLT_BANKNO' : ''"
            >
              <el-input
                maxlength="24"
                :disabled="messageDisabled"
                v-model.trim="dialogForm.CLT_BANKNO"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="客户地址">
              <el-input
                maxlength="256"
                v-model.trim="dialogForm.CLT_ADDRESS"
                :disabled="messageDisabled"
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
import { getCustomList, addCustom, editCustom, delCustom } from '@/request/api'
import resizeMixin from '@/mixins/resize'
import paginationMixin from '@/mixins/pagination'

export default {
  name: 'router.custom',
  mixins: [resizeMixin, paginationMixin],
  data() {
    return {
      dialogFormStatus: '', //dialog 中 form 的状态 add/edit
      accountDisabled: true,
      messageDisabled: true,
      currentData: {},
      showDialog: false,
      maxHeight: -1,
      operate: '',
      countryList: '',
      compForm: {
        cName: ''
      },
      compFormRules: {
        cName: [
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: '请输入中文汉字',
            trigger: 'change'
          }
        ]
      },
      dialogForm: {
        CLT_CODE: '',
        CLT_NAME: '',
        CLT_EGSNAME: '',
        CLT_VLFLAG: 'Y',
        CLT_CONTACT: '',
        CLT_CTCTEL: '',
        CLT_ACCOUNT: '',
        CLT_TAXNO: '',
        CLT_BANKNO: '',
        CLT_ADDRESS: ''
      },
      dialogFormRules: {
        CLT_CODE: [
          {
            required: true,
            message: '客户代码不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^[a-zA-Z|0-9]+$/,
            message: '请输入英文和数字',
            trigger: 'blur'
          }
        ],
        CLT_NAME: [
          {
            required: true,
            message: '客户名称不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: '请输入中文',
            trigger: 'blur'
          }
        ],
        CLT_EGSNAME: [
          {
            pattern: /^[a-zA-Z ]+$/,
            message: '请输入英文',
            trigger: 'blur'
          }
        ],
        CLT_VLFLAG: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        CLT_CONTACT: [
          {
            required: true,
            message: '联系人不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^[\u4e00-\u9fa5|a-zA-Z]+$/,
            message: '请输入中文和英文',
            trigger: 'blur'
          }
        ],
        CLT_CTCTEL: [
          {
            required: true,
            message: '联系电话不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^[0-9]+$/,
            message: '请输入数字',
            trigger: 'blur'
          }
        ],
        CLT_ACCOUNT: [
          {
            pattern: /^[0-9]+$/,
            message: '请输入数字',
            trigger: 'blur'
          }
        ],
        CLT_TAXNO: [
          {
            pattern: /^[0-9a-zA-Z]+$/,
            message: '请输入数字和英文',
            trigger: 'blur'
          }
        ],
        CLT_BANKNO: [
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: '请输入中文',
            trigger: 'blur'
          }
        ]
        // CLT_ADDRESS:[{pattern: /^[\u4e00-\u9fa5|a-zA-Z|0-9]+$/, message: '请输入中文、英文和数字', trigger: 'blur'}],
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
      this.compForm.cName = this.compForm.cName.replace(/[^\u4e00-\u9fa5]/g, '')
    },
    uppercase(key) {
      this.dialogForm[key] = this.dialogForm[key].toUpperCase()
    },
    trimECode() {
      this.dialogForm.CLT_EGSNAME = this.dialogForm.CLT_EGSNAME.trim()
    },
    // 获取客户列表
    search() {
      this.checkCode()
      this.searchList()
    },
    getList(currentPage, pageSize, updateTotal) {
      this.currentData = {}
      getCustomList({
        CLT_NAME: this.compForm.cName,
        PageIndexs: currentPage.toString(),
        PageSizes: pageSize.toString()
      }).then(response => {
        // if(response.success==1){
        this.compList = response.data.DXNXTD
        updateTotal(Number(response.data.total.DXNXTD))
      })
    },

    add() {
      this.showDialog = true
      // $('#app',window.parent.document)

      this.operate = '新增客户信息'
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
      this.operate = '编辑客户信息'
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
          delCustom(this.currentData).then(() => {
            // if(response.success==1){
            this.$message.success({
              message: '删除成功！',
              showClose: true
            })
            this.refreshList()
            // }else{
            //     if(response.msg){
            //         this.$message.error({message:response.msg,showClose:true})
            //     }else{
            //         this.$message.error({message:'删除失败！',showClose:true})
            //     }
            // }
          })
          // .catch(e => {
          //     this.$message.error({message:'删除失败！',showClose:true})
          // })
        })
        .catch(()=> {})
    },
    save() {
      this.trimECode()
      if (this.dialogFormStatus === 'add') {
        this.commitAdd('dialogForm')
      } else if (this.dialogFormStatus === 'edit') {
        this.commitEdit('dialogForm')
      }
    },
    commitAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addCustom(this.dialogForm).then(() => {
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
          editCustom(this.dialogForm).then(() => {
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
      this.$refs[formName].clearValidate()
      this.showDialog = false
    },
    resetDialogForm() {
      return (this.dialogForm = {
        CLT_CODE: '',
        CLT_NAME: '',
        CLT_EGSNAME: '',
        CLT_VLFLAG: 'Y',
        CLT_CONTACT: '',
        CLT_CTCTEL: '',
        CLT_ACCOUNT: '',
        CLT_TAXNO: '',
        CLT_BANKNO: '',
        CLT_ADDRESS: ''
      })
    },
    // 获取当前选中行
    getCurrentRow(row) {
      this.currentData = row
    },
    storageDetail() {
      this.showDialog = true
      this.operate = '查看客户信息'
      this.accountDisabled = true
      this.messageDisabled = true
      this.dialogForm = Object.assign({}, this.currentData)
    },
    handleClose(done) {
      if (this.$refs.dialogForm) {
        this.$refs.dialogForm.clearValidate()
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
