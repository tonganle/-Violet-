<template>
  <div class="home">
    <!-- 图表一 -->
    <el-row class="section1" :gutter="20">
      <el-col
        :xs="12"
        :sm="8"
        :md="6"
        :lg="3"
        :xl="3"
        v-for="(station, index) in section1Data"
        :key="'circle-' + index"
      >
        <div class="circle">
          <div class="circle-top flex-row">
            <p class="left">{{ station.station }}</p>
            <div class="right flex-column">
              <p>实际：{{ station.fact }}</p>
              <p>计划：{{ station.plan }}</p>
            </div>
          </div>
          <div :id="'circle_' + index" class="circle-bottom"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 图表二 -->
    <el-row class="section2">
      <el-col :span="24">
        <div class="section2canvas" id="bar_1"></div>
      </el-col>
    </el-row>
    <el-row class="section3" type="flex" justify="space-between" :gutter="20">
      <!-- 图表三 -->
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="section3canvas" id="line_1"></div>
      </el-col>
      <!-- 图表四 -->
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="section3canvas right" id="pie_1"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getIEData, getIEYearData } from '@/request/api'
export default {
  data() {
    return {
      section1Data: [
        {
          station: '武汉站',
          plan: 0,
          fact: 0
        },
        {
          station: '阳逻三期',
          plan: 0,
          fact: 0
        },
        {
          station: '武汉花山',
          plan: 0,
          fact: 0
        },
        {
          station: '武汉金口',
          plan: 0,
          fact: 0
        },
        {
          station: '阳逻二期',
          plan: 0,
          fact: 0
        },
        {
          station: '阳逻一期',
          plan: 0,
          fact: 0
        },
        {
          station: '武港码头',
          plan: 0,
          fact: 0
        },
        {
          station: '阳逻场站',
          plan: 0,
          fact: 0
        }
      ],
      section3Data: [],
      section2Data: [],
      section4Data: {
        empty: 50,
        havey: 60
      },
      color: ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7']
    }
  },
  methods: {
    initSection1() {
      for (let i = 0; i < this.section1Data.length; i++) {
        let id = 'circle_' + i
        let data = this.section1Data[i]
        let echart = this.$echarts.init(document.getElementById(id))
        let option = {
          color: this.color,
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
            position: [-10, -10]
          },
          series: [
            {
              name: '月度吞吐量（TEU）',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                }
              },
              data: [
                { value: data.fact, name: '实际吞吐量' },
                { value: data.plan - data.fact, name: '未完成计划吞吐量' }
              ]
            }
          ]
        }
        echart.setOption(option)
      }
    },
    initSection2() {
      getIEData().then(res => {
        this.section2Data = res.data.data
        let echart = this.$echarts.init(document.getElementById('bar_1'))
        let data = [['station', '装船', '卸船', '合计']]
        for (let i = 0; i < this.section2Data.length; i++) {
          let item = this.section2Data[i]
          data.push([
            item.station,
            item.load,
            item.down,
            Number(item.load + item.down).toFixed(1)
          ])
        }
        let option = {
          color: this.color,
          title: {
            text: '集装箱当月吞吐量(TEU)',
            textStyle: {
              fontSize: 18
            }
          },
          legend: {},
          tooltip: {
            trigger: 'axis'
          },
          dataset: {
            source: data
          },
          xAxis: { type: 'category' },
          yAxis: {},
          series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
        }
        echart.setOption(option)
      })
    },
    initSection3() {
      getIEYearData().then(res => {
        this.section3Data = res.data.data
        let echart = this.$echarts.init(document.getElementById('line_1'))
        let data = [['month', '装船', '卸船', '合计']]
        for (let i = 0; i < this.section3Data.length; i++) {
          let item = this.section3Data[i]
          data.push([item.month, item.load, item.down, item.load + item.down])
        }
        let option = {
          color: this.color,
          title: {
            text: '集装箱当年吞吐量(TEU)',
            textStyle: {
              fontSize: 18
            }
          },
          legend: {},
          tooltip: {
            trigger: 'axis'
          },
          dataset: {
            source: data
          },
          xAxis: { type: 'category' },
          yAxis: {},
          series: [{ type: 'line' }, { type: 'line' }, { type: 'line' }]
        }
        echart.setOption(option)
      })
    },
    initSection4() {
      let echart = this.$echarts.init(document.getElementById('pie_1'))
      let option = {
        color: this.color,
        title: {
          text: '当月空箱所占比例(%)',
          x: 'center'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['空箱', '重箱']
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '空箱指数',
            type: 'pie',
            radius: '65%',
            avoidLabelOverlap: false,
            data: [
              { value: this.section4Data.empty, name: '空箱' },
              { value: this.section4Data.havey, name: '重箱' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      echart.setOption(option)
    }
  },
  mounted() {
    this.initSection1()
    this.initSection2()
    this.initSection3()
    this.initSection4()
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  padding: 1rem 3rem;
}
.section1 {
  min-width: 800px;
  justify-content: space-around;
  padding: 3rem 0;
  .circle {
    box-shadow: 0 0 11px #aaa;
    .circle-top {
      height: 8rem;
      border-bottom: 1px solid #ccc;
      .left {
        line-height: 8rem;
        font-size: 1.2rem;
        font-weight: bold;
        // background-color: #c11c46;
        border-right: 1px solid #ccc;
        text-align: center;
        width: 50%;
      }
      .right {
        width: 50%;
        p {
          line-height: 40px;
          text-align: center;
        }
        p:first-child {
          border-bottom: 1px solid #ccc;
        }
      }
    }
    .circle-bottom {
      height: 100px;
      // box-shadow: 0 0 11px #AAA;
      margin-bottom: 10px;
    }
  }
}
.section2 {
  min-width: 800px;
  box-shadow: 0 0 11px #aaa;
  padding-top: 10px;
  .section2canvas {
    height: 300px;
    width: 100%;
  }
}
.section3 {
  min-width: 800px;
  padding: 40px 0;
  .section3canvas {
    box-shadow: 0 0 11px #aaa;
    padding-top: 10px;
    height: 300px;
    width: 100%;
  }
}

.flex-column {
  display: flex;
  flex-direction: column;
}
.flex-row {
  display: flex;
  flex-direction: row;
}
</style>
