// 导入element ui的国际化语言
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

// 在 public/js/zh_CH.js 中定义
const zhCN = window._I18N_.zh

// 合并选项 
export default Object.assign(zhCN, zhLocale)
