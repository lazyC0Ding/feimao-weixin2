<style type="text/less" lang="less">
  @import '../../common';

  html, body {
    background-color: #fff;
  }

  .article_detail-container {
    padding-top: .9rem;
    &.hasRecommend {
      padding-top: 1.9rem;
    }
  }

  .detail-top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    > .recommend {
      height: 1rem;
      line-height: 1rem;
      background-color: #fff;
      > img {
        margin-left: .2rem;
        width: .72rem;
        height: .72rem;
        vertical-align: middle;
      }
      > span {
        float: right;
        font-size: .24rem;
        &.btn {
          .span-bg-icon(.24rem, right);
          margin-right: .34rem;
          color: @light;
          background-image: url(../../assets/img/direction_down_gray.png);
          &.active {
            background-image: url(../../assets/img/direction_up_gray.png);
          }
        }
        &:last-child {
          margin-right: .4rem;
        }
      }
    }
    > ul {
      > li {
        padding-left: .2rem;
        height: 1rem;
        line-height: 1rem;
        background-color: #fff;
        font-size: .24rem;
        overflow: hidden;
        .border-bottom-1px;
        &:first-child {
          border-top: 1px solid #e4e4e4;
        }
        &:last-child {
          &:after {
            content: '';
            height: 0;
          }
        }
        > img {
          float: left;
          margin-top: .14rem;
          margin-right: .2rem;
          width: .72rem;
          height: .72rem;
        }
        > span {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .author {
    height: .9rem;
    line-height: .9rem;
    background-color: #000;
    font-size: 0;
    color: #fff;
    overflow: hidden;
    >a{
      > img {
        margin-left: .3rem;
        width: .6rem;
        height: .6rem;
        border-radius: 50%;
        vertical-align: middle;
      }
      > .nickname {
        width: 3rem;
        margin-left: .2rem;
        font-size: .28rem;
        vertical-align: middle;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    > .follows {
      float: right;
      margin-right: .24rem;
      font-size: .24rem;
    }
    > .button {
      float: right;
      .middle(.5rem);
      width: 1.18rem;
      margin-top: .2rem;
      margin-right: .18rem;
      box-sizing: border-box;
      border: 1px solid @primary;
      color: @primary;
      font-size: .24rem;
    }
  }

  .article {
    padding-bottom: .6rem;
    > .cover {
      display: block;
      width: 100%;
      height: 6rem;
    }
    > .title {
      padding: 0 .24rem;
      > div.a {
        margin-top: .28rem;
        font-size: .36rem;
        line-height: .56rem;
      }
      > hr {
        margin-top: .3rem;
        width: 3rem;
        height: .04rem;
        background-color: #000;
      }
      > div.b {
        margin-top: .28rem;
        font-size: .24rem;
        color: @light;
        overflow: hidden;
      }
    }
    > .content {
      margin-top: .4rem;
      > div.text {
        margin: .3rem .24rem 0;
        font-size: .3rem;
        white-space: pre-wrap;
        &:first-child {
          margin-top: 0;
        }
      }
      > img.image {
        margin-top: .4rem;
        width: 100%;
        &:first-child {
          margin-top: 0;
        }
      }
      > div.url {
        height: 1.88rem;
        margin: .4rem .36rem 0;
        border: 0 solid #ddd;
        box-shadow: 0 .02rem .04rem 0 rgba(0, 0, 0, .3);
        &:first-child {
          margin-top: 0;
        }
        > img {
          float: left;
          margin: .14rem;
          width: 1.6rem;
          height: 1.6rem;
        }
        > div {
          position: relative;
          overflow: hidden;
          height: inherit;
          > .a {
            margin-top: .18rem;
            margin-right: .28rem;
            font-size: .3rem;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          > .b {
            overflow: hidden;
            position: absolute;
            width: 100%;
            bottom: .14rem;
            > span {
              &:nth-child(1) {
                float: left;
                color: #d0021b;
                font-size: .36rem;
              }
              &:nth-child(2) {
                margin-left: .22rem;
                color: @light;
                font-size: .24rem;
                text-decoration: line-through;
              }
              &:nth-child(3) {
                float: right;
                margin-right: .2rem;
                font-size: .24rem;
                color: #000;
                width: 1.24rem;
                .middle(.4rem);
                border: 1px solid #000;
              }
            }
          }
        }
      }
    }
    > .recommend-articles {
      margin-top: .3rem;
      > div:first-child {
        text-align: center;
        font-size: .3rem;
      }
      > div:last-child {
        margin: .24rem .34rem 0 .36rem;
        padding: .1rem .4rem;
        font-size: .28rem;
        border: 0 solid #ddd;
        box-shadow: 0 .02rem .04rem 0 rgba(0, 0, 0, 0.30);
        > div {
          height: .8rem;
          line-height: .8rem;
          overflow: hidden;
          font-size: 0;
          .border-bottom-1px;
          &:last-child {
            &:after {
              content: '';
              width: 0;
              height: 0;
            }
          }
          > img {
            margin-right: .1rem;
            width: .48rem;
            height: .48rem;
            vertical-align: middle;
            border-radius: 50%;
          }
          > span {
            font-size: .28rem;
            vertical-align: middle;
          }
        }
      }
    }
  }

  .likes {
    padding: 0 .4rem;
    height: .9rem;
    line-height: .9rem;
    overflow: hidden;
    background-color: #eee;
    > img {
      margin-top: .35rem;
      width: .2rem;
      height: .2rem;
      float: right;
    }
    > span {
      .span-bg-icon(.24rem, left);
      float: right;
      margin-right: .14rem;
      background-image: url(../../assets/img/Article_like_show.png);
    }
    > ul {
      height: 100%;
      line-height: .9rem;
      overflow: hidden;
      font-size: 0;
      > li {
        display: inline-block;
        margin-right: .04rem;
        width: .48rem;
        height: .48rem;
        font-size: 0;
        vertical-align: middle;
        > img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }

  .comments {
    padding-bottom: .2rem;
    > li {
      position: relative;
      overflow: hidden;
      > img.avatar {
        position: absolute;
        top: .24rem;
        left: .36rem;
        width: .6rem;
        height: .6rem;
        border-radius: 50%;
      }
      > div.content {
        position: relative;
        overflow: hidden;
        padding: .28rem 0 .32rem 1.1rem;
        .border-bottom-1px;
        > .a {
          > .a-1 {
            font-size: .24rem;
            color: #00609b;
          }
          > .a-2 {
            color: @light;
            font-size: .24rem;
          }
        }
        > .b {
          margin-top: .14rem;
          margin-right: .32rem;
          font-size: .24rem;
          white-space: pre-wrap;
        }
        > .c {
          font-size: .24rem;
          color: #00609b;
          margin-top: .22rem;
        }
        > .reply {
          position: absolute;
          top: .4rem;
          right: .38rem;
          width: .28rem;
          height: .24rem;
        }
      }
    }
  }

  .footer {
    .ul-horizontal(@footer-height,3);
    &:after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 1px;
      background-color: #e4e4e4;
    }
    span {
      .span-bg-icon(.32rem, left);
    }
    > li {
      &:nth-child(1) {
        > span {
          background-image: url(../../assets/img/Article_Collection_off.png);
        }
      }
      &:nth-child(2) {
        > span {
          background-image: url(../../assets/img/Article_like_off.png);
        }
      }
      &:nth-child(3) {
        > span {
          background-image: url(../../assets/img/Article_comment.png);
        }
      }
    }
  }
</style>
<template>
  <div class="bottom-container article_detail-container" :class="{ hasRecommend:article.goods_count > 0 }">
    <div v-if="article_id">
      <div class="detail-top">
        <div class="author">
          <a v-href="['person_detail', {pid:article.customer_id}]">
            <img :src="article.avater | avatar">
            <span class="nickname">{{article.nickname}}</span>
          </a>
          <span class="button" v-if="article.can_attention != 0" @click="follow">{{ article.is_attention == 0 ? '关注TA' : '已关注' }}</span>
          <span class="follows">{{article.attention_count}}人关注</span>
        </div>
        <div class="recommend" v-if="article.goods_count > 0" @click="ifShowGoods = !ifShowGoods">
          <img v-for="item in topShowGoodsImg" :src="item.cover">
          <span class="btn" :class="{active:ifShowGoods}">{{ifShowGoods ? '收起' : '展开'}}</span>
          <span>共推荐{{article.goods_count}}件商品</span>
        </div>
        <ul v-show="ifShowGoods">
          <li v-for="item in article.goods">
            <img :src="item.cover">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="article">
        <img class="cover" :src="content.article.cover">
        <div class="title">
          <div class="a">{{article.title}}</div>
          <hr>
          <div class="b">
            <span style="float:left">阅读 {{article.browse}}</span>
            <span v-if="article.date_add" style="float:right">{{article.date_add | time}}</span>
          </div>
        </div>
        <div class="content">
          <template v-for="item in article.content">
            <div class="text" v-if="item.type === 'text'">{{item.content}}</div>
            <img class="image" v-else-if="item.type === 'image'" :src="item.content">
            <div class="url" v-else-if="item.type === 'url'">
              <img :src="item.goods.cover">
              <div>
                <div class="a">{{item.goods.name}}</div>
                <div class="b">
                  <span>¥{{item.goods.price}}</span>
                  <span>¥{{item.goods.market_price}}</span>
                  <span>查看详情</span>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div v-if="article.articles_count > 0" class="recommend-articles">
          <div>文章推荐</div>
          <div>
            <div v-for="item in article.articles">
              <img :src="item.cover | avatar">
              <span>{{item.title}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="likes" v-if="content.likes_count>0">
        <img src="../../assets/img/direction_right_black.png">
        <span>{{content.likes_count}}</span>
        <ul>
          <li v-for="item in content.likes"><img :src="item.avater | avatar"></li>
        </ul>
      </div>
      <ul class="comments">
        <li v-for="comment in content.comments">
          <img class="avatar" :src="comment.avater | avatar">
          <div class="content">
            <img class="reply" src="../../assets/img/Article_reply.png">
            <div class="a">
              <span class="a-1">{{comment.nickname}}</span>
              <span class="a-2">{{comment.date_add | time_2}}</span>
            </div>
            <div class="b">{{comment.content}}</div>
            <div class="c" v-if="comment.reply_count > 0">查看回复({{comment.reply_count}})</div>
          </div>
        </li>
      </ul>
      <ul class="footer">
        <li><span>收藏</span></li>
        <li><span>点赞</span></li>
        <li><span>评论</span></li>
      </ul>
    </div>
    <div v-if="!article_id" class="tip-nothing" style="margin-top:2rem;">
      <img src="../../assets/img/Tip_nothing.png">
      <div>未找到对应的文章信息</div>
    </div>
    <app-permanent type="1"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  export default {
    data () {
      return {
        article_id: '',
        content: {
          article: {},
          comments: [],
          likes: [],
          likes_count: '',
          share: {},
        },
        ifShowGoods: false
      }
    },
    computed: {
      article(){
        return this.content.article;
      },
      topShowGoodsImg(){
        const goods = this.content.article.goods;
        return goods.length > 4
          ? goods.slice(0, 4)
          : goods;
      }
    },
    methods: {
      follow(){
        this.$post(URL.attention, {pid: this.article.customer_id})
          .then(res => {
            if (res.errcode == 0) {
              this.content.article.is_attention = res.content;
              if (res.content != 0) {
                this.content.article.attention_count = Number(this.content.article.attention_count) + 1;
              } else {
                this.content.article.attention_count = Number(this.content.article.attention_count) - 1;
              }
              follow_common();
            } else {
              errback(res);
            }
          })
      },
      fetch(){
        this.$post(URL.articleDetail, {article_id: this.article_id})
          .then(res => {
              console.log(res)
            if (res.errcode == 0) {
              this.content = res.content;
            }else {
              this.article_id = null;
            }
          })
      }
    },
    created(){
      document.title = '文章详情';
      console.log(getSearchParams(location.search));
      const { article_id } = getSearchParams(location.search);
      this.article_id = article_id;

      this.fetch();
    },
    components: {
      AppPermanent
    }
  }
</script>
