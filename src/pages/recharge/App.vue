<style type="text/less" lang="less">
  @import '../../common';

  .pay-ul {
    margin-top: .2rem;
    .row-container(1rem, .28rem);
    > li {
      > .right {
        margin-top: .34rem;
        width: .32rem;
        height: .32rem;
        background-image: url(../../assets/img/selected_off.png);
        background-size: 100% 100%;
        &.on {
          background-image: url(../../assets/img/selected_on.png);
        }
      }
      > .icon {
      }
    }
  }

  .pay-footer {
    position: fixed;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    left: 0;
    bottom: 0;
    background-color: #fff;
    > .a {
      margin-left: .26rem;
      font-size: .24rem;
      > span {
        font-size: .32rem;
        color: #D0021B;
      }
    }
    > .b {
      float: right;
      width: 2.72rem;
      height: 100%;
      text-align: center;
      background-color: #000;
      color: #fff;
    }
  }

  .recharge-top {
    margin-top: .2rem;
    height: 3rem;
    background-color: #fff;
    overflow: hidden;
    padding-left: .3rem;
    > div {
      &:nth-child(1) {
        margin-top: .28rem;
      }
      &:nth-child(2) {
        margin-top: .4rem;
        font-size: .48rem;
        > input {
          margin-left: .12rem;
          width: 6rem;
          font-size: 1rem;
          border-bottom: 1px solid #ddd;
        }
      }
    }
  }
</style>
<template>
  <div>
    <div class="recharge-top">
      <div>充值金额</div>
      <div>
        <span>¥</span>
        <input v-model.number="money" type="number">
      </div>
    </div>
    <ul class="pay-ul">
      <li class="row">
        <img class="icon left" src="../../assets/img/pay_wechat.png">
        <span class="title">微信支付</span>
        <span class="right" :class="{on:type==5}"></span>
      </li>
    </ul>
    <div class="pay-footer">
      <span class="a">应付: <span>¥{{money.toFixed(2)}}</span></span>
      <span class="b" @click="recharge">立即付款</span>
    </div>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  export default {
    data () {
      return {
        type: 5,
        money: 0,
      }
    },
    methods: {
      recharge(){
        this.$post(URL.recharge, {type: this.type, money: this.money})
          .then(res => {
            console.log(res)
            if (res.errcode == 0) {

            } else {
              errback(res);
            }
          })
      }
    },
    components: {
      AppPermanent
    }
  }
</script>
