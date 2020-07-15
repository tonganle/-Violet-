<template>
  <div>
    <about-video  class="videoBox"  :videoUrl="videoUrl" :imgUrl="imgUrl"></about-Video>
  </div>
</template>

<script>
import aboutVideo from '@/components/video'

export default {
  components: { aboutVideo },

  data() {
    return {
      videoUrl:require('@/assets/images/videoDemo.mp4'), // 传递视频url
      imgUrl:require('@/assets/images/imgFP.jpg')  // 传递视频封面url
    }
  },

  methods: {
   
  }
}
</script>
<style lang="scss" scoped>
.videoBox{
    width:600px;
  height: 400px;
  margin: 1rem auto;
}
</style>
