<style type="text/less" lang="less">
  @import '../../common';

  .index-tags {
    height: .8rem;
    margin-bottom: .1rem;
    > ul {
      width: 100%;
      .tags(3);
      .border-bottom-1px;
      &.fixed {
        position: fixed;
        left: 0;
        top: .9rem;
        z-index: 10;
      }
    }
  }

  .follows {
    position: relative;
    margin-bottom: .1rem;
    background-color: #fff;
    font-size: .2rem;
    height: 2.6rem;
    > span {
      position: absolute;
      left: 0;
      top: 0;
      padding: 0 .26rem;
      height: 100%;
      text-align: center;
      writing-mode: vertical-lr;
      letter-spacing: .05rem;
      z-index: 1;
      background-color: #fff;
      &:after {
        content: " ";
        position: absolute;
        right: 0;
        top: 50%;
        width: 1px;
        height: .6rem;
        margin-top: -.3rem;
        background-color: #e4e4e4;
      }
    }
    > ul {
      width: 100%;
      height: 100%;
      line-height: 2.6rem;
      padding-top: .38rem;
      padding-left: .72rem;
      box-sizing: border-box;
      overflow-y: hidden;
      overflow-x: scroll;
      white-space: nowrap;
      font-size:0;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
      > li {
        position: relative;
        display: inline-block;
        text-align: center;
        width: 1.52rem;
        height: 1.88rem;
        line-height: normal;
        vertical-align: top;
        &:first-child {
          margin-left: .1rem;
        }
        dt {
          font-size:0;
          overflow:hidden;
          > img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
          }
        }
        dd {
          overflow: hidden;
          margin-top:.1rem;
          > span {
            height:.3rem;
            line-height:.3rem;
            font-size:.2rem;
            width: 1.2rem;
            overflow-x: hidden;
            overflow-y: visible;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        > div{
          position:absolute;
          left:0;
          bottom:0;
          width:100%;
          text-align: center;
          overflow: hidden;
          >span {
            .middle(.4rem);
            width: .84rem;
            font-size: .16rem;
            border: 1px solid #111;
          }
        }

      }
    }
  }

  .swiper {
    background-size: 100% 100%;
  }

</style>
<template>
  <div class="bottom-container" style="padding-top:.9rem;">
    <search-input v-href="'search'" disabled>
      <span v-if="message_count">{{message_count > 9 ? '9+' : message_count}}</span>
      <img v-href.stop="'message'" src="../../assets/img/nav_message.png">
    </search-input>
    <swiper
      class="swiper"
      :style="{backgroundImage:'url(./static/img/default_banner.png)'}"
      :list="banner.list"
      v-model="banner.index"
      :aspect-ratio="8/15"
      dots-position="center"
      auto
      loop
      dots-class="banner-dot"
      @click.native="clickBanner"
    ></swiper>
    <div class="index-tags">
      <ul :class="{fixed:isIndexTagsFixed}">
        <li :class="{active:activeTag === 0}" @click="activeTag=0">我的关注</li>
        <li :class="{active:activeTag === 1}" @click="activeTag=1">热门文章</li>
        <li :class="{active:activeTag === 2}" @click="activeTag=2">好物推荐</li>
      </ul>
    </div>
    <div v-if="attention.persons.length" v-show="activeTag === 0" class="follows">
      <span>推荐关注</span>
      <ul>
        <li v-for="person in attention.persons" :key="person.customer_id">
          <dl v-href="['person_detail', {pid:person.customer_id}]">
            <dt>
              <img v-avatar="person.avater">
            </dt>
            <dd><span>{{person.nickname}}</span></dd>
          </dl>
          <div>
            <span @click="follow(person.customer_id)">关注TA</span>
          </div>
        </li><!--
        --><li v-if="attention.persons.length >= 9">
          <dl>
            <dt v-href="'follows'">
              <img src="../../assets/img/people_more.png">
            </dt>
            <dd><span>更多推荐</span></dd>
          </dl>
          <span v-href="'follows'">查看全部</span>
        </li>
      </ul>
    </div>
    <div v-if="attention.articles && !attention.articles.length" v-show="activeTag === 0" class="tip-nothing">
      <img src="../../assets/img/Tip_nothing.png">
      <div>暂无关注</div>
    </div>
    <app-articles v-if="attention.articles" v-show="activeTag === 0" :parentData="_data"
                  :articles="attention.articles"></app-articles>
    <app-articles v-show="activeTag === 1" :articles="articles"></app-articles>
    <goods-container v-show="activeTag === 2" :goods="recommend" hidePrice></goods-container>
    <load-more
      :url="loadMoreAttr.url"
      :page="loadMoreAttr.page"
      :callback="loadMore"
      :no-listen="activeTag!==1 || !hasMore"
    >
    </load-more>
    <the-footer current="0"></the-footer>
    <app-permanent type="1"></app-permanent>
  </div>
</template>
<script>
  import SearchInput from '@c/SearchInput.vue'
  import AppArticles from '@c/AppArticles.vue'
  import GoodsContainer from '@c/GoodsContainer.vue'
  import TheFooter from '@c/TheFooter.vue'
  import {Swiper} from 'vux'
  import AppPermanent from '@c/AppPermanent.vue'
  import LoadMore from '@c/LoadMore.vue'

  export default {
    data () {
      return {
        clientWidth: document.documentElement.clientWidth,
        isIndexTagsFixed: false,
        banner: {
          list: [],
          index: 0,
        },
        activeTag: 1,
        attention: {
          articles: null,
          persons: [],
        },
        articles: [],
        loadMoreAttr: {
          url: URL.getArticles,
          page: 1
        },
        hasMore: true,
        recommend: [],
        message_count: 0,
        $_follow: false,
      }
    },
    methods: {
      loadMore(content){
        if (content.length) {
          this.articles.push(...content);
          this.loadMoreAttr.page++;
        } else {
          this.hasMore = false;
        }
      },
      clickBanner(){
        const action = this.banner.list[this.banner.index].action;
        jumpAction(action);
      },
      follow(pid){
        this.$post(URL.attention, {pid})
          .then(res => {
            if (res.errcode == 0) {
              this.refreshByFollow();
            } else {
              errback(res)
            }
          })
      },
      refreshByFollow(){
        this.$post(URL.getBaseData)
          .then(res => {
            if(res.errcode == 0) {
              this.attention = res.content.attention;
              this.$_follow = false;
              setSession(getPageName(), this._data);
            }else{
              errback(res);
            }
          })
      },
      fetch(){
        this.$post(URL.getBaseData)
          .then(res => {
            if (res.errcode == 0) {
              const content = res.content;
              const banners = content.banners;
              for (let i in banners) {
                banners[i].img = banners[i].image
              }
              this.banner.list = banners;
              this.attention = content.attention;
              this.articles = content.articles;
              this.recommend = content.recommend;
            } else {
              errback(res);
            }
          });
        this.fetchMsgCount();
      },
      fetchMsgCount(){
        this.$post(URL.getInitData)
          .then(res => {
            this.message_count = res.content.message_count;
          })
      }
    },
    created(){
      this.fetch();

      window.addEventListener('scroll', () => {
        this.isIndexTagsFixed = window.scrollY > this.clientWidth * 8 / 15;
      })
    },
    mounted(){
      console.log(this._data);
    },
    components: {
      SearchInput,
      Swiper,
      AppArticles,
      GoodsContainer,
      TheFooter,
      AppPermanent,
      LoadMore,
    }
  }
</script>
