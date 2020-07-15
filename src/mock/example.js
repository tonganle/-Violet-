let baseConfig = [
  // {
  //   BaseUrl: 'BaseUrl',
  //   url: '/DXNXTD/login',
  //   method: 'post',
  //   response: {
  //     'msg': null,
  //     'success': 1,
  //     data: {
  //       FLT_NAME: "测试",
  //       FLT_UUID: "491915A42B5D4C7992094412CA8EC8FE",
  //       SessionId: "957fbddc9223421c80c488546149d8e5",
  //       USERNAME: "测试账号",
  //       USR_CODE: "tadmin",
  //       UserId: "26AF3A1522C2446EBDC96939B3D675E8",
  //     }
  //   }
  // },

  {
    BaseUrl: 'BaseUrl',
    url: '/Api/logout',
    method: 'post',
    response: {
      data: {
        code: 1
      }
    }
  },
  {
    BaseUrl: 'BaseUrl',
    url: '/Api/UpLoadImage',
    method: 'post',
    response: {
      data: {
        imgURL: 'http://www.lincoc.com/static/img/1.db347b4.png'
      }
    }
  },
  {
    BaseUrl: 'BaseUrl',
    url: '/Api/changePassword',
    method: 'post',
    response: {
      data: {
        code: 1,
        msg: '密码修改成功'
      }
    }
  },
  {
    BaseUrl: 'BaseUrl',
    url: '/Api/news/getList',
    method: 'post',
    response: {
      data: {
        code: 1,
        'data|5-10': [
          {
            newsTitle: '@csentence',
            newsDate: '@date("yyyy-MM-dd")',
            'reading|1-100': 100,
            author: '@cname'
          }
        ]
      }
    }
  },
  {
    BaseUrl: 'BaseUrl',
    url: '/Api/GetIEData',
    method: 'post',
    response: {
      data: {
        'data|8': [
          {
            'station|+1': [
              '武汉站',
              '阳逻三期',
              '武汉花山',
              '武汉金口',
              '阳逻二期',
              '阳逻一期',
              '武港码头',
              '阳逻场站'
            ],
            'load|0.1': 0,
            'down|0.1': 0
          }
        ]
      },
      msg: '',
      success: '1'
    }
  },
  {
    BaseUrl: 'BaseUrl',
    url: '/Api/GetIEYearData',
    method: 'post',
    response: {
      data: {
        'data|12': [
          {
            'month|+1': [
              '一月',
              '二月',
              '三月',
              '四月',
              '五月',
              '六月',
              '七月',
              '八月',
              '九月',
              '十月',
              '十一月',
              '十二月'
            ],
            'load|100-500': 100,
            'down|100-500': 100
          }
        ]
      },
      msg: '',
      success: '1'
    }
  }
]

export default baseConfig
