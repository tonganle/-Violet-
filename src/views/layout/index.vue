<template>
  <div class="page">
    <header-component class="header"></header-component>
    <main-component class="main"></main-component>
    <!-- <footer-component class="footer"></footer-component> -->
  </div>
</template>
<script>
import header from '@/views/layout/header'
import main from '@/views/layout/main'
// import footer from '@/views/layout/footer'
export default {
  components: {
    headerComponent: header,
    mainComponent: main
    // footerComponent: footer
  },
  mounted() {
    this.$store.dispatch('app/change_iframe_url', '')
  }
}
</script>
<style lang="scss" scoped>
.page {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}
.header {
  flex: 0 0 auto;
}
.main {
  width: 100%;
  flex: 1;
  overflow: hidden;
}
.footerCom {
  flex: 0 0 auto;
}
</style>
