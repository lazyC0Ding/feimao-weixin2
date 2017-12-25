<style type="text/less" lang="less">
  @import '../../common';

  .qrcode {
    background-color: #fff;
    text-align: center;
    overflow: hidden;
    > .img {
      font-size: 0;
      margin-top: 1.06rem;
      > img {
        width: 5.4rem;
        height: 5.4rem;
      }
    }
    > .text {
      margin-top: .46rem;
      color: @light;
    }
    > .btn-big {
      margin-top: 1.06rem;
      > span {
        .span-bg-icon(.34rem, left);
        background-image: url(../../assets/img/qrcode_turn.png);
      }
    }
  }
</style>
<template>
  <div>
    <div class="qrcode" v-if="content" :style="{height:clientHeight+'px'}">
      <div class="img">
        <img :src="content.qrcode" v-show="content.showQrcode">
        <img :src="content.receipt_qrcode" v-show="!content.showQrcode">
      </div>
      <div class="text">扫描二维码{{content.showQrcode ? '成为我的粉丝' : '付款给我'}}</div>
      <div class="btn-big" @click="content.showQrcode = !content.showQrcode">
        <span>切换为{{content.showQrcode ? '收货' : '个人'}}码</span></div>
    </div>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  export default {
    data () {
      return {
        content: null,
        clientHeight:document.documentElement.clientHeight,
      }
    },
    methods: {
      fetch(customer_id){
        const params = {};
        if(customer_id) {
          params.pid = customer_id;
        }
        this.$post(URL.getQrcode, params)
          .then(res => {
            console.log(res);
            if (res.errcode == 0) {
              res.content.showQrcode = true;
              this.content = res.content;
            } else {
              errback(res);
            }
          })
      }
    },
    created(){
      document.title = '我的二维码';
      const search = getSearchParams(location.search);
      let customer_id;
      if(search && search.customer_id) {
        customer_id = search.customer_id;
        setSession('customer_id', customer_id);
      }
      this.fetch(customer_id);
    },
    components: {
      AppPermanent
    }
  }
</script>
