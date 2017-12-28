<style type="text/less" lang="less">
  @import '../../common';

  .comments {
    background-color: #fff;
    overflow: hidden;
    > li {
      position: relative;
      overflow: hidden;
      padding-left: 1.1rem;
      &:last-child {
        > div.content {
          &:after {
            width: 0;
            height: 0;
          }
        }
      }
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
        padding: .28rem 0 .32rem;
        .border-bottom-1px;
        > .a {
          overflow: hidden;
          span {
            overflow: hidden;
            vertical-align: top;
          }
          > .a-1 {
            font-size: .24rem;
            color: #00609b;
            .a-1-nickname {
              max-width: 2rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          > .a-2 {
            color: @light;
            font-size: .24rem;
            overflow: hidden;
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

  .text {
    height: .6rem;
    line-height: .6rem;
    background-color: #eee;
    padding-left: .36rem;
    padding-right: .3rem;
    font-size: .24rem;
    > span {
      &:nth-child(1) {
        float: left;
        color: #00609b;
      }
      &:nth-child(2) {
        float: right;
      }
    }
  }

  .comments-model {
    position: fixed;
    left: 10%;
    top: 2.4rem;
    width: 80%;
    overflow: hidden;
    z-index: 9;
    background-color: #fff;
    box-sizing: border-box;
    padding:.3rem;
    > textarea {
      width: 100%;
      height: 3rem;
      box-sizing: border-box;
      resize: none ;
      outline: none;
      font-size: .28rem;
      &::placeholder {
        color: @light;
      }
      &::-webkit-scrollbar{
        width:0;
        height:0;
      }
    }
    > .actions {
      text-align: right;
      overflow:hidden;
      > span {
        width: .96rem;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
        margin-right: .4rem;
        border: 0.5px solid #111;
      }
    }
  }
</style>
<template>
  <div v-if="content">
    <ul class="comments">
      <li class="comment" v-for="comment in content.slice(0,1)" @click="showComment(comment.comment_id)">
        <img class="avatar" :src="comment.avater | avatar">
        <div class="content">
          <img class="reply" src="../../assets/img/Article_reply.png">
          <div class="a">
            <span class="a-1">
              <span class="a-1-nickname">
                {{comment.nickname}}
              </span>
            </span>
            <span class="a-2">{{comment.date_add | time_3}}</span>
          </div>
          <div class="b">{{comment.content}}</div>
        </div>
      </li>
    </ul>
    <div class="text">
      <span @click="toArticle">查看原文章</span>
      <span>共{{content.length-1}}条回复</span>
    </div>
    <ul class="comments">
      <li class="comment" v-for="comment in content.slice(1)" @click="showComment(comment.comment_id)">
        <img class="avatar" :src="comment.avater | avatar">
        <div class="content">
          <div class="a">
            <span class="a-1">
              <span class="a-1-nickname">{{comment.nickname}}</span>
              <span v-if="comment.to_customer_id != main.customer_id">
                <span style="color:#111;">回复</span>
                <span class="a-1-nickname">{{comment.to_nickname}}</span>
              </span>
            </span>
            <span class="a-2">{{comment.date_add | time_3}}</span>
          </div>
          <div class="b">{{comment.content}}</div>
        </div>
      </li>
    </ul>
    <div class="comments-model" v-show="ifShowComment">
      <textarea placeholder="请输入评论内容" v-model="comment"></textarea>
      <div class="actions">
        <span @click="hideComment">取消</span>
        <span @click="sendComment">发送</span>
      </div>
    </div>
    <the-shade v-show="ifShowComment" @click.native="hideComment"></the-shade>
    <load-more
      :url="url"
      :page="page"
      :params="{comment_id:comment_id}"
      :callback="loadMore"
      :no-listen="!hasMore"
    ></load-more>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import TheShade from '@c/TheShade.vue'
  import LoadMore from '@c/LoadMore.vue'

  export default {
    data () {
      return {
        comment_id: '',
        content: null,
        main: null,
        ifShowComment: false,
        replyComment_id: '',
        comment: '',
        url: URL.getComments,
        page: 1,
        hasMore: true,
      }
    },
    methods: {
      loadMore(content){
        if (content.length) {
          this.content.push(...content);
          this.page++;
        } else {
          this.hasMore = false;
        }
      },
      showComment(comment_id){
        this.replyComment_id = comment_id;
        this.ifShowComment = true;
      },
      hideComment(){
        this.ifShowComment = false;
        this.comment = '';
      },
      sendComment(){
        if (!this.comment.trim()) {
          return;
        }
        this.$post(URL.comment, {comment: this.comment, comment_id: this.replyComment_id})
          .then(res => {
            if (res.errcode == 0) {
              location.reload();
            } else {
              errback(res);
            }
          })
      },
      toArticle(){
        if (document.referrer.includes('article_detail.html')) {
          history.go(-1);
        }
      },
      fetch(){
        this.$post(URL.getComments, {comment_id: this.comment_id})
          .then(res => {
            console.log(res);
            if (res.errcode == 0) {
              this.content = res.content;
              this.main = res.content[0];
            } else {
              errback(res);
            }
          })
      }
    },
    created(){
      document.title = '回复列表';
      const {comment_id} = getSearchParams(location.search);
      this.comment_id = comment_id;
      this.fetch();
    },
    components: {
      AppPermanent,
      TheShade,
      LoadMore,
    }
  }
</script>
