<style type="text/less" lang="less">

</style>
<template>
  <div>
    <div class="cover">
      <swiper
        :list="content.images"
        :aspect-ratio="1/1"
        dots-position="center"
        auto
        loop
      ></swiper>
    </div>
    <div class="info">

    </div>
    <app-permanent type="1"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import {Swiper} from 'vux'
  export default {
    data () {
      return {
        goods_id:'',
        content:{},
      }
    },
    methods: {
      fetch(){
        this.$post(URL.getGoodsDetail, {goods_id:this.goods_id})
          .then( res => {
            if(res.errcode == 0) {
              console.log(res);
              const images = [];
              for (let i of res.content.images) {
                images.push({ img:i });
              }
              res.content.images = images;
              this.content = res.content;
            }else{
              errback(res)
            }
          })
      }
    },
    created(){
      document.title = '商品详情';
      this.goods_id = getSearchParams(location.search).goods_id;
      this.fetch();
    },
    components: {
      AppPermanent,
      Swiper,
    }
  }
</script>
