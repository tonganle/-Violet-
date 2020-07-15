<template>
  <div class="error-page-style">
    <div class="page-style">
      <div class="page-left">
        <!-- 图片需要换 -->
        <img
          class="page-left-img"
          src="@/assets/images/error/error.png"
          alt="404"
        />
      </div>
      <div class="page-right">
        <div class="page-right-title">出错了！</div>
        <div class="page-right-content">很抱歉！页面没有找到</div>
        <div class="page-right-content">
          您可以选择刷新试试！也可以点击下面按钮返回首页！
        </div>
        <router-link :to="{path:'/layout'}" class="bullshit__return-home"
          ><el-button size="small" type="primary" round
            >返回首页</el-button
          ></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.error-page-style {
  display: flex;
  justify-content: center;
  margin-top: 10rem;
}
.page-style {
  position: relative;
  .page-left {
    float: left;
    width: 50rem;
    overflow: hidden;
    .page-left-img {
      width: 100%;
    }
  }
  .page-right {
    position: relative;
    top: 6rem;
    float: left;
    width: 40rem;
    overflow: hidden;
    .page-right-title {
      font-size: 3.2rem;
      font-weight: bold;
      color: #1482f0;
      margin-bottom: 2rem;
    }
    .page-right-content {
      font-size: 1.5rem;
      margin-bottom: 2.5rem;
    }
  }
}
</style>
