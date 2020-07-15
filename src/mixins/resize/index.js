// 监听 rezise 动态改变
// 需要预先定义 resize 方法

// 解决的问题是我们在一些页面中需要动态的改变表格的高度以填满整个页面
import debounce from '@/utils/debounce'

export default {
  // 首次加载添加 resize 事件
  mounted () {
    // 添加函数防抖 防止频繁触发
    this.resize = debounce(this.resize, 150)
    window.addEventListener('resize', this.resize)
    this.$nextTick(() => {
      this.resize()
    })
  },

  // keep-alive 进入前台时添加 resize 事件
  activated() {
    window.addEventListener('resize', this.resize)
    this.resize()
  },

  // keep-alive 进入后台时移除 resize 事件
  deactivated() {
    window.removeEventListener('resize', this.resize)
  },

  // 组件销毁之前移除 resize 事件
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },

  methods: {
    resize () {
      console.warn('需要重写 resize 方法，否则混入 resize 没有意义')
      console.warn('Please override this method')
    }
  }
}