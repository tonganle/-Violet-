<template>
  <!--
    上传文件，可多选
 -->
  <div>
    <el-upload
      class="upload-demo"
      :action="url"
      multiple
      :limit="this.limitNum"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :on-error="handleError"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip" v-if="fileMaxsize">
        请控制文件不超过{{ fileMaxsize }}M
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: []
    }
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    limitNum: {
      type: Number,
      default: 3
    },
    fileMaxsize: {
      type: Number,
      default: 10
    }
  },
  methods: {

    handleSuccess(response) {
      this.fileList = response.data.fileArr
    },
    handleExceed(files, fileList) {
      if (fileList.length > this.limit) {
        this.$message({
          message: `当前限制选择${this.limitNum}个文件`
        })
        return false
      }
    },
    // 上传前钩子
    beforeUpload(file) {
      if (file.size / 1024 / 1024 > this.fileMaxsize) {
        this.$message({
          message: '请控制文件大小不超过' + this.fileMaxsize + 'M',
          type: 'warning'
        })
        return false
      }
    },
    // 上传失败
    handleError() {
      console.log('sssssssssssssss')
      this.$message({
        message: '文件上传失败',
        type: 'error'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-demo {
  display: inline-block;
  padding: 4rem;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-size: 1.4rem;

  &:hover {
    border-color: #409eff;
  }

  i {
    font-size: 4rem;
  }
}
</style>
