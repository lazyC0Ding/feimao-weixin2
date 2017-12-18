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
</style>
<template>
  <div>
    <ul class="pay-ul">
      <li class="row" @click="type=5">
        <img class="icon left" src="../../assets/img/pay_wechat.png">
        <span class="title">微信支付</span>
        <span class="right" :class="{on:type==5}"></span>
      </li>
      <li class="row" @click="type=1">
        <img class="icon left" src="../../assets/img/pay_balance1.png">
        <span class="title">余额支付</span>
        <span class="right" :class="{on:type==1}"></span>
      </li>
      <li class="row" @click="type=4">
        <img class="icon left" src="../../assets/img/pay_balance2.png">
        <span class="title">冻结余额支付</span>
        <span class="right" :class="{on:type==4}"></span>
      </li>
    </ul>
    <div class="pay-footer">
      <span class="a">应付: <span>¥{{order_amount}}</span></span>
      <span class="b" @click="pay">立即付款</span>
    </div>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  export default {
    data () {
      return {
        order_amount: 0,
        order_sn: '',
        type: 5, //1:余额支付 4:冻结余额支付 5:微信支付  (与后台对应,勿改)
      }
    },
    methods: {
      pay(){
        this.$post(URL.payorder, {type: this.type, orders: this.order_sn})
          .then(res => {
            console.log(res);
            if (res.errcode == 0) {
              const content = res.content;
              let flag;
              switch (this.type) {
                case 1:
                  flag = confirm('本次交易将从您的余额中扣除0.01元,确认支付吗');
                  if(flag) {
//                    replacePage('order_detail', {order_sn:content.order_sn});
                    history.go(-1);
                  }
                  break;
                case 4:
                  flag = confirm('本次交易将从您的冻结余额中扣除0.01元,确认支付吗');
                  if(flag) {
//                    replacePage('order_detail', {order_sn:content.order_sn});
                    history.go(-1);
                  }
                  break;
                case 5:
                  wx.chooseWXPay({
                    timestamp: content.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: content.nonceStr, // 支付签名随机串，不长于 32 位
                    package: content.package, // 统一支付接口返回的prepay\_id参数值，提交格式如：prepay\_id=\*\*\*）
                    signType: content.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: content.paySign, // 支付签名
                    success: function (res) {
//                      replacePage('order_detail', {order_sn:content.order_sn});
                      history.go(-1);
                    }
                  });
                  break;
              }
            }else{
              errback(res)
            }
          });
      }
    },
    created(){
      document.title = '选择支付方式';
      const {order_amount, order_sn} = getSearchParams(location.search);
      this.order_amount = order_amount;
      this.order_sn = order_sn;
    },
    components: {
      AppPermanent,
    }
  }
</script>
