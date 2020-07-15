<template>
  <div class="app-container">
    <split-pane :default-percent="20" split="vertical">
      <template slot="paneL">
        <div class="table">
          <div class="inner" ref="inner">
            <el-table
              highlight-current-row
              :height="maxHeight"
              :data="tableData"
              class="leftComp"
              @row-click="getCurrentRow"
            >
              <el-table-column
                show-overflow-tooltip
                prop="RLE_NAME"
                label="角色名称"
              ></el-table-column>
            </el-table>
          </div>
        </div>
      </template>
      <template slot="paneR">
        <el-row>
          <el-col :span="24">
            <!-- <div v-for="(item,index) in grandson" :key='index'>
                  <el-button  v-if="item.MDL_CODE === 'savepermissions'" style="margin-left:2rem;" type="primary" size="mini" @click="saveAuth">保存权限</el-button>
                
            </div>-->
            <el-button
              style="margin-left:2rem;"
              type="primary"
              size="mini"
              @click="saveAuth"
              >保存权限</el-button
            >
          </el-col>
        </el-row>
        <el-tree
          style="min-height:30rem;"
          :data="menuData"
          ref="tree"
          :default-checked-keys="initArr"
          :default-expanded-keys="initArr"
          show-checkbox
          node-key="MDL_UUID"
          :props="defaultProps"
          @check="getCurrentID"
          @check-change="handleCheckChange"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.MDL_NAME }}</span>
            <span class="menu">
              <el-checkbox
                v-for="item in data.Grandson"
                :key="item.MDL_UUID"
                v-model="item.CHECKED"
                @change="handleGrandsonChange($event, item)"
                :true-label="$Y"
                :false-label="$N"
                >{{ item.MDL_NAME }}</el-checkbox
              >
            </span>
          </span>
        </el-tree>
      </template>
    </split-pane>
  </div>
</template>

<script>
import { concat } from '@/utils/utils'
import { getAuthList, getAuthMenu, saveAuth } from '@/request/api'
import resizeMixin from '@/mixins/resize'
export default {
  name: 'router.auth',
  mixins: [resizeMixin],
  data() {
    return {
      maxHeight: -1,
      defaultProps: {
        children: 'Children',
        label: 'MDL_NAME'
      },
      tableData: [],
      menuData: [],
      checkedArr: [], //接口数据中checked的UUID的集合
      currentID: '',
      currentRow: '',
      allChecked: [],
      initArr: []
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
    this.getList()
  },
  created() {
    this.resize = () => {
      this.maxHeight = this.$refs.inner.offsetHeight
    }
  },
  methods: {
    // 获取左侧角色列表
    getList() {
      getAuthList().then(response => {
        // if (response.success == 1) {
        this.tableData = response.data.DXNXTD
        // }
        // else {
        //   if (response.msg) {
        //     this.$message.error(response.msg);
        //   } else {
        //     this.$message.error("获取角色列表失败");
        //   }
        // }
      })
      // .catch(() => {
      //   this.$message.error("获取角色列表失败");
      // });
    },
    // 获取当前行，得到当前行的权限数据
    getCurrentRow(row) {
      this.currentRow = row
      this.checkedArr = []
      this.currentID = ''
      this.menuData = []
      this.allChecked = []
      this.initArr = []
      getAuthMenu({
        ROLE_UUID: row.UUID
      }).then(response => {
        // if (response.success == 1) {
        let data = response.data.DXNXTD
        this.menuData = data
        var _this = this
        setTimeout(function() {
          _this.getCheckedList(data)
        }, 30)
      })
    },
    // 获取接口数据中checked的数组，组成数组，赋值给tree
    getCheckedList(data) {
      var initArr = []
      if (data) {
        for (let i = 0; i < data.length; i++) {
          var arr1 = data[i]
          if (arr1.CHECKED == 'Y') {
            // initArr.push(arr1.MDL_UUID);
            // this.$refs.tree.setChecked(arr1.MDL_UUID, true);
            // 第一级动态改变会改变所有子元素，所以他的值不需要手动改变，去添加子元素，父元素会根据子元素动态改变
          }
          if (arr1.Children.length > 0) {
            for (let j = 0; j < arr1.Children.length; j++) {
              var arr2 = arr1.Children[j]

              if (arr2.CHECKED == 'Y') {
                initArr.push(arr2.MDL_UUID)
                this.$refs.tree.setChecked(arr2.MDL_UUID, true)
              } else {
                this.$refs.tree.setChecked(arr2.MDL_UUID, false)
              }
              for (let k = 0; k < arr2.Grandson.length; k++) {
                var arr3 = arr2.Grandson[k]
                if (arr3.CHECKED == 'Y') {
                  this.checkedArr.push(arr3.MDL_UUID)
                }
              }
            }
          }
        }
      }
      this.initArr = initArr
      this.changeCheckArr()
    },
    // 保存权限操作
    saveAuth() {
      saveAuth({ ROLE_UUID: this.currentRow.UUID, MENU: this.allChecked }).then(
        () => {
          this.getCurrentRow(this.currentRow)
          this.$message.success('保存权限成功')
        }
      )
    },
    findChildren(obj, status) {
      if (obj.MDL_UUID != this.currentID) {
        return
      } //必要

      for (var i = 0; i < this.menuData.length; i++) {
        var a = this.menuData[i]
        if (a.MDL_UUID === obj.MDL_UUID) {
          for (let j = 0; j < a.Children.length; j++) {
            let b = a.Children[j]
            for (let k = 0; k < b.Grandson.length; k++) {
              let c = b.Grandson[k]
              if (status) {
                c.CHECKED = 'Y'
                this.changeCheckArr('add', c.MDL_UUID)
              } else {
                c.CHECKED = 'N'
                this.changeCheckArr('del', c.MDL_UUID)
              }
            }
          }
        } else {
          for (let j = 0; j < a.Children.length; j++) {
            let b = a.Children[j]
            if (b.MDL_UUID === obj.MDL_UUID) {
              for (let k = 0; k < b.Grandson.length; k++) {
                let c = b.Grandson[k]
                if (status) {
                  c.CHECKED = 'Y'
                  this.changeCheckArr('add', c.MDL_UUID)
                } else {
                  c.CHECKED = 'N'
                  this.changeCheckArr('del', c.MDL_UUID)
                }
              }
            }
          }
        }
      }
      this.changeCheckArr() //有的children或Grandson数组长度为0，不会触发changeCheckArr,所以手动触发
    },
    // 获取当前ID
    getCurrentID(data) {
      this.currentID = data.MDL_UUID
    },
    // tree节点checkbox选中状态改变时触发
    handleCheckChange(data, checked) {
      var _this = this
      setTimeout(function() {
        if (data.MDL_UUID === _this.currentID) {
          _this.findChildren(data, checked)
        }
      }, 30)
    },
    changeCheckArr(way, ID) {
      this.allChecked = []
      if (way === 'add') {
        if (this.checkedArr.indexOf(ID) == -1) {
          this.checkedArr.push(ID)
        }
      } else if (way === 'del') {
        let ind = this.checkedArr.indexOf(ID)
        if (ind != -1) {
          this.checkedArr.splice(ind, 1)
        }
      }
      var arr1 = Object.assign([], this.checkedArr)
      var arr2 = Object.assign([], this.$refs.tree.getCheckedKeys())
      var arr3 = Object.assign([], this.$refs.tree.getHalfCheckedKeys())
      var allChecked = new Array()
      allChecked = concat(arr1, arr2, arr3)
      for (var a = 0; a < allChecked.length; a++) {
        this.allChecked.push({ MDL_UUID: allChecked[a] })
      }
    },
    handleGrandsonChange(status, currentData) {
      this.currentID = currentData.MDL_UUID
      if (status === 'Y') {
        this.changeCheckArr('add', currentData.MDL_UUID)
      } else if (status === 'N') {
        this.changeCheckArr('del', currentData.MDL_UUID)
      }

      var newMenuData = this.menuData
      for (var z = 0; z < newMenuData.length; z++) {
        var newArr1 = newMenuData[z]

        var newObj = {}
        for (var y = 0; y < newArr1.Children.length; y++) {
          var newArr3 = newArr1.Children[y]

          newObj = newArr3.Grandson.find(newItem => {
            return newItem.MDL_UUID === currentData.MDL_UUID
          })

          if (newObj && Object.keys(newObj).length != 0) {
            if (status === 'Y') {
              this.$refs.tree.setChecked(newArr3.MDL_UUID, true)
            } else {
              return
            }
            return
          }
        }
        this.changeCheckArr() //有的children或Grandson数组长度为0，不会触发changeCheckArr,所以手动触发
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 1.5rem;
  height: 100%;
}

.custom-tree-node {
  display: block;
  width: 100%;
  span:first-child {
    display: inline-block;
    width: 30%;
  }
  .menu {
    width: 70%;
    display: inline-block;
  }
  // flex: 1;
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
  // font-size: 14px;
  // padding-right: 8px;
}
.table {
  flex: 1;
  position: relative;
  overflow: hidden;
  height: 100%;
  .inner {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
<style lang="scss">
// .is-leaf:before{
//     float: right;
//     font-size:2rem;
//     color:red;
// }
</style>
