<style scoped lang="less" type="text/less">
  @import '../common';

  ul {
    background-color: #fff;
    padding: 0;
    margin: 0;
    > li {
      overflow: hidden;
      .border-bottom-1px;
      > span {
        float: left;
        height: 2.2rem;
        overflow: hidden;
        > .img {
          float: left;
          position: relative;
          margin-top: .2rem;
          margin-left: .2rem;
          width: 1.8rem;
          height: 1.8rem;
          background-size:100% 100%;
          > img {
            width: 100%;
            height: 100%;
          }
        }
      }
      > div:nth-child(2) {
        position: relative;
        height: 2.2rem;
        padding-left: .2rem;
        padding-right:.3rem;
        overflow: hidden;
        > .a {
          height: .72rem;
          margin-top: .28rem;
          font-size: .28rem;
          line-height: .36rem;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        > .b {
          margin-top: .1rem;
          font-size: .24rem;
          color: @light;
        }
        > .c {
          position: absolute;
          width: 100%;
          left: 0;
          bottom: .28rem;
          padding-left: .2rem;
          box-sizing: border-box;
          > span {
            &:nth-child(1) {
              font-size: .28rem;
              color: #111;
              font-weight: bold;
            }
            &:nth-child(2) {
              float: right;
              margin-right: .24rem;
              font-size: .24rem;
              color: @light;
              &:before {
                content: '';
                font-size: .28rem;
              }
            }
          }
        }
      }
      > div:nth-child(3) {
        height: .8rem;
        line-height: .8rem;
        overflow: hidden;
        > span {
          float: right;
          margin-right: .24rem;
          width: 1.4rem;
          height: .52rem;
          line-height: .52rem;
          text-align: center;
          border: 0.5px solid #111;
          font-size: .24rem;
        }
      }
    }
  }
</style>
<template>
  <ul>
    <li v-for="item in goods" :key="item.cart_id">
      <span>
        <span class="img" :style="{backgroundImage: 'url(../assets/img/default_goods.png)'}">
          <img @click="openGoodsDetail(item.goods_id)" :src="item.cover || item.image">
        </span>
      </span>
      <div>
        <div class="a">{{item.goods_name || item.name}}</div>
        <div class="b">{{item.option_name}}</div>
        <div class="c">
          <span>¥ {{item.price}}</span>
          <span>x{{item.quantity}}</span>
        </div>
      </div>
      <div class="btn-refund" v-if="showRefund">
        <span @click="clickShowRefund(item)">{{getShowRefund(item.refund_state)}}</span>
      </div>
      <div class="btn-refund" v-if="isRefund">
        <span @click="clickIsRefund(item)">{{getIsRefund(item.refund_state)}}</span>
      </div>
    </li>
  </ul>
</template>
<script>
  export default {
    props: {
      goods: {
        type: Array,
        required: true,
      },
      cantOpenGoods: Boolean, //能否点击图片打开商品详情页面
      showRefund: Boolean,  //待发货状态相关按钮
      isRefund: Boolean,  //待收货状态相关按钮
      order_sn:String,   //打开订单详情用
    },
    methods: {
      // showRefund:待发货时退款
      getShowRefund(state){
        if (!state) return '申请退款';
        switch (state) {
          case '1':
            return '退款中';
          case '3':
            return '拒绝退款';
          case '5':
            return '退款成功';
          case '6':
            return '退款关闭';
          default:
            return '未知showRefund';
        }
      },
      // isRefund:待收货时退款
      getIsRefund(state){
        if (!state) return '申请售后';
        switch (state) {
          case '1':
            return '退款中';
          case '2':
            return '退款中';
          case '3':
            return '拒绝退款';
          case '4':
            return '退款中';
          case '5':
            return '退款成功';
          case '6':
            return '退款关闭';
          default:
            return '未知isRefund';
        }
      },
      clickShowRefund(item){
        if (!item.refund_state){
          openPage('refund_apply', {goods:item, order_sn:this.order_sn});
          return;
        }
        switch (item.refund_state) {
          default:
            openPage('refund_detail', {refund_sn: item.refund_sn});
            break;
        }
      },
      clickIsRefund(item){
        if (!item.refund_state){
          openPage('refund_apply', {goods:item, order_sn:this.order_sn, canSelectType:true});
          return;
        }
        switch (item.refund_state) {
          default:
            openPage('refund_detail', {refund_sn: item.refund_sn});
            break;
        }
      },
      openGoodsDetail(goods_id){
        if (this.cantOpenGoods) return;
        openPage('goods_detail', {goods_id})
      }
    }
  }
</script>
