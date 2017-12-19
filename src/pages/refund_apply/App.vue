<style type="text/less" lang="less">
  @import '../../common';

  .refund_apply-ul {
    margin-top: .1rem;
    .row-container(1rem, .28rem);
    > li.row {
      &.no-border-bottom {
        &:after {
          width: 0;
          height: 0;
        }
      }
      > .title {
        width: 1.4rem;
      }
      > input {
        font-size: .28rem;
        ::placeholder {
          color: @light;
        }
      }
      .with-bg {
        .span-bg-icon(.28rem, left);
        background-image: url(../../assets/img/selected_off.png);
        background-size:.32rem .32rem;
        &:last-child{
          margin-left:.3rem;
        }
        &.on{
          background-image: url(../../assets/img/selected_on.png);
        }
      }
    }
    >li.textarea{
      >textarea{
        background-color:#fff;
        resize:none;
        outline: none;
        font-size:.28rem;
        width:100%;
        height:2.6rem;
        box-sizing: border-box;
        padding:.3rem;
        &::placeholder{
          color:@light;
        }
        &::-webkit-scrollbar{
          width:0;
          height:0;
        }
      }
    }
    > li.images {
      background-color: #fff;
      padding-bottom: .3rem;
      > span {
        margin-bottom: .2rem;
        margin-left: .38rem;
        width: 1.4rem;
        height: 1.4rem;
        line-height: 2rem;
        text-align: center;
        font-size: .2rem;
        color: @light;
        background: url(../../assets/img/upload_pic.png) no-repeat center .4rem;
        background-size: .44rem .36rem;
        border: .5px solid #979797;
        box-sizing: border-box;
      }
    }
  }
</style>
<template>
  <div>
    <goods-list v-if="goods" :goods="[goods]" cantOpenGoods></goods-list>
    <ul class="refund_apply-ul">
      <li v-if="!canSelectType" class="row">
        <span class="title">退款原因</span>
        <input v-model="reason" placeholder="请输入退款原因">
      </li>
      <li v-else class="row">
        <span class="title">售后类型</span>
        <span class="with-bg" :class="{on:type==1}" @click="type=1">我要退款</span>
        <span class="with-bg" :class="{on:type==2}" @click="type=2">我要退货</span>
      </li>
      <li v-if="canSelectType" class="textarea">
        <textarea v-model="reason" placeholder="请输入问题描述"></textarea>
      </li>
      <li class="row">
        <span class="title">退款金额</span>
        <input v-model="money" placeholder="不可超过商品价格">
        <span class="right">元</span>
      </li>
      <li class="row no-border-bottom">
        <span class="title">上传凭证</span>
      </li>
      <app-upload-img :images="images"></app-upload-img>
    </ul>
    <div class="btn-big" style="margin-top:.7rem;" @click="apply">提交</div>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import GoodsList from '@c/GoodsList.vue'
  import AppUploadImg from '@c/AppUploadImg.vue'
  export default {
    data () {
      return {
        content:null,
        goods: null,
        type: 1,
        order_sn: null,
        refund_sn:null,
        reason: '',
        money: '',
        images: [],
        canSelectType:false,
      }
    },
    computed: {
      params(){
        const params = {
          type: this.type,
          goods_id: this.goods.goods_id,
          option_id: this.goods.option_id,
          reason: this.reason,
          money: this.money,
        };
        if(this.order_sn) {
          params.order_sn = this.order_sn
        }else{
          params.refund_sn = this.refund_sn;
        }
        if(this.images.length) {
          const arr = [];
          for (let i of this.images) {
            arr.push(i.src);
          }
          params.images = arr.join(',');
        }
        return params;
      }
    },
    methods: {
      apply(){
        if(!this.reason.trim()){
          toast('请输入退款原因');
          return;
        }

        if(Number(this.money) > this.content.refund_amount) {
          toast('可退款最大金额为' + this.content.refund_amount + '元');
          return;
        }
        let url = this.order_sn ? URL.refund : URL.reapplyRefund;
        this.$post(url, this.params)
          .then( res => {
            console.log(res)
            if(res.errcode == 0) {
              alert('提交成功！交由后台审核，三个工作室日内反馈结果');
              history.go(-1);
            }else{
              errback(res);
            }
          })
      },
      getRefundMoney(){
        this.$post(URL.getRefundMoney, {order_sn:this.order_sn, goods_id:this.goods.goods_id, option_id: this.goods.option_id})
          .then ( res=> {
            console.log(res)
            if(res.errcode == 0) {
              this.content = res.content;
            }else{
              errback(res);
            }
          })
      },
    },
    created(){
      document.title = '申请退款';
      console.log(getSearchParams(location.search));
      const {goods, order_sn, refund_sn, canSelectType} = getSearchParams(location.search);
      this.goods = goods;
      this.order_sn = order_sn;
      this.refund_sn = refund_sn;
      if(canSelectType) this.canSelectType = canSelectType;
      this.getRefundMoney();
    },
    components: {
      AppPermanent,
      GoodsList,
      AppUploadImg,
    }
  }
</script>
