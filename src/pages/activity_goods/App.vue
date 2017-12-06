<style type="text/less" lang="less">
  html, body{
    height:100%;
    background-color:#fff;
  }
</style>
<template>
  <div>
    <goods-container :goods="goods" :type="params.type" :time="time"></goods-container>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import GoodsContainer from '@c/GoodsContainer.vue'
  import AppPermanent from '@c/AppPermanent.vue'
  export default {
    data () {
      return {
        params:{
          type:'', //'1'：秒杀活动 '2'：打折活动 '3'：赠品
          page:1,
        },
        goods:[],
        time:{},
      }
    },
    methods: {
      fetch(){
        this.$post(URL.getActivityGoods, this.params)
          .then( res => {
              if(res.errcode == 0) {
                this.goods = res.content.goods;
                this.time = res.content.time[0];
                console.log(res)
              }else{
                  errback(res)
              }
          })
      }
    },
    created(){
      const {type, name} = getSearchParams(location.search);
      document.title = name;
      this.params.type = type;
      this.fetch();
    },
    components: {
      AppPermanent,
      GoodsContainer,
    }
  }
</script>
