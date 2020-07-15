<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedTags"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="tag.fullPath"
        tag="span"
        class="tags-view-item"
        @contextmenu.prevent.native="contextMenu(tag,$event)"
      >
        {{$t(tag.tagName)}}
        <span v-if="visitedTags.length > 1" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" class="contextMenu" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeSelectedTag(selectedTag)">关闭当前</li>
      <li @click="closeOtherTags">关闭其他</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    }
  },
  computed: {
    key() {
      return this.$route.fullPath
    },
    visitedTags() {
      return this.$store.state.tagViews.visitedTags
    },
    iframeURL() {
      return this.$store.state.tagViews.currentFrameTag
    },
    cachedViews() {
      return this.$store.state.tagViews.cachedViews
    }
  },
  watch: {
    $route() {
      this.addVisitedTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.addVisitedTags()
    this.moveToCurrentTag()
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    addVisitedTags() {
      if (!this.$route) {
        return
      }
      this.$store.dispatch('tagViews/addVisitedTags', this.$route)
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      if (!tags) return
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag(route) {
      if (
        this.visitedTags.length == 1 &&
        this.visitedTags[0].fullPath == this.$homeURL
      ) {
        return
      }
      this.$store.dispatch('tagViews/delSelectedTag', route).then(tags => {
        if (this.isActive(route)) {
          var lastestView = tags.slice(-1)[0]
          if (lastestView) {
            this.$router.push(lastestView.fullPath)
          } else {
            this.$router.push('/layout')
          }
        }
      })
    },
    // 关闭其他标签页
    closeOtherTags() {
      this.$router.push(this.selectedTag.fullPath)
      this.$store
        .dispatch('tagViews/closeOtherTags', this.selectedTag)
        .then(() => {
          this.moveToCurrentTag()
        })
    },
    closeAllTags() {
      // this.$router.push(this.$homeURL);
      this.$router.push('/layout')
      this.$store.dispatch('tagViews/closeAllTags')
    },
    contextMenu(tag, e) {
      this.selectedTag = tag
      this.visible = true
      this.top = e.clientY
      this.left = e.clientX + 15
    },
    closeMenu() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  border-top: 0.1rem solid #ddd;
  border-bottom: 0.1rem solid #ddd;
  height: 3.8rem;
  // width: 100%;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 2.6rem;
      line-height: 2.6rem;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 0.7rem;
      font-size: 1.4rem;
      margin: 0.5rem 0 0 1rem;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextMenu {
    background-color: #fff;
    position: absolute;
    padding: 10px 0;
    z-index: 2;
    border-radius: 3px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      font-size: 1.4rem;
      padding: 5px 10px;
      cursor: pointer;

      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>