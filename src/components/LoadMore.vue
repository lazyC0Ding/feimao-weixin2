<style scoped lang="less" type="text/less">

</style>
<template>
  <div>
  </div>
</template>
<script>
  export default {
    props: {
      url: {
        type: String,
        required: true,
      },
      params: {
        type: Object,
        required: true,
      },
      callback: {
        type: Function,
        required: true,
      },
      ifListen: Boolean, //是否监听滚动事件
    },
    data(){
      return {
        busy: false,
        hasMore: true,
      }
    },
    methods: {
      loadMore(){
        if (!this.hasMore) {
          return;
        }
        this.busy = true;
        console.log('开始加载');
        this.$post(this.url, this.params)
          .then(res => {
            this.busy = false;
            if (res.errcode == 0) {
              if (res.content && res.content.length) {
                this.callback(res.content);
              } else {
                this.hasMore = false;
              }
            } else {
              errback(res);
            }
          })
      },
      doScroll(){
        if (!this.ifListen || this.busy) {
          return;
        }
        if (Math.ceil(window.scrollY) + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
          this.loadMore();
        }
      }
    },
    mounted(){
      window.addEventListener('scroll', this.doScroll);
    },
    components: {}
  }
</script>
