<template>
  <div class="app-container">
    <div class="query-area">
      <label style="padding-left:0;">用户代码</label>
      <el-input v-model="query.userCode"></el-input>
      <label>用户名称</label>
      <el-input v-model="query.userName"></el-input>
      <label>联系电话</label>
      <el-input v-model="query.contactTel"></el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <div class="btn-area">
      <el-button type="primary" plain @click="creatAdmin">新增</el-button>
      <el-button type="primary" plain @click="updataAdmin">编辑</el-button>
      <el-button type="primary" plain @click="delCurrentAdmin">删除</el-button>
      <el-button type="primary" plain>重置密码</el-button>
    </div>
    <el-table
      :data="newsList"
      border
      highlight-current-row
      @row-click="getCurrentRow"
    >
      <el-table-column
        show-overflow-tooltip
        type="index"
        width="50"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="userCode"
        label="用户代码"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="userName"
        label="用户名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="userRole"
        label="所属角色"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="contactTel"
        label="联系电话"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="email"
        label="邮箱"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="有效状态" width="80">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.statusIsValid" disabled></el-checkbox>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="提示" :visible.sync="dialogVisible" v-if="dialogVisible">
      <creat-user
        :userData="sendData"
        @changeDialogVisible="changeVisible"
      ></creat-user>
    </el-dialog>
  </div>
</template>
<script>
import { getUserList } from '@/request/system/administrators.js'
import creatUser from './popup.vue'
export default {
  components: { creatUser },
  data() {
    return {
      query: {
        userCode: '',
        userName: '',
        contactTel: ''
      },
      dialogVisible: false, // 弹出层
      newsList: [],
      sendData: {},
      currentRow: {} // 当前点击选中的一行数据
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    changeVisible(val) {
      this.dialogVisible = val
    },
    getUserList() {
      getUserList({ SessionId: this.$store.state.user.SessionId_DX_H }).then(
        response => {
          this.newsList = response.data.data
        }
      )
    },
    getCurrentRow(row) {
      this.currentRow = row
    },
    // 编辑
    updataAdmin() {
      if (Object.keys(this.currentRow).length === 0) {
        this.$message.warning({ message: '您尚未选择需要编辑的内容' })
        return
      }
      this.dialogVisible = true
      this.sendData = Object.assign({}, this.currentRow)
    },
    // 新增
    creatAdmin() {
      this.currentRow = {}
      this.sendData = {}
      this.dialogVisible = true
    },
    delCurrentAdmin() {
      if (Object.keys(this.currentRow).length === 0) {
        this.$message({ message: '您尚未选择需要删除的内容' })
        return
      }
      this.getUserList()
    }
  }
}
</script>
