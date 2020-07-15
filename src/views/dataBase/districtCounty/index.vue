// 区县管理页面
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
            <el-form-item label="中文名称" prop="cName">
              <el-input clearable maxlength="16" @keyup.native="checkCode" v-model="compForm.cName"></el-input>
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
          <el-button v-if="item.MDL_CODE === 'add'" size="mini" type="primary" plain @click="add">新增区县</el-button>
          <el-button v-if="item.MDL_CODE === 'edit'" size="mini" type="primary" plain @click="edit">编辑区县</el-button>
          <el-button v-if="item.MDL_CODE === 'delete'" size="mini" type="primary" plain @click="del">删除区县</el-button>
        </div>-->
        <el-button size="mini" type="primary" plain @click="add">新增区县</el-button>
        <el-button size="mini" type="primary" plain @click="edit">编辑区县</el-button>
        <el-button size="mini" type="primary" plain @click="del">删除区县</el-button>
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
          <el-table-column align="left" label="省市名称" prop="CTV_PRV_CNAME" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" label="区县代码" prop="CTY_CODE" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" label="中文名称" prop="CTY_CHNNAME" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" label="英文名称" prop="CTY_EGSNAME" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" label="创建人" prop="CREATOR" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" label="创建时间" prop="CREATED" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" label="修改人" prop="LASTMODIFIER" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" label="修改时间" prop="LASTMODIFIED" show-overflow-tooltip></el-table-column>
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
            <el-form-item label="省市名称" :prop="messageDisabled == false ? 'CTV_PRV_UUID' : ''">
              <el-select
                v-model.trim="dialogForm.CTV_PRV_UUID"
                filterable
                :disabled="accountDisabled"
              >
                <el-option
                  v-for="i in dcList"
                  :key="i.UUID"
                  :label="i.PRV_CHNNAME"
                  :value="i.UUID"
                  :title="i.PRV_CHNNAME"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="区县代码" :prop="messageDisabled == false ? 'CTY_CODE' : ''">
              <el-input
                minlength="1"
                maxlength="6"
                v-model.trim="dialogForm.CTY_CODE"
                @change="uppercase('CTY_CODE')"
                :disabled="accountDisabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="中文名称" :prop="messageDisabled == false ? 'CTY_CHNNAME' : ''">
              <el-input
                minlength="1"
                maxlength="16"
                :disabled="messageDisabled"
                v-model.trim="dialogForm.CTY_CHNNAME"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="英文名称" :prop="messageDisabled == false ? 'CTY_EGSNAME' : ''">
              <el-input
                minlength="1"
                maxlength="16"
                :disabled="messageDisabled"
                v-model="dialogForm.CTY_EGSNAME"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="close('dialogForm')">关闭</el-button>
        <el-button size="mini" v-if="messageDisabled == false" @click="save" type="primary">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDCList,
  getPCLists,
  addDC,
  editDC,
  delDC
} from '@/request/api'
import resizeMixin from '@/mixins/resize'
import paginationMixin from '@/mixins/pagination'

export default {
  name: 'router.districtCounty',
  mixins: [resizeMixin, paginationMixin],
  data() {
    return {
      dialogFormStatus: '', // dialog 中 form 的状态 add/edit
      accountDisabled: true,
      messageDisabled: true,
      currentData: {},
      showDialog: false,
      maxHeight: -1,
      operate: '',
      dcList: '',
      compForm: {
        cName: ''
      },
      copyCompAccount: '',
      copyCompName: '',
      compFormRules: {
        cName: [{
          pattern: /^[\u4e00-\u9fa5]+$/,
          message: '只能输入中文汉字',
          trigger: 'change'
        }]
      },
      dialogForm: {
        CTV_PRV_UUID: '',
        CTY_CHNNAME: '',
        CTY_EGSNAME: '',
        CTY_CODE: ''
      },
      dialogFormRules: {
        CTV_PRV_UUID: [{
          required: true,
          message: '省市名称不能为空',
          trigger: 'change'
        }],
        CTY_CHNNAME: [{
          required: true,
          message: '中文名称不能为空',
          trigger: 'blur'
        },
        {
          pattern: /^[\u4e00-\u9fa5]+$/,
          message: '请输入中文',
          trigger: 'blur'
        }
        ],
        CTY_EGSNAME: [{
          required: true,
          message: '英文名称不能为空',
          trigger: 'blur'
        },
        {
          pattern: /^[a-zA-Z ]+$/,
          message: '请输入英文',
          trigger: 'blur'
        }
        ],
        CTY_CODE: [{
          required: true,
          message: '区县代码不能为空',
          trigger: 'blur'
        },
        {
          pattern: /^[a-zA-Z0-9]+$/,
          message: '请输入英文和数字',
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
      this.compForm.cName = this.compForm.cName.replace(
        /[^\u4e00-\u9fa5]/g,
        ''
      )
    },
    uppercase(key) {
      this.dialogForm[key] = this.dialogForm[key].toUpperCase()
    },
    trimECode() {
      this.dialogForm.CTY_EGSNAME = this.dialogForm.CTY_EGSNAME.trim()
    },

    // 获取区县列表
    search() {
      this.checkCode()
      this.searchList()
    },
    getList(currentPage, pageSize, updateTotal) {
      this.currentData = {}
      getDCList({
        CTY_CHNNAME: this.compForm.cName,
        PageIndexs: currentPage.toString(),
        PageSizes: pageSize.toString()
      }).then(response => {
        this.compList = response.data.DXNXTD
        updateTotal(Number(response.data.total.DXNXTD))
      
      })
     
    },
    getCountryList() {
      getPCLists({}).then(response => {
        this.dcList = response.data.DXNXTD
      })
    },
    add() {
      this.showDialog = true
      this.operate = '新增区县信息'
      this.getCountryList()
      this.accountDisabled = false
      this.messageDisabled = false
      this.dialogFormStatus = 'add'
      if (this.$refs['dialogForm']) {
        this.$refs['dialogForm'].resetFields()
      }
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
      this.operate = '编辑区县信息'
      this.accountDisabled = true
      this.messageDisabled = false
      this.dialogForm = Object.assign({}, this.currentData)
      new Promise((resolve) => {
        resolve('')
      })
        .then(() => {
          this.getCountryList()
        })
        .then(() => {
          this.getChanges()
        })
        .then(() => {
          this.$refs.dialogForm.clearValidate()
        })
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
          delDC(this.currentData).then(() => {
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
          addDC(this.dialogForm).then(() => {
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
          editDC(this.dialogForm).then(() => {
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
        CTV_PRV_UUID: '',
        CTY_CHNNAME: '',
        CTY_EGSNAME: '',
        CTY_CODE: ''
      })
    },
    // 获取当前选中行
    getCurrentRow(row) {
      this.currentData = row
    },
    storageDetail() {
      this.showDialog = true
      this.operate = '查看区县信息'
      this.accountDisabled = true
      this.messageDisabled = true
      this.dialogForm = Object.assign({}, this.currentData)
      new Promise((resolve) => {
        resolve('')
      })
        .then(() => {
          this.getCountryList()
        })
        .then(() => {
          this.getChanges()
        })
        .then(() => {
          this.$refs.dialogForm.clearValidate()
        })
    },
    handleClose(done) {
      if (this.$refs.dialogForm) {
        this.$refs.dialogForm.resetFields()
        done()
      }
    },
    getChanges() {
      var lists = []
      for (let i of this.dcList) {
        lists.push(i.UUID)
      }
      if (lists.indexOf(this.dialogForm.CTV_PRV_UUID) !== -1) {
        return
      } else {
        this.$set(
          this.dialogForm,
          'CTV_PRV_UUID',
          this.dialogForm.CTV_PRV_CNAME
        )
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
