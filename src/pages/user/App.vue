<style type="text/less" lang="less">
  @import '../../common';

  .user-top {
    height: 3.2rem;
    background-color: #000;
    color: #fff;
    overflow: hidden;
    .info {
      position: relative;
      margin-top: .7rem;
      height: 1.8rem;
      line-height: 1.8rem;
      overflow: hidden;
      > img.avatar {
        float: left;
        margin-left: .4rem;
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
      }
      > .text {
        margin-left: .32rem;
        line-height: normal;
        vertical-align: middle;
        overflow: hidden;
        > span:first-child {
          width: 3.5rem;
          font-size: .36rem;
          white-space: nowrap;
          overflow:hidden;
          text-overflow: ellipsis;
        }
        > span:last-child {
          margin-top: .5rem;
          width: 3.5rem;
          font-size: .26rem;
          color: #a1a1a1;
          white-space: nowrap;
          overflow-x: scroll;
          &::-webkit-scrollbar {
            width: 0;
            height: 0;
          }
        }
      }
      > img.qrcode {
        position: absolute;
        top: 50%;
        margin-top: -.2rem;
        right: .64rem;
        width: .4rem;
        height: .4rem;
      }
    }
  }

  .orders {
    > .orders-type {
      background-color: #fff;
      .ul-horizontal(1.52rem, 5);
      box-sizing: border-box;
      > li {
        padding-top: .28rem;
        line-height: normal;
        text-align: center;
        font-size: .22rem;
        box-sizing: border-box;
        img {
          width: .6rem;
          height: .6rem;
        }
        >dl{
          position:relative;
          .unread-count{
            position:absolute;
            height:.28rem;
            min-width:.14rem;
            padding:0 .07rem;
            top:0;
            right:.4rem;
            background-color:#D0021B;
            color:#fff;
            font-size:.2rem;
            border-radius: .28rem;
          }
        }
      }
    }
  }

  .spokesman{
    >.spokesman-info {
      background-color: #fff;
      .ul-horizontal(1.4rem, 3);
      box-sizing: border-box;
      > li {
        padding-top:.28rem;
        line-height: normal;
        text-align: center;
        box-sizing: border-box;
        &:nth-child(1),&:nth-child(2) {
          >dl{
            position:relative;
            &:after {
              content: " ";
              position: absolute;
              right:0;
              bottom: 0;
              width: 1px;
              height: .6rem;
              background-color: #ddd;
            }
          }
        }
        dd{
          font-size:.22rem;
          color:@light;
        }
      }
    }
  }

  .user-ul-3 {
    margin-top:.1rem;
    .row-container(.9rem, .28rem);
  }

  .user-ul {
    .row-container(.8rem, .28rem);
    .border-bottom-1px;
    .right {
      float:right;
      color:@light;
      .span-bg-icon(.24rem, right);
      background-image: url(../../assets/img/direction_right_gray.png);
      &.spokesman{
        background-image: url(../../assets/img/mine_Explain.png);
        background-size:.28rem .28rem;
      }
    }
  }

  .collections {
    width: 100%;
    height: 3.8rem;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    font-size: 0;
    background-color:#fff;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    > li {
      display: inline-block;
      width: 33.33%;
      height: 100%;
      text-align: center;
      vertical-align: top;
      > img {
        margin-top: .26rem;
        width: 2.2rem;
        height: 2.2rem;
      }
      > div.name {
        white-space: normal;
        text-align: left;
        margin: .1rem .1rem 0;
        min-height:.6rem;
        font-size: .24rem;
        line-height: .3rem;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      > div.price {
        margin-left:.1rem;
        overflow: hidden;
        text-align: left;
        font-size: 14px;
        color: #D0021B;
      }
    }
  }
  .row-icon{
    transform: translate(0, 20%);
    margin-left: 8px;
    width: 16px;
  }

</style>
<template>
  <div style="padding-bottom:1rem;" v-if="content">
    <div class="user-top">
      <div class="info">
        <img v-href="['user_info', user_infoSearch]" class="avatar" v-avatar="content.avater">
        <span v-href="['user_info', user_infoSearch]" class="text">
          <span>{{content.nickname}}</span><br>
          <span>{{content.introduction || '介绍下自己'}}</span>
        </span>
        <img v-href="'qrcode'" class="qrcode" src="../../assets/img/qrcode_white.png">
      </div>
    </div>
    <div class="orders">
      <ul class="user-ul">
        <li class="row" v-href="['orders', {state:0}]">
          <span class="title">我的订单</span>
          <span class="right">全部订单</span>
        </li>
      </ul>
      <ul class="orders-type">
        <li v-href="['orders', {state:1}]">
          <dl>
            <dt>
              <img src="../../assets/img/order_fukuan.png">
              <span class="unread-count" v-if="content.order_count && content.order_count.wait_pay_count > 0">{{content.order_count.wait_pay_count}}</span>
            </dt>
            <dd>待付款</dd>
          </dl>
        </li>
        <li v-href="['orders', {state:2}]">
          <dl>
            <dt>
              <img src="../../assets/img/order_fahuo.png">
              <span class="unread-count" v-if="content.order_count && content.order_count.wait_delivery_count > 0">{{content.order_count.wait_delivery_count}}</span>
            </dt>
            <dd>待发货</dd>
          </dl>
        </li>
        <li v-href="['orders', {state:3}]">
          <dl>
            <dt>
              <img src="../../assets/img/order_shouhuo.png">
              <span class="unread-count" v-if="content.order_count && content.order_count.wait_receive_count > 0">{{content.order_count.wait_receive_count}}</span>
            </dt>
            <dd>待收货</dd>
          </dl>
        </li>
        <li v-href="['orders', {state:4}]">
          <dl>
            <dt>
              <img src="../../assets/img/order_pingjia.png">
              <span class="unread-count" v-if="content.order_count && content.order_count.wait_comment_count > 0">{{content.order_count.wait_comment_count}}</span>
            </dt>
            <dd>待评论</dd>
          </dl>
        </li>
        <li v-href="'refund'">
          <dl>
            <dt>
              <img src="../../assets/img/order_tuikuan.png">
              <span class="unread-count" v-if="content.order_count && content.order_count.wait_refund_count > 0">{{content.order_count.wait_refund_count}}</span>
            </dt>
            <dd>退货/退款</dd>
          </dl>
        </li>
      </ul>
    </div>
    <div class="spokesman" v-href="'spokesman'">
      <ul class="user-ul" style="margin-top: .1rem;">
        <li class="row">
          <span class="title">我是代言人</span>
          <span class="right spokesman">如何成为代言人</span>
        </li>
      </ul>
      <ul class="spokesman-info">
        <li>
          <dl>
            <dt>{{content.spokesman.commission || '0.00'}}</dt>
            <dd>奖励金</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>{{content.spokesman.sale_amount || '0.00'}}</dt>
            <dd>销售额</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>{{content.spokesman.fans_count || 0}}</dt>
            <dd>粉丝数</dd>
          </dl>
        </li>
      </ul>
    </div>
    <ul class="user-ul-3">
      <li class="row" v-href="'coupon_center'">
        <span class="title">{{couponConfig.coupon_title ? couponConfig.coupon_title: "领券中心"}}</span>
        <img v-show="couponConfig.coupon_icon" class="row-icon" :src="couponConfig.coupon_icon">
        <img class="row-arrow" src="../../assets/img/direction_right_gray.png">
      </li>
      <li class="row" v-href="'account'">
        <span class="title">我的账户</span>
        <img class="row-arrow" src="../../assets/img/direction_right_gray.png">
      </li>
      <!--<li class="row">-->
        <!--<span class="title">我的文章</span>-->
        <!--<img class="row-arrow" src="../../assets/img/direction_right_gray.png">-->
      <!--</li>-->
      <li class="row" v-href="['collections', {type:1}]">
        <span class="title">文章收藏</span>
        <img class="row-arrow" src="../../assets/img/direction_right_gray.png">
      </li>
    </ul>
    <ul class="user-ul" style="margin-top:.1rem;">
      <li class="row" v-href="['collections', {type:2}]">
        <span class="title">商品收藏</span>
        <span class="right">查看全部</span>
      </li>
    </ul>
    <ul class="collections" v-if="content.collections && content.collections.length">
      <li v-for="item in content.collections">
        <img :src="item.cover" v-href="['goods_detail', {goods_id:item.goods_id}]">
        <div class="name">{{item.name}}</div>
        <div class="price">¥{{item.price}}</div>
      </li>
    </ul>
    <ul class="user-ul-3">
      <li class="row" v-href="'feedback'">
        <span class="title">意见反馈</span>
        <img class="row-arrow" src="../../assets/img/direction_right_gray.png">
      </li>
      <li class="row" v-href="'settings'">
        <span class="title">设置</span>
        <img class="row-arrow" src="../../assets/img/direction_right_gray.png">
      </li>
    </ul>
    <the-footer current="3"></the-footer>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import TheFooter from '@c/TheFooter.vue'
  export default {
    data () {
      return {
        content: null,
        couponConfig: {
          coupon_title: "双11优惠券",
          coupon_icon: null
        }
      }
    },
    computed:{
      user_infoSearch(){
        if(this.content) {
          const {avater, nickname, uuid, introduction, sex, weixin, phone} = this.content;
          return {
            avater,
            nickname,
            uuid,
            introduction,
            sex,
            weixin,
            phone,
          }
        }
      }
    },
    methods: {
      fetch(){
        this.$post(URL.getUserInfo)
          .then(res => {
            if (res.errcode == 0) {
              console.log(res.content);
              this.content = res.content;
              setUser(res.content);
            } else {
              errback(res);
            }
          })
        this.$post(URL.couponConfig)
          .then(res => {
            if (res.errcode == 0) {
              this._setConfig(res.content);
            } else {
              errback(res);
            }
          })
      },
      _setConfig(data) {
        console.log(data);
        this.couponConfig = data;
      }
    },
    created(){
      this.fetch();
    },
    components: {
      AppPermanent,
      TheFooter,
    }
  }
</script>
