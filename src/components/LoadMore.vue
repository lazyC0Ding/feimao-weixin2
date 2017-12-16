<style scoped lang="less" type="text/less">

</style>
<template>
  <div>
    <div>scrollTop:{{scrollTop}}</div>
    <div>clientHeight:{{clientHeight}}</div>
    <div>scrollHeight:{{scrollHeight}}</div>
    <div>$_ifListen:{{$_ifListen ? 'true' : 'false'}}</div>
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
        scrollTop: '',
        clientHeight: '',
        scrollHeight: '',
        $_ifListen: '',
      }
    },
    watch: {
      ifListen(n){
        this.$_ifListen = n;
        if (n) {
          window.addEventListener('scroll', this.doScroll);
        } else {
          window.removeEventListener('scroll', this.doScroll);
        }
      },
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
        this.scrollTop = document.documentElement.scrollTop;
        this.clientHeight = document.documentElement.clientHeight;
        this.scrollHeight = document.documentElement.scrollHeight;
        if (this.busy) {
          return;
        }
        if (Math.ceil(document.documentElement.scrollTop) + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
          this.loadMore();
        }
      }
    },
    components: {}
  }
</script>
