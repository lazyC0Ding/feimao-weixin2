<style type="text/less" lang="less">
  @import '../../common';

  html, body {
    width: 100%;
    height: 100%;
  }

  .score {
    height: 1rem;
    line-height: 1rem;
    font-size: 0;
    padding: 0 .3rem;
    background-color: #fff;
    &.border-bottom {
      .border-bottom-1px;
    }
    > .title {
      margin-right: .6rem;
      font-size: .28rem;
      vertical-align: middle;
    }
    .star {
      margin-right: .3rem;
      width: .4rem;
      height: .4rem;
      vertical-align: middle;
      background-image: url(../../assets/img/comment_star_off.png);
      background-size: 100% 100%;
      &.on {
        background-image: url(../../assets/img/comment_star_on.png);
      }
    }
  }

  .textarea {
    position: relative;
    background-color: #fff;
    overflow: hidden;
    height: 2.6rem;
    .border-bottom-1px;
    > textarea {
      width: 100%;
      height: 100%;
      padding: .3rem;
      font-size: .28rem;
      resize: none;
      outline: none;
      box-sizing: border-box;
      &::placeholder {
        color: @light;
      }
    }
    > .tips {
      position: absolute;
      right: .2rem;
      bottom: .3rem;
      font-size: .24rem;
      color: @light;
    }
  }

  footer{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .test{
    width:100%;
    font-size:.28rem;
    -webkit-user-select: auto;
  }
</style>
<template>
  <div v-if="search" style="position:relative;height:100%;">
    <goods-list :goods="search.goods" cant-open-goods></goods-list>
    <div class="score border-bottom">
      <span class="title">商品评分</span>
      <span class="star" :class="{on:star >= item}" @click="star=item" v-for="item in [1,2,3,4,5]"></span>
    </div>
    <div class="textarea">
      <textarea v-model="comment" placeholder="说点对宝贝的评价吧......" maxlength="140"></textarea>
      <span class="tips">{{comment.length}}/140</span>
    </div>
    <div class="score">
      <span class="title">上传图片</span>
    </div>
    <app-upload-img :images="images"></app-upload-img>
    <div class="test">{{test}}</div>
    <footer>
      <div class="btn-big" style="margin-bottom:.1rem;" @click="submit">提交</div>
    </footer>
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
        search: null,
        images: [],
        comment: '',
        star:0,
        test:'',
      }
    },
    methods: {
      submit(){
        const url = location.href.split('#')[0];
        console.log(url);
        $vue.$post(URL.getWeixinInfo, {url})
          .then (res => {
            console.log(res);
            return;




            if(res.errcode == 0) {
              const content = res.content;
              wx.config({
                debug: true,
                appId: content.appId,
                timestamp: content.timestamp,
                nonceStr: content.nonceStr,
                signature: content.signature,
                jsApiList: [
                  'chooseImage',
                  'uploadImage',
                  'chooseWXPay',
                  'previewImage',
                ]
              });
            }else{
              errback(res);
            }
          })
      }
    },
    created(){
      document.title = '评价';
      this.test = location.href.split('#')[0];
      this.search = getSearchParams(location.search);
    },
    components: {
      AppPermanent,
      GoodsList,
      AppUploadImg,
    }
  }
</script>
