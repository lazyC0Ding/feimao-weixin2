<style type="text/less" lang="less">

</style>
<template>
  <div>
    <app-msg-comment :msgs="content"></app-msg-comment>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import AppMsgComment from '@c/AppMsgComment.vue'
  export default {
    data () {
      return {
        page:1,
        content:[],
      }
    },
    methods: {
      fetch(){
        this.$post(URL.getLikeMessages, {page:this.page})
          .then( res => {
              if(res.errcode == 0) {
                  console.log(res)
                this.content = res.content;
              }else {
                  errback(res)
              }
          })
      }
    },
    created(){
      document.title = '点赞';
      this.fetch();
    },
    components: {
      AppPermanent,
      AppMsgComment,
    }
  }
</script>
