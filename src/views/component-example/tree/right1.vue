<template>
  <div>
    <el-form
      ref="refname"
      :model="form"
      label-width="100px"
      :label-position="right"
      size="mini"
      v-if="(flag = true)"
    >
      <div>
        <fieldset>
          <legend>菜单信息</legend>
          <el-form-item label="菜单序号:" prop="id">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="菜单代码:" prop="code">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="菜单名称:" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="URL地址:" prop="url">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item label="是否平台菜单:" prop="user1">
            <el-checkbox v-model="form.user1"></el-checkbox>
          </el-form-item>
          <el-form-item label="是否可用:" prop="user2">
            <el-checkbox v-model="form.user2"></el-checkbox>
          </el-form-item>
        </fieldset>
      </div>
      <div class="sty1">
        <el-button
          size="small"
          type="success"
          plain
          @click="addSubmit"
          style="margin-bottom: 10px"
          >添加功能</el-button
        >
        <fieldset>
          <legend>功能列表</legend>
          <el-table
            :data="tableData"
            class="tb-edit"
            style="width: 100%"
            highlight-current-row
            @row-click="handleCurrentChange"
            height="250px"
          >
            <el-table-column show-overflow-tooltip label="序号" width="100">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.nums"
                  placeholder="请输入内容"
                  @change="handleEdit(scope.$index, scope.row)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="功能代码" width="250">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.needcode"
                  placeholder="请输入内容"
                  @change="handleEdit(scope.$index, scope.row)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="功能名称" width="250">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.needname"
                  placeholder="请输入内容"
                  @change="handleEdit(scope.$index, scope.row)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="是否可用" width="100">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.checkData"
                  @change="handleEdit(scope.$index, scope.row)"
                ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="操作">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </fieldset>
      </div>
      <div style="margin: 140px 0 0 200px ">
        <el-form-item>
          <el-button
            type="info"
            size="medium"
            plain
            round
            @click="closeSubmit('refname')"
            >关闭</el-button
          >
          <el-button size="medium" type="info" plain round @click="onSubmit"
            >保存</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['id', 'cid'],
  data() {
    return {
      isopen: '',
      tableData: [],
      form: {
        user1: true,
        user2: true,
        id: '',
        name: '',
        code: '',
        url: ''
      },
      data6: [
        {
          num: '1.1.1',
          id: '1',
          code: 'MT11',
          name: '寻龙一部曲',
          url: 'www.3dabuliu.com',
          user1: true,
          user2: false
        },
        {
          num: '1.1.2',
          id: '2',
          code: 'MT12',
          name: '寻龙二部曲',
          url: 'www.3dabuliu.com',
          user1: true,
          user2: true
        },
        {
          num: '1.1.3',
          id: '3',
          code: 'MT13',
          name: '寻龙三部曲',
          url: 'www.3dabuliu.com',
          user1: true,
          user2: true
        }
      ],
      data7: [
        {
          num: '1.1.1',
          nums: '1',
          needcode: 'MT11',
          needname: '寻龙一部曲',
          checkData: true
        },
        {
          num: '1.1.2',
          nums: '2',
          needcode: 'MT12',
          needname: '寻龙二部曲',
          checkData: true
        },
        {
          num: '1.1.3',
          nums: '3',
          needcode: 'MT13',
          needname: '寻龙三部曲',
          checkData: true
        }
      ],
      data3: {},
      data4: []
    }
  },
  watch: {
    id: function() {
      this.get()
    },
    cid: function() {
      this.get()
    }
  },
  methods: {
    get() {
      for (let item of this.data6) {
        if (item.num === this.id) {
          this.form = item
        }
      }
      for (let j of this.data7) {
        if (j.num === this.id) {
          this.data4 = []
          this.data4.push(j)
          this.tableData = this.data4
        }
      }
    },

    handleCurrentChange(row, event, column) {
      console.log(row, event, column, event.currentTarget)
    },
    handleEdit(index) {
      console.log(index)
    },
    handleDelete(index) {
      let l = this.tableData.length
      if (l > 0) {
        if (index === l - 1) {
          this.tableData.splice(index, 1)
          this.tableData.num -= 1
          this.$message('删除成功')
        } else {
          this.$message.error('只允许删除最后一行数据哟')
        }
      } else {
        this.isopen = false
      }
    },
    addSubmit() {
      this.isopen = true
      let vm = this
      let l = vm.tableData.length
      if (
        l > 0 &&
        this.tableData[l - 1].needcode &&
        this.tableData[l - 1].needname !== ''
      ) {
        var nums = vm.tableData[l - 1].num + 1
      } else if (l === 0) {
        nums = 0
      } else {
        this.$message.error('请将功能列表数据补充完整后，再添加新的数据！')
        return
      }
      vm.tableData.push({
        num: nums,
        needcode: '',
        needname: '',
        checkData: true
      })
    },
    onSubmit() {
      if (this.isopen === true) {
        let i = this.tableData.length - 1
        if (
          this.form.code &&
          this.form.id &&
          this.form.name &&
          this.form.url &&
          this.tableData[i].needcode &&
          this.tableData[i].needname !== ''
        ) {
          return
        } else {
          this.$message.error('请填写完整数据后提交！')
        }
      } else {
        if (
          this.form.code &&
          this.form.id &&
          this.form.name &&
          this.form.url !== ''
        ) {
          return
        } else {
          this.$message.error('请填写完整数据后提交！')
        }
      }
    },
    closeSubmit(refname) {
      if (this.cid === 1) {
        this.$refs[refname].resetFields()
        this.tableData = []
        document.querySelector('#app').click()
      } else {
        document.querySelector('#app').click()
      }
    }
  }
}
</script>

<style scoped>
.sty1 {
  margin-top: 30px;
}

fieldset div {
  font-size: 13px;
}
</style>
