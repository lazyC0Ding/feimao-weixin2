<style type="text/less" lang="less">
  @import '../../common';
  .coupon_list-ul{
    overflow:hidden;
    padding-top:.1rem;
    >li{
      position:relative;
      margin-top:.3rem;
      margin-left:.36rem;
      width:6.8rem;
      height:1.8rem;
      line-height:1.8rem;
      font-size:0;
      overflow:hidden;
      background-image: url(../../assets/img/Coupon_on.png);
      background-size:100% 100%;
      &.off{
        background-image: url(../../assets/img/Coupon_off.png);
      }
      >em{
        position:absolute;
        right:.08rem;
        top:.06rem;
        font-size: 12px;
        color: #D0021B;
        line-height:normal;
      }
      >span{
        vertical-align: middle;
        &.left {
          width:2.4rem;
          height:100%;
          text-align: center;
          font-size:.32rem;
          color:#fff;
          >em{
            font-size:.8rem;
          }
        }
        &.right{
          margin-left:.4rem;
          font-size:.32rem;
          line-height:normal;
          >.right-2{
            margin-top:.2rem;
            font-size:.24rem;
            >em{
              margin-left:.3rem;
              color:@light;
            }
          }
        }
      }
    }
  }

  .nothing{
    margin-top:2rem;
    font-size:.36rem;
    text-align:center;
  }

  .text{
    text-align:center;
    margin-top:1.4rem;
    font-size:.24rem;
    color:@light;
    text-decoration: underline;
  }

</style>
<template>
  <div v-if="content">
    <ul class="coupon_list-ul">
      <li v-for="item in coupon.coupons" :key="item.coupon_id" :class="{off:coupon.off}">
        <em v-show="!ifShowCoupon1">{{item.state_name}}</em>
        <span class="left">¥<em>{{item.amount}}</em></span>
        <span class="right">
          <span class="right-1">{{item.name}}</span><br>
          <span class="right-2">
            满{{item.limit}}可用
            <em>{{item.date_end | time_2}}前可用</em>
          </span>
        </span>
      </li>
    </ul>
    <div class="nothing" v-show="!coupon.coupons.length">{{coupon.nothing}}</div>
    <div class="text" @click="ifShowCoupon1=!ifShowCoupon1">{{coupon.text}}</div>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  export default {
    data () {
      return {
        content:null,
        coupon1:{
          text:'查看不可用',
          off:false,
          nothing:'暂无可用优惠券',
        },
        coupon2:{
          text:'查看可用',
          off:true,
          nothing:'暂无不可用优惠券',
        },
        ifShowCoupon1:true,
      }
    },
    watch:{
      ifShowCoupon1(n){
        document.title = n ? '我的优惠券' : '查看不可用';
      }
    },
    computed:{
      coupon(){
        if(!this.content) return;
        const obj = this.ifShowCoupon1
          ? Object.assign({}, this.coupon1)
          : Object.assign({}, this.coupon2);

        obj.coupons = this.ifShowCoupon1
          ? this.content.coupons
          : this.content.coupons_un;
        return obj;
      }
    },
    methods: {
      fetch(){
        this.$post(URL.getCoupons, {price:0})
          .then ( res => {
            console.log(res);
            if(res.errcode == 0) {
              this.content = res.content;
            }else{
              errback(res);
            }
          })
      }
    },
    created(){
      document.title = '我的优惠券';
      this.fetch();
    },
    components: {
      AppPermanent
    }
  }
</script>
