<template>
  <div>
    <h1>折线图</h1>
    <div id="LINE_ECCHARTS"></div>
    <h1>扇形图</h1>
    <div id="ADVANCE_ROSE"></div>
    <h1>柱状图</h1>
    <div id="BAR_ROSE"></div>
  </div>
</template>

<script>
export default {
  name: 'echarts',
  data() {
    return {}
  },
  mounted() {
    this.getLineEcahrts()
    this.getBarEcahrts()
    this.geBARROSEEcahrts()
  },
  methods: {
    getLineEcahrts() {
      let myChart = this.$echarts.init(
        document.getElementById('LINE_ECCHARTS')
      )
      let lineGraphOne = {
        echartse: [
          {
            name: '进货',
            data: [
              515.25,
              447.77,
              451.15,
              467.95,
              478.35,
              477.85,
              486.48,
              512.99,
              591.06,
              512.16,
              484.62,
              284.62
            ]
          },
          {
            name: '出货',
            data: [
              315.25,
              247.77,
              251.15,
              267.95,
              278.35,
              277.85,
              286.48,
              312.99,
              391.06,
              312.16,
              284.62,
              84.62
            ]
          }
        ],
        XRoller: [
          '2019--1月',
          '2019--2月',
          '2019--3月',
          '2019--4月',
          '2019--5月',
          '2019--6月',
          '2019--7月',
          '2019--8月',
          '2019--9月',
          '2019--10月',
          '2019--11月',
          '2019--12月'
        ],
        data: ['进货', '出货']
      }
      let echartse = lineGraphOne.echartse
      let XRoller = lineGraphOne.XRoller
      let data = lineGraphOne.data
      let itemStyle = {
        normal: {
          lineStyle: {
            width: 3 //折线宽度
            // color:"#FF0000"//折线颜色
          }
        }
      }
      let markLine = {
        //显示图中的虚线
        data: [{ type: 'average', name: '平均值' }]
      }
      let markPoint = {
        data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]
      }
      for (let i = 0; i < echartse.length; i++) {
        echartse[i].type = 'line' //bar柱状图 line 折线图
        echartse[i].symbolSize = 10
        if (i == 0) {
          echartse[i].symbol = 'star' //拐点样式   circle | rectangle | triangle | diamond
          //emptyCircle | emptyRectangle | emptyTriangle | emptyDiamond
        }
        echartse[i].itemStyle = itemStyle
        echartse[i].markLine = markLine
        echartse[i].markPoint = markPoint
      }
      myChart.setOption({
        // color: ['#3398DB'],
        // 标题
        title: {
          text: '某站点进货月统计', //主标题 轴
          subtext: '纯属虚构', //副标题
          x: 'center', // 水平安放位置，默认为左对齐，可选为：'center' ¦ 'left' ¦ 'right'¦ {number}（x坐标，单位px）
          y: 'top', // 垂直安放位置，默认为全图顶端，可选为：'top' ¦ 'bottom' ¦ 'center'¦ {number}（y坐标，单位px）
          textStyle: {
            // 主标题文字属性设置
            fontSize: 18, // 主标题文字大小
            fontWeight: 'bolder', // 主标题文字加粗
            color: '#333' // 主标题文字颜色
          },
          subtextStyle: {
            color: '#aaa' // 副标题文字颜色
          }
        },
        tooltip: {
          trigger: 'axis', // 触发类型，默认数据触发，见下图，可选为：'item'  ¦ 'axis'
          formatter: '{b}<br/>{a0}:{c0}万吨<br/>{a1}:{c1}万吨', // a（系列名称），b（类目值），c（数值）, d（无）
          // formatter(v) {
          //   console.log(v)
          //   let text
          //   return text = `${ v[0].name}<br/>${v[0].marker}  ${v[0].seriesName}  ${v[0].value}  吨
          // ${v[1].marker}  ${v[1].seriesName}  ${v[1].value}吨`
          // },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          // 图例
          orient: 'horizontal', // 布局方式，默认为水平布局 '水平' ¦ '垂直'  'horizontal' ¦ 'vertical'
          x: 'right', // 水平位置 'left' ¦ 'right' ¦ 'center' ¦ '数值' ¦ '百分数'
          y: '10', // 垂直位置 'top' ¦ 'bottom' ¦ 'center' ¦ '数值' ¦ '百分数'
          textStyle: {
            color: 'rgb(49, 49, 49, 1)', // 图例文字颜色
            fontSize: 12 // 图例文字大小
          },
          data: data
        },
        grid: {
          show: false, //---是否显示直角坐标系网格
          containLabel: true, //---grid 区域是否包含坐标轴的刻度标签
          left: '3%',
          right: '8%',
          bottom: '3%'
        },
        xAxis: [
          {
            show: true, //---是否显示
            position: 'bottom', //---x轴位置
            offset: 0, //---x轴相对于默认位置的偏移
            type: 'category', //---轴类型，默认'category'
            name: '月份', //---轴名称
            nameLocation: 'end', //---轴名称相对位置
            nameTextStyle: {
              //---坐标轴名称样式
              color: 'red',
              padding: [5, 0, 0, -5] //---坐标轴名称相对位置
            },
            nameGap: 15, //---坐标轴名称与轴线之间的距离
            nameRotate: 0, //---坐标轴名字旋转
            //---坐标轴 轴线
            axisLine: {
              show: true, //---是否显示
              //------------------- 箭头 -------------------------
              symbol: ['none', 'arrow'], //---是否显示轴线箭头
              symbolSize: [8, 8], //---箭头大小
              symbolOffset: [0, 7], //---箭头位置
              //------------------- 线 -------------------------
              lineStyle: {
                // color:'red',      //线和坐标颜色
                width: 1,
                type: 'solid'
              }
            },
            //---坐标轴 标签
            axisLabel: {
              //---坐标轴 标签
              show: true, //---是否显示
              inside: false, //---是否朝内
              rotate: 0, //---旋转角度
              margin: 8, //---刻度标签与轴线之间的距离
              color: 'red', //---默认取轴线的颜色
              interval: 1
            },
            splitLine: {
              //---grid 区域中的分隔线
              show: true, //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
              lineStyle: {
                color: 'rgb(82, 82, 82 , .3);',
                width: 1,
                type: 'dashed' //dashed  虚线   solid 实线
              }
            },
            data: XRoller,
            // axisLabel:{
            //   formatter:function(value){    //formatter回调函数实现换行，就能实现文字纵向显示
            //       return value.split("").join("\n")
            //   }
            // },
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            // min: 0,                     //y轴最小值
            // max: 1600,
            // interval: 400,
            name: '销量' //---轴名称
          }
        ],
        series: echartse
      })
    },
    getBarEcahrts() {
      let myChart = this.$echarts.init(document.getElementById('ADVANCE_ROSE'))
      let pieChartOne = {
        echartse: [
          { name: '服装', value: '3406417943' },
          { name: '机电产品', value: '3019557913' },
          { name: '鞋类', value: '1652080064' },
          { name: '其他', value: '1222774188' },
          { name: '织物及制品', value: '853583908' },
          { name: '农产品', value: '691524124' },
          { name: '文化产品', value: '526526894' }
        ],
        data: [
          '其他',
          '服装',
          '机电产品',
          '织物及制品',
          '文化产品',
          '农产品',
          '鞋类'
        ]
      }
      let echartse = pieChartOne.echartse
      let data = pieChartOne.data
      myChart.setOption({
        // 标题
        title: {
          text: '某站点货物种类', //主标题
          subtext: '单位：美元', //副标题
          x: 'center', // 水平安放位置，默认为左对齐，可选为：'center' ¦ 'left' ¦ 'right'¦ {number}（x坐标，单位px）
          y: 'top', // 垂直安放位置，默认为全图顶端，可选为：'top' ¦ 'bottom' ¦ 'center'¦ {number}（y坐标，单位px）
          // textAlign: null ,         // 水平对齐方式，默认根据x设置自动调整
          // backgroundColor: 'rgb(250, 235, 215, .5)',   //背景颜色
          borderColor: '#ccc', // 标题边框颜色
          borderWidth: 0, // 标题边框线宽，单位px，默认为0（无边框）
          padding: 5, // 标题内边距，单位px，默认各方向内边距为5，
          // padding: [10,15,10,15], // 接受数组分别设定上右下左边距，同css
          itemGap: 10, // 主副标题纵向间隔，单位px，默认为10，
          textStyle: {
            // 主标题文字属性设置
            fontSize: 18, // 主标题文字大小
            fontWeight: 'bolder', // 主标题文字加粗
            color: '#333' // 主标题文字颜色
          },
          subtextStyle: {
            color: '#aaa' // 副标题文字颜色
          }
        },
        // 提示框
        tooltip: {
          // trigger: 'item',
          formatter: '{a} <br/>{b} : {c} 美元 ({d}%)', // a（系列名称），b（数据项名称），c（数值）, d（百分比）
          trigger: 'item', // 触发类型，默认数据触发，见下图，可选为：'item'  ¦ 'axis'
          position: 'top', //自定义位置
          showDelay: 20, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
          hideDelay: 100, // 隐藏延迟，单位ms
          transitionDuration: 0.4, // 动画变换时间，单位s
          backgroundColor: 'rgba(0,0,0,0.7)', // 提示背景颜色，默认为透明度为0.7的黑色
          borderColor: '#333', // 提示边框颜色
          borderRadius: 4, // 提示边框圆角，单位px，默认为4
          borderWidth: 0, // 提示边框线宽，单位px，默认为0（无边框）
          padding: 5, // 提示内边距，单位px，默认各方向内边距为5， 接受数组分别设定上右下左边距，同css
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          // 图例
          orient: 'vertical', // 布局方式，默认为水平布局 '水平' ¦ '垂直'  'horizontal' ¦ 'vertical'
          x: 'left', // 水平位置 'left' ¦ 'right' ¦ 'center' ¦ '数值' ¦ '百分数'
          y: '20%', // 垂直位置 'top' ¦ 'bottom' ¦ 'center' ¦ '数值' ¦ '百分数'
          backgroundColor: 'rgb(250, 235, 215, .5)',
          borderColor: '#ccc', // 图例边框颜色
          borderWidth: 0, // 图例边框线宽，单位px，默认为0（无边框）
          // padding: 5,                // 图例内边距，单位px，默认各方向内边距为5，
          padding: [10, 5, 15, 5], // 接受数组分别设定上右下左边距，同css
          itemGap: 10, // 各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
          itemWidth: 20, // 图例图形宽度
          itemHeight: 14, // 图例图形高度
          textStyle: {
            color: 'rgb(49, 49, 49, 1)', // 图例文字颜色
            fontSize: 12 // 图例文字大小
          },
          data: data
        },
        series: [
          {
            name: '货物数据展示',
            type: 'pie',
            // radius : ['40%','55%'],   //环形图
            radius: '55%', //实心饼状图
            center: ['65%', '60%'], //饼状图的位置
            avoidLabelOverlap: true, //是否启用防止标签重叠策略
            // 设置值域的那指向线
            labelLine: {
              normal: {
                show: true // show设置线是否显示，默认为true，可选值：true ¦ false
              }
            },
            data: echartse,
            label: {
              normal: {
                position: 'outer', // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）
                formatter: '{b} \n {d}% ',
                // formatter(v) {
                //   let text = v.name.replace(/\、/g, '');
                //   return text.length < 4
                //     ? `${text}\n${v.percent + '%'}`
                //     : `${text.slice(0, 4)}\n${v.percent + '%'}`;
                // },
                textStyle: {
                  // color: "#000",
                  width: 40,
                  fontSize: 12
                }
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    geBARROSEEcahrts() {
      let myChart = this.$echarts.init(document.getElementById('BAR_ROSE'))
      let barGraphOne = {
        echartse: [{
          name:'进货',
          data:[515.25, 447.77, 451.15, 467.95, 478.35, 477.85, 486.48, 512.99, 591.06,512.16,484.62,284.62]
        },{
          name:'出货',
          data:[515.25, 447.77, 451.15, 467.95, 478.35, 477.85, 486.48, 512.99, 591.06,512.16,484.62,284.62]
        }],
        XRoller:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        data:['进货','出货']
      }
      let echartse = barGraphOne.echartse
      let XRoller = barGraphOne.XRoller
      let data = barGraphOne.data
      let itemStyle =  {
        normal: {
          barBorderRadius:[5 ,0 ,0 , 0]  ,  // 柱条边线圆角，单位px，默认为0
          label: {
            show: true,
            position:'inside', //默认自适应，水平布局为'top'，垂直布局为'right'，可选为
            // 'inside'|'left'|'right'|'top'|'bottom'
            // textStyle: null // 默认使用全局文本样式，详见TEXTSTYLE
            // formatter: '{b}\n{c}%'这是关键，在需要的地方加上就行了
            formatter : function(params) {
              var tar = params
              var txtarry = JSON.stringify(tar.data).split('')
              var rs = ''
              for ( var i = 0; i < txtarry.length; i++) {
                rs += txtarry[i] + '\n'
              }
              return rs
            }
          }
        }
      }
      for (let i = 0; i < echartse.length; i++) {
        echartse[i].type = 'bar'                       //bar柱状图 line 折线图
        echartse[i].barWidth = '30%'              //柱形宽度
        echartse[i].barGap =  0                  // 柱间距离，默认为柱形宽度的30%，可设固定值
        echartse[i].itemStyle = itemStyle
      }
      myChart.setOption({
        // color: ['#3398DB'],
        // 标题
        title : {
          text: '某站点进货月统计',            //主标题 轴
          subtext: '纯属虚构',             //副标题  
          x: 'center',                     // 水平安放位置，默认为左对齐，可选为：'center' ¦ 'left' ¦ 'right'¦ {number}（x坐标，单位px）
          y: 'top',                     // 垂直安放位置，默认为全图顶端，可选为：'top' ¦ 'bottom' ¦ 'center'¦ {number}（y坐标，单位px）
          textStyle: {             // 主标题文字属性设置
            fontSize: 18,         // 主标题文字大小
            fontWeight: 'bolder',// 主标题文字加粗
            color: '#333'       // 主标题文字颜色                     
          },
          subtextStyle: {
            color: '#aaa'     // 副标题文字颜色
          }
        },
        tooltip : {
          trigger: 'axis',             // 触发类型，默认数据触发，见下图，可选为：'item'  ¦ 'axis' 
          formatter: '{b}<br/>{a0}:{c0}万吨<br/>{a1}:{c1}万吨',// a（系列名称），b（类目值），c（数值）, d（无）
          // formatter(v) {
          //   console.log(v)
          //   let text
          //   return text = `${ v[0].name}<br/>${v[0].marker}  ${v[0].seriesName}  ${v[0].value}  吨
          // ${v[1].marker}  ${v[1].seriesName}  ${v[1].value}吨`
          // },
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'         // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {                  // 图例
          orient: 'horizontal', // 布局方式，默认为水平布局 '水平' ¦ '垂直'  'horizontal' ¦ 'vertical' 
          x: 'right',          // 水平位置 'left' ¦ 'right' ¦ 'center' ¦ '数值' ¦ '百分数' 
          y:'10',             // 垂直位置 'top' ¦ 'bottom' ¦ 'center' ¦ '数值' ¦ '百分数' 
          textStyle: {
            color: 'rgb(49, 49, 49, 1)',        // 图例文字颜色
            fontSize: 12                      // 图例文字大小
          },
          data: data
        },
        grid: {
          show:false,                 //---是否显示直角坐标系网格
          containLabel:true,         //---grid 区域是否包含坐标轴的刻度标签
          left: '3%',
          right: '8%',
          bottom: '3%'
        },
        xAxis : [
          {
            show:true,                     //---是否显示
            position:'bottom',            //---x轴位置
            offset:0,                    //---x轴相对于默认位置的偏移
            type : 'category',          //---轴类型，默认'category'
            name:'月份',               //---轴名称
            nameLocation:'end',       //---轴名称相对位置
            nameTextStyle:{          //---坐标轴名称样式
              color:'red',
              padding:[5,0,0,-5],  //---坐标轴名称相对位置
            },
            nameGap:15,                   //---坐标轴名称与轴线之间的距离
            nameRotate:0,                //---坐标轴名字旋转
            //---坐标轴 轴线
            axisLine:{                  
              show:true,                      //---是否显示
              //------------------- 箭头 -------------------------
              symbol:['none', 'arrow'],    //---是否显示轴线箭头
              symbolSize:[8, 8] ,         //---箭头大小
              symbolOffset:[0,7],        //---箭头位置
              //------------------- 线 -------------------------
              lineStyle:{
                // color:'red',      //线和坐标颜色
                width:1,
                type:'solid',
              }
            },
            //---坐标轴 标签
            axisLabel:{                    //---坐标轴 标签
              show:true,                  //---是否显示
              inside:false,              //---是否朝内
              rotate:0,                 //---旋转角度  
              margin: 8,               //---刻度标签与轴线之间的距离
              color:'red',            //---默认取轴线的颜色
            },
            splitLine:{                 //---grid 区域中的分隔线
              show:true,                 //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
              lineStyle:{
                color:'rgb(82, 82, 82 , .3);',
                width:1,
                type:'dashed',      //dashed  虚线   solid 实线
              },
            },
            data : XRoller,
            // axisLabel:{
            //   formatter:function(value){    //formatter回调函数实现换行，就能实现文字纵向显示
            //       return value.split("").join("\n")
            //   }
            // },
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
            // min: 0,                     //y轴最小值
            // max: 1600,
            // interval: 400,
            name:'销量',              //---轴名称
          }
        ],
        // series : echartse,
        series : [
          {
            name:'进货',
            type:'bar',
            itemStyle:{
              normal:{
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{ 
                  offset: 0,
                  color: '#ba7ef3'
                }, {
                  offset: 1,
                  color: '#965df2'
                }])
              }
            },
            data:echartse[0].data
          },{
            name:'出货',
            type:'bar',
            itemStyle:{
              normal:{
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{ 
                  offset: 0,
                  color: '#508DFF'
                }, {
                  offset: 1,
                  color: '#26C5FE'
                }])
              }
            },
            data:echartse[1].data
          }
          
        ],
      }) 
    }
  }
}
</script>

<style lang="scss" scoped>
#LINE_ECCHARTS {
  width: 80%;
  height: 300px;
  border: 1px solid #eaeaea;
  font-size: 1.2rem;
  padding: 10px;
  margin: 0 auto;
}
h1 {
  text-align: center;
  font-size: 3rem;
  margin: 2rem auto;
}
#ADVANCE_ROSE {
  width: 80%;
  height: 300px;
  border: 1px solid #eaeaea;
  font-size: 1.2rem;
  padding: 10px;
  margin: 0 auto;
}
#BAR_ROSE {
  width: 80%;
  height: 300px;
  border: 1px solid #eaeaea;
  font-size: 1.2rem;
  padding: 10px;
  margin: 0 auto;
}
</style>
