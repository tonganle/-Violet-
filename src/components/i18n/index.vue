<template>
  <el-dropdown trigger="click">
    <span class="el-dropdown-link"
      >{{ $t('message.i18n') }}<i class="el-icon-arrow-down el-icon--right"></i
    ></span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="language in languages"
        :key="language.language"
        @click.native="switcher(language)"
      >
        {{ language.description }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { LANGUAGES } from '@/plugins/i18n'

// 国际化语言切换组件
export default {
  name: 'languageswitcher',
  data() {
    return {
      languages: LANGUAGES
    }
  },
  methods: {
    switcher(language) {
      this.$i18n.locale = language.language
    }
  }
}
</script>
