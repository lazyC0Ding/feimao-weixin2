<style scoped lang="less" type="text/less">
  ul{
    background-color:#fff;
    padding:.26rem 0 .26rem .26rem;
    >li{
      display: inline-block;
      width:3.4rem;
      vertical-align: top;
      padding-bottom:.15rem;
      &:nth-child(odd) {
        margin-right:.2rem;
      }
      >img{
        display:block;
        height:3.4rem;
      }
      >div.name{
        margin-top:.18rem;
        font-size:.28rem;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      >div.price{
        margin-top:.18rem;
        color:#d0021b;
      }
    }
  }
</style>
<template>
  <ul>
    <li v-for="item in goods" :key="item.goods_id">
      <img :src="item.cover">
      <div class="name">{{item.name}}</div>
      <div v-if="!hidePrice" class="price">{{item.price}}</div>
    </li>
  </ul>
</template>
<script>
  export default {
    props:{
      goods:{
        type:Array,
        required:true
      },
      hidePrice:Boolean,
    },
    data(){
      return {

      }
    },
    components: {}
  }
</script>
