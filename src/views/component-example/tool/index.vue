<template>
  <div class="app-container">
    <div class="time">
      <h1 style="font-size:3rem;margin-bottom:1.5rem">获取时间方法</h1>
      <el-row>
        <el-col :span="8">
          <h1>计时器</h1>
        </el-col>
        <el-col :span="4" style="font-size:1.5rem">{{realTime}}</el-col>
        <el-col :span="3">
          <el-button type="primary" @click="stopRealTime">停止计时</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="beginRealTime">开始计时</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <h1>获取当前日期时间 格式采用：yyyy-MM-dd HH:mm:ss</h1>
        </el-col>
        <el-col :span="4" style="font-size:1.5rem">{{nowDate}}</el-col>
        <el-col :span="6">
          <el-button type="primary" @click="getNowDate">获取</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <h1>今天前后n天的日期,默认展示一天前</h1>
        </el-col>
        <el-col :span="4" style="font-size:1.5rem">
          <el-input-number v-model="oldDay" :min="1" :max="99999" label="请输入天数"></el-input-number>
        </el-col>
        <el-col :span="4" style="font-size:1.5rem">{{oldDayShow}}</el-col>
        <el-col :span="3">
          <el-button type="primary" @click="oldDateDay(0)">获取N天前日期</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="oldDateDay(1)">获取N天后日期</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <h1>今天前后n月的日期,默认展示一月前</h1>
        </el-col>
        <el-col :span="4" style="font-size:1.5rem">
          <el-input-number v-model="oldMonth" :min="1" :max="9999" label="请输入月数"></el-input-number>
        </el-col>
        <el-col :span="4" style="font-size:1.5rem">{{oldMonthShow}}</el-col>
        <el-col :span="3">
          <el-button type="primary" @click="oldDateMonth(0)">获取N月前日期</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="oldDateMonth(1)">获取N月后日期</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <h1>今天前后n年的日期,默认展示一年前</h1>
        </el-col>
        <el-col :span="4" style="font-size:1.5rem">
          <el-input-number v-model="oldYear" :min="1" :max="999" label="请输入月数"></el-input-number>
        </el-col>
        <el-col :span="4" style="font-size:1.5rem">{{oldYearShow}}</el-col>
        <el-col :span="3">
          <el-button type="primary" @click="oldDateYear(0)">获取N年前日期</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="oldDateYear(1)">获取N年后日期</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <h1 style="font-size:3rem;margin-bottom:1.5rem">去除空格</h1>
      <el-row>
        <el-col :span="4">
          <el-col :span="18">
            <el-input v-model="trimStr" type="text"></el-input>
          </el-col>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="getTrimStr(1)">1-所有空格</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="getTrimStr(2)">2-前后空格</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="getTrimStr(3)">3-前空格</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="getTrimStr(4)">4-后空格</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <h1 style="font-size:3rem;margin-bottom:1.5rem">检测密码强度</h1>
      <el-row>
        <el-col :span="4">
          <el-col :span="18">
            <el-input v-if="!isShowPWD" v-model="checkPWD" type="password">
              <el-button
                slot="append"
                maxlength="20"
                minlength="6"
                icon="el-icon-turn-off"
                @click="isShowPWD=true"
              ></el-button>
            </el-input>
            <el-input v-else v-model="checkPWD" type="text">
              <el-button
                slot="append"
                maxlength="20"
                minlength="6"
                icon="el-icon-open"
                @click="isShowPWD=false"
              ></el-button>
            </el-input>
          </el-col>
        </el-col>
        <el-col :span="3" style="font-size:1.5rem">{{pwdLevel}}</el-col>
        <el-col :span="3">
          <el-button type="primary" @click="getCheckPWD">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <h1 style="font-size:3rem;margin-bottom:1.5rem">现金额大写转换</h1>
      <el-row>
        <el-col :span="4">
          <el-col :span="18">
            <el-input-number v-model="digit"></el-input-number>
          </el-col>
        </el-col>
        <el-col :span="3" style="font-size:1.5rem">{{upDigitShow}}</el-col>
        <el-col :span="3">
          <el-button type="primary" @click="changeDigit">转换默认</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="changeDigit(1)">转换美元</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="changeDigit(2)">转换欧元</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <h1 style="font-size:3rem;margin-bottom:1.5rem">对数组的一些操作</h1>
      <el-row>
        <el-col :span="4">
          <el-col :span="18">
            <span>{{nowList}}</span>
          </el-col>
        </el-col>
        <el-col :span="2" style="font-size:1.5rem">{{nowListData}}</el-col>
        <el-col :span="3">
          <el-button type="primary" @click="getListData(0)">数组最大值</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="getListData(1)">数组最小值</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="getListData(2)">数组求和</el-button>
        </el-col>
        <el-col :span="3">
          <el-col :span="6" style="margin-right:1rem;">
            <el-input v-model="covArrData" type="text"></el-input>
          </el-col>
          <el-button type="primary" @click="getListData(3)">数组平均值</el-button>
        </el-col>
        <el-col :span="6">
          <el-col :span="6" style="margin-right:1rem;">
            <el-input type="text" v-model="inputData"></el-input>
          </el-col>
          <el-button type="primary" @click="getListData(4)">指定字符出现次数</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="font-size:1.5rem">{{countListData}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <el-button type="primary" @click="getCountListData1(0)">返回数组出现元素和次数，默认降序</el-button>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="getCountListData1(1)">返回数组出现元素和次数，修改升序</el-button>
        </el-col>
        <el-col :span="1" style="margin-right:1rem;">
          <el-input type="text" v-model="getCountData"></el-input>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" @click="getCountListData2(0)">返回数组前N出现元素和次数，降序</el-button>
          <el-button type="primary" @click="getCountListData2(1)">返回数组前N出现元素和次数，升序</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getNowTime, trimStr, checkPwd, upDigit } from '@/utils/utils'
import {
  maxArr,
  minArr,
  sumArr,
  covArr,
  getEleCount,
  getCount
} from '@/utils/aboutArray'

export default {
  data() {
    return {
      nowDate: '',
      oldDay: '',
      oldMonth: '',
      oldYear: '',
      oldDayShow: '',
      oldMonthShow: '',
      oldYearShow: '',
      realTime: '',
      timer: '',
      trimStr: '',
      checkPWD: '',
      pwdLevel: '',
      isShowPWD: false,
      upDigitShow: '',
      digit: '',
      nowListData: '',
      nowList: [1, 2, 5, 6, 6, 6, 6, 6, 6, 1, 2, 3, 4],
      inputData: '',
      covArrData: '',
      getCountData: '',
      countListData: ''
    }
  },
  mounted() {
    this.nowDate = getNowTime()
    this.oldDayShow = getNowTime('day', this.oldDay, 0)
    this.oldMonthShow = getNowTime('month', this.oldMonth, 0)
    this.oldYearShow = getNowTime('year', this.oldYear, 0)
    this.beginRealTime()
  },
  methods: {
    getNowDate() {
      this.nowDate = getNowTime()
    },
    oldDateDay(data) {
      this.getNowDate()
      this.oldDayShow = getNowTime('day', this.oldDay, data)
    },
    oldDateMonth(data) {
      this.getNowDate()
      this.oldMonthShow = getNowTime('month', this.oldMonth, data)
    },
    oldDateYear(data) {
      this.getNowDate()
      this.oldYearShow = getNowTime('year', this.oldYear, data)
    },
    stopRealTime() {
      clearInterval(this.timer)
    },
    beginRealTime() {
      this.realTime = getNowTime()
      this.timer = setInterval(() => {
        this.realTime = getNowTime()
      }, 1000)
    },
    getTrimStr(type) {
      this.trimStr = trimStr(this.trimStr, type)
    },
    getCheckPWD() {
      this.pwdLevel = checkPwd(this.checkPWD)
    },
    changeDigit(type) {
      this.upDigitShow = upDigit(this.digit, type)
    },
    getListData(type) {
      switch (type) {
      case 0:
        this.nowListData = maxArr(this.nowList)
        break
      case 1:
        this.nowListData = minArr(this.nowList)
        break
      case 2:
        this.nowListData = sumArr(this.nowList)
        break
      case 3:
        this.nowListData = covArr(this.nowList, this.covArrData)
        break
      case 4:
        this.nowListData = getEleCount(this.nowList, this.inputData)
        break
      }
    },
    getCountListData2(num) {
      if (!num) {
        this.countListData = getCount(this.nowList, this.getCountData)
      } else {
        this.countListData = getCount(this.nowList, this.getCountData, 1)
      }
    },
    getCountListData1(num) {
      if (!num) {
        this.countListData = getCount(this.nowList)
      } else {
        this.countListData = getCount(this.nowList, null, 1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container .el-row {
  margin-bottom: 1.5rem !important;
}
</style>