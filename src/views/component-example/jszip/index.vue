<template>
  <div class="jszipPage">
    <el-upload class="upload-demo" :file-list="fileList" :on-success="handleSuccess" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击压缩</em></div>
      <div class="el-upload__tip" slot="tip"></div>
    </el-upload>
  </div>
</template>

<script>
//index.html引入./jszip/FileSaver.js和./jszip/jszip.min.js
export default {
  name: 'jszip',
  components: {},
  data() {
    return {
      fileList: [],
      flag:true
    }
  },
  methods: {
    // 选择文件成功
    handleSuccess(res, file, fileList) {
      this.fileList = fileList
      this.export_zip(this.fileList,'压缩包名')
    },
    //文件导出压缩包
    export_zip(fileList, zipName) {
      const zip = new window.JSZip()
      const zip_name = zipName || 'file'
      fileList.forEach(item=>{
        zip.file(`${item.name}`,item.raw)
      })
      zip
        .generateAsync({
          type: 'blob'
        })
        .then(
          blob => {
            if(this.flag){
              this.flag = false
              window.saveAs(blob, `${zip_name}.zip`)
            }
          },
          () => {
            this.$message({
              message: '导出失败',
              type: 'warning'
            })
          }
        )
    }
  }
}
</script>
<style lang="scss" scoped>
.jszipPage {
  position: relative;
  .upload-demo{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
