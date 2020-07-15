<template>
  <div class="uploadImg">
    <el-upload
      class="uploader"
      :action="url"
      :show-file-list="true"
      :disabled="isNotUpload"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :on-error="handleError"
      :on-change="handleChange"
      :file-list="fileList"
      :auto-upload="!isdisabled"
      ref="upload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus uploader-icon"></i>
    </el-upload>
    <el-button
      class="uploadButtonCJ"
      size="mini"
      :disabled="isShowButton"
      type="primary"
      @click="submitImg"
      v-if="isdisabled"
    >上传图片</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: '',
      isNotUpload: false,
      isShow: true,
      isShowButton: true,

      fileList: []
    }
  },
  props: {
    size: {
      type: Number,
      default: 5
    },
    url: {
      type: String,
      default: ''
    },
    isdisabled: {
      type: Boolean,
      default: true
    },
    isCropImgUrl: {
      type: String,
      default: ''
    },
    isCropImg: {
      type: String,
      default: ''
    },
    isShowCropImg: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isCropImg() {
      this.fileList = []
      if (this.isCropImg) {
        this.isShow = true
        this.imageUrl = this.isCropImgUrl
        let imgName = new Date().getTime()
        this.fileList.push({ name: imgName, url: this.imageUrl })
      }
    }
  },
  methods: {
    handleSuccess() {
      // 用于显示图片
      this.isShowButton = true
      this.isNotUpload = true
      // this.imageUrl = URL.createObjectURL(file.file)
      // this.imageUrl = response.data[0].ImagePath;
      this.$message.success({
        message: '上传成功！'
      })
      // this.$emit('getUrl', this.imageUrl);
    },
    // 上传失败
    handleError(err) {
      this.isShowButton = true
      this.$message.error({
        message: err
      })
    },
    // 上传前钩子
    beforeUpload(file) {
      if (file.size / 1024 / 1024 > this.size) {
        this.$message.warning({
          message: '请控制文件不超过' + this.size + 'M'
        })
        return false
      }
      if (file.type.indexOf('image') === -1) {
        this.$message.error({
          message: '请上传正确的图片类型'
        })
        return false
      }
    },
    handleChange(file) {
      this.isShowButton = false
      let reader = new FileReader()
      //转base64
      reader.onload = e => {
        this.imageUrl = e.target.result //将图片路径赋值给src
      }
      reader.readAsDataURL(file.raw)
    },
    submitImg() {
      this.$refs.upload.submit()
    },
    CJImg() {
      this.$emit('getUrl', this.imageUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
.uploader {
  width: 100%;
  display: inline-block;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  height: 12rem;
  overflow: hidden;
  background: #ffffff;

  &:hover {
    border-color: #409eff;
  }
}
.uploader-icon {
  font-size: 2.8rem;
  color: #8c939d;
  width: 100%;
  height: 12rem;
  line-height: 10rem;
  position: absolute;
}
.uploader img {
  width: 100%;
  height: 12rem;
  display: block;
}
.uploadImg {
  position: relative;
  overflow: hidden;
  margin: auto;

  width: 15%;
  button {
    margin-top: 1rem;
  }
  .uploadButtonCJ {
    float: right;
  }
}
</style>
