<style type="text/less" lang="less">
  html, body{
    height:100%;
    background-color:#fff;
  }
</style>
<template>
  <div v-if="goods">
    <goods-container :goods="goods" :type="params.type" :time="time"></goods-container>
    <load-more
      :url="url"
      :page="params.page"
      :params="{type:params.type}"
      :callback="loadMore"
      :no-listen="!hasMore"
    >
    </load-more>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import GoodsContainer from '@c/GoodsContainer.vue'
  import AppPermanent from '@c/AppPermanent.vue'
  import LoadMore from '@c/LoadMore.vue'

  export default {
    data () {
      return {
        params:{
          type:'', //'1'：秒杀活动 '2'：打折活动 '3'：赠品
          page:1,
        },
        url:URL.getActivityGoods,
        hasMore:true,
        goods:null,
        time:null,
      }
    },
    methods: {
      loadMore(content){
        if(content.length) {
          this.goods.push(...content);
          this.params.page++;
        }else{
          this.hasMore = false;
        }
      },
      fetch(){
        this.$post(this.url, this.params)
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
      LoadMore,
    }
  }
</script>
