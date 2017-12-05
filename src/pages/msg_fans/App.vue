<style type="text/less" lang="less">
  .fans-ul{
    >li{
      background-color:#fff;
    }
  }
</style>
<template>
  <div>
    <ul class="fans-ul">
      <li>

      </li>
    </ul>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  export default {
    data () {
      return {
        page:1,
      }
    },
    methods: {
      fetch(){
        this.$post(URL.getFansMessages, {page:this.page})
          .then( res => {
              if(res.errcode == 0) {
                console.log(res)
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
