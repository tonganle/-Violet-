<template>
  <div class="upImg">
    <!-- 多图片上传 -->
    <div class="DImg">
      <el-upload
      class="uploader"
      :action="url"
      list-type="picture-card"
      :on-preview="handlePreview"
      :auto-upload="false"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :on-error="handleError"
      :on-success="handleSuccess"
      :on-change="consoleFL"
      :file-list="uploadList"
      :disabled="isNotUpload"
      ref="upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>

    <el-button
      :disabled="isShowButton"
      class="uploadButtonCJ"
      size="mini"
      type="primary"
      @click="submitImg"
    >上传图片</el-button>
    </div>

    <!-- 多图片预览弹窗 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt ref="dialogImg" />
    </el-dialog>
    <!-- 剪裁组件弹窗 -->
    <el-dialog
      :visible.sync="cropperModel"
      title="图片剪裁"
      append-to-body
      v-if="cropperModel"
      :before-close="beforeClose"
      v-el-drag-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="cropper-content">
        <!-- 剪裁框 -->
        <div class="cropper">
          <vueCropper
            ref="cropperAll"
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
      <div class="footer-btn">
        <!-- 缩放旋转按钮 -->
        <div class="scope-btn">
          <el-button type="primary" icon="el-icon-zoom-in" @click="changeScale(1)"></el-button>
          <el-button type="primary" icon="el-icon-zoom-out" @click="changeScale(-1)"></el-button>
          <el-button type="primary" @click="rotateLeft">逆时针旋转</el-button>
          <el-button type="primary" @click="rotateRight">顺时针旋转</el-button>
        </div>
        <!-- 确认上传按钮 -->
        <div class="upload-btn">
          <el-button @click="beforeClose">取 消</el-button>
          <el-button type="primary" @click="save">确认</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { VueCropper } from 'vue-cropper'
export default {
  name: 'uploader',
  props: {
    url: {
      // 上传地址
      type: String,
      default: ''
    },
    initUrl: {
      // 初始图片链接
      default: ''
    }
  },
  data() {
    return {
      isShowDiv: true,
      isShowButton: true,
      isNotUpload: false,
      previews: {}, // 预览数据
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
        original: false, // 上传图片按照原始比例渲染v
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        maxImgSize: 3000 // 图片最大像素
      },
      file: '', // 当前被选择的图片文件
      imageUrl: '', // 单图情况框内图片链接
      dialogImageUrl: '', // 多图情况弹窗内图片链接
      uploadList: [], // 上传图片列表
      reupload: true, // 控制"重新上传"开关
      dialogVisible: false, // 展示弹窗开关
      cropperModel: false, // 剪裁组件弹窗开关
      reuploadWidth: this.height * 0.7 // 动态改变”重新上传“大小
    }
  },
  methods: {
    /** **************************** multiple多图情况 **************************************/
    handleSuccess() {
      // 用于显示图片
      // this.imageUrl = URL.createObjectURL(file.file)
      this.isShowDiv = false
      this.isShowButton = true
      this.isNotUpload = true
      // this.imageUrl = response.data[0].ImagePath;
      this.$message.success({
        message: '上传成功！'
      })
      // this.$emit('getUrl', this.imageUrl);
    },
    // 上传失败
    handleError(err) {
      this.isShowDiv = false
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
    handlePreview(file) {
      // 点击进行图片展示
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      // 删除图片后更新图片文件列表并通知父级变化
      this.uploadList = fileList
    },
    consoleFL(file, fileList) {
      // 弹出剪裁框，将当前文件设置为文件

      if (this.isShowDiv) {
        this.cropperModel = true
        this.file = file
        this.isShowButton = false
        const fileReader = new FileReader()
        fileReader.onload = e => {
          this.option.img = e.target.result
        }
        fileReader.readAsDataURL(this.file.raw)
        //占位图片
        this.uploadList = fileList
        let listNum = Number(this.uploadList.length) - 1
        this.uploadList[listNum].url = require('@/assets/images/loading.gif')
      } else {
        this.isShowDiv = true
      }
    },
    /************************************************************************************/
    submitImg() {
      // 自定义upload事件
      this.$refs.upload.submit()
    },
    beforeClose() {
      this.uploadList.pop()
      this.cropperModel = false
      this.isShowButton = true
    },
    changeScale(num) {
      // 图片缩放
      num = num || 1
      this.$refs.cropperAll.changeScale(num)
    },
    rotateLeft() {
      // 向左旋转
      this.$refs.cropperAll.rotateLeft()
    },
    rotateRight() {
      // 向右旋转
      this.$refs.cropperAll.rotateRight()
    },
    realTime(data) {
      // 实时预览
      this.previews = data
    },
    save() {
      this.$refs.cropperAll.getCropBlob(data => {
        // 获取裁剪后的 url[
        let isCropImgUrl = window.URL.createObjectURL(data)
        //裁剪后的url 赋值给listNum
        let listNum = Number(this.uploadList.length) - 1
        this.uploadList[listNum].url = isCropImgUrl
        this.cropperModel = false
      })
    }
  },
  components: {
    VueCropper
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  color: #8c939d;
  text-align: center;
}
.avatar {
  display: block;
}
.reupload {
  border-radius: 50%;
  position: absolute;
  color: #fff;
  background-color: #000000;
  opacity: 0.6;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
}
#uploadIcon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
}
.cropper-content {
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
}
.cropper-content .cropper {
  width: 350px;
  height: 300px;
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
.footer-btn {
  margin-top: 30px;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
}
.footer-btn .scope-btn {
  width: 50%;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
}
.footer-btn .upload-btn {
  flex: 1;
  -webkit-flex: 1;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
}
.footer-btn .btn {
  outline: none;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 8px 15px;
  font-size: 12px;
  border-radius: 3px;
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}
.upImg {
  position: relative;
  .uploadButtonCJ {
    position: relative;
    left: 68px;
    top: 10px;
  }
  .DImg{
     position: relative;
     left:45%;
  }
}
</style>
