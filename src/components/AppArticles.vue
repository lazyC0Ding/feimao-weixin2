<style scoped lang="less" type="text/less">
  @text-light: #9da5a8;
  @height: .5rem;
  @primary: #ffb305;
  ul {
    > li {
      margin-bottom: .2rem;
      > .cover {
        position: relative;
        > img {
          position: absolute;
          width: .4rem;
          height: .4rem;
          right: 0;
          top: 0;
        }
      }
      > .text {
        padding: 0 .34rem 0 .26rem;
        background-color: #fff;
        overflow: hidden;
        > .title {
          margin: .2rem 0 .1rem;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        > .mini_content {
          font-size: .24rem;
          color: @text-light;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          white-space: pre-wrap;
        }
        > .actions {
          margin-top: .26rem;
          margin-bottom: .4rem;
          font-size: .24rem;
          >span{
            height:.32rem;
            line-height:.32rem;
            overflow:hidden;
            &:first-child{
              background: url(../assets/img/list_browse.png) no-repeat left center;
              background-size: .28rem .22rem;
              padding-left: .35rem;
              color: @text-light;
            }
            &:nth-child(2) {
              background: url(../assets/img/list_like.png) no-repeat left center;
              background-size: .24rem .26rem;
              margin-left: .2rem;
              padding-left: .35rem;
              color: @text-light;
            }
            &:last-child{
              background: url(./img/direction_right_black.png) no-repeat right center;
              background-size: .24rem .24rem;
              padding-right: .35rem;
              font-size: .24rem;
              float: right;
            }
          }
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
    > .follows {
      float: right;
      margin-right: .24rem;
      font-size: .24rem;
    }
    > .button {
      float: right;
      height: @height;
      line-height: @height;
      text-align: center;
      width: 1.18rem;
      margin-top: .2rem;
      margin-right: .18rem;
      box-sizing: border-box;
      border: 1px solid @primary;
      color: @primary;
      font-size: .24rem;
    }
  }

</style>
<template>
  <ul>
    <li v-for="(article, index) in articles" :key="article.article_id">
      <div class="author" v-if="article.customer_id">
        <img :src="article.avater | avatar">
        <span class="nickname">{{article.nickname}}</span>
        <span class="button" @click="follow(article, article.customer_id)">{{ article.is_attention == 0 ? '关注TA' : '已关注'}}</span>
        <span class="follows">{{article.attention_count}}人关注</span>
      </div>
      <div class="cover" v-ratio-img="article.cover" @click="showDetail(article)">
        <img @click.stop="deleteArticles(article.article_id, index)" v-show="ifShowClose" src="../assets/img/close_redbj.png">
      </div>
      <div class="text">
        <div @click="showDetail(article)" class="title">{{article.title}}</div>
        <div @click="showDetail(article)" class="mini_content">{{article.mini_content}}</div>
        <div class="actions">
          <span>{{article.browse}}</span>
          <span>{{article.likes}}</span>
          <span @click="showDetail(article)">READ MORE</span>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
  export default {
    props: {
      articles: {
        type: Array,
        required: true
      },
      parentData: Object,  // 用于文章后退不刷新父级页面
      hasAuthorInfo: Boolean,
      ifShowClose: Boolean,  // 显示右上角X
    },
    data(){
      return {}
    },
    methods: {
      deleteArticles(article_id, index){
        this.$post(URL.deleteArticle, {article_id})
          .then (res => {
            console.log(res);
            if(res.errcode == 0) {
              this.articles.splice(index, 1);
            }else{
              errback(res);
            }
          })
      },
      showDetail(article){
        if (this.parentData) {
          setSession(getPageName(), this.parentData);
        }
        article.browse = Number(article.browse) + 1;
        return openPage('article_detail', {article_id:article.article_id})
      },
      follow(article, pid){
        this.$post(URL.attention, {pid})
          .then(res => {
            if (res.errcode == 0) {
              article.is_attention = res.content;
              follow_common();
            } else {
              errback(res)
            }
          })
      }
    },
    components: {}
  }
</script>
