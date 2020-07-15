<template>
  <div class="app-container">
    <template>
      <div class="right-detail">
        <div class="cbox">
          <el-form
            class="form"
            :model="flt"
            ref="flt"
            :rules="rules"
            label-width="7rem"
            size="mini"
          >
            <el-row :gutter="12" class="row">
              <el-col :span="4">
                <el-form-item label="类型编号" prop="RV_DOMAIN">
                  <el-input
                    maxlength="4"
                    v-model="flt.RV_DOMAIN"
                    @keyup.native="checkCode"
                    @change="uppercase('RV_DOMAIN')"
                    style="width: 100%"
                    placeholder="请输入类型编号"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="类型名称" prop="RV_NAME">
                  <el-input
                    v-model="flt.RV_NAME"
                    placeholder="请输入类型名称"
                    style="width: 100%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item label-width="10px">
                  <el-button @click="searchType" type="primary">查询</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <split-pane split="horizontal" v-on:resize="resize">
          <!-- 上半部分 -->
          <template slot="paneL">
            <div class="top-type" ref="topType">
              <div class="btn-area" ref="btnArea">
                <!-- <div v-for="(item,index) in grandson" :key='index'>
                  <el-button v-if="item.MDL_CODE === 'addtype'" size="mini" type="primary" plain @click="addRefType">新增</el-button>
                  <el-button v-if="item.MDL_CODE === 'edittype'" size="mini" type="primary" plain @click="editRefType">编辑</el-button>
                  <el-button v-if="item.MDL_CODE === 'deletetype'" size="mini" type="primary" plain @click="delRefType">删除</el-button>
                </div>-->
                <el-button plain size="mini" type="primary" @click="addRefType"
                  >新增</el-button
                >
                <el-button plain size="mini" type="primary" @click="editRefType"
                  >编辑</el-button
                >
                <el-button plain size="mini" type="primary" @click="delRefType"
                  >删除</el-button
                >
              </div>

              <!-- 状态（E-启用 N-未启用 D-停用） -->
              <el-table
                :data="TypeList"
                :height="typeHeight"
                highlight-current-row
                @row-click="getCurrentTypeRow"
                border
                :header-cell-style="{ textAlign: 'center' }"
                :cell-style="{}"
              >
                <el-table-column
                  show-overflow-tooltip
                  type="index"
                  :index="indexMethodType"
                  label="序号"
                  align="center"
                  width="60"
                ></el-table-column>
                <!--绑定中英文  -->
                <el-table-column
                  show-overflow-tooltip
                  prop="RV_DOMAIN"
                  align="left"
                  label="类型编号"
                ></el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="RV_NAME"
                  align="left"
                  label="类型名称"
                ></el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  label="有效标识"
                  width="85"
                >
                  <template slot-scope="scope">
                    <!-- prop="RV_ISVALID" -->
                    <!-- {{scope.row.RV_ISVALID}} -->
                    <div
                      style="text-align: center;"
                      v-if="scope.row.RV_ISVALID == 'Y'"
                    >
                      <el-checkbox v-model="checkedY" disabled></el-checkbox>
                    </div>
                    <div
                      style="text-align: center;"
                      v-if="scope.row.RV_ISVALID == 'N'"
                    >
                      <el-checkbox v-model="checkedN" disabled></el-checkbox>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="CREATOR"
                  align="left"
                  label="创建人"
                ></el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="CREATED"
                  align="center"
                  label="创建时间"
                ></el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="LASTMODIFIER"
                  align="left"
                  label="修改人"
                ></el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="LASTMODIFIED"
                  align="center"
                  label="修改时间"
                ></el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  header-align="left"
                  align="left"
                  prop="RV_REMARK"
                  label="备注"
                ></el-table-column>
              </el-table>
              <div>
                <el-pagination
                  class="pagination"
                  small
                  background
                  ref="typePagination"
                  @size-change="typeHandleSizeChange"
                  @current-change="typeHandleCurrentChange"
                  :current-page.sync="typeCurrentPage"
                  :page-sizes="[30, 60, 90, 120]"
                  :page-size="typePageSize"
                  layout="sizes, prev, pager, next, jumper, total"
                  :total="typeTotal"
                ></el-pagination>
              </div>
            </div>
          </template>

          <!-- 下半部分 -->
          <template slot="paneR">
            <div class="codeNumberCode" style="background-color: #fff;">
              代码详情
            </div>
            <div
              class="bottom-code"
              ref="bottomCode"
              style="background-color: #fff;"
            >
              <div class="btn-area" ref="detlArea">
                <!-- <div v-for="(item,index) in grandson" :key='index'>
                        <el-button v-if="item.MDL_CODE === 'addcode'" size="mini" type="primary" plain @click="addRefCode">新增</el-button>
                        <el-button v-if="item.MDL_CODE === 'editcode'" size="mini" type="primary" plain @click="editRefCode">编辑</el-button>
                        <el-button v-if="item.MDL_CODE === 'deletecode'" size="mini" type="primary" plain @click="delRefCode">删除</el-button>
                </div>-->
                <el-button plain size="mini" type="primary" @click="addRefCode"
                  >新增</el-button
                >
                <el-button plain size="mini" type="primary" @click="editRefCode"
                  >编辑</el-button
                >
                <el-button plain size="mini" type="primary" @click="delRefCode"
                  >删除</el-button
                >
              </div>
              <el-table
                :height="detlHeight"
                :data="currentCodeList"
                highlight-current-row
                @row-click="getCurrentCodeRow"
                border
                :header-cell-style="{
                  textAlign: 'center'
                }"
                :cell-style="{}"
              >
                <el-table-column
                  show-overflow-tooltip
                  type="index"
                  :index="indexMethodDet"
                  label="序号"
                  width="60"
                  align="center"
                ></el-table-column>
                <!--绑定中英文  -->
                <el-table-column
                  show-overflow-tooltip
                  width="180"
                  align="left"
                  prop="RV_DOMAIN"
                  label="代码编号"
                ></el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  width="180"
                  align="left"
                  prop="RV_NAME"
                  label="代码名称"
                ></el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  width="180"
                  align="center"
                  label="有效标志"
                >
                  <template slot-scope="scope">
                    <div v-if="scope.row.RV_ISVALID == 'Y'">
                      <el-checkbox v-model="checkedY" disabled></el-checkbox>
                    </div>
                    <div v-if="scope.row.RV_ISVALID == 'N'">
                      <el-checkbox v-model="checkedN" disabled></el-checkbox>
                    </div>
                  </template>
                </el-table-column>
                <!--有效标示（Y-是 N-否）-->
                <el-table-column
                  show-overflow-tooltip
                  prop="CREATOR"
                  align="left"
                  label="创建人"
                ></el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="CREATED"
                  align="center"
                  label="创建时间"
                ></el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="LASTMODIFIER"
                  align="left"
                  label="修改人"
                ></el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="LASTMODIFIED"
                  align="center"
                  label="修改时间"
                ></el-table-column>
              </el-table>
              <div>
                <el-pagination
                  class="pagination"
                  small
                  background
                  ref="codePagination"
                  @size-change="detlHandleSizeChange"
                  @current-change="detlHandleCurrentChange"
                  :current-page.sync="detlCurrentPage"
                  :page-sizes="[30, 60, 90, 120]"
                  :page-size="detlPageSize"
                  layout="sizes, prev, pager, next, jumper, total"
                  :total="detlTotal"
                ></el-pagination>
              </div>
            </div>
          </template>
        </split-pane>
      </div>
    </template>

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
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item prop="RV_DOMAIN" label="类型编号：">
              <el-input
                maxlength="4"
                :disabled="disableType"
                v-model="RefTypeData.RV_DOMAIN"
                @keyup.native="typecheck"
                @change="typeuppercase('RV_DOMAIN')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item prop="RV_NAME" label="类型名称：">
              <el-input
                maxlength="32"
                :disabled="disableType"
                v-model="RefTypeData.RV_NAME"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="22">
            <el-form-item prop="RV_ISVALID" label="有效标志：">
              <el-radio-group v-model="RefTypeData.RV_ISVALID">
                <el-radio label="Y">是</el-radio>
                <el-radio label="N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item prop="RV_REMARK" label="备注：">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3 }"
                maxlength="128"
                v-model="RefTypeData.RV_REMARK"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="RefTypeDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="commitType">保存</el-button>
      </div>
    </el-dialog>

    <!-- 代码详情 dialog -->
    <el-dialog
      v-el-drag-dialog
      :title="$t(CodeMap[CodeDialogStatus])"
      :visible.sync="RefCodeDialogVisible"
      v-if="RefCodeDialogVisible"
      :before-close="handleCodeDialogClose">
      <el-form
        label-position="right"
        :model="RefCodeData"
        ref="RefCodeData"
        :rules="RefCodeDataRules"
        label-width="10rem"
        size="mini"
      >
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item prop="RCT_UUID" label="代码类型：">
              <el-select
                v-model="RefCodeData.RCT_UUID"
                filterable
                :disabled="CodeRCTUUID"
                placeholder="代码类型"
                size="mini"
                style="width: 100%"
              >
                <el-option
                  v-for="(item, index) in rleTypes"
                  :value="item.UUID"
                  :key="index"
                  :label="item.RV_NAME"
                  :title="item.RV_NAME"
                >
                  <!-- <span style="float: left">{{ item.RV_DOMAIN }}</span>
                  <span style="float: right; font-size: 13px">{{ item.RV_NAME }}</span>-->
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="22">
            <el-form-item prop="RV_DOMAIN" label="代码编号：">
              <el-input
                maxlength="4"
                v-model="RefCodeData.RV_DOMAIN"
                :disabled="CodeRVDOMAIN"
                @keyup.native="codecheck"
                @change="codeuppercase('RV_DOMAIN')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item prop="RV_NAME" label="代码名称：">
              <el-input maxlength="32" v-model="RefCodeData.RV_NAME"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item prop="RV_ISVALID" label="有效标志：">
              <el-radio-group v-model="RefCodeData.RV_ISVALID">
                <el-radio label="Y">是</el-radio>
                <el-radio label="N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="RefCodeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="commitCode">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  db_editRefType,
  db_codeTypeList,
  db_addRefType,
  db_delRefType,
  db_getRefCode,
  db_addRefCode,
  db_editRefCode,
  db_delRefCode,
  db_codeType
} from '@/request/api'
import resizeMixin from '@/mixins/resize'
export default {
  mixins: [resizeMixin],
  name: 'router.baseCode',
  data() {
    var RVNAME = (rule, value, callback) => {
      // 获得字符串实际长度，中文2，英文1
      var realLength = 0,
        len = value.length,
        charCode = -1
      for (var i = 0; i < len; i++) {
        charCode = value.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) realLength += 1
        else realLength += 2
      }
      if (realLength > 32) {
        return callback(new Error('最多为32位'))
        // this.companyName = cutstr(this.companyName, 60);
      } else {
        return callback()
      }
    }
    var RVREMARK = (rule, value, callback) => {
      // 获得字符串实际长度，中文2，英文1
      var realLength = 0,
        len = value.length,
        charCode = -1
      for (var i = 0; i < len; i++) {
        charCode = value.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) realLength += 1
        else realLength += 2
      }
      if (realLength > 128) {
        return callback(new Error('最多为128位'))
        // this.companyName = cutstr(this.companyName, 60);
      } else {
        return callback()
      }
    }
    return {
      currentRow: '',
      codeentRow: '',
      typePageSize: 30,
      typeCurrentPage: 1,
      currentNumber: 1,
      typeTotal: 0,
      typeHeight: -1,
      detlPageSize: 30,
      detlCurrentPage: 1,
      detlCurrentNumber: 1,
      detlTotal: 0,
      detlHeight: -1,
      CodeRCTUUID: false,
      CodeRVDOMAIN: false,
      checkedY: true,
      checkedN: false,
      flt: {
        RV_DOMAIN: '',
        RV_NAME: ''
      },
      copyDomain: '',
      copyName: '',
      rleTypes: [],
      TypeMap: {
        updateType: 'baseCode.editClassify',
        createType: 'baseCode.addClassify'
      },
      CodeMap: {
        updateCode: 'baseCode.editCode',
        createCode: 'baseCode.addCode'
      },
      // 按钮是否可用的状态
      // typeEditDisabled: true,
      // typeDelDisabled: true,
      // CodeAddDisabled: true,
      // CodeEditDisabled: true,
      // CodeDelDisabled: true,
      //
      TypeDialogStatus: '',
      CodeDialogStatus: '',
      currentNode: {},
      currentType: {},
      TypeList: [],
      currentCodeList: [],
      currentCode: {},
      RefTypeDialogVisible: false, // 代码分类 Dialog
      RefCodeDialogVisible: false, // 基础代码 Dialog
      // 代码分类
      RefTypeData: {}, // 代码分类 dialog内的form([A-Z]|\d)[0-9a-zA-Z]
      rules: {
        RV_DOMAIN: [
          { min: 1, max: 4, message: '至多输入4 个字符', trigger: 'change' },
          {
            pattern: /^([^\u4e00-\u9fa5])+$/,
            message: '禁止输入中文',
            trigger: 'change'
          }
        ],
        RV_NAME: [
          { validator: RVNAME, trigger: 'change' },
          {
            pattern: /^([0-9a-zA-Z\u4e00-\u9fa5])+$/,
            message: '只能输入中文字母数字',
            trigger: 'change'
          }
        ]
      },
      RefTypeDataRules: {
        RV_DOMAIN: [
          // { validator: RVDOMAIN, trigger: 'change' },
          { min: 1, max: 4, message: '至多输入4个字符', trigger: 'change' },
          { required: true, message: '请填写类型编号', trigger: 'blur' },
          {
            pattern: /^([^\u4e00-\u9fa5])+$/,
            message: '禁止输入中文',
            trigger: 'change'
          }
        ],
        RV_NAME: [
          { required: true, message: '请填写类型名称', trigger: 'blur' },
          { validator: RVNAME, trigger: 'change' },
          {
            pattern: /^([0-9a-zA-Z\u4e00-\u9fa5])+$/,
            message: '只能输入中文字母数字',
            trigger: 'change'
          }
        ],
        RV_ISVALID: [
          { required: true, message: '请选择有效标志', trigger: 'blur' }
        ],
        RV_REMARK: [{ validator: RVREMARK, trigger: 'change' }]
      },
      // 基础代码
      RefCodeData: {}, // 代码分类 dialog内的form
      RefCodeDataRules: {
        RCT_UUID: [
          { required: true, message: '请选择代码类型', trigger: 'change' }
        ],
        RV_DOMAIN: [
          { min: 1, max: 4, message: '至多输入4个字符', trigger: 'change' },
          {
            pattern: /^([^\u4e00-\u9fa5])+$/,
            message: '禁止输入中文',
            trigger: 'change'
          },
          { required: true, message: '请填写代码编号', trigger: 'blur' }
        ],
        RV_NAME: [
          { required: true, message: '请填写代码名称', trigger: 'blur' },
          { validator: RVNAME, trigger: 'change' },
          {
            pattern: /^([0-9a-zA-Z\u4e00-\u9fa5])+$/,
            message: '只能输入中文字母数字',
            trigger: 'change'
          }
        ],
        RV_ISVALID: [
          { required: true, message: '请选择有效标志', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.resize = () => {
      this.typeHeight = this.$refs.topType.offsetHeight - 80
      // 70
      this.detlHeight = this.$refs.bottomCode.offsetHeight - 200
      // 130
    }
  },
  beforeMount() {
    this.getRefType()
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
    },
    disableType() {
      return this.TypeDialogStatus === 'updateType'
    }
  },
  methods: {
    indexMethodType(index) {
      return 1 + index + (this.typeCurrentPage - 1) * this.typePageSize
    },
    indexMethodDet(index) {
      return 1 + index + (this.detlCurrentPage - 1) * this.detlPageSize
    },
    checkCode() {
      this.flt.RV_DOMAIN = this.flt.RV_DOMAIN.replace(/[^a-zA-Z]/g, '')
    },
    typecheck() {
      this.RefTypeData.RV_DOMAIN = this.RefTypeData.RV_DOMAIN.replace(
        /[^a-zA-Z]/g,
        ''
      )
    },
    codecheck() {
      this.RefCodeData.RV_DOMAIN = this.RefCodeData.RV_DOMAIN.replace(
        /[^a-zA-Z]/g,
        ''
      )
    },
    uppercase(key) {
      this.typeCurrentPage = 1
      this.$refs.typePagination.lastEmittedPage = 1
      this.detlCurrentPage = 1
      this.$refs.codePagination.lastEmittedPage = 1
      this.flt[key] = this.flt[key].toUpperCase()
    },
    typeuppercase(key) {
      this.RefTypeData[key] = this.RefTypeData[key].toUpperCase()
    },
    codeuppercase(key) {
      this.RefCodeData[key] = this.RefCodeData[key].toUpperCase()
    },
    getFltType() {
      db_codeType({}).then(res => {
        if (res.success === '1') {
          this.rleTypes = res.data.DXNXTD
        }
      })
    },
    searchType() {
      this.detlCurrentPage = 1
      this.typeCurrentPage = 1
      this.$refs.typePagination.lastEmittedPage = 1
      this.$refs.codePagination.lastEmittedPage = 1
      this.copyDomain = this.flt.RV_DOMAIN
      this.copyName = this.flt.RV_NAME
      this.getRefType()
    },
    // 列表获取
    getRefType() {
      if (this.flt.RV_DOMAIN || this.flt.RV_NAME) {
        this.$refs['flt'].validate(valid => {
          if (valid) {
            this.validType()
          } else {
            return
          }
        })
      } else {
        this.validType()
      }
    },
    validType() {
      // this.typeEditDisabled = true
      // this.typeDelDisabled = true
      this.currentCodeList = []
      db_codeTypeList({
        // RV_DOMAIN: this.flt.RV_DOMAIN,
        // RV_NAME: this.flt.RV_NAME,
        // 为解决bug: 用户输入查询条件，不点击查询按钮，而直接点击分页的下一页，会导致接口报错（因加了查了条件，数据量有可能并没有两页那么多）
        //所以：当用户点击查询按钮才会将值赋值给接口参数
        RV_DOMAIN: this.copyDomain,
        RV_NAME: this.copyName,
        PageSize: this.typePageSize,
        PageNo: this.typeCurrentPage
      })
        .then(response => {
          if (response.success != '1') {
            if (response.msg != '' && response.msg != null) {
              this.$message.error({ message: response.msg })
            } else {
              this.$message.error({ message: '获取列表失败!！' })
            }

            return
          }
          this.currentRow = ''
          this.codeentRow = ''
          this.detlTotal = 0
          this.TypeList = response.data.DXNXTD
          this.typeTotal = parseInt(response.data.total.DXNXTD)
        })
        .catch(() => {
          this.currentRow = ''
          this.codeentRow = ''
          this.detlTotal = 0
          this.$message.error({ message: '获取列表失败！' })
        })
    },

    // 代码分类 -- 添加
    addRefType() {
      this.TypeDialogStatus = 'createType'
      this.resetRefType()
      this.RefTypeDialogVisible = true
    },
    // 代码分类 -- 编辑
    editRefType() {
      if (Object.keys(this.currentRow).length == 0) {
        this.$alert('请选择需要编辑的数据！', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      this.TypeDialogStatus = 'updateType'
      this.RefTypeDialogVisible = true

      this.RefTypeData = Object.assign({}, this.currentType)
    },

    // 代码分类的dialog  先判断是 提交 or 编辑
    commitType() {
      this.$refs['RefTypeData'].validate(valid => {
        if (!valid) {
          // this.$message.error('必输项不能为空！')
          return false
        }
        if (this.TypeDialogStatus == 'updateType') {
          this.commitEditType(this.RefTypeData)
        } else if (this.TypeDialogStatus == 'createType') {
          this.commitAddType(this.RefTypeData)
        }
      })
    },

    getCurrentTypeRow(row) {
      this.currentRow = '1'
      this.detlCurrentPage = 1
      this.$refs.codePagination.lastEmittedPage = 1
      this.currentType = row
      this.RefTypeData = Object.assign({}, row)

      if (this.rleTypes.length === 0) {
        this.getFltType()
      }
      this.getRefCode()
    },

    // 代码分类 -- 添加--的form表单
    commitAddType(formdata) {
      db_addRefType(formdata)
        .then(response => {
          if (response.success != 1) {
            if (response.msg != '' && response.msg != null) {
              this.$message.error({ message: response.msg })
            } else {
              this.$message.error({ message: '新增失败！' })
            }
            return
          }
          this.$message.success({ message: '新增成功！' })
          this.getRefType()
          this.getFltType()
          this.RefTypeDialogVisible = false
        })
        .catch(() => {
          this.$message.error({ message: '新增失败！' })
        })
    },

    // 代码分类 -- 编辑--的form表单
    commitEditType(formdata) {
      db_editRefType(formdata)
        .then(response => {
          if (response.success != '1' || response.data.result != 'OK') {
            if (response.msg != '' && response.msg != null) {
              this.$message.error({ message: response.msg })
            } else {
              this.$message.error({ message: '编辑失败！' })
            }

            return
          }
          this.currentRow = ''
          this.$message.success({ message: '编辑成功！' })
          this.getRefType()
          this.RefTypeDialogVisible = false
        })
        .catch(() => {
          this.currentRow = ''
          this.$message.error({ message: '编辑失败！' })
        })
    },
    // 代码分类 -- 删除
    delRefType() {
      if (Object.keys(this.currentRow).length == 0) {
        this.$alert('请选择需要删除的数据', '提示', {
          confirmButtonText: '确定'
        })
        return
      }

      this.$confirm('你确认要删除此数据吗？', '提示', {
        closeOnClickModal: false
      })
        .then(() => {
          this.commitDelType()
        })
        .catch(() => {})
    },
    // 代码分类 -- 确认删除
    commitDelType() {
      db_delRefType(this.currentType)
        .then(response => {
          if (response.success !== '1') {
            if (response.msg !== '' && response.msg != null) {
              this.$message.error({ message: response.msg })
            } else {
              this.$message.error({ message: '删除失败！' })
            }
            return
          }
          this.$message.success({ message: '删除成功！' })
          this.getRefType()
          this.getFltType()
          this.currentRow = ''
        })
        .catch(() => {
          this.currentRow = ''
          this.$message.error({ message: '删除失败！' })
        })
    },

    // 点击基础代码表格的一行，获取到当前行的数据
    getCurrentCodeRow(row) {
      this.codeentRow = '1'
      this.currentCode = row
      // this.compecompile(Object.assign({}, row))
      // this.RefCodeData = Object.assign({}, row)
      // this.CodeEditDisabled = false
      // this.CodeDelDisabled = false
    },
    // 代码详情 -- 获取
    getRefCode() {
      // this.currentType
      db_getRefCode({
        UUID: this.currentType.UUID,
        PageSize: this.detlPageSize,
        PageNo: this.detlCurrentPage
      })
        .then(response => {
          if (response.success != '1') {
            if (response.msg != '' && response.msg != null) {
              this.$message.error({ message: response.msg })
            } else {
              this.$message.error({ message: '获取代码详情失败！' })
            }
            return
          }
          this.codeentRow = ''
          this.currentCodeList = response.data.DXNXTD
          this.detlTotal = parseInt(response.data.total.DXNXTD)
        })
        .catch(() => {
          this.codeentRow = ''
          this.$message.error({ message: '获取代码详情失败！' })
        })
    },

    // 基础代码 -- 添加
    addRefCode() {
      if (!Object.keys(this.currentType).length) {
        this.$message.warning('请先选择一种代码类型')
        return
      }
      this.resetRefCode()
      this.$nextTick(() => {
        this.getFltType()
      })
      
      this.CodeDialogStatus = 'createCode'

      this.CodeRCTUUID = false
      this.CodeRVDOMAIN = false
      this.RefCodeDialogVisible = true
      this.RefCodeData.RCT_UUID = this.currentType.UUID
    },
    // 基础代码 -- 添加--的form表单
    commitAddCode(formdata) {
      console.log('ssssssssaaaassssssss',formdata)

      db_addRefCode(formdata)
        .then(response => {
          console.log('ssssssssaaaassssssss')
          if (response.success != '1' || response.data.result != 'OK') {
            if (response.msg != '' && response.msg != null) {
              this.$message.error({ message: response.msg })
            } else {
              this.$message.error({ message: '新增代码详情失败！' })
            }
            return
          }
          // this.getRefCode()
          this.$message.success({ message: '新增代码详情成功！' })
          this.RefCodeDialogVisible = false
          // 清楚代码数据列表
          this.currentCodeList = []
          // 清除高亮
          // this.$refs.typeTable.setCurrentRow()
          // 找到当前增加代码的类型行 设置高亮并拉取对应代码详情列表 找不到则什么都不做
          // for (let i = 0; i < this.TypeList.length; i++) {
          //   if (this.RefCodeData.RCT_UUID === this.TypeList[i].UUID) {
          //     this.currentType = this.TypeList[i]
          //     this.$refs.typeTable.setCurrentRow(this.TypeList[i])
          //     this.getRefCode()
          //     break
          //   }
          // }
        })
        .catch(() => {
          this.$message.error({ message: '新增代码详情失败！' })
        })
    },
    // 基础代码 -- 编辑codeentRow
    editRefCode() {
      if (Object.keys(this.codeentRow).length == 0) {
        this.$alert('请选择需要编辑的数据！', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      this.CodeDialogStatus = 'updateCode'
      this.RefCodeDialogVisible = true
      this.CodeRCTUUID = true
      this.CodeRVDOMAIN = true
      this.getFltType()
      this.RefCodeData = Object.assign({}, this.currentCode)
    },

    // 基础代码 -- 编辑--的form表单
    commitEditCode() {
      db_editRefCode(this.RefCodeData)
        .then(response => {
          if (response.success != '1' || response.data.result != 'OK') {
            if (response.msg != '' && response.msg != null) {
              this.$message.error({ message: response.msg })
            } else {
              this.$message.error({ message: '编辑代码失败！' })
            }
            return
          }
          this.getRefCode(this.currentNode)
          this.$message.success({ message: '编辑代码成功！' })
          this.RefCodeDialogVisible = false
          this.codeentRow = ''
        })
        .catch(() => {
          this.codeentRow = ''
          this.$message.error({ message: '编辑代码失败！' })
        })
    },
    // 基础代码的dialog  先判断是 提交 or 编辑
    commitCode() {
      this.$refs['RefCodeData'].validate(valid => {
        if (!valid) {
          return false
        }
        if (this.CodeDialogStatus == 'updateCode') {
          this.commitEditCode(this.RefCodeData)
        } else if (this.CodeDialogStatus == 'createCode') {
          this.commitAddCode(this.RefCodeData)
        }
      })
    },

    // 基础代码 -- 删除
    delRefCode() {
      if (Object.keys(this.codeentRow).length == 0) {
        this.$alert('请选择需要删除的数据', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      this.$confirm('你确认要删除此数据吗？', '提示', {
        closeOnClickModal: false
      })
        .then(() => {
          this.commitDelCode()
        })
        .catch(() => {})
    },
    // 基础代码 -- 确认删除
    commitDelCode() {
      db_delRefCode(this.currentCode)
        .then(response => {
          if (response.success != '1') {
            if (response.msg != '' && response.msg != null) {
              this.$message.error({ message: response.msg })
            } else {
              this.$message.error({ message: '删除代码失败！' })
            }
            return
          }
          this.getRefCode(this.currentNode)
          // this.CodeEditDisabled = true
          // this.CodeDelDisabled = true
          this.codeentRow = ''
          this.$message.success({ message: '删除代码成功！' })
        })
        .catch(() => {
          this.codeentRow = ''
          this.$message.error({ message: '删除代码成功！' })
        })
    },
    handleTypeDialogClose() {
      this.RefTypeDialogVisible = false
    },
    handleCodeDialogClose() {
      this.RefCodeDialogVisible = false
    },
    // restet 代码分类
    resetRefType() {
      return (this.RefTypeData = {
        RV_DOMAIN: '',
        RV_NAME: '',
        RV_ISVALID: 'Y',
        RV_REMARK: ''
      })
    },
    // restet 基础代码
    resetRefCode() {
      return (this.RefCodeData = {
        RCT_UUID: '',
        RV_DOMAIN: '',
        RV_CMEANING: '',
        RV_NAME: '',
        RV_ISVALID: 'Y'
      })
    },
    typeHandleSizeChange(typePageSize) {
      this.typeCurrentPage = 1
      this.$refs.typePagination.lastEmittedPage = 1
      this.typePageSize = typePageSize
      this.getRefType()
    },
    typeHandleCurrentChange(typeCurrentPage) {
      if (typeCurrentPage == this.currentNumber) {
        return
      }
      this.currentNumber++
      this.typeCurrentPage = typeCurrentPage
      this.$refs.typePagination.lastEmittedPage = typeCurrentPage
      this.getRefType()
    },
    detlHandleSizeChange(detlPageSize) {
      this.detlCurrentPage = 1
      this.$refs.codePagination.lastEmittedPage = 1
      this.detlPageSize = detlPageSize
      this.getRefCode()
    },
    detlHandleCurrentChange(detlCurrentPage) {
      if (detlCurrentPage == this.detlCurrentNumber) {
        return
      }
      this.currentNumber++
      this.detlCurrentPage = detlCurrentPage
      this.$refs.codePagination.lastEmittedPage = detlCurrentPage
      this.getRefCode()
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
  height: 100%;
  .top-type {
    width: 100%;
    height: 100%;
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
  .bottom-code {
    width: 100%;
    height: 100%;
  }
}
.codeNumberCode {
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 40px;
}
.pagination {
  margin: 0.3rem 0;
}
// .left-container {
//     background-color: #F38181;
//     height: 100%;
//   }

//   .right-container {
//     background-color: #FCE38A;
//     height: 200px;
//   }

//   .top-container {
//     background-color: #FCE38A;
//     width: 100%;
//     height: 100%;
//   }

//   .bottom-container {
//     width: 100%;
//     background-color: #95E1D3;
//     height: 100%;
//   }
</style>
