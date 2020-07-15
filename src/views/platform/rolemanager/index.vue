<template>
  <div class="main app-container">
    <div class="main-container">
      <div class="cbox">
        <el-form class="form" :model="flt" label-width="7rem" ref="fltForm">
          <el-row :gutter="10" class="row">
            <el-col :span="4">
              <el-form-item
                size="mini"
                label="角色代码"
                prop="RLE_CODE"
                :rules="rules.RLE_CODE"
              >
                <el-input
                  clearable
                  maxlength="8"
                  v-model="flt.RLE_CODE"
                  size="mini"
                  style="width: 100%"
                  placeholder="请输入英文字母"
                  @keyup.native="checkCode"
                  @change="uppercase('RLE_CODE')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item
                size="mini"
                label="角色名称"
                prop="RLE_NAME"
                :rules="rules.RLE_NAME"
              >
                <el-input
                  clearable
                  maxlength="32"
                  v-model="flt.RLE_NAME"
                  size="mini"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item size="mini" label-width="10px">
                <el-button size="mini" type="primary" @click="search"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10" class="row">
            <el-col :span="24">
              <el-form-item size="mini" label-width="0px">
                <!-- <div v-for="(item,index) in grandson" :key='index'>
                  <el-button v-if="item.MDL_CODE === 'add'" size="mini" type="primary" plain @click="add">新增</el-button>
                  <el-button v-if="item.MDL_CODE === 'edit'" size="mini" type="primary" plain @click="edit">编辑
                  </el-button>
                  <el-button v-if="item.MDL_CODE === 'delete'" size="mini" type="primary" plain @click="del">删除
                  </el-button>
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
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="table">
        <div class="inner" ref="inner">
          <el-table
            :height="maxHeight"
            style="width: 100%"
            :data="rleList"
            :highlight-current-row="true"
            @row-click="rowClick"
            border
            :header-cell-style="{
              textAlign: 'center'
            }"
          >
            <el-table-column
              align="center"
              width="60"
              label="序号"
              :index="indexMethod"
              type="index"
            ></el-table-column>
            <el-table-column
              align="left"
              show-overflow-tooltip
              label="角色代码"
              prop="RLE_CODE"
            ></el-table-column>
            <el-table-column
              align="left"
              show-overflow-tooltip
              label="角色名称"
              prop="RLE_NAME"
            ></el-table-column>
            <el-table-column
              align="left"
              show-overflow-tooltip
              label="角色类型"
              prop="RLE_TYPE_NAME"
            >
              <!-- <template slot-scope="scope">
                <span>{{ roleType[scope.row.RLE_TYPE] }}</span>
              </template>-->
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
      ref="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="Pagination.currentPage"
      :page-sizes="Pagination.pageSizeList"
      :page-size="Pagination.pageSize"
      :layout="Pagination.layout"
      :total="Pagination.total"></el-pagination>
      <el-dialog
        v-el-drag-dialog
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        v-if="showDialog"
        :visible.sync="showDialog"
        :title="operate"
      >
        <role
          :isEditMode="isEditMode"
          @close="closeEdit"
          @save="saveFltInfo"
          :flt_info="currentFltInfo"
          :showDialog="showDialog"
          :roleStatusList="roleStatus"
        ></role>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import role from './role'
import resizeMixin from '@/mixins/resize'
import paginationMixin from '@/mixins/pagination'
import {
  checkRoleList,
  editRoleList,
  addRoleList,
  delRoleList,
  getRoleDown
} from '@/request/api'
export default {
  name: 'router.roleManagement',
  mixins: [resizeMixin, paginationMixin],
  data() {
    return {
      isEditMode: true,
      operate: '',
      showDialog: false,
      flt: {
        RLE_NAME: '',
        RLE_CODE: ''
      },
      roleType: {
        KH: '客户',
        PT: '系统管理员',
        GYS: '供应商'
      },
      rleTypes: [],
      rleList: [],
      currentRow: {},
      currentFltInfo: {},
      roleStatus: [],
      rules: {
        RLE_CODE: [
          {
            pattern: /^[a-zA-Z]+$/,
            message: '只能允许输入字母',
            trigger: 'blur'
          },
          { min: 0, max: 8, message: '输入至多8个字符', trigger: 'blur' }
        ],
        RLE_NAME: [
          { min: 0, max: 32, message: '至多输入32 个字符', trigger: 'blur' }
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
    getFltType() {
      return new Promise(resolve => {
        getRoleDown().then(res => {
          this.roleStatus = res.data.DXNXTD
          resolve()
        })
      })
    },
    search() {
      this.searchList()
    },
    checkCode() {
      this.flt.RLE_CODE = this.flt.RLE_CODE.replace(/[^a-zA-Z]/g, '')
    },
    uppercase(key) {
      this.flt[key] = this.flt[key].toUpperCase()
    },
    getList(currentPage, pageSize, updateTotal) {
      this.clearState()
      checkRoleList({
        USR_CODE: this.flt.RLE_CODE,
        USR_NAME: this.flt.RLE_NAME,
        PageIndexs: this.currentPage,
        PageSizes: this.pageSize
      }).then(response => {
        // 上级企业
        this.rleList = response.data.DXNXTD
        updateTotal(Number(response.data.total.DXNXTD))
      })
    },
    addNew() {
      this.operate = '新增'
      this.isEditMode = false
      this.currentFltInfo = {}

      this.showDialog = true
      this.getFltType()
    },
    edit() {
      if (Object.keys(this.currentRow).length == 0) {
        this.$alert('请选择需要编辑的数据！', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      this.operate = '编辑'
      this.isEditMode = true
      this.currentFltInfo = Object.assign({}, this.currentRow)
      new Promise(resolve => {
        resolve('')
      })
        .then(() => {
          return this.getFltType()
        })
        .then(() => {
          this.showDialog = true
        })
    },
    closeEdit() {
      this.showDialog = false
    },

    saveFltInfo(value) {
      if (!this.isEditMode) {
        addRoleList(value).then(() => {
          this.refreshList()
          this.showDialog = false
          this.$message.success({ message: '新增数据成功' })
        })
      } else {
        editRoleList(value).then(() => {
          this.refreshList()
          this.currentRow = {}
          this.showDialog = false
          this.$message.success({ message: '编辑数据成功' })
        })
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
      this.$confirm('您确认要删除选定的角色吗?', '提示', {
        closeOnClickModal: false
      }).then(() => {
        let leta = {}
        leta['UUID'] = this.currentRow.UUID
        leta['VERSION'] = this.currentRow.VERSION
        delRoleList(leta).then(() => {
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
      this.currentFltInfo = {}
    }
  },
  components: {
    role
  },
  mounted() {
    this.refreshList()
    this.getFltType()
  },
  created() {
    this.resize = () => {
      this.maxHeight = this.$refs.inner.offsetHeight
    }
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
    overflow: hidden;
    position: relative;
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
