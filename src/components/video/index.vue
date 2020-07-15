<template>
  <div  class="videoBox">
    <video  ref='video' height="100%"  loop="loop"  :poster="imgUrl" muted controls :autoplay="false" controlslist="nodownload" :preload="false">
        <source :src="videoUrl" type="video/mp4"> 
    </video>
  </div>
</template>

<script>
export default {
  //https://segmentfault.com/a/1190000014912488  video属性详解 以下是常用
  /**
   *  html5对视频格式的要求 
   * Ogg = 带有 Theora 视频编码和 Vorbis 音频编码的 Ogg 文件
    MPEG4 = 带有 H.264 视频编码和 AAC 音频编码的 MPEG 4 文件
    WebM = 带有 VP8 视频编码和 Vorbis 音频编码的 WebM 文件
    推荐使用MP4，MP4格式要求如下：视频编码：h264、 音频编码：AAC，用视频转码工具可以处理 ，简单处理可以使用爱奇艺万能播放器来进行
   */
  /**
   * controls 设置或返回视频是否应该显示控件（比如播放、进度条等控件）
   * autoplay 是否在就绪（加载完成）后自动播放视频
   * nodownload 设置是否去除去除下载按钮nodownload controlslist="nodownload"
   * nofullscreen 是否去除全屏显示按钮
   * muted 设置是否静音（注意：移动端非静音模式下无法自动播放）
   * loop 设置循环播放
   * preload 视频预加载模式
   * poster 设置视频的封面
   */
  props: {
    videoUrl: {
      // 上传地址
      type: String,
      default: ''
    },
    imgUrl:{
      type: String,
      default: ''
    }
  },
  
  data() {
    return {
      
    }
  },

  methods: {},

}
</script>
<style lang="scss" scoped>
.videoBox {
  width: 100%;
  height: 100%;
}
video{
padding:0;
}
</style>
