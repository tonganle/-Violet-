let configList = [
  {
    BaseUrl: 'BaseUrl',
    url: '/Api/adminData/getList',
    method: 'post',
    response: {
      data: {
        code: 1,
        'data|8-15': [
          {
            'userCode|1': ['YYZH', 'newsman', 'test01', 'admin', 'CS', 'TEST'],
            username: '@cname',
            'userRole|1': ['运营平台', '新闻发布', '平台管理员', '铁水账号1'],
            'contactTel|1': ['18783426785', '15518393495', '1351843491'],
            email: '@email',
            'statusIsValid|5-2': true
          }
        ]
      }
    }
  }
]

export default configList
