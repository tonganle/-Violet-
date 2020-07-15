import Mock from 'mockjs'
const Random = Mock.Random
Random.extend({
  ISYN: function() {
    var ISYN = ['Y', 'N']
    return this.pick(ISYN)
  },
  IS01: function() {
    var IS01 = ['0', '1']
    return this.pick(IS01)
  },
  ISXWTYPE: function() {
    var ISXWTYPE = ['新闻公告', '平台新闻']
    return this.pick(ISXWTYPE)
  },
  YSTYPE: function() {
    var YSTYPE = ['铁水联运', '铁水联运']
    return this.pick(YSTYPE)
  },
  getTYPE: function() {
    var getTYPE = ['平台管理员', '供应商','客户']
    return this.pick(getTYPE)
  }
})

  
