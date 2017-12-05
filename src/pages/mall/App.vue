<style type="text/less" lang="less">
  @import '../../common';
  ul.categorys{
    height:1.7rem;
    background-color:#fff;
    overflow:hidden;
    box-sizing: border-box;
    padding-top:.24rem;
    .border-bottom-1px;
    >li{
      float:left;
      width:16.66%;
      text-align:center;
      img{
        width:.88rem;
        height:.88rem;
      }
      dd{
        font-size:.24rem;
      }
    }
  }
</style>
<template>
  <div class="bottom-container" style="padding-top:.9rem;">
    <search-input v-href="'search'" disabled>
      <span v-if="message_count">{{message_count > 9 ? '9+' : message_count}}</span>
      <img v-href.stop="'message'" src="../../assets/img/nav_message.png">
    </search-input>
    <swiper
      :list="banner.list"
      v-model="banner.index"
      @on-index-change="bannerIndexChange"
      :aspect-ratio="8/15"
      dots-position="center"
      auto
      loop
    ></swiper>
    <ul class="categorys">
      <li v-for="category in categorys">
        <dl>
          <dt>
            <img :src="category.cover">
          </dt>
          <dd>{{category.name}}</dd>
        </dl>
      </li>
    </ul>
    <scroll-notice v-if="notices.length" :notices="notices"></scroll-notice>
    <the-footer current="1"></the-footer>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import SearchInput from '@c/SearchInput.vue'
  import TheFooter from '@c/TheFooter.vue'
  import ScrollNotice from '@c/ScrollNotice.vue'
  import {Swiper} from 'vux'

  export default {
    data () {
      return {
        banner: {
          list: [],
          index: 0,
        },
        categorys:[],
        notices:[],
        message_count:0,
      }
    },
    methods: {
      bannerIndexChange (index) {
        this.banner.index = index
      },
      fetch(){
        this.$post(URL.getGoodsHomeData)
          .then(res => {
            if (res.errcode == 0) {
              console.log(res)
              const content = res.content;
              const banners = content.banners;
              for (let i in banners) {
                banners[i].img = banners[i].image
              }
              this.banner.list = banners;
              this.categorys = content.categorys;
              this.notices = content.notices;
            } else {
              errback(res)
            }
          });
        this.fetchMsgCount();
      },
      fetchMsgCount(){
        this.$post(URL.getInitData)
          .then( res => {
            this.message_count = res.content.message_count;
          })
      }
    },
    created(){
      this.fetch();
    },
    components: {
      AppPermanent,
      SearchInput,
      TheFooter,
      Swiper,
      ScrollNotice,
    }
  }
</script>
