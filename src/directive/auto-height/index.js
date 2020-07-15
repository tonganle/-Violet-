// 自动将元素高度撑开至父元素的高度

const AutoHeight = {
  install (Vue) {
    Vue.directive('auto-height', {
      inserted (el, _binding, vNode) {
        const resize = () => {
          el.style.height = '0px'
          // 采用 $nextTick 来延迟更新高度
          vNode.componentInstance.$nextTick(() => {
            el.style.height = el.parentNode.offsetHeight + 'px'
          })
        }
        // 绑定 resize 动态监听改变高度
        const bindResize = () => {
          resize()
          window.addEventListener('resize', resize)
        }
        // 解绑 resize
        const unbindResize = () => {
          window.removeEventListener('resize', resize)
        }
        vNode.componentInstance.$on('hook:activated', bindResize)
        vNode.componentInstance.$on('hook:deactivated', unbindResize)
        bindResize()
      },
    })
  }
}

export default AutoHeight
