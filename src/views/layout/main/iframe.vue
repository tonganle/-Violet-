<template>
  <div class="iframe-wrapper">
    <iframe :src="iframeURL" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      permList: [],
      iframeURL: this.$store.state.app.iframeURL
    }
  },
  // computed:{
  //     iframeURL:{
  //       get(){
  //         return this.$store.state.app.iframeURL
  //       },
  //       set(){

  //       }
  //     }
  // },
  mounted() {
    this.getURL()
    // if(!this.iframeURL){
    //   this.getURL('mounted url==""')
    // }
  },
  methods: {
    getURL() {
      var permList = this.$store.state.user.permList
      // var title = this.$route.hash.slice(this.$route.hash.indexOf('&title=') + 7)
      var title = decodeURIComponent(this.$route.hash).slice(
        this.$route.hash.indexOf('&title=') + 7
      )
      var arr = title.split('=')
      for (var i = 0; i < permList.length; i++) {
        for (var f = 0; f < permList[i].Children.length; f++) {
          if (permList[i].Children[f].MDL_NAME == arr[0]) {
            this.$store.dispatch(
              'user/buttonPerm',
              JSON.parse(JSON.stringify(permList[i].Children[f].Grandson))
            )
          }
        }
      }

      // if(arr.length - 1 > 0){
      //   var grandson = arr[1]
      //   this.$store.dispatch('user/buttonPerm', JSON.parse(grandson))
      // }

      if (this.$route.query.url) {
        if (decodeURIComponent(this.$route.hash) != '') {
          var url =
            this.$route.query.url +
            decodeURIComponent(this.$route.hash).slice(
              0,
              decodeURIComponent(this.$route.hash).indexOf('&')
            )
          if (this.iframeURL != url) {
            this.iframeURL = url
            this.$store.dispatch('app/change_iframe_url', url)
          }
        } else {
          if (this.iframeURL != this.$route.query.url) {
            this.iframeURL = this.$route.query.url
            // console.log(this.iframeURL)
            this.$store.dispatch('app/change_iframe_url', url)
          }
        }
      }
    }
  },
  watch: {
    $route() {
      // console.log('watch:',val)
      // console.log(this.iframeURL)
      this.getURL()
    }
    // iframeURL(val){
    //   console.log(val)
    //   if(!val){
    //     console.log(false)
    //     this.getURL()
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.iframe-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
