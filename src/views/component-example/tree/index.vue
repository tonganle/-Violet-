<template>
  <el-container style="height: 800px">
    <!-- 页面左面整体展开 -->
    <el-aside style="width: 280px" v-show="flag">
      <el-container>
        <!-- 左侧页面头部 -->
        <el-header class="leftheadstyle">
          <el-row type="flex" class="headborderstyle" justify="space-between">
            <el-col :span="12" class="headnamestyle">菜单结构</el-col>
            <el-col :span="10"></el-col>
            <el-col :span="2">
              <!-- 侧边栏收缩icon -->
              <svg class="icon" aria-hidden="true" @click="changeShow">
                <use xlink:href="#icon-cebianlanshousuo"></use>
              </svg>
            </el-col>
          </el-row>
        </el-header>
        <!-- 左侧页面主体树状部分 -->
        <el-main style="padding: 0">
          <div class="custom-tree-container">
            <el-tree
              :data="data2"
              node-key="id"
              default-expand-all
              ref="tree"
              highlight-current
              @node-expand="showOpenIcon"
              @node-collapse="showCloseIcon"
              @node-click="getRightData"
            >
              <!-- 插槽 插入图片 slot-scope被最新版本vue所淘汰， 最新使用v-slot -->
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>
                  <!-- 根据传过来的层数显示icon -->
                  <span v-if="data.level === '2'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-icon_workfile_line"></use>
                    </svg>
                  </span>
                  <span v-if="data.level === '3'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-icon_file"></use>
                    </svg>
                  </span>
                  {{ node.label }}
                </span>
              </span>
            </el-tree>
          </div>
        </el-main>
      </el-container>
    </el-aside>
    <!-- 页面左面整体收缩 -->
    <el-aside class="closeleftstyle" v-show="!flag">
      <el-col :span="2">
        <!-- 侧边栏展开icon -->
        <svg
          class="icon"
          aria-hidden="true"
          @click="changeShow"
          style="margin-left:7px"
        >
          <use xlink:href="#icon-cebianlandanchu"></use>
        </svg>
      </el-col>
    </el-aside>
    <!-- 页面右面整体展开 -->
    <el-main class="mainstyle">
      <!-- 右侧头部名字 -->
      <el-row type="flex" class="headborderstyle" justify="space-between">
        <el-col class="headnamestyle">菜单</el-col>
      </el-row>
      <!-- 右侧三个按钮 -->
      <el-row type="flex" class="button1">
        <!-- 新建 左侧点击节点 isShow判断是否点击 显示 -->
        <el-col :span="1" v-if="isShowPopover">
          <el-popover placement="top-start" width="600px" trigger="click">
            <RightMain1 :cid="cid"></RightMain1>
            <el-button slot="reference" type="primary" plain @click="getCid1"
              >新建</el-button
            >
          </el-popover>
        </el-col>
        <!-- 新建 左侧点击节点前显示 -->
        <el-col :span="1" v-if="!isShowPopover">
          <el-button type="primary" plain @click="getCid1">新建</el-button>
        </el-col>
        <!-- 编辑 -->
        <el-col :span="1" v-if="isShowPopover">
          <el-popover placement="top-start" width="600px" trigger="click">
            <RightMain1 :id="id" :cid="cid"></RightMain1>
            <el-button slot="reference" type="success" plain @click="getCid"
              >编辑</el-button
            >
          </el-popover>
        </el-col>
        <el-col :span="1" v-if="!isShowPopover">
          <el-button type="success" plain @click="getCid">编辑</el-button>
        </el-col>
        <!-- 删除 -->
        <el-col :span="1" v-if="isShowPopover">
          <el-button type="danger" @click="dialogVisible = true" plain
            >删除</el-button
          >
          <!-- dialog进行提示是否真的删除 -->
          <el-dialog
            title="删除"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="isClose"
            append-to-body="true"
          >
            <span>是否决定删除该菜单节点</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="deleteTreeData"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </el-col>
        <el-col :span="1" v-if="!isShowPopover">
          <el-button type="danger" plain @click="deleteTreeData"
            >删除</el-button
          >
        </el-col>
      </el-row>
      <RightMain :id="id"></RightMain>
    </el-main>
  </el-container>
</template>
<script>
// 导入右面组件展示页面
import RightMain from './right'
// 导入右面组件新建 编辑弹出组建，为减少判断逻辑，以及样式修改，所以不进行代码复用
import RightMain1 from './right1'
import test from './test'

export default {
  components: {
    RightMain,
    RightMain1
  },
  data() {
    return {
      flag: true,
      data2: test.listData,
      id: '',
      cid: 1,
      dialogVisible: false,
      isShowPopover: false
    }
  },

  methods: {
    showCloseIcon(data) {
      data.level = '3'
    },
    showOpenIcon(data) {
      data.level = '2'
    },
    changeShow() {
      this.flag = !this.flag
    },
    getRightData(data) {
      this.isShowPopover = true
      this.id = data.id
    },
    deleteTreeData() {
      if (this.id !== '') {
        this.dialogVisible = false
        this.$route.go(0)
      } else {
        this.$message.warning('请选择菜单节点后进行删除操作！')
      }
    },
    getCid() {
      if (this.id !== '') {
        this.cid = 0
      } else {
        this.$message.warning('请选择菜单节点后进行编辑操作！')
      }
    },
    getCid1() {
      if (this.id !== '') {
        this.cid = 1
      } else {
        this.$message.warning('请选择菜单节点后进行新建操作！')
      }
    },
    isClose(done) {
      this.$confirm('确认关闭？', {
        closeOnClickModal: false
      })
        .then(() => {
          done()
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss">
.container {
  padding: 0 !important;
}
.leftheadstyle {
  padding: 0 !important;
  height: 30px !important;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.button1 {
  height: 70px;
  div {
    margin-right: 20px;
    margin-top: 10px;
  }
}
.headnamestyle {
  margin-left: 10px;
  font-size: 14px;
}
.closeleftstyle {
  width: 30px !important;
  background: #f0f0f0;
}
.headborderstyle {
  box-shadow: 0 0 0 1px white;
  line-height: 30px;
  background: #f0f0f0;
}
.mainstyle {
  padding: 0;
  margin-left: 20px;
  background: white;
}
.sty1 {
  width: 800px;
  height: 200px;
}

.el-popover {
  height: 400px;
  overflow: auto;
}
.icon {
  width: 1.3rem;
  height: 1.3rem;
  cursor: pointer;
}
</style>
