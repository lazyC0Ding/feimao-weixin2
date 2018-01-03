<style type="text/less" lang="less">
  @import '../../common';

  .order_detail-top {
    position:relative;
    height: 2rem;
    line-height: 2rem;
    background-color: #000;
    color: #fff;
    font-size: 0;
    overflow: hidden;
    >button{
      position:absolute;
      top:.2rem;
      right:.2rem;
      height: .5rem;
      line-height:.5rem;
      padding:0 .1rem;
      background-color:#fff;
      color:#000;
      font-size:.24rem;
    }
    > img {
      margin-left: .7rem;
      margin-right: .5rem;
      width: 1.2rem;
      height: 1.2rem;
      vertical-align: middle;
    }
    > span {
      font-size: .3rem;
      vertical-align: middle;
      line-height: normal;
      > .span-2 {
        margin-top: .1rem;
        font-size: .24rem;
      }
    }
  }

  .express {
    position: relative;
    height: 1.4rem;
    line-height: 1.4rem;
    background: #fff url(../../assets/img/order_logistics.png) no-repeat .3rem center;
    background-size: .28rem .24rem;
    padding-left: .8rem;
    padding-right: .8rem;
    overflow: hidden;
    .border-bottom-1px;
    > img {
      position: absolute;
      top: 50%;
      margin-top: -.12rem;
      right: .28rem;
      width: .24rem;
      height: .24rem;
    }
    > .info {
      line-height: normal;
      vertical-align: middle;
      > .a {
        font-size: .24rem;
        color: @light;
      }
      > .b {
        max-width: 5rem;
        margin-top: .1rem;
        font-size: .28rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }

  .address {
    position: relative;
    height: 1.6rem;
    line-height: 1.6rem;
    background: #fff url(../../assets/img/order_adress.png) no-repeat .3rem center;
    background-size: .28rem .34rem;
    padding-left: .8rem;
    padding-right: .8rem;
    overflow: hidden;
    > .info {
      line-height: normal;
      vertical-align: middle;
      > .a {
        > span {
          margin-left: .2rem;
          font-size: .26rem;
        }
      }
      > .b {
        margin-top: .1rem;
        font-size: .26rem;
        color: @light;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }

  .total {
    background-color: #fff;
    font-size: .24rem;
    padding: .14rem 0;
    > li {
      margin: .1rem 0;
      padding: 0 .2rem;
      overflow: hidden;
      > span {
        &:first-child {
          float: left;
        }
        &:last-child {
          float: right;
        }
      }
      &:last-child {
        > span {
          &:first-child {
            font-weight: bold;
          }
          &:last-child {
            font-size: 14px;
            color: #D0021B;
          }
        }
      }
    }
  }

  .comment {
    margin-top: .1rem;
    line-height: 1rem;
    font-size: 0;
    background-color: #fff;
    padding: .32rem .2rem;
    overflow: hidden;
    > span {
      font-size: .24rem;
      vertical-align: middle;
      line-height: normal;
      &:first-child {
        float: left;
        margin-right: .1rem;
      }
      &:last-child {
        display: block;
        overflow: hidden;
      }
    }
  }

  .order_sn {
    margin-top: .1rem;
    padding: .14rem .2rem .24rem;
    font-size: .24rem;
    background-color: #fff;
    .copy-span {
      -webkit-user-select: auto;
    }
    > div {
      margin-top: .1rem;
    }
    .btn {
      margin-left: .3rem;
      font-size: .2rem;
    }
  }

  .order_detail-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background-color: #fff;
    text-align: right;
    > span {
      margin-right: .2rem;
      width: 2rem;
      height: .68rem;
      line-height: .68rem;
      text-align: center;
      box-sizing: border-box;
      border: 0.5px solid #111;
    }
  }
</style>
<template>
  <div v-if="order" style="padding-bottom:1rem;">
    <!-- 头部各种state -->
    <div class="order_detail-top">
      <template v-if="order.order_state == 1">
        <img src="../../assets/img/Orderdet_fukuan.png">
        <span>
           <span class="span-1">等待买家付款</span><br>
           <span class="span-2">{{d_time | countdown_2}}后自动取消订单</span>
           </span>
      </template>
      <template v-else-if="order.order_state == 2">
        <img src="../../assets/img/Orderdet_fahuo.png">
        <span>
        <span class="span-1">等待卖家发货</span><br>
      </span>
      </template>
      <template v-else-if="order.order_state == 3">
        <img src="../../assets/img/Orderdet_shouhuo.png">
        <span>
        <span class="span-1">卖家已发货</span><br>
        <span class="span-2">{{d_time | countdown_2}}后自动确认收货</span>
      </span>
      </template>
      <template v-else-if="order.order_state == 4">
        <img src="../../assets/img/Orderdet_pingjia.png">
        <span>
        <span class="span-1">等待买家评价</span><br>
      </span>
      </template>
      <template v-else-if="order.order_state == 5">
        <img src="../../assets/img/Orderdet_wancheng.png">
        <span>
        <span class="span-1">订单已完成</span><br>
      </span>
      </template>
      <template v-else>
        <img src="../../assets/img/Orderdet_guanbi.png">
        <span>
        <span class="span-1">订单已关闭</span><br>
      </span>
      </template>
      <button v-href="'mall'">回到商城</button>
    </div>
    <!--<div class="order_detail-top" v-else-if="order.order_state == 2">-->
      <!--<img src="../../assets/img/Orderdet_fahuo.png">-->
      <!--<span>-->
        <!--<span class="span-1">等待卖家发货</span><br>-->
      <!--</span>-->
    <!--</div>-->
    <!--<div class="order_detail-top" v-else-if="order.order_state == 3">-->
      <!--<img src="../../assets/img/Orderdet_shouhuo.png">-->
      <!--<span>-->
        <!--<span class="span-1">卖家已发货</span><br>-->
        <!--<span class="span-2">{{d_time | countdown_2}}后自动确认收货</span>-->
      <!--</span>-->
    <!--</div>-->
    <!--<div class="order_detail-top" v-else-if="order.order_state == 4">-->
      <!--<img src="../../assets/img/Orderdet_pingjia.png">-->
      <!--<span>-->
        <!--<span class="span-1">等待买家评价</span><br>-->
      <!--</span>-->
    <!--</div>-->
    <!--<div class="order_detail-top" v-else-if="order.order_state == 5">-->
      <!--<img src="../../assets/img/Orderdet_wancheng.png">-->
      <!--<span>-->
        <!--<span class="span-1">订单已完成</span><br>-->
      <!--</span>-->
    <!--</div>-->
    <!--<div class="order_detail-top" v-else>-->
      <!--<img src="../../assets/img/Orderdet_guanbi.png">-->
      <!--<span>-->
        <!--<span class="span-1">订单已关闭</span><br>-->
      <!--</span>-->
    <!--</div>-->
    <!-- 物流信息 -->
    <div class="express" v-if="express && express.length" v-href="['logistics', {order_sn:order_sn}]">
      <img src="../../assets/img/direction_right_gray.png">
      <span class="info">
        <span class="a">{{express[0].time}}</span><br>
        <span class="b">{{express[0].context}}</span>
      </span>
    </div>
    <!-- 地址 -->
    <div class="address">
      <span class="info">
        <span class="a">{{order.address_name}}<span>{{order.address_phone}}</span></span><br>
        <span class="b">{{order.province}}{{order.city}}{{order.district}}{{order.address}}</span>
      </span>
    </div>
    <goods-list
      style="margin-top:.1rem;"
      :goods="order.goods"
      :showRefund="order.order_state==2"
      :isRefund="order.order_state == 3 && order.is_refund == 1"
      :order_sn="order_sn"
    >
    </goods-list>
    <ul class="total">
      <li>
        <span>商品总价</span>
        <span>¥{{order.goods_amount}}</span>
      </li>
      <li>
        <span>运费</span>
        <span>¥{{order.express_amount}}</span>
      </li>
      <li>
        <span>优惠</span>
        <span>¥{{order.coupon_amount}}</span>
      </li>
      <li>
        <span>实付款</span>
        <span>¥{{order.order_amount}}</span>
      </li>
    </ul>
    <div class="comment">
      <span>买家留言：</span>
      <span>{{order.comment || '暂无留言'}}</span>
    </div>
    <div class="order_sn">
      <div>订单号： <span class="copy-span">{{order_sn}}</span> <span class="btn">(长按订单号拷贝)</span></div>
      <div>订单创建时间： {{order.date_add | time}}</div>
      <div v-if="order.pay_name">支付方式：{{order.pay_name}}</div>
    </div>
    <div class="order_detail-footer" v-if="order.order_state == 1">
      <span @click="cancel">取消订单</span><span @click="pay">立即付款</span>
    </div>
    <div class="order_detail-footer" v-else-if="order.order_state == 3">
      <span v-href="['logistics', {order_sn:order_sn}]">查看物流</span><span @click="delivery">确认收货</span>
    </div>
    <div class="order_detail-footer" v-else-if="order.order_state == 4">
      <span @click="deleteOrder">删除订单</span><span v-href="['logistics', {order_sn:order_sn}]">查看物流</span><span
      @click="comment">去评价</span>
    </div>
    <div class="order_detail-footer" v-else-if="order.order_state ==  5 || order.order_state == 6">
      <span @click="deleteOrder">删除订单</span>
    </div>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import GoodsList from '@c/GoodsList.vue'
  export default {
    data () {
      return {
        order_sn: '',
        express: null,
        order: null,
      }
    },
    computed: {
      d_time(){
        if (this.order.date_end) {
          return Number(this.order.date_end) - Date.parse(new Date()) / 1000;
        }
      }
    },
    methods: {
      deleteOrder(){
        myConfirm('是否删除订单', () => {
          this.$post(URL.deleteOrder, {order_sn: this.order_sn})
            .then(res => {
              console.log(res)
              if (res.errcode == 0) {
                history.go(-1);
              } else {
                errback(res)
              }
            })
        });
      },
      delivery(){
        myConfirm('是否确定收货?', () => {
          this.$post(URL.delivery, {order_sn: this.order_sn})
            .then(res => {
              console.log(res)
              if (res.errcode == 0) {
                this.order.order_state = 4;
                toast('收货成功');
                setTimeout(() => {
                  this.comment();
                }, 500);
              } else {
                errback(res)
              }
            })
        });
      },
      comment(){
        setSession('order_comment', {goods: this.order.goods, order_sn: this.order_sn});
        openPage('order_comment');
      },
      pay(){
        const params = {
          order_sn: this.order_sn,
          order_amount: this.order.order_amount,
        };
        openPage('pay', params);
      },
      cancel(){
        myConfirm('是否确定取消该订单?', () => {
          this.$post(URL.cancel, {order_sn: this.order_sn})
            .then(res => {
              console.log(res);
              if (res.errcode == 0) {
                history.go(-1);
              } else {
                errback(res);
              }
            })
        });
      },
      fetch(){
        this.$post(URL.getOrderDetail, {order_sn: this.order_sn})
          .then(res => {
            console.log(res.content);
            if (res.errcode == 0) {
              this.express = res.content.express;
              this.order = res.content.order;
            } else {
              errback(res);
            }
          })
      }
    },
    created(){
      document.title = '订单详情';
      this.order_sn = getSearchParams(location.search).order_sn;
      this.fetch();
    },
    components: {
      AppPermanent,
      GoodsList,
    }
  }
</script>
