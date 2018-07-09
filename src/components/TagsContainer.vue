<style scoped lang="less" type="text/less">
  .tag-box{
    width: 7rem;
    position: relative;
    overflow: hidden;
    margin: 0 auto .3rem auto;
    text-align: left;
    line-height: .4rem;
  }
  .tag-img{
    width: 100%;
    height: 3.5rem;
  }
  .tag-title{
    font-size: .32rem;
    margin: .08rem .05rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .tag-content{
    font-size: .26rem;
    width: 5.4rem;
    margin: .05rem;
    color:#9da5a8;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .tag-price{
    font-size: .32rem;
    color:#D0021B;
    position: absolute;
    bottom: .05rem;
    right: .06rem
  }



</style>
<template>
  <div style="height: auto">
    <div class="tag-box" v-for="item in tags">
      <img :src="item.cover" class="tag-img" @click="showDetail(item.goods_id)"/>
      <div class="tag-title">{{item.title}}</div>
      <div class="tag-content">{{item.content}}</div>
      <div class="tag-price">¥{{item.price}}</div>
    </div>
  </div>

</template>
<script>
  export default {
    props: {
      tags: {
        type: Array,
        required: true
      },

    },
    data(){
      return {
        now: 0,
      }
    },
    computed: {

    },
    methods: {
      showDetail(goods_id){
        return openPage('goods_detail', {goods_id})
      },
    },
    created(){
    },
  }
</script>
