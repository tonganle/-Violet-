<template>
  <div class="header">
    <el-button style="margin: 10px 10px;" v-print="'#pdfDom'">浏览器下载PDF</el-button>
    <el-button style="margin: 10px 10px;" @click="handleDown">jsPDF方式下载</el-button>
    <div class="row" id="pdfDom" style="padding: 55px;background-color:#fff;">
      <div class="pdf_Dom">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="date" label="日期">
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="province" label="省份">
          </el-table-column>
          <el-table-column prop="city" label="市区">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
          <el-table-column prop="zip" label="邮编">
          </el-table-column>
        </el-table>
      </div>
      <div class="hlw">
        <p>葫芦娃，葫芦娃, 一根藤上七朵花</p>
        <p>小小树藤是我家 啦啦啦啦 </p>
        <p>叮当当咚咚当当 浇不大</p>
        <p> 叮当当咚咚当当 是我家</p>
        <p> 啦啦啦啦</p>
        <p>...</p>
      </div>
      <div class="describle">
        <el-form :model="form" :rules="rules" ref="from" label-width="80px" class="demo-ruleForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名:" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="描述:" prop="describle">
                <el-input
                  :disabled="detail"
                  type="textarea"
                  :rows="4"
                  :maxlength="2000"
                  placeholder=""
                  v-model="form.describle">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
// 浏览器下载PDF
// 安装 npm install vue-print-nb --save

// 在main.js文件中注册
// import Print from 'vue-print-nb'

// Vue.use(Print);
// jsPDF方式下载
// 第一个.将页面html转换成图片
// npm install --save html2canvas 
// 第二个.将图片生成pdf
// npm install jspdf --save
// 创建一个htmlToPdf.js文件
// import htmlToPdf from '@/utils/htmlToPdf'
import htmlToPdf from '@/utils/htmlToPdf'
export default {
  data() {
    return {
      htmlTitle: '页面导出PDF文件名',
      detail:false,
      form:{
        name:'',
        describle:''
      },
      rules: {},
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '小王虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '小虎王',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '虎小王',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  },
  mounted() {

  },
  methods: {
    // handleClick(row) {
    // console.log(row);
    // },
    handleDown(){
      //导出PDF
      htmlToPdf.downloadPDF( document.querySelector('#pdfDom'),'我的PDF')
    },
  },
  watch: {
    
  }
}
</script>
<style lang='scss' scoped>
  .row{
    width: 100%;
    font-size: 20px;
    text-align: center;
  }
  .pdfDom{
    width: 800px;
  }
  .hlw{
    width: 100%;
    padding: 20px;
    font-size: 18px;
    text-align: center;
    margin: 0 auto;
  }
</style>
