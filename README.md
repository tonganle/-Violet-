### Vue Cli 3.0

https://cli.vuejs.org/zh/

### 新项目构建 修改内容

```
<!-- vue.config.js 文件下 -->
 1)  devServer: {
    proxy: {
      '/proxy': {
        target: '<url>',  // 修改
        ws: true,
        changeOrigin: true
      }
    },
  2)   port: 8100, // 项目运行时的端口号 请每次项目修改
  3)   publicPath: process.env.NODE_ENV === 'production' ? './' : '/',  // 请根据 项目发布的地址选择 '/' 还是'./'
  4)   index.html 项目的名称
  5）  public favicon.ico 项目的图标
  6)   public config 项目的请求 ip 和端口
```

### eslint 语法问题

    a) v-for v-if 不要混用 请使用计算属性
    b) for 循环 请不要使用 var 定义 请使用 let 非 for 循环可以使用 const 或者 let const 和 let 类似 都没有声明提升的功能
    c) 定义的变量、常量、引入的组件等 没有使用 会报错 请注释 或者删除
    d）变量 函数命名使用驼峰命名法

### 项目目录

-   public 项目的静态资源 不参与打包

    > i18n 项目的中英文切换 中英文资源 切换的时候 element 相应控件语言应注意更新

    > tinymce 引用富文本编辑器 将富文本相关资源存放到 public 下面不参与编译

    > vendor 使用 webpack-parallel-uglify-plugin&& webpack/lib/DllPlugin 插件 将第三方插件进行 打包 生成的文件若 第三方库不更新 则不需要重新编译

-   src

    > assets 项目的静态资源相关 如 css,images,i18n 等的存放之地

    > mixins 提取公共的混入的逻辑

    > plugins 实现的vue插件

    > components 项目的公共组件 如 tinymce breadcrumb 等

    > mock request mock 模拟数据 拦截 axios request 请求的接口

    > utils 工具方法 如 MD5 加密 分割 session 储存等

    > router 路由

    > vendor 第三方JS插件

    > views 项目的组件目录

    > store vuex 状态管理器

-   views
    > basicviews 存放 登陆注册 错误页面等公共方法

> component-example 组件样例 不用管

> layuout 项目的整体布局 分为 mian header footer ,项目的左侧导航菜单和 内部 button 是权限控制，由后台返回，mian=> mian-left=> mounted() 注释掉了请求权限方法，根据项目需求启用

> dateBase 基础数据 内分为 advice 咨询建议 countryAdm 国家管理
> custom 客户管理 districtCounty 区县管理 newManager 消息管理
> portManage 港口管理 pressRelease 新闻公告 provinceCity 省市管理
> supplier 新闻公告

> platform 系统管理 administrator 用户管理 rolemanager 角色管理
> auth 权限管理 company 企业管理 sysmodule 系统模块管理 code 基础代码管理
