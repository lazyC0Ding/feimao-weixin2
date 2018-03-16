<style type="text/less" lang="less">
  @import '../../common';

  .address {
    position: relative;
    margin-top: .2rem;
    height: 1.6rem;
    line-height: 1.6rem;
    background: #fff url(../../assets/img/order_adress.png) no-repeat .3rem center;
    background-size: .28rem .34rem;
    padding-left: .8rem;
    padding-right: .8rem;
    overflow: hidden;
    > img {
      position: absolute;
      top: 50%;
      margin-top: -.12rem;
      right: .28rem;
      width: .24rem;
      height: .24rem;
    }
    > .placeholder {
      font-size: .26rem;
      color: @light;
      vertical-align: middle;
    }
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
    height: 1rem;
    line-height: 1rem;
    font-size: .28rem;
    text-align: right;
    background-color: #fff;
    padding-right: .3rem;
    > span {
      margin-left: .08rem;
      font-size: .32rem;
      color: #D0021B;
      vertical-align: top;
      &:before {
        content: '';
        font-size: .28rem;
      }
    }
  }

  .message {
    font-size: .28rem;
    margin-left: .2rem;
    width: 4.4rem;
    &::placeholder {
      color: @light;
    }
  }

  .order_confirm-row-container {
    margin-top: .1rem;
    .row-container(1rem, .28rem);
  }

  .select {
    margin-top: .34rem;
    width: .32rem;
    height: .32rem;
    background-image: url(../../assets/img/selected_off.png);
    background-size: 100% 100%;
    &.on {
      background-image: url(../../assets/img/selected_on.png);
    }
  }

  .order_confirm-footer {
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
  <div v-if="search && expressFee" style="padding-bottom:1rem;">
    <div class="address" v-href="['address_list', search]">
      <span class="placeholder" v-if="!search.address">请选择收货地址</span>
      <span class="info" v-if="search.address">
        <span class="a">{{search.address.name}}<span>{{search.address.phone}}</span></span><br>
        <span class="b">{{search.address.province}}{{search.address.city}}{{search.address.district}}{{search.address.address}}</span>
      </span>
      <img src="../../assets/img/direction_right_gray.png">
    </div>
    <goods-list style="margin-top:.1rem;" :goods="search.goods"></goods-list>
    <div class="total">共{{search.goods_count}}件商品，小计<span>¥ {{search.total_fee}}</span></div>
    <ul class="order_confirm-row-container">
      <li class="row">
        <span class="title">运费</span>
        <span class="right">¥ {{expressFee}}</span>
      </li>
      <li class="row">
        <span class="title">买家留言</span>
        <input maxlength="40" v-model="message" class="message" placeholder="选填/请输入对本次交易的留言说明">
        <span class="right" style="color:#9DA5A8" v-show="message.length">{{message.length}}/40</span>
      </li>
      <li v-if="search.show_coupon==1" class="row" @click="selectDiscount('coupon')" style="margin-top:.1rem;">
        <span class="title">使用优惠券</span>
        <span class="right select" :class="{on:discount.coupon}"></span>
      </li>
      <li v-href="['coupon_list', search]" v-show="discount.coupon" class="row">
        <span class="title">优惠券</span>
        <img class="row-arrow" src="../../assets/img/direction_right_gray.png">
        <span
          class="light right">{{search.coupon ? '满' + search.coupon.limit + '减' + search.coupon.amount : '请选择'}}</span>
      </li>
      <li v-if="search.show_point==1" class="row" @click="selectDiscount('point')">
        <span class="title">使用积分</span>
        <span class="light" style="margin-left:.2rem;">{{search.customer.point == 0 ? '暂无积分' : search.customer.point + '积分抵' + Number(search.customer.point)/100 + '元'}}</span>
        <span class="right select" :class="{on:discount.point}"></span>
      </li>
    </ul>
    <div class="order_confirm-footer">
      <span class="a">应付: <span>¥{{payment}}</span></span>
      <span class="b" @click="generate">立即付款</span>
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
        search: null,
        expressFee: null,
        message: '',
        discount: {
          point: false,
          coupon: true,
        },
        coupon: null,
      }
    },
    computed: {
      generateParams(){
        if (this.search && this.search.address) {
          const params = {
            address_id: this.search.address.address_id,
            data: this.data,
          };
          if (this.message) params.comment = this.message;
          if (this.discount.point) {
            params.point = 1;
          } else if (this.discount.coupon) {
            params.coupon_id = this.search.coupon ? this.search.coupon.coupon_id : 0;
          }
          return params;
        }
      },
      data(){
        const data = [];
        let item;
        for (let i of this.search.goods) {
          item = {
            goods_id: i.goods_id,
            quantity: i.quantity,
            option_id: i.option_id
          };
          if (i.cart_id) {
            item.cart_id = i.cart_id;
          }
          data.push(item);
        }
        return JSON.stringify(data);
      },
      getExpressFeeParams(){
        if (this.search.address) {
          return {
            address_id: this.search.address.address_id,
            total_fee: this.search.total_fee,
            data: this.data,
          }
        }
      },
      payment(){
        let amount = (Number(this.search.total_fee) + Number(this.expressFee)).toFixed(2);
        if (this.discount.coupon) {
          if (this.search.coupon) {
            amount = amount - Number(this.search.coupon.amount);
          }
        } else if (this.discount.point) {
          amount = amount - Number(this.search.customer.point) / 100;
        }
        return amount > 0 ? amount : '0.00';
      },
    },
    methods: {
      generate(){
        if (!this.search.address) {
          toast('请选择收货地址');
          return;
        }
        this.$post(URL.generate, this.generateParams)
          .then(res => {
            if (res.errcode == 0) {
              openPage('pay', res.content);
            } else {
              errback(res);
            }
          })
      },
      selectDiscount(discount){
        for (let i in this.discount) {
          if (i == discount) this.discount[i] = !this.discount[i];
          else this.discount[i] = false;
        }
      },
      getExpressFee(){
        if (this.search.address) {
          this.$post(URL.getExpressFee, this.getExpressFeeParams)
            .then(res => {
              console.log(res)
              if (res.errcode == 0) {
                this.expressFee = Number(res.content).toFixed(2);
                this.$setPage();
              } else {
                errback(res);
              }
            })
        } else {
          this.expressFee = '0.00';
        }
      },
      keepAlive(){
        const data = getSession(getPageName());
        for (let i in data) {
          this[i] = data[i];
        }
        this.getExpressFee();
      },
      init(){
        console.log(getSearchParams(location.search));
        console.log(getSession('order_confirm'));
        this.search = getSearchParams(location.search);
        // this.search = getSession('order_confirm');
        this.getExpressFee();
      }
    },
    created(){
      document.title = '确认订单';
      this.init();
//      if(this.$ifRefresh()){
//        this.init();
//      }else{
//        this.keepAlive();
//      }
    },
    components: {
      AppPermanent,
      GoodsList,
    }
  }
</script>
