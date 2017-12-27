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
          &::placeholder{
            color:@light;
          }
        }
      }
    }
  }
</style>
<template>
  <div>
    <div class="recharge-top">
      <div>{{is_qrcode == 0 ? '充值' : '付款'}}金额</div>
      <div>
        <span>¥</span>
        <input placeholder="0.00" :value="money" @input="inputMoney($event.target.value)" ref="input">
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
      <span class="a">应付: <span>¥{{Number(money).toFixed(2)}}</span></span>
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
        money: '',
        is_qrcode:0,
        customer_id:null,
      }
    },
    methods: {
      recharge(){
        let url;
        let params = {
          type:this.type,
          money:this.money,
        };
        if(this.is_qrcode == 1) {
          url = URL.receivables;
          params.pid = this.customer_id;
        }else{
          url = URL.recharge;
        }
        this.$post(url, params)
          .then(res => {
            if (res.errcode == 0) {
              const content = res.content;
              wx.chooseWXPay({
                timestamp: content.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: content.nonceStr, // 支付签名随机串，不长于 32 位
                package: content.package, // 统一支付接口返回的prepay\_id参数值，提交格式如：prepay\_id=\*\*\*）
                signType: content.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: content.paySign, // 支付签名
                success: (res) => {

                }
              });
            } else {
              errback(res);
            }
          })
      },
      inputMoney(value){
        let formattedValue = value
          .trim()
          .slice(
            0,
            value.indexOf('.') === -1
              ? value.length
              : value.indexOf('.') + 3
          );
        if (formattedValue !== value) {
          this.$refs.input.value = formattedValue;
        }
        this.money = formattedValue;
        console.log(this.money);
      },
    },
    created(){
      const search = getSearchParams(location.search);
      if(search) {
        const {customer_id, is_qrcode, hasLogin} = search;
        this.is_qrcode = is_qrcode;
        this.customer_id = customer_id;
        if(is_qrcode == 1 && !hasLogin) {
          removeToken();
          login();
        }
      }
    },
    components: {
      AppPermanent
    }
  }
</script>
