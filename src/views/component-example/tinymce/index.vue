<template>
  <div id="home" class="pd20">
    <tinymce
      ref="richText"
      v-model="content"
      @on-upload-complete="onEditorUploadComplete"
      @on-ready="ready = true"
      id="editor"
      v-if="lag"
    ></tinymce>
    <div class="mt20">
      <el-button type="primary" class="w100" @click="get">保存</el-button>
      <el-button type="primary" class="w100" @click="set">清空</el-button>
    </div>
  </div>
</template>
<script>
// 使用富文本时注意 由于使用了keep-alive缓存路由导致切换路由后富文本无法编辑
import VueTinymce from '@/components/Tinymce/editor.vue'
export default {
  components: {
    tinymce: VueTinymce
  },
  data() {
    return {
      ready: false,
      content: '欢迎使用文本编辑器',
      lag: true
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
    onEditorUploadComplete(res) {
      if (res === '1') {
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      } else {
        this.$message({
          type: 'error',
          message: '上传失败'
        })
      }
    },
    set() {
      if (!this.ready) return
      const value = ' '
      this.value = value
      this.$refs.richText.setContent(this.value)
    },
    get() {},
    changeShow() {
      this.lag = false
    }
  }
}
</script>
<style lang="scss" scoped>
.pd20 {
  margin-left: 40px;
  margin-top: 40px;
}
</style>
