<style type="text/less" lang="less">
  @import '../../common';

  .account-top {
    height: 4.8rem;
    text-align: center;
    background-size: 100% 100%;
    overflow: hidden;
    > .top-1 {
      margin-top: .96rem;
      font-size: .28rem;
      overflow: hidden;
    }
    > .top-2 {
      margin-top:.1rem;
      font-size: 1rem;
    }
    > .top-3 {
      margin-top: .26rem;
      > span {
        background: rgba(0, 0, 0, 0.69);
        border-radius: .84rem;
        height: .52rem;
        line-height: .52rem;
        padding: 0 .36rem;
        font-size: .28rem;
        color: #FFB305;
      }
    }
  }

  .spokesman-info {
    background-color: #fff;
    .ul-horizontal(1.8rem, 3);
    box-sizing: border-box;
    > li {
      padding-top: .36rem;
      line-height: normal;
      text-align: center;
      box-sizing: border-box;
      > dl {
        font-size: .4rem;
      }
      dd {
        margin-top: .14rem;
        font-size: .22rem;
        color: @light;
      }
    }
  }

  .account-ul {
    margin-top: .2rem;
    .row-container(.9rem, .28rem);
  }
</style>
<template>
  <div v-if="content">
    <div class="account-top" :style="{backgroundImage:'url(./static/img/account_bj.png)'}">
      <div class="top-1">总余额(元)</div>
      <div class="top-2">{{content.total_account}}</div>
      <div class="top-3">
        <span v-href="'recharge'">充值</span>
      </div>
    </div>
    <ul class="spokesman-info">
      <li>
        <dl>
          <dt>{{content.account}}</dt>
          <dd>余额(元)</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>{{content.freeze_account}}</dt>
          <dd>冻结余额(元)</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>{{content.deposit}}</dt>
          <dd>保证金(元)</dd>
        </dl>
      </li>
    </ul>
    <ul class="account-ul">
      <li class="row" v-href="['finance', {type:0}]">
        <span class="title">资金明细</span>
        <img class="row-arrow" src="../../assets/img/direction_right_gray.png">
      </li>
      <li class="row" v-href="'coupon_list'">
        <span class="title">我的优惠券</span>
        <img class="row-arrow" src="../../assets/img/direction_right_gray.png">
      </li>
      <li class="row" v-href="'point'">
        <span class="title">我的积分</span>
        <img class="row-arrow" src="../../assets/img/direction_right_gray.png">
      </li>
      <!--<li class="row">-->
      <!--<span class="title">保证金转入余额</span>-->
      <!--<img class="row-arrow" src="../../assets/img/direction_right_gray.png">-->
      <!--</li>-->
    </ul>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  export default {
    data () {
      return {
        content: null,
      }
    },
    methods: {
      recharge(){

        openPage('recharge');
      },
      fetch(){
        this.$post(URL.getMyAccount)
          .then(res => {
            console.log(res)
            if (res.errcode == 0) {
              this.content = res.content;
            } else {
              errback(res);
            }
          })
      }
    },
    created(){
      document.title = '我的账户';
      this.fetch();
    },
    components: {
      AppPermanent
    }
  }
</script>
