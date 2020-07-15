/* 
 * 剥离业务无关的分页逻辑
 * 依赖于 el-pagination 组件
 * 并且需要将组件设置 ref, 具体 ref 的值可以在 Pagination 中设置 ref，默认为 'pagination'
 * 设置 ref 是为了取得 el-pagination 实例来解决刷新列表时不调用接口的BUG
 * 具体实现方式就是设置 lastEmittedPage 的值为当前页码的值
 * 
 * 混入了一个对象 包含了分页需要的一些基本数据
 * Pagination
 * 
 * 混入了 6 个方法
 * handleSizeChange()      - 修改每页条数的回调 需要绑定到 el-pagination 上
 * handleCurrentChange()   - 修改当前页数的回调 需要绑定到 el-pagination 上
 * searchList()            - 重置查询（会回到首页） 会调用 getList 方法
 * refreshList()           - 刷新列表（不会回到首页） 会调用 getList 方法
 * indexMethod()           - 生成表格序号的方法
 * updatePaginationTotal() - 更新 total 的值
 * 
 * 需要被混入的组件实现 getList 方法
 * 接收三个参数
 * currentPage             - 当前页码
 * pageSize                - 每页条数
 * updatePaginationTotal   - 更新 total 的回调，需要显式的调用这个方法才会更新 total 值，接收的参数就是 total 值
**/
export default {
  data () {
    return {
      Pagination: {
        ref: 'pagination',
        pageSize: 30, // 每页条数
        pageSizeList: [30, 60, 90, 120], // 分页数组
        currentPage: 1, // 当前页码
        total: 0, // 总条数
        layout: 'sizes, prev, pager, next, jumper, total' // 按钮布局
      }
    }
  },
  methods: {
    // 修改每页条数
    handleSizeChange (pageSize) {
      this.Pagination.currentPage = 1
      this.$refs[this.Pagination.ref].lastEmittedPage = 1
      this.Pagination.pageSize = pageSize
      this.getList(this.Pagination.currentPage, this.Pagination.pageSize, this.updatePaginationTotal)
    },

    // 修改当前页数
    handleCurrentChange (currentPage) {
      if (this.Pagination.currentPage === currentPage) return

      this.Pagination.currentPage = currentPage
      this.$refs[this.Pagination.ref].lastEmittedPage = currentPage
      this.getList(this.Pagination.currentPage, this.Pagination.pageSize, this.updatePaginationTotal)
    },

    // 修改 total 值
    updatePaginationTotal (total) {
      this.Pagination.total = total
    },
    
    // 查询
    searchList () {
      this.handleSizeChange(this.Pagination.pageSize)
    },

    // 刷新列表
    refreshList () {
      this.getList(this.Pagination.currentPage, this.Pagination.pageSize, this.updatePaginationTotal)
    },

    // 生成表格序号的方法
    indexMethod (index) {
      return 1 + index + (this.Pagination.currentPage - 1) * this.Pagination.pageSize
    },

    // 获取数据的方法 需要实际组件重写
    getList () {
      console.warn('请在使用 PaginationMixin 的时候重写 getList 方法')
      console.warn('Please override this method to load data')
    }

  }
}