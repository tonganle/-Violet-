// 导入element ui的国际化语言
import enLocale from 'element-ui/lib/locale/lang/en'

// 在 public/js/en.js 中定义
const en = window._I18N_.en

// 合并选项
export default Object.assign(en, enLocale)
