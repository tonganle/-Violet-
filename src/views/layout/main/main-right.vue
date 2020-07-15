<template>
  <div class="main-right">

    <!-- 顶部标签栏 -->
    <tags-view></tags-view>

    <!-- 标签内容 -->
    <section class="system-main">
      <transition name="fade" mode="out-in">

        <keep-alive :include="cachedViews">
          <router-view :key="key"></router-view>
        </keep-alive>

      </transition>
    </section>
  </div>
</template>

<script>
import TagsView from './tagsview'
export default {
  components: {
    TagsView
  },
  computed: {
    key() {
      return this.$route.fullPath
    },
    cachedViews() {
      return this.$store.state.tagViews.cachedViews
    }
  }
}

</script>

<style lang="scss" scoped>
  .main-right {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /*fade*/
  .fade-leave-active {
    transition: all 0.3s;
  }

  .fade-enter-active {
    transition: all 0.6s;
  }

  .fade-enter {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

</style>
