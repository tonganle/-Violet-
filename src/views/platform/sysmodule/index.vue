<template>
  <div class="app-container">
    <split-pane split="vertical" :default-percent="20">
      <template slot="paneL">
        <el-scrollbar wrapClass="scrollbar-wrapper">
          <div class="tree">
            <el-tree
              @node-click="handleNodeClick"
              ref="vuetree"
              :check-strictly="true"
              highlight-current
              check-on-click-node
              node-key="UUID"
              default-expand-all
              :data="data"
              :props="defaultProps"
            >
              <span slot-scope="{ node, data }">
                <span>{{ data.MDL_NAME }}</span>
                <span>{{ data.RV_REFERRED }}</span>
              </span>
            </el-tree>
          </div>
        </el-scrollbar>
      </template>
      <template slot="paneR" :default-percent="70">
        <div class="right-detail" ref="flexDiv">
          <div class="top-type" ref="flexTable">
            <!-- <div class="btn-area">
              <el-button class="btn" plain type="primary" @click="addRefType" :disabled="typeAddDisabled">{{$t('baseCode.addClassify')}}</el-button>
              <el-button class="btn" plain type="primary" @click="editRefType" :disabled='typeEditDisabled'>{{$t('baseCode.editClassify')}}</el-button>
              <el-button class="btn" plain type="primary" @click="delRefType" :disabled='typeDelDisabled'>{{$t('baseCode.delClassify')}}</el-button>
            </div>-->
            <fieldset>
              <legend style="font-size: 1.5rem;">菜单信息</legend>
              <el-form
                label-position="right"
                size="mini"
                label-width="11rem"
                :model="currentType"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="菜单序号：">
                      <span>{{ currentType.MDL_SEQ }}</span>
                      <!-- <el-input :title="currentType.RV_DOMAIN" :disabled="true" v-model="currentType.RV_DOMAIN"></el-input> -->
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="菜单代码：">
                      <span>{{ currentType.MDL_CODE }}</span>
                      <!-- <el-input :title="currentType.RV_DOMAIN" :disabled="true" v-model="currentType.RV_DOMAIN"></el-input> -->
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="菜单名称：">
                      <span>{{ currentType.MDL_NAME }}</span>
                      <!-- <el-input :title="currentType.RV_DOMAIN" :disabled="true" v-model="currentType.RV_DOMAIN"></el-input> -->
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" style="word-break:break-all;">
                    <el-form-item label="URL地址：">
                      <span>{{ currentType.MDL_URL }}</span>
                      <!-- <el-input :title="currentType.RV_DOMAIN" :disabled="true" v-model="currentType.RV_DOMAIN"></el-input> -->
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="是否平台菜单：">
                      <el-checkbox
                        v-model="currentType.MDL_ISP"
                        true-label="Y"
                        false-label="N"
                        disabled
                      ></el-checkbox>
                      <!-- <el-input :title="currentType.RV_DOMAIN" :disabled="true" v-model="currentType.RV_DOMAIN"></el-input> -->
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="是否可用：">
                      <el-checkbox
                        v-model="currentType.MDL_VALID"
                        true-label="Y"
                        false-label="N"
                        disabled
                      ></el-checkbox>
                      <!-- <el-input :title="currentType.RV_DOMAIN" :disabled="true" v-model="currentType.RV_DOMAIN"></el-input> -->
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </fieldset>
          </div>
          <div class="bottom-code">
            <div class="flex-table">
              <div class="inner">
                <fieldset style="min-width:95%;">
                  <legend style="font-size: 1.5rem;">功能列表</legend>
                  <el-table
                    :data="currentType.Children"
                    :height="maxHeight"
                    highlight-current-row
                    @row-click="getCurrentCodeRow"
                    :header-cell-style="{ textAlign: 'center' }"
                    border
                  >
                    <el-table-column
                      prop="MDL_SEQ"
                      align="center"
                      width="70"
                      label="序号"
                    ></el-table-column>
                    <!--绑定中英文  -->
                    <el-table-column
                      prop="MDL_CODE"
                      show-overflow-tooltip
                      align="left"
                      label="功能代码"
                    ></el-table-column>
                    <el-table-column
                      prop="MDL_NAME"
                      show-overflow-tooltip
                      align="left"
                      label="功能名称"
                    ></el-table-column>
                    <el-table-column label="是否可用" align="center">
                      <template slot-scope="scope">
                        <el-checkbox
                          v-model="scope.row.MDL_VALID"
                          true-label="Y"
                          false-label="N"
                          :key="scope.$index"
                          disabled
                        ></el-checkbox>
                      </template>
                    </el-table-column>
                  </el-table>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </template>
    </split-pane>

    <!-- 代码分类dialog -->
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-el-drag-dialog
      :title="$t(TypeMap[TypeDialogStatus])"
      :visible.sync="RefTypeDialogVisible"
      v-if="RefTypeDialogVisible"
      :before-close="handleTypeDialogClose">
      <el-form
        label-position="right"
        :model="RefTypeData"
        ref="RefTypeData"
        :rules="RefTypeDataRules"
        label-width="10rem"
        size="mini"
      >
        <fieldset>
          <legend style="font-size: 1.5rem;">菜单信息</legend>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="MDL_SEQ" label="菜单序号：">
                <el-input
                  v-model="RefTypeData.MDL_SEQ"
                  maxlength="4"
                  @keyup.native="checkCode"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="MDL_CODE" label="菜单代码：">
                <el-input
                  v-model="RefTypeData.MDL_CODE"
                  maxlength="16"
                  placeholder="请输入英文字母"
                  @keyup.native="checkCode"
                  @change="uppercase('MDL_CODE')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="MDL_NAME" label="菜单名称：">
                <el-input
                  v-model="RefTypeData.MDL_NAME"
                  maxlength="32"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="MDL_URL" label="URL地址：">
                <el-input
                  v-model="RefTypeData.MDL_URL"
                  maxlength="150"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="MDL_ISP" label="是否平台菜单：">
                <el-checkbox
                  v-model="currentType.MDL_ISP"
                  true-label="Y"
                  false-label="N"
                ></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="MDL_VALID" label="是否可用：">
                <el-checkbox
                  v-model="currentType.MDL_VALID"
                  true-label="Y"
                  false-label="N"
                ></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
        <el-button
          class="btn"
          style="margin-top:1rem"
          plain
          type="primary"
          @click="addRefCode"
          >新增功能</el-button
        >
        <fieldset class="tableStyle">
          <legend style="font-size: 1.5rem;">功能列表</legend>
          <el-table
            cell-class-name="cell-form"
            size="mini"
            :data="RefTypeData.Children"
            border
            style="width: 100%"
            highlight-current-row
            :header-cell-style="{ textAlign: 'center' }"
          >
            <el-table-column
              show-overflow-tooltip
              label-class-name=" "
              label="序号"
              width="100"
              align="center"
              prop="MDL_SEQ"
            >
              <template slot-scope="scope">
                <el-form-item
                  class="table-form"
                  :prop="'Children.' + scope.$index + '.MDL_SEQ'"
                  :rules="RefCodeDataRules.MDL_SEQ"
                  label-width="0px"
                >
                  <el-input
                    :title="scope.row.MDL_SEQ"
                    size="mini"
                    v-model="scope.row.MDL_SEQ"
                    @keyup.native="checkChildrenCode(scope.$index)"
                  ></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              label-class-name="title"
              prop="MDL_CODE"
              label="功能代码"
              min-width="180"
              align="left"
            >
              <template slot-scope="scope">
                <el-form-item
                  class="table-form"
                  :prop="'Children.' + scope.$index + '.MDL_CODE'"
                  :rules="RefCodeDataRules.MDL_CODE"
                  label-width="0px"
                >
                  <el-input
                    size="mini"
                    :title="scope.row.MDL_CODE"
                    v-model="scope.row.MDL_CODE"
                    placeholder="请输入英文字母"
                    @keyup.native="checkChildrenCode(scope.$index)"
                    @change="upperChildCase(scope.$index)"
                  ></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              label-class-name="title"
              prop="MDL_NAME"
              label="功能名称"
              min-width="180"
              align="left"
            >
              <template slot-scope="scope">
                <el-form-item
                  class="table-form"
                  :prop="'Children.' + scope.$index + '.MDL_NAME'"
                  :rules="RefCodeDataRules.MDL_NAME"
                  label-width="0px"
                >
                  <el-input size="mini" v-model="scope.row.MDL_NAME"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="是否可用"
              width="140"
              align="center"
            >
              <template slot-scope="scope">
                <el-form-item class="table-form" label-width="0px">
                  <el-checkbox
                    v-model="scope.row.MDL_VALID"
                    true-label="Y"
                    false-label="N"
                    :key="scope.$index"
                  ></el-checkbox>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              :label="$t('message.operation')"
              min-width="100"
              align="center"
            >
              <template slot-scope="scope">
                <el-form-item class="table-form" label-width="0px">
                  <span
                    class="el-tag el-tag--danger el-tag--mini"
                    style="cursor: pointer;"
                    @click="delRefCode(scope.row, scope.$index)"
                    v-show="!isChange"
                    >删除</span
                  >
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </fieldset>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button class="btn" @click="handleTypeDialogClose">关闭</el-button>
        <el-button class="btn" type="primary" @click="commitType"
          >保存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  checkSysList,
  checkInfoList,
  editInfoList,
  delInfoList,
  addInfoList
} from '@/request/api'
import { toString } from '@/utils/utils'
import resizeMixin from '@/mixins/resize'
export default {
  name: 'router.sysmodule',
  mixins: [resizeMixin],
  data() {
    return {
      isChange: true,
      maxHeight: -1,
      data: [
        {
          father: '',
          RV_REFERRED: '菜单',
          Children: []
        }
      ],
      defaultProps: {
        label: 'RV_REFERRED',
        children: 'Children'
      },
      TypeMap: {
        updateType: 'baseCode.editClassify',
        createType: 'baseCode.addClassify'
      },
      CodeMap: {
        updateCode: 'baseCode.editCode',
        createCode: 'baseCode.addCode'
      },
      // 按钮是否可用的状态
      typeAddDisabled: true,
      typeEditDisabled: true,
      typeDelDisabled: true,
      CodeAddDisabled: true,
      CodeEditDisabled: true,
      CodeDelDisabled: true,
      //
      TypeDialogStatus: '',
      CodeDialogStatus: '',
      currentNode: {},
      currentType: {},
      codeNum: 0,
      currentCodeList: [],
      currentCode: {},
      RefTypeDialogVisible: false, // 代码分类 Dialog
      RefCodeDialogVisible: false, // 基础代码 Dialog
      // 最新添加的代码分类的RV_DOMAIN 通过这个判断是否最新添加的代码分类并高亮显示
      lastRefTypeRV_DOMAIN: '',
      // 代码分类
      RefTypeData: {}, // 代码分类 dialog内的form
      RefTypeDataRules: {
        MDL_SEQ: [
          { required: true, message: '请填写菜单序号', trigger: 'blur' },
          { min: 1, max: 4, message: '至多输入4个字符', trigger: 'blur' }
        ],
        MDL_CODE: [
          { required: true, message: '请填写菜单代码', trigger: 'blur' },
          { min: 1, max: 16, message: '至多输入16个字符', trigger: 'blur' }
        ],
        MDL_NAME: [
          { required: true, message: '请填写菜单名称', trigger: 'blur' },
          { min: 1, max: 32, message: '至多输入32个字符', trigger: 'blur' }
        ],
        MDL_URL: [
          { min: 1, max: 150, message: '至多输入150个字符', trigger: 'blur' }
        ]
      },
      RefCodeDataRules: {
        MDL_SEQ: [
          { required: true, message: '请填写序号', trigger: 'blur' },
          { min: 1, max: 4, message: '至多输入4个字符', trigger: 'blur' }
        ],
        MDL_CODE: [
          { required: true, message: '请填写功能代码', trigger: 'blur' },
          { min: 1, max: 16, message: '至多输入16个字符', trigger: 'blur' }
        ],
        MDL_NAME: [
          { required: true, message: '请填写功能名称', trigger: 'blur' },
          { min: 1, max: 32, message: '至多输入32个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    disableTypeCode() {
      return this.TypeDialogStatus === 'updateType'
    },
    disableCodeCode() {
      return this.CodeDialogStatus === 'updateCode'
    }
  },
  beforeMount() {
    this.getRefTypeList()
  },
  methods: {
    checkCode() {
      this.RefTypeData.MDL_CODE = this.RefTypeData.MDL_CODE.replace(
        /[^a-zA-Z]/g,
        ''
      )
      this.RefTypeData.MDL_SEQ = this.RefTypeData.MDL_SEQ.replace(/[^0-9]/g, '')
    },
    checkChildrenCode(key) {
      this.RefTypeData.Children[key].MDL_SEQ = this.RefTypeData.Children[
        key
      ].MDL_SEQ.replace(/[^0-9]/g, '')
      this.RefTypeData.Children[key].MDL_CODE = this.RefTypeData.Children[
        key
      ].MDL_CODE.replace(/[^a-zA-Z]/g, '')
    },
    uppercase(key) {
      this.RefTypeData[key] = this.RefTypeData[key].toUpperCase()
    },
    upperChildCase(key) {
      this.RefTypeData.Children[key].MDL_CODE = this.RefTypeData.Children[
        key
      ].MDL_CODE.toUpperCase()
    },
    resetTree() {
      this.$nextTick(() => {
        this.$refs.vuetree.setCheckedNodes([this.data[0].Children[0]])
      })
    },
    // 找到最新的代码分类
    findLastRefType() {
      if (this.lastRefTypeRV_DOMAIN) {
        for (let i = 0; i < this.data[0].Children.length; i++) {
          if (
            this.data[0].Children[i].RV_DOMAIN === this.lastRefTypeRV_DOMAIN
          ) {
            return this.data[0].Children[i]
          }
        }
      }
      return false
    },
    // 获取代码分类树
    getRefTypeList() {
      checkSysList().then(response => {
        // if (response.success != 1) {
        //   if (response.msg != "" && response.msg != null) {
        //     this.$message.error({ message: response.msg });
        //   } else {
        //     this.$message.error({ message: "获取基础代码分类失败！" });
        //   }
        //   return;
        // }
        this.data[0].Children = response.data.DXNXTD

        // 找到最新添加的代码并设置高亮
        let findLastRefType = this.findLastRefType()
        if (findLastRefType) {
          this.$nextTick(() => {
            this.$refs.vuetree.setCurrentNode(findLastRefType)
            this.handleNodeClick(findLastRefType)
            this.lastRefTypeRV_DOMAIN = ''
          })
        }
        this.typeAddDisabled = false // 初始化完成，新增按钮可用
      })
      // .catch(error => {
      //   this.$message.error({ message: "获取基础代码分类失败！" });
      // });
    },
    getRefType(data) {
      checkInfoList(data).then(response => {
        // console.log('this is  type')
        // console.log(response)
        // if (response.success != 1) {
        //   if (response.msg != "" && response.msg != null) {
        //     this.$message.error({ message: response.msg });
        //   } else {
        //     this.$message.error({ message: "获取代码分类详细信息失败!！" });
        //   }
        //   return;
        // }
        this.currentType = response.data.DXNXTD[0] || {}
      })
      // .catch(_ => {
      //   this.$message.error({ message: "获取代码分类详细信息失败！" });
      // });
    },
    // 树节点的点击事件
    handleNodeClick(data) {
      if (data.father == '') {
        this.typeEditDisabled = true
        this.typeDelDisabled = true
        return
      }
      this.currentNode = data
      // console.log('this.currentNode')
      // console.log(this.currentNode)
      this.typeAddDisabled = false
      this.typeEditDisabled = false
      this.typeDelDisabled = false
      this.getRefType(this.currentNode)
    },
    // 点击基础代码表格的一行，获取到当前行的数据
    getCurrentCodeRow(row) {
      this.currentCode = row
      this.CodeAddDisabled = false
      this.CodeEditDisabled = false
      this.CodeDelDisabled = false
    },
    // 代码分类 -- 添加
    addRefType() {
      this.codeNum = 0
      this.TypeDialogStatus = 'createType'
      this.resetRefType()
      this.RefTypeDialogVisible = true
    },
    // 代码分类 -- 编辑
    editRefType() {
      this.isChange = false
      this.TypeDialogStatus = 'updateType'
      this.RefTypeDialogVisible = true
      this.RefTypeData = Object.assign({}, this.currentType)
      // 跟新修改人
      for (let i in this.RefTypeData.Children) {
        this.$set(
          this.RefTypeData.Children[i],
          'LASTMODIFIER',
          this.$store.state.user.USR_CODE_DX_H
        )
      }
    },
    // 代码分类 -- 删除
    delRefType() {
      this.$confirm('你确定要删除此数据吗？', {
        closeOnClickModal: false
      })
        .then(() => {
          this.commitDelType()
        })
        .catch(() => {})
    },
    // 代码分类 -- 确认删除
    commitDelType() {
      delInfoList(this.currentType).then(() => {
        this.$message.success({ message: '删除分类成功！' })
        // 删除成功，页面变为重置状态
        this.getRefTypeList()
        this.currentType = {}
        this.currentCodeList = []
        this.typeAddDisabled = false
        this.typeEditDisabled = true
        this.typeDelDisabled = true
        this.CodeAddDisabled = true
        this.CodeEditDisabled = true
        this.CodeDelDisabled = true
      })
    },
    // 代码分类的dialog  先判断是 提交 or 编辑
    commitType() {
      this.$refs['RefTypeData'].validate(valid => {
        if (!valid) {
          return false
        }
        if (this.TypeDialogStatus == 'updateType') {
          this.commitEditType(this.RefTypeData)
        } else if (this.TypeDialogStatus == 'createType') {
          this.commitAddType(this.RefTypeData)
        }
      })
    },
    // 代码分类 -- 编辑--的form表单
    commitEditType(formdata) {
      editInfoList(formdata).then(() => {
        this.$message.success({ message: '编辑成功！' })

        // 代码高亮 但是 现在mock搞不了
        this.getRefTypeList()
        this.currentType = {}
        this.currentCodeList = []
        this.typeAddDisabled = false
        this.typeEditDisabled = true
        this.typeDelDisabled = true
        this.RefTypeDialogVisible = false
      })
    },
    // 代码分类 -- 添加--的form表单
    commitAddType(formdata) {
      addInfoList(formdata).then(() => {
        this.$message.success({ message: '新增分类成功！' })
        this.lastRefTypeRV_DOMAIN = formdata.RV_DOMAIN
        this.getRefTypeList()
        this.RefTypeDialogVisible = false
      })
    },

    // 基础代码 -- 添加
    addRefCode() {
      this.CodeDialogStatus = 'createCode'
      this.resetRefCode()
    },

    // 功能列表数据 -- 删除
    delRefCode(row, index) {
      this.$confirm('你确定要删除此数据吗？', {
        closeOnClickModal: false
      })
        .then(() => {
          this.RefTypeData.Children.splice(index, 1)
          for (let i in this.RefTypeData.Children) {
            this.$set(
              this.RefTypeData.Children[i],
              'MDL_SEQ',
              toString(Number(i) + 1)
            )
          }
        })
        .catch(() => {})
    },

    handleTypeDialogClose() {
      this.$confirm('当前编辑信息未保存，是否保存？', {
        distinguishCancelAndClose: true,
        confirmButtonText: '是',
        cancelButtonText: '否',
        closeOnClickModal: false
      })
        .then(() => {
          this.commitType()
        })
        .catch(() => {
          this.RefTypeDialogVisible = false
        })
    },

    // restet 代码分类
    resetRefType() {
      return (this.RefTypeData = {
        MDL_SEQ: '0',
        MDL_CODE: '',
        MDL_NAME: '',
        MDL_URL: '',
        MDL_ISP: 'N',
        MDL_VALID: 'N',
        MDL_TYPE: 'M',
        Children: []
      })
    },
    resetRefCode() {
      this.codeNum = this.RefTypeData.Children.length + 1
      this.isChange = false
      return this.RefTypeData['Children'].push({
        MDL_NAME: '',
        MDL_CODE: '',
        MDL_SEQ: toString(this.codeNum),
        MDL_TYPE: 'B',
        MDL_VALID: 'Y'
      })
    }
  },
  created() {
    this.resize = () => {
      this.maxHeight =
        this.$refs.flexDiv.offsetHeight -
        this.$refs.flexTable.offsetHeight -
        105
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  overflow: hidden;
  background-color: #fff;
  position: relative;
  height: 100%;
}
.tree {
  padding-right: 20px;
  font-size: 1.4rem;
}
.right-detail {
  padding-left: 50px;
  height: 100%;
  position: relative;
  padding-top: 25px;
  .bottom-code {
    height: 70%;
    margin-top: 3%;
    display: flex;
    flex-direction: column;
    .flex-table {
      flex: 0%;
      width: 100%;
      overflow: hidden;
      .inner {
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
    }
    .btn-area {
      flex: none;
    }
  }
  .top-type {
    box-sizing: border-box;
    min-height: 30%;
    width: 100%;
    overflow: auto;
    table {
      max-width: 100%;
      font-size: 1.4rem;
      td {
        min-width: 170px;
        line-height: 3rem;
        padding-right: 3rem;
      }
    }
  }
}
.btn {
  min-width: 80px;
  padding: 0 20px;
  height: 28px;
}
.el-table-add-row {
  margin-top: 10px;
  width: 100%;
  height: 34px;
  border: 1px dashed #c1c1cd;
  border-radius: 3px;
  cursor: pointer;
  justify-content: center;
  display: flex;
  line-height: 34px;
}
.title {
  :before {
    content: '*';
    color: #f56c6c;
  }
}
.tableStyle {
  .el-table {
    .el-table__body-wrapper
      .el-table__body
      .el-table__row
      tr
      td
      .el-form-item__content
      .el-form-item__error {
      position: relative;
      padding-top: 0px;
    }
  }
}
.cell-form {
  .cell {
    overflow: inherit;
  }
}
</style>
