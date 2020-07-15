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
            <el-form-item label="公告标题">
              <el-input
                clearable
                maxlength="64"
                v-model.trim="compForm.compAccount"
                placeholder
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
        <div v-for="(item, index) in grandson" :key="index">
          <el-button
            v-if="item.MDL_CODE === 'add'"
            size="mini"
            type="primary"
            plain
            @click="add"
            >新增</el-button
          >
          <el-button
            v-if="item.MDL_CODE === 'edit'"
            size="mini"
            type="primary"
            plain
            @click="edit"
            >编辑</el-button
          >
          <el-button
            v-if="item.MDL_CODE === 'delete'"
            size="mini"
            type="primary"
            plain
            @click="del"
            >删除</el-button
          >
        </div>
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
            label="公告标题"
            prop="BI_TITLE"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            align="left"
            label="公告类型"
            prop="BI_TYPE"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            align="left"
            label="公告摘要"
            prop="BI_ABSTRACT"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column align="left" label="热门资讯" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.BI_ISHOT == 'Y'">是</span>
              <span v-if="scope.row.BI_ISHOT == 'N'">否</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="公告状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.BI_STATE == 'Y'">有效</span>
              <span v-if="scope.row.BI_STATE == 'N'">无效</span>
            </template>
          </el-table-column>

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
    <!-- .tox-silver-sink 3000
      .tox .tox-dialog-wrap  3000
      .tox .tox-dialog  3001
    -->

    <el-dialog
      v-el-drag-dialog
      ref="dialog"
      :modal-append-to-body="true"
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
            <el-form-item
              label="公告类型:"
              :prop="messageDisabled == false ? 'BI_TYPE' : ''"
            >
              <el-select
                v-model="dialogForm.BI_TYPE"
                :disabled="messageDisabled"
              >
                <el-option
                  v-for="i in dcList"
                  :key="i.CHNNAME"
                  :label="i.CHNNAME"
                  :value="i.CHNNAME"
                  :title="i.CHNNAME"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="公告标题:"
              :prop="messageDisabled == false ? 'BI_TITLE' : ''"
            >
              <el-input
                maxlength="64"
                placeholder
                v-model.trim="dialogForm.BI_TITLE"
                :disabled="messageDisabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="公告摘要:"
              :prop="messageDisabled == false ? 'BI_ABSTRACT' : ''"
            >
              <el-input
                maxlength="64"
                v-model.trim="dialogForm.BI_ABSTRACT"
                :disabled="messageDisabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="公告封面:"
              :prop="messageDisabled == false ? 'BI_SHOWIMAGEURL' : ''"
            >
              <el-input
                disabled
                v-model="dialogForm.BI_SHOWIMAGEURL"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="display:flex;flex-direction:row-reverse">
            <upload-image
              :url="uploadUrl"
              :size="imgMaxSize"
              @getUrl="getImageURL"
              :isdisabled="messageDisabled"
            ></upload-image>
          </el-col>
          <!-- </el-col> -->
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item
              label="公告状态:"
              :prop="messageDisabled == false ? 'BI_STATE' : ''"
            >
              <el-radio-group
                :disabled="messageDisabled"
                v-model="dialogForm.BI_STATE"
              >
                <el-radio label="Y">有效</el-radio>
                <el-radio label="N">无效</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <!-- </el-row>
          <el-row>-->
          <el-col :span="12">
            <el-form-item
              label="公告来源:"
              :prop="messageDisabled == false ? 'BI_SOURCE' : ''"
            >
              <el-input
                maxlength="64"
                v-model.trim="dialogForm.BI_SOURCE"
                :disabled="messageDisabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="浏览量:"
              :prop="messageDisabled == false ? 'BI_PVIEWS' : ''"
            >
              <el-input
                maxlength="8"
                v-model.trim="dialogForm.BI_PVIEWS"
                :disabled="messageDisabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- </el-row>
          <el-row>-->
          <el-col :span="12">
            <el-form-item
              label="热门公告:"
              :prop="messageDisabled == false ? 'BI_ISHOT' : ''"
            >
              <el-radio-group
                :disabled="messageDisabled"
                v-model="dialogForm.BI_ISHOT"
              >
                <el-radio label="Y">是</el-radio>
                <el-radio label="N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="公告内容:"
              :prop="messageDisabled == false ? 'BI_CONTENT' : ''"
            >
              <tinymce
                ref="richText"
                v-model="dialogForm.BI_CONTENT"
                id="editor"
                v-if="lag"
              ></tinymce>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="close('dialogForm')">关闭</el-button>
        <el-button
          v-if="messageDisabled == false"
          size="mini"
          @click="save"
          type="primary"
          >保存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 使用富文本时注意 由于使用了keep-alive缓存路由导致切换路由后富文本无法编辑
import VueTinymce from '@/components/Tinymce/editor.vue'
import {
  getPressRelease,
  addPressRelease,
  editPressRelease,
  delPressRelease
} from '@/request/api'
import uploadImage from '@/components/upload/upload-image'
import resizeMixin from '@/mixins/resize'
import paginationMixin from '@/mixins/pagination'

export default {
  components: {
    tinymce: VueTinymce,
    uploadImage
  },
  name: 'router.pressRelease',
  mixins: [resizeMixin, paginationMixin],
  data() {
    return {
      uploadUrl: window._$api.BASEURL + '/DXNXTD/upload',
      imgMaxSize: 7,
      dcList: [{ CHNNAME: '新闻公告' }, { CHNNAME: '平台通知' }],
      ready: false,
      content: '',
      lag: true,
      dialogFormStatus: '', //dialog 中 form 的状态 add/edit
      options: [],
      accountDisabled: true,
      messageDisabled: false,
      currentData: {},
      showDialog: false,
      maxHeight: -1,
      operate: '',
      compForm: {
        compAccount: ''
      },
      copyCompAccount: '',
      copyCompName: '',
      compFormRules: {
        // compAccount:[{validator: fltCodevalidator2,trigger:'blur'}],
      },
      dialogForm: {
        BI_TITLE: '',
        BI_TYPE: '',
        BI_ABSTRACT: '',
        BI_ISHOT: 'Y',
        BI_STATE: 'Y',
        BI_SOURCE: '',
        BI_PVIEWS: '',
        BI_CONTENT: ''
      },
      dialogFormRules: {
        BI_TYPE: [
          { required: true, message: '公告类型不能为空', trigger: 'change' }
          // {required:true,message:'公告类型不能为空',trigger:'blur'}
        ],
        BI_TITLE: [
          { required: true, message: '公告标题不能为空', trigger: 'blur' }
        ],
        BI_ABSTRACT: [
          { required: true, message: '公告摘要不能为空', trigger: 'blur' }
        ],
        BI_STATE: [
          { required: true, message: '有效标志不能为空', trigger: 'blur' }
        ],
        BI_SOURCE: [
          { required: true, message: '公告来源不能为空', trigger: 'blur' }
        ],
        BI_SHOWIMAGEURL: [
          { required: true, message: '公告封面不能为空', trigger: 'blur' }
        ],
        BI_PVIEWS: [
          {
            required: true,
            pattern: /^[0-9]+$/,
            message: '只能允许输入数字',
            trigger: 'blur'
          },
          { required: true, message: '浏览量不能为空', trigger: 'blur' }
        ],
        BI_ISHOT: [
          { required: true, message: '热门公告不能为空', trigger: 'blur' }
        ],
        BI_CONTENT: [
          { required: true, message: '公告内容不能为空', trigger: 'blur' }
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
  activated() {
    this.lag = true
  },
  watch: {
    $route() {
      this.changeShow()
    }
  },
  methods: {
    changeShow() {
      this.lag = false
    },
    onEditorUploadComplete(res) {
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      } else {
        this.$message({
          type: 'error',
          message: res.msg
        })
      }
    },
    checkCode() {
      this.compForm.compAccount = this.compForm.compAccount.replace(
        /[^a-zA-Z]/g,
        ''
      )
    },
    uppercase(key) {
      this.compForm[key] = this.compForm[key].toUpperCase()
    },
    uppercase01(key) {
      this.dialogForm[key] = this.dialogForm[key].toUpperCase()
    },

    // 获取公告列表
    search() {
      this.searchList()
    },
    getList(currentPage, pageSize, updateTotal) {
      this.currentData = {}
      getPressRelease({
        BI_TITLE: this.compForm.compAccount,
        currentPage: currentPage.toString(),
        pageSize: pageSize.toString()
      }).then(response => {
        this.compList = response.data.DXNXTD
        updateTotal(Number(response.data.total.DXNXTD))
      })
    },
    add() {
      this.dialogFormStatus = 'add'
      this.resetDialogForm()
      this.showDialog = true
      this.operate = '新增公告'
      this.accountDisabled = false
      this.messageDisabled = false
      if (this.$refs['dialogForm']) {
        this.$refs['dialogForm'].resetFields()
      }
      this.$nextTick(() => {
        this.$refs.richText.clear()
      })
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
      this.operate = '编辑公告'
      this.accountDisabled = true
      this.messageDisabled = false
      this.dialogForm = Object.assign({}, this.currentData)
      setTimeout(() => {}, 0)
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
          delPressRelease(this.currentData).then(() => {
            this.$message.success({ message: '删除成功！', showClose: true })
            this.refreshList()
          })
        })
        .catch(() => {})
    },
    save() {
      if (this.dialogFormStatus === 'add') {
        this.commitAdd('dialogForm')
      } else if (this.dialogFormStatus === 'edit') {
        this.commitEdit('dialogForm')
      }
    },
    commitAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addPressRelease(this.dialogForm).then(() => {
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
          editPressRelease(this.dialogForm).then(() => {
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
        BI_TITLE: '',
        BI_TYPE: '',
        BI_ABSTRACT: '',
        BI_ISHOT: 'Y',
        BI_STATE: 'Y',
        BI_SOURCE: '',
        BI_PVIEWS: '',
        BI_CONTENT: ''
      })
    },
    // 获取当前选中行
    getCurrentRow(row) {
      this.currentData = row
    },
    storageDetail() {
      this.showDialog = true
      this.operate = '公告信息'
      this.accountDisabled = true
      this.messageDisabled = true
      this.dialogForm = Object.assign({}, this.currentData)
      setTimeout(() => {}, 0)
    },
    setCon() {
      this.ready = true
    },
    handleClose(done) {
      if (this.$refs.dialogForm) {
        this.$refs.dialogForm.resetFields()
        done()
      }
    },
    getImageURL(val) {
      // this.dialogForm.BI_SHOWIMAGEURL = val;
      this.$set(this.dialogForm, 'BI_SHOWIMAGEURL', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.tox-edit-area {
  height: -webkit-fill-available;
  .mce-content-body {
    position: relative;
    top: -1em;
    height: -webkit-fill-available;
    padding-top: 1em;
  }
}
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
