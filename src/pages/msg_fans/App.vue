<style type="text/less" lang="less">
  @import '../../common';
  .fans-ul{
    >li{
      background-color:#fff;
    }
  }
</style>
<template>
  <div>
    <ul v-if="content && content.length" class="fans-ul">
      <li>

      </li>
    </ul>
    <div v-else class="tip-nothing" style="margin-top:2rem;">
      <img src="../../assets/img/Tip_nothing.png">
      <div>您还没有粉丝消息</div>
    </div>
    <app-permanent type="1"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  export default {
    data () {
      return {
        page:1,
        content:null,
      }
    },
    methods: {
      fetch(){
        this.$post(URL.getFansMessages, {page:this.page})
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
      document.title = '粉丝';
      return this.fetch();
    },
    components: {
      AppPermanent
    }
  }
</script>
