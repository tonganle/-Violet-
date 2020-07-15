<template>
  <div class="main app-container">
    <div class="main-container">
      <div class="cbox">
        <el-form
          size="mini"
          :model="flt"
          class="form"
          label-width="7rem"
          ref="fltForm"
        >
          <el-row :gutter="10" class="row">
            <el-col :span="4">
              <el-form-item
                label="用户代码"
                :rules="rules.USR_CODE"
                prop="USR_CODE"
              >
                <el-input
                  clearable
                  maxlength="8"
                  v-model="flt.USR_CODE"
                  placeholder="请输入英文字母"
                  @keyup.native="checkCode"
                  @change="uppercase('USR_CODE')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item
                label="用户名称"
                :rules="rules.USR_NAME"
                prop="USR_NAME"
              >
                <el-input
                  clearable
                  maxlength="32"
                  v-model="flt.USR_NAME"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item
                label="联系电话"
                :rules="rules.USR_CELLPHONE"
                @keyup.native="checkCodePhone"
                prop="USR_CELLPHONE"
              >
                <el-input
                  clearable
                  maxlength="11"
                  v-model="flt.USR_CELLPHONE"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label-width="0px">
                <el-button @click="search" type="primary">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10" class="row">
            <el-col :span="24">
              <el-form-item label-width="0px">
                <!-- <div v-for="(item,index) in grandson" :key='index'>
                      <el-button v-if="item.MDL_CODE === 'add'" size="mini" type="primary" plain @click="addNew">新增</el-button>
                      <el-button v-if="item.MDL_CODE === 'edit'" size="mini" type="primary" plain @click="edit">编辑</el-button>
                      <el-button v-if="item.MDL_CODE === 'delete'" size="mini" type="primary" plain @click="del">删除</el-button>
                      <el-button  v-if="item.MDL_CODE === 'resetpassword'"  @click="resetPassword" type="primary" plain>重置密码</el-button>
                </div>-->
                <el-button @click="addNew" type="primary" plain>新增</el-button>
                <el-button @click="edit" type="primary" plain>编辑</el-button>
                <el-button @click="del" type="primary" plain>删除</el-button>
                <el-button @click="resetPassword" type="primary" plain
                  >重置密码</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="table">
        <div class="inner" ref="inner">
          <el-table
            :data="adminList"
            :highlight-current-row="true"
            @row-click="rowClick"
            border
            :header-cell-style="{
              textAlign: 'center'
            }"
            :height="maxHeight"
          >
            <el-table-column
              align="center"
              width="60"
              label="序号"
              type="index"
              :index="indexMethod"
            ></el-table-column>
            <el-table-column
              align="left"
              show-overflow-tooltip
              label="用户代码"
              prop="USR_CODE"
            ></el-table-column>
            <el-table-column
              align="left"
              show-overflow-tooltip
              label="用户名称"
              prop="USR_NAME"
            ></el-table-column>
            <el-table-column
              align="left"
              show-overflow-tooltip
              label="所属角色"
              prop="USR_RLES_NAME"
            ></el-table-column>
            <el-table-column
              align="left"
              show-overflow-tooltip
              label="联系电话"
              prop="USR_CELLPHONE"
            ></el-table-column>
            <el-table-column
              align="left"
              show-overflow-tooltip
              label="邮箱"
              prop="USR_EMAIL"
            ></el-table-column>
            <el-table-column
              align="left"
              show-overflow-tooltip
              label="所属公司"
              prop="USR_COMPANY_NAME"
            ></el-table-column>
            <el-table-column align="center" label="状态">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.USR_STATUS"
                  true-label="Y"
                  false-label="N"
                  :key="scope.$index"
                  disabled
                ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              show-overflow-tooltip
              label="创建人"
              prop="CREATOR"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              label="创建时间"
              prop="CREATED"
            ></el-table-column>
            <el-table-column
              align="left"
              show-overflow-tooltip
              label="修改人"
              prop="LASTMODIFIER"
            ></el-table-column>
            <el-table-column
              align="center"
              show-overflow-tooltip
              label="修改时间"
              prop="LASTMODIFIED"
            ></el-table-column>
            <el-table-column
              align="left"
              show-overflow-tooltip
              label="备注"
              prop="REMARK"
            ></el-table-column>
          </el-table>
        </div>
      </div>

    <el-pagination
      class="pagination"
      small
      background
      :ref="Pagination.ref"
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
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :visible.sync="showDialog"
        v-if="showDialog"
        :title="operate"
      >
        <edit
          :isEditMode="isEditMode"
          @close="closeEdit"
          @save="saveAdminInfo"
          :showDialog="showDialog"
          :admin_info="currentAdminInfo"
          :adminEnterpriseList="adminEnterprise"
          :rolePwd="rolePassWord"
          :adminStatusList="adminStatus"
        ></edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import resizeMixin from '@/mixins/resize'
import paginationMixin from '@/mixins/pagination'

import {
  getAdminList,
  getRoleList,
  editAdminList,
  addAdminList,
  delAdminList,
  changePwd
} from '@/request/api'
import edit from './edit'
export default {
  mixins: [resizeMixin, paginationMixin],
  name: 'router.enterpriseAdministrator',
  data() {
    return {
      isEditMode: true,
      operate: '',
      showDialog: false,
      flt: {
        USR_CODE: '',
        USR_NAME: '',
        USR_CELLPHONE: ''
      },
      copyUSER_CODE: '',
      copyUSER_NAME: '',
      copyUSR_CELLPHONE: '',

      adminStatus: [],
      adminEnterprise: [],
      statusMap: {},
      enterpriseMap: {},
      adminList: [],
      currentRow: {},
      currentAdminInfo: {},
      rolePassWord: '',
      rules: {
        USR_CODE: [
          { min: 0, max: 8, message: '输入至多8个字符', trigger: 'blur' }
        ],
        USR_NAME: [
          { min: 0, max: 32, message: '输入至多32个字符', trigger: 'blur' }
        ],
        USR_CELLPHONE: [
          { min: 0, max: 11, message: '至多输入11个字符', trigger: 'blur' },
          { pattern: /^([0-9])+$/, message: '只能输入数字！', trigger: 'blur' }
        ]
      },
      maxHeight: -1
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
    search() {
      this.searchList()
    },
    checkCode() {
      this.flt.USR_CODE = this.flt.USR_CODE.replace(/[^a-zA-Z]/g, '')
    },
    checkCodePhone() {
      this.flt.USR_CELLPHONE = this.flt.USR_CELLPHONE.replace(/[^0-9]/g, '')
    },
    uppercase(key) {
      this.flt[key] = this.flt[key].toUpperCase()
    },
    getRoleData() {
      return new Promise(resolve => {
        getRoleList().then(response => {
          this.adminStatus = response.data.DXNXTD
          resolve()
        })
      })
    },
    getList(currentPage, pageSize, updateTotal) {
      this.clearState()
      getAdminList({
        USR_CODE: this.flt.USER_CODE,
        USR_NAME: this.flt.USER_NAME,
        USR_CELLPHONE: this.flt.USR_CELLPHONE,
        PageIndexs: currentPage.toString(),
        PageSizes: pageSize.toString()
      }).then(response => {
        this.adminList = response.data.DXNXTD
        updateTotal(Number(response.data.total.DXNXTD))
      })
    },
    addNew() {
      this.operate = '新增用户'
      this.isEditMode = false
      this.currentAdminInfo = {
        USR_STATUS: 'Y'
      }
      this.getRoleData()
      this.showDialog = true
    },
    edit() {
      if (Object.keys(this.currentRow).length == 0) {
        this.$alert('请选择需要编辑的数据！', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      this.operate = '编辑用户'
      this.isEditMode = true
      this.currentAdminInfo = Object.assign({}, this.currentRow)
      this.rolePassWord = JSON.parse(
        JSON.stringify(this.currentRow.USR_PASSWORD)
      )
      new Promise(resolve => {
        resolve('')
      })
        .then(() => {
          return this.getRoleData()
        })
        .then(() => {
          this.showDialog = true
        })
    },
    closeEdit() {
      this.showDialog = false
    },
    resetPassword() {
      if (Object.keys(this.currentRow).length == 0) {
        this.$alert('请选择需要重置的数据！', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      this.$confirm('确认重置选定账号的密码吗?', {
        closeOnClickModal: false
      }).then(() => {
        changePwd(this.currentRow).then(() => {
          this.$message.success({
            message: '重置密码成功，新密码为Abc12345'
          })
          this.refreshList()
        })
      })
    },
    saveAdminInfo(value) {
      if (!this.isEditMode) {
        addAdminList(value).then(() => {
          this.refreshList()
          this.showDialog = false
          this.$message.success({ message: '新增数据成功' })
        })
      } else {
        editAdminList(value).then(() => {
          this.refreshList()
          this.currentRow = {}
          this.showDialog = false
          this.$message.success({ message: '编辑数据成功' })
          // eslint-disable-next-line handle-callback-err
        })
        // .catch(error => {
        //   this.$message.error({ message: "编辑数据失败！请重试" });
        // });
      }
    },
    rowClick(row) {
      this.currentRow = row
    },
    del() {
      if (Object.keys(this.currentRow).length == 0) {
        this.$alert('请选择需要删除的数据', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      this.$confirm('您确定要删除此数据吗?', '提示', {
        closeOnClickModal: false
      }).then(() => {
        let leta = {}
        leta['UUID'] = this.currentRow.UUID
        leta['VERSION'] = this.currentRow.VERSION
        delAdminList(leta).then(() => {
          this.clearState()
          this.refreshList()
          this.$message({
            message: '删除成功',
            type: 'success',
            showClose: true
          })
        })
      })
    },
    clearState() {
      this.currentRow = {}
      this.currentAdminInfo = {}
    },
    resize () {
      this.maxHeight = this.$refs.inner.offsetHeight
    }
  },
  components: {
    edit
  },
  mounted() {
    this.refreshList()
  }
}
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  position: relative;
  width: 100%;
}
.main-container {
  height: 100%;
  width: 100%;
  position: relative;
  // padding: 0 12px;
  display: flex;
  flex-direction: column;
  .form {
    width: 100%;
    flex: 0 0 auto;
    .row {
      width: 100%;
      // margin: 10px 0;
      margin-bottom: 0;
    }
  }
  .table {
    flex: 1;
    position: relative;
    overflow: hidden;
    .inner {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
  .pagination {
    height: 40px;
    flex: 0 0 auto;
    margin: 10px 0;
  }
}
</style>
