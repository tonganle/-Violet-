<template>
  <div class="app-container">
    <label class="radio-label" style="padding-left:0;">Filename:</label>
    <el-input
      v-model="fileName"
      style="width:340px;"
      :placeholder="$t('excel.placeholder')"
      prefix-icon="el-icon-document"
    ></el-input>
    <label class="radio-label">Cell Auto Width:</label>
    <el-radio-group v-model="autoWidth">
      <el-radio :label="true" border>True</el-radio>
      <el-radio :label="false" border>False</el-radio>
    </el-radio-group>
    <el-button
      style="margin:0 0 20px 20px;"
      type="primary"
      icon="document"
      @click="handleDownload"
      :loading="downloadLoading"
      >{{ $t('excel.export') }} excel</el-button
    >
    <el-button
    :title="title"
      style="margin:0 0 20px 20px;"
      type="primary"
      icon="document"
      @click="exportExcel"
      :loading="downloadLoading01"
      >导出 带样式excel</el-button
    >
    <el-table :data="newsList" border>
      <el-table-column
        show-overflow-tooltip
        prop="newsTitle"
        label="新闻标题"
        min-width="180"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="author"
        align="center"
        label="作者"
        width="180"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="newsDate"
        align="center"
        label="发布日期"
        width="220"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="reading"
        align="center"
        label="浏览次数"
        width="130"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
//带样式
// npm install --save xlsx-style
//  如果引入xlsx-style的话可能会报错：
// 需要修改源码：
// 在\node_modules\xlsx-style\dist\cpexcel.js 807行 的 var cpt = require(’./cpt’ + ‘able’); 改成 var cpt = cptable;
// 本地src目录新建vendor/Export3Excel.js，目前已注释，如需使用，请放开注释
import { getNewsList } from '@/request/api'
export default {
  data() {
    return {
      title:'(安装 npm install --save xlsx-style)</n>(如果引入xlsx-style的话可能会报错)</n>(在.node_modules.xlsx-style.dist.cpexcel.js 807行 的 var cpt = require(’./cpt’ + ‘able’); 改成 var cpt = cptable)</n>(本地src目录新建vendor/Export3Excel.js,js的内容项目中有)',
      fileName: '',
      autoWidth: true,
      downloadLoading: false,
      downloadLoading01: false,
      newsList: [
        {
          newsTitle:'你是谁你是谁你是谁你是谁',
          author:'你在哪',
          newsDate:'2019-08-13 18:49:21',
          reading:'1231'
        },{
          newsTitle:'你在哪你在哪你在哪你在哪你在哪你在哪你在哪',
          author:'你是谁',
          newsDate:'2019-09-03 15:07:36',
          reading:'3213'
        }
      ]
    }
  },
  mounted() {
    // this.getNewsList()
  },
  methods: {
    getNewsList() {
      getNewsList({ SessionId: this.$store.state.user.SessionId_DX_H }).then(
        response => {
          this.newsList = response.data.data
        }
      )
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        
        const tHeader = ['新闻标题', '作者', '浏览次数', '发布日期']
        const filterVal = ['newsTitle', 'author', 'reading', 'newsDate']
        const list = this.newsList 
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.fileName,
          autoWidth: this.autoWidth
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j]
        })
      )
    },
    exportExcel() {
      this.downloadLoading01 = true
      import('@/vendor/Export3Excel').then(excel => {
        const tHeader = ['新闻标题', '新闻信息', '', ''] //表头
        const listArr = [{
          newsTitle:'',
          author:'作者',
          newsDate:'日期等信息',
          reading:''
        },
        {
          newsTitle:'',
          author:'',
          newsDate:'发布日期',
          reading:'浏览次数'
        }]
        const title = ['新闻信息', '', '', '']  //标题
        //表头对应字段
        const filterVal = ['newsTitle', 'author', 'newsDate', 'reading']
        const list = listArr.concat(this.newsList) 
        console.log(list)
        const data = this.formatJson(filterVal, list)
        data.map(item => {
          // console.log(item)
          item.map((i, index) => {
            if (!i) {
              item[index] = ''
            }
          })
        })
        const merges = ['A1:D1','A2:A4','B2:D2','B3:B4','C3:D3','C4:C4','D4:D4'] //合并单元格
        const nuMber = list.length
        excel.export_json_to_excel({
          title: title,
          header: tHeader,
          data,
          merges,
          filename: '新闻信息',
          autoWidth: true,
          bookType: 'xlsx',
          nuMber:nuMber
        })
        this.downloadLoading01 = false
      })
    }
    // formatJson(filterVal, jsonData) {
    //   return jsonData.map(v => filterVal.map(j => v[j]))
    // }
  }
}
</script>

<style lang="scss"></style>
