<template>
  <div class="uploadImg">
    <el-upload
      class="uploader"
      :action="url"
      list-type="text"
      :show-file-list="false"
      :disabled="isNotUpload"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :on-error="handleError"
      :on-change="handleChange"
      :file-list="uploadList"
      :auto-upload="false"
      ref="upload"
    >
      <div v-if="imageUrl" class="el-upload-list el-upload-list--picture-card">
        <div v-if="!isNotUpload">
          <img :src="imageUrl" />
          <span class="el-upload-list__item-actions" @click.stop>
            <span class="el-upload-list__item-delete">
              <i class="el-icon-delete" @click="delImgList"></i>
            </span>
          </span>
        </div>
        <div v-else>
          <img :src="imageUrl" />
        </div>
      </div>
      <div v-else>
        <i class="el-icon-plus uploader-icon"></i>
      </div>
    </el-upload>
    <el-button
      class="uploadButtonCJ"
      :disabled="isShowButton"
      size="mini"
      type="primary"
      @click="submitImg"
    >上传图片</el-button>
    <el-dialog
      v-el-drag-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="图片剪裁"
      :visible.sync="showCrop"
      append-to-body
      :before-close="close"
      v-if="showCrop"
    >
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :fixed="option.fixed"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixedNumber="option.fixedNumber"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"
            @realTime="realTime"
          ></vueCropper>
        </div>
        <!-- 预览框 -->
        <div
          class="show-preview"
          :style="{'width': '300px', 'height': '300px',  'overflow': 'hidden', 'margin': '0 25px', 'display':'flex', 'align-items' : 'center'}"
        >
          <div :style="previews.div" class="preview">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: { VueCropper },
  data() {
    return {
      imageUrl: '',
      isNotUpload: false,
      isShowDiv: true,
      isShowButton: true,
      previews: {},
      uploadList: [],
      showCrop: false,
      isCropImgUrl: '',
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: false, // 是否开启截图框宽高固定比例
        // fixedNumber: [7, 5], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        maxImgSize: 3000 // 图片最大像素
      }
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
    }
  },
  methods: {
    handleSuccess() {
      // 用于显示图片
      // this.imageUrl = URL.createObjectURL(file.file)

      // this.imageUrl = response.data[0].ImagePath;
      this.isShowDiv = false
      this.isShowButton = true
      this.isNotUpload = true

      this.$message.success({
        message: '上传成功！'
      })
      // this.$emit('getUrl', this.imageUrl);
    },
    // 上传失败
    handleError(err) {
      this.isShowDiv = false
      this.isShowButton = true

      this.imageUrl = ''
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
    handleChange(file, fileList) {
      if (this.isShowDiv) {
        this.isShowButton = false

        let reader = new FileReader()
        this.uploadList = fileList
        //转base64
        reader.onload = e => {
          // this.imageUrl = e.target.result; //将图片路径赋值给src
          this.option.img = e.target.result
          this.showCrop = true
        }
        reader.readAsDataURL(file.raw)
      } else {
        this.isShowDiv = true
      }
    },
    submitImg() {
      this.$refs.upload.submit()
    },
    save() {
      this.$refs.cropper.getCropBlob(data => {
        // 获取裁剪后的 url[
        // this.fileList = [];
        this.isCropImgUrl = window.URL.createObjectURL(data)
        //裁剪后的文件
        this.uploadList[0].url = this.isCropImgUrl
        this.imageUrl = this.isCropImgUrl
        this.showCrop = false
      })
    },
    close() {
      this.showCrop = false
      this.option.img = ''
      this.beforeUpload = true
    },
    delImgList() {
      this.$refs.upload.clearFiles()
      this.imageUrl = ''
    },
    realTime(data) {
      // 实时预览
      this.previews = data
    }
  }
}
</script>

<style lang="scss" scoped>
// 截图
.cropper-content {
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
  .cropper {
    width: 350px;
    height: 300px;
  }
}
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
  .showImgStyle {
    position: relative;
    .delimg {
      position: absolute; //相对于img-container定位，
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: auto;
      color: #409eff;
      display: flex;
      background: rgba(0, 0, 0, 0.2) !important;
      z-index: 10;
    }
  }
}
.cropper-content .show-preview {
  flex: 1;
  -webkit-flex: 1;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
  overflow: hidden;
  border: 1px solid #cccccc;
  background: #cccccc;
  margin-left: 40px;
}
.preview {
  overflow: hidden;
  border: 1px solid #cccccc;
  background: #cccccc;
}
</style>
