<template>
  <div>
    <el-breadcrumb separator="/" class="breadstyle">
      <transition-group name="breadcrumb">
        <template v-if="flag">
          <el-breadcrumb-item v-for="item in realList" :key="item.path">
            <span
              ><b>{{ $t(item.name) }}</b></span
            >
          </el-breadcrumb-item>
        </template>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data() {
    return {
      realList: [],
      flag: false
    }
  },
  watch: {
    $route() {
      this.getRoutePath()
    }
  },
  created() {
    this.getRoutePath()
  },
  methods: {
    getRoutePath() {
      this.flag = true
      let matched = this.$route.matched.filter(item => item.name)
      this.realList = matched
      if (this.realList[1].name === 'router.home') {
        this.realList.pop()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.breadstyle {
  background-color: #fff;
  padding-left: 2rem;
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 1s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(30px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
