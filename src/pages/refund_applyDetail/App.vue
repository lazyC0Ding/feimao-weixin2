<style type="text/less" lang="less">
  .refund_applyDetail-row{
    height:1rem;
    line-height:1rem;
    padding-left:.3rem;
    background-color:#fff;
    font-size:.28rem;
    >span{
      margin-left:.2rem;
    }
  }

  .refund_applyDetail-ul{
    background-color:#fff;
    overflow:hidden;
    >li{
      float:left;
      width:25%;
      height:2rem;
      text-align: center;
      >span{
        position:relative;
        width:1.4rem;
        height:1.4rem;
        overflow:hidden;
        >span{
          position:absolute;
          top:50%;
          left:50%;
          margin:0;
          padding:0;
          width:100%;
          >img{
            position:absolute;
            top:-50%;
            left:-50%;
            width:100%;
          }
          >img.hidden{
            visibility: hidden;
            position:static;
          }
        }
      }
    }
  }
</style>
<template>
  <div v-if="content">
    <goods-list :goods="goods"></goods-list>
    <div class="refund_applyDetail-row" style="margin-top:.1rem;border-bottom: 1px solid #e4e4e4;">退款原因
      <span>{{content.reason}}</span>
    </div>
    <div class="refund_applyDetail-row" style="border-bottom: 1px solid #e4e4e4;">退款金额
      <span>¥{{content.price}}</span>
    </div>
    <div class="refund_applyDetail-row">上传的凭证</div>
    <ul class="refund_applyDetail-ul">
      <li v-for="item in content.images">
        <span>
          <span>
            <img :src="item">
            <img class="hidden" :src="item">
          </span>
        </span>
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
        search:null,
        content:null,
      }
    },
    computed:{
      goods(){
        if(this.content) {
          return [{
            name:this.content.name,
            option_name:this.content.option_name,
            price:this.content.price,
            cover:this.content.cover,
            quantity:this.content.quantity,
          }]
        }
      }
    },
    methods: {
      fetch(){
        this.$post(URL.refundDetail, this.search)
          .then (res => {
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
      this.search = getSearchParams(location.search); //refund_sn, return_message_id
      this.fetch();
    },
    components: {
      AppPermanent,
      GoodsList,
    }
  }
</script>
