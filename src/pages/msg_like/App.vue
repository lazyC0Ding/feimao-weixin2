<style type="text/less" lang="less">

</style>
<template>
  <div v-if="content">
    <app-msg-comment v-if="content.length" :msgs="content"></app-msg-comment>
    <div v-else class="tip-nothing" style="margin-top:2rem;">
      <img src="../../assets/img/Tip_nothing.png">
      <div>您还没有点赞消息</div>
    </div>
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
        content:null,
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
