<style type="text/less" lang="less">
  @import '../../common';

  .person_detail-top {
    height: 2.4rem;
    background-color: #000;
    color: #fff;
    > img {
      float: left;
      width: 1.8rem;
      height: 1.8rem;
      border-radius: 50%;
      margin-top: .3rem;
      margin-left: .4rem;
      margin-right: .32rem;
    }
    > div {
      overflow: hidden;
      height: 100%;
      > div:first-child {
        max-width:3rem;
        margin-top: .5rem;
        font-size: .36rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      > div:last-child {
        margin-top: .4rem;
        font-size: .26rem;
        color: #a1a1a1;
        white-space: nowrap;
        overflow-x: scroll;
        &::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
      }
    }
  }

  .person_detail-articles {
    background-color: #fff;
    > div {
      height: .8rem;
      line-height: .8rem;
      > span:first-child {
        font-size: .28rem;
        float: left;
        margin-left: .4rem;
      }
      > span:nth-child(2) {
        .middle(.48rem);
        width: 1.2rem;
        font-size: .24rem;
        float: right;
        margin-top: .16rem;
        margin-right: .2rem;
        margin-left: .24rem;
        border: 1px solid #111;
        box-sizing: border-box;
      }
      > span:last-child {
        font-size: .24rem;
        float: right;
      }
    }
  }
</style>
<template>
  <div>
    <div class="person_detail-top">
      <img v-avatar="content.avater">
      <div>
        <div>{{content.nickname}}</div>
        <div>{{content.introduction || '暂无简介'}}</div>
      </div>
    </div>
    <div class="person_detail-articles">
      <div>
        <span>TA的文章</span>
        <span @click="follow">{{content.is_attention == 0 ? '关注TA' : '已关注'}}</span>
        <span>{{content.attention_count}}人关注</span>
      </div>
      <app-articles v-if="content.articles && content.articles.length" :parentData="_data"
                    :articles="content.articles"></app-articles>
    </div>
    <app-permanent type="1"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import AppArticles from '@c/AppArticles.vue'
  export default {
    data () {
      return {
        pid: '',
        content: {},
        $_follow: false,
      }
    },
    methods: {
      refreshByFollow(){
        this.$post(URL.getAttenInfo, {pid: this.pid})
          .then(res => {
            if (res.errcode == 0) {
              this.content.is_attention = res.content.is_attention;
              this.content.attention_count = res.content.attention_count;
              this.$_follow = false;
              setSession(getPageName(), this._data);
            } else {
              errback(res)
            }
          })
      },
      follow(){
        this.$post(URL.attention, {pid: this.pid})
          .then(res => {
            if (res.errcode == 0) {
              this.content.is_attention = res.content;
              if (res.content != 0) {
                this.content.attention_count = Number(this.content.attention_count) + 1;
              } else {
                this.content.attention_count = Number(this.content.attention_count) - 1;
              }
              follow_common();
            } else {
              errback(res);
            }
          })
      },
      fetch(){
        this.$post(URL.getAttenInfo, {pid: this.pid})
          .then(res => {
            if (res.errcode == 0) {
              console.log(res)
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
              errback(res)
            }
          })
      }
    },
    created(){
      document.title = '个人信息';
      const { pid, customer_id, is_qrcode, hasLogin } = getSearchParams(location.search);
      if(customer_id) {
        this.pid = customer_id;
        setSession('customer_id', customer_id);
        if(is_qrcode == 1 && !hasLogin) {
          removeToken();
          login();
        }
      }else{
        this.pid = pid;
      }
      this.fetch();
    },
    components: {
      AppPermanent,
      AppArticles,
    }
  }
</script>
