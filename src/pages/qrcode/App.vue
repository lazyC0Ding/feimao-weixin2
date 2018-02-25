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
        <span>切换为{{content.showQrcode ? '收款' : '个人'}}码</span></div>
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

              wx.ready( () => {
                let {share_desc, share_image, share_title, url} = res.content.share;
                wx.hideAllNonBaseMenuItem();
                wx.showMenuItems({
                  menuList: ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq"] // 要显示的菜单项，所有menu项见附录3
                });
                const arr = url.split('?');
                const search = getSearchParams(arr[1]);
                let str = encodeChinese(search);
                url = [arr[0], str].join('?');
                wx.onMenuShareAppMessage({
                  title: share_title,
                  desc: share_desc,
                  link: url,
                  imgUrl: share_image,
                  type: 'link', // 分享类型,music、video或link，不填默认为link
                  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                  success: function () {
                    toast('分享成功');
                  },
                  cancel: function () {

                  }
                });

                wx.onMenuShareQQ({
                  title: share_title, // 分享标题
                  desc: share_desc, // 分享描述
                  link: url, // 分享链接
                  imgUrl: share_image, // 分享图标
                  success: function () {
                    toast('分享成功');
                  },
                  cancel: function () {

                  }
                });

                wx.onMenuShareTimeline({
                  title: share_title, // 分享标题
                  link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: share_image, // 分享图标
                  success: function () {
                    toast('分享成功');
                  },
                  cancel: function () {

                  }
                });
              })
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
