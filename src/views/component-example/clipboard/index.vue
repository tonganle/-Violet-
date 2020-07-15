<template>
    <div>
        <div class="DIV">
            <el-row class="el_row">
                <el-col :span="12">
                    <el-input size="medium" placeholder="请输入内容" v-model="inputData01" clearable></el-input>
                </el-col>
                <el-col class="el_col" :span="12">
                    <el-button v-clipboard:copy="inputData01"
                    v-clipboard:success="onCopy" type="primary"
                    v-clipboard:error="onError">copy</el-button>
                </el-col>
            </el-row>
            <el-row class="el_row">
                <el-col :span="12">
                    <el-input size="medium" placeholder="请输入内容" v-model="inputData02" clearable></el-input>
                </el-col>
                <el-col class="el_col" :span="12" >
                    <el-button @click='handleCopy(inputData02,$event)' type="primary">copy</el-button>
                </el-col>
            </el-row>
            <el-row class="el_row">
                <el-col :span="12">
                    <el-input size="medium" placeholder="请输入内容" v-model="inputData03" clearable></el-input>
                </el-col>
                <el-col class="el_col" :span="12" >
                    <el-button v-clipboard:copy="inputData03" v-clipboard:success="clipboardSuccess" type="primary" icon="document">
                        copy
                    </el-button>
                </el-col>
            </el-row>
            <clipboard></clipboard>
        </div>
    </div>
</template>
<script>
//01 引入插件 方法onCopy onError  02引入utils/clipboard.js 方法handleCopy   03引入directive/clipboard/index.js 方法clipboardSuccess
import clip from '@/utils/clipboard' // use clipboard directly
// import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive

export default {
  components: {
    
  },
  data() {
    return {
      inputData01:'拷贝00000001',
      inputData02:'拷贝00000002',
      inputData03:'拷贝00000003'
    }
  },
  created(){
    //检测用户复制
    document.oncopy = ()=>{
      let body_element = document.body
      let selection
      selection = window.getSelection()
      let locationHref=document.location.href
      let appendLink='\n 原文出自[ '+document.title+' ] 转载请保留原文链接: <a href=\''+locationHref+'\'>'+locationHref+'</a>'
      if (window.clipboardData) {
        let copytext = selection + appendLink
        window.clipboardData.setData ('Text', copytext)
        return false
      } else {
        let copytext = selection + appendLink
        let newdiv = document.createElement('div')
        newdiv.style.position='absolute'  
        newdiv.style.left='-99999px'
        body_element.appendChild(newdiv)
        newdiv.innerHTML = copytext
        selection.selectAllChildren(newdiv)
        window.setTimeout(function() {
          body_element.removeChild(newdiv)
        },0)
      }
    }
  },
  methods: {
    // 复制成功
    onCopy(){
      this.$message({
        showClose: true,
        message: '复制成功',
        type: 'success'
      })
    },
    // 复制失败
    onError(){
      this.$message({
        showClose: true,
        message: '复制失败',
        type: 'warning'
      })
    },
    // 复制
    handleCopy(text, event) {
      clip(text, event)
    },
    clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    },
  }
}
</script>
<style lang="scss">
.DIV{
    width: 100%;
    padding: 20px;
}
.el_row{
    padding: 10px;
}
.el_col{
    padding:0 0 0 20px;
}
</style>
