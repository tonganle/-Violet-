<template>
  <div class="imgStyle">
    <div class="divStyle">
      <h1>预览裁剪上传图片-多图</h1>
      <div class="cjImg">
        <uploadAllImageCrop :url="uploadUrl" :isdisabled="true"></uploadAllImageCrop>
      </div>
    </div>
    <el-row>
      <el-col>
        <div class="divStyle">
          <h1>预览裁剪上传图片-单图</h1>
          <div class="cjImg">
            <uploadImageCrop
              @getUrl="getImageUrl"
              :url="uploadUrl"
              :size="imgMaxSize"
              :isdisabled="true"
            ></uploadImageCrop>
          </div>
        </div>
      </el-col>
      <el-col>
        <div class="divStyle">
          <h1>手动上传图片</h1>
          <div class="cjImg">
            <upload-image :url="uploadUrl" :size="imgMaxSize" :isdisabled="true"></upload-image>
          </div>
        </div>
      </el-col>
      <el-col>
        <div class="divStyle">
          <h1>自动上传图片</h1>
          <div class="cjImg">
            <upload-image :url="uploadUrl" :size="imgMaxSize" :isdisabled="false"></upload-image>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import uploadImage from '@/components/upload/upload-image'
import uploadImageCrop from '@/components/upload/upload-image-crop'
import uploadAllImageCrop from '@/components/upload/upload-all-crop-img'
export default {
  components: { uploadImage, uploadImageCrop, uploadAllImageCrop },
  data() {
    return {
      // uploadUrl:this.getUrl,
      imgMaxSize: 5,
      showCrop: false
    }
  },
  computed: {
    uploadUrl() {
      let url =
        '/DXNXTD/upload?SessionId=' + this.$store.state.user.SessionId_DX_H
      return process.env.NODE_ENV === 'development'
        ? window._$api.PROXYURL + url
        : window._$api.BASEURL + url
    }
  },
  methods: {
    getImageUrl(dataUrl) {
      this.showCrop = true
      this.option.img = dataUrl
    }
  }
}
</script>
<style lang="scss" scoped>
.imgStyle {
  width: 100%;
  height: 100%;
  .divStyle {
    margin: 1rem 0;
    h1 {
      margin: 1.5rem auto;
      text-align: center;
    }
  }
}
</style>
