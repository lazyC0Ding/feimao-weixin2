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
      line-height:2rem;
      text-align: center;
      >img{
        vertical-align: middle;
        width:1.4rem;
        height:1.4rem;
      }
    }
  }
</style>
<template>
  <div>
    <goods-list :goods="goods"></goods-list>
    <div class="refund_applyDetail-row">退款原因
      <span>{{content.reason}}</span>
    </div>
    <div class="refund_applyDetail-row">退款金额
      <span>{{content.price}}</span>
    </div>
    <div class="refund_applyDetail-row">上传的凭证</div>
    <ul class="refund_applyDetail-ul">
      <li v-for="item in content.images">
        <img :src="item">
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
