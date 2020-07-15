<template>
  <div>
    <upload-file
      :url="uploadUrl"
      :limitNum="limit"
      :fileMaxsize="fileSize"
    ></upload-file>
  </div>
</template>

<script>
import uploadFile from '@/components/upload/upload-file'
export default {
  components: { uploadFile },
  data() {
    return {
      limit: '', // 最多可上传的文件个数（Number）
      fileSize: 3 // 单个文件的最大size(单位：M)
    }
  },
  computed: {
    uploadUrl() {
      let url =
        '/DXNXTD/UpLoad?SessionId=' + this.$store.state.user.SessionId_DX_H
      return process.env.NODE_ENV === 'development'
        ? window._$api.PROXYURL + url
        : window._$api.BASEURL + url
    }
  },
}
</script>
