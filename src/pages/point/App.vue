<style type="text/less" lang="less">
  @import '../../common';
  .point-top{
    height:3.2rem;
    text-align:center;
    background-color:#000;
    color:#fff;
    overflow:hidden;
    >.top-1{
      margin-top:.64rem;
      font-size:1rem;
    }
    >.top-2{
      margin-top:.3rem;
      font-size:.24rem;
      >a{
        color:#fff;
        text-decoration: underline;
      }
    }
  }

  .point-tags {
    .tags(3);
  }

  .point-ul{
    background-color:#fff;
    >li{
      height:1.2rem;
      line-height:1.2rem;
      font-size:0;
      overflow:hidden;
      >span{
        &.left{
          width:1.8rem;
          font-size:.36rem;
          box-sizing: border-box;
          padding-left:.4rem;
          color:#D0021B;
          &.is_minus{
            color:#559E00;
          }
        }
        &.middle{
          font-size:.28rem;
        }
        &.right{
          float:right;
          margin-right:.4rem;

          font-size:.24rem;
          color:@light;
        }
      }
    }
  }
</style>
<template>
  <div v-if="content">
    <div class="point-top">
      <div class="top-1">{{content.point}}</div>
      <div class="top-2"><a :href="content.point_info">如何赚积分?</a></div>
    </div>
    <ul class="point-tags">
      <li :class="{active:type===0}" @click="type=0">全部记录</li>
      <li :class="{active:type===1}" @click="type=1">获得积分</li>
      <li :class="{active:type===2}" @click="type=2">使用积分</li>
    </ul>
    <ul class="point-ul">
      <li v-for="item in content.points" :key="item.point_id">
        <span class="left" :class="{is_minus:item.is_minus==1}">{{item.is_minus==1 ? '-' : '+'}}{{item.amount}}</span>
        <span class="middle">{{item.title}}</span>
        <span class="right">{{item.date_add | time}}</span>
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
        content:null,
        type:0,
      }
    },
    watch:{
      type(n){
        this.$post(URL.pointRecord, {type:n})
          .then ( res => {
            console.log(res)
            if(res.errcode == 0) {
              this.content.points = res.content;
            }else{
              errback(res);
            }
          })
      }
    },
    methods: {
      fetch(){
        this.$post(URL.myPoint)
          .then ( res => {
            console.log(res)
            if(res.errcode == 0) {
              this.content = res.content;
            }else{
              errback(res);
            }
          })
      }
    },
    created(){
      document.title = '我的积分';
      this.fetch();
    },
    components: {
      AppPermanent
    }
  }
</script>
