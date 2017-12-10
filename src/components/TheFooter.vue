<style type="text/less" lang="less" scoped>
  @height:1rem;
  nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #000;
    height: @height;
    line-height:@height * 1.5;
    font-size:0;
    > a {
      display: inline-block;
      width: 25%;
      height:100%;
      background:no-repeat center .05rem;
      background-size:.6rem;
      font-size:.20rem;
      color:#fff;
      text-align:center;
      &:nth-child(1) {
        background-image: url(../assets/img/Tab_off1.png);
        &.active{
          color:#f7ae05;
          background-image:url(../assets/img/Tab_on1.png)
        }
      }
      &:nth-child(2) {
        background-image: url(../assets/img/Tab_off2.png);
        &.active{
          color:#f7ae05;
          background-image:url(../assets/img/Tab_on2.png)
        }
      }
      &:nth-child(3) {
        background-image: url(../assets/img/Tab_off3.png);
        &.active{
          color:#f7ae05;
          background-image:url(../assets/img/Tab_on3.png)
        }
      }
      &:nth-child(4) {
        background-image: url(../assets/img/Tab_off4.png);
        &.active{
          color:#f7ae05;
          background-image:url(../assets/img/Tab_on4.png)
        }
      }
    }
  }
</style>
<template>
  <nav>
    <a @click="replacePage('index.html')" :class="{ active:current == 0 }">社区</a>
    <a @click="replacePage('mall.html')" :class="{ active:current == 1 }">商城</a>
    <a @click="replacePage('cart.html')" :class="{ active:current == 2 }">购物车</a>
    <a @click="replacePage('user.html')" :class="{ active:current == 3 }">我的</a>
  </nav>
</template>
<script>
  export default {
    props: {
      current:{
        type:String,  //0,1,2,3
        required:true
      }
    },
    data(){
      return {}
    },
    methods:{
      replacePage(str){
        history.replaceState(null, '', str);
        location.reload();
      }
    },
    computed: {

    }
  }
</script>
