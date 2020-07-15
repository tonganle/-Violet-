import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale'
import en from './langs/en'
import zhCN from './langs/zhCN'

Vue.use(VueI18n)

const messages = {
  en,
  zhCN
}

const i18n = new VueI18n({
  locale: 'zhCN', // 默认选择中文
  messages: messages,
  silentTranslationWarn: true // 移除警告
})

locale.i18n((key, value) => i18n.t(key, value))

export default i18n

export const LANGUAGES = [
  {
    language: 'en',
    description: 'English'
  },
  {
    language: 'zhCN',
    description: '中文'
  }
]
