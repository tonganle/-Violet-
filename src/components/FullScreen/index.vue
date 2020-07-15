<template>
  <div>
    <svg class="icon" aria-hidden="true" @click="toggleFullScreen">
      <use xlink:href="#icon-quanping"></use>
    </svg>
  </div>
</template>
<script>
import screenfull from 'screenfull'
export default {
  name: 'FullScreen',
  data() {
    return {}
  },
  methods: {
    toggleFullScreen() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'your brower is not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  width: 1.3rem;
  height: 1.3rem;
  cursor: pointer;
}
</style>
