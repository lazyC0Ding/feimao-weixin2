<style type="text/less" lang="less">
  @import '../../common';
  .refund-container {
    > li {
      margin-top: .1rem;
      background-color: #fff;
      > .top {
        height: .8rem;
        line-height: .8rem;
        font-size: .24rem;
        padding: 0 .26rem 0 .22rem;
        overflow: hidden;
        .border-bottom-1px;
        > span {
          &:first-child {
            float: left;
          }
          &:last-child {
            float: right;
            color: #FFB305;
          }
        }
      }
      > .bottom {
        padding:0 .2rem;
        height:.9rem;
        line-height:.9rem;
        text-align:right;
        font-size:.24rem;
        >span{
          font-size:.32rem;
        }
      }
    }
  }
</style>
<template>
  <div>
    <ul class="refund-container">
      <li v-for="item in content" :key="item.order_sn" v-href="['refund_detail', {refund_sn:item.refund_sn, goods:item.goods}]">
        <div class="top">
          <span>{{item.date_add | time}}</span>
          <span>{{item.refund_state_name}}</span>
        </div>
        <goods-list :goods="[item.goods]" cantOpenGoods></goods-list>
        <div class="bottom">退款金额 <span>¥{{item.refund_price}}</span></div>
      </li>
    </ul>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import GoodsList from '@c/GoodsList.vue'
  export default {
    data () {
      return {
        page:1,
        content:[],
      }
    },
    methods: {
      fetch(){
        this.$post(URL.getRefundOrders, {page:this.page})
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
      document.title = '退货/退款';
      this.fetch();
    },
    components: {
      AppPermanent,
      GoodsList,
    }
  }
</script>
