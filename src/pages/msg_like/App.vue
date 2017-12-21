<style type="text/less" lang="less">
  @import '../../common';
  .msg_comment-ul {
    > li {
      margin-top: .2rem;
      background-color: #fff;
      overflow: hidden;
      > div.div-1 {
        position:relative;
        margin-top: .3rem;
        height: .6rem;
        line-height: .6rem;
        overflow: hidden;
        >.unRead{
          width: .2rem;
          height: .2rem;
          background-color: #D0021B;
          border-radius: 50%;
          position: absolute;
          left: .2rem;
          top: 50%;
          margin-top:-.1rem;
        }
        > img {
          float: left;
          margin-left: .56rem;
          width: .6rem;
          height: .6rem;
          border-radius: 50%;
        }
        > .nickname {
          margin: 0 .16rem;
          font-size: .28rem;
          color: #00609B;
        }
        > .date_add {
          font-size: .24rem;
          color: #9DA5A8;
        }
        > .btn {
          float: right;
          margin-right: .22rem;
          margin-top: .08rem;
          width: 1.14rem;
          height: .44rem;
          text-align: center;
          line-height: .44rem;
          box-sizing: border-box;
          border: 1px solid #111;
          font-size: .24rem;
        }
      }
      > div.div-2 {
        margin-top: .12rem;
        font-size: .28rem;
        white-space: pre-wrap;
        padding-left: 1.3rem;
        padding-right: .4rem;
      }
      > div.div-3 {
        background-color: #eee;
        font-size: .28rem;
        margin: .24rem .22rem .34rem .56rem;
        padding: .16rem 0 .14rem .24rem;
        &.ellipsis {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>
<template>
  <div v-if="content">
    <ul class="msg_comment-ul" v-if="content.length">
      <li v-for="msg in content" :key="msg.message_id" @click="msg.is_read=1">
        <div class="div-1">
          <span class="unRead" v-show="msg.is_read==0"></span>
          <img :src="msg.avater | avatar">
          <span class="nickname">{{msg.nickname}}</span><!--
          --><span class="date_add">{{msg.date_add | time}}</span>
        </div>
        <div class="div-2">{{msg.title}}</div>
        <div v-if="msg.foregin_type" class="div-3" :class="{ ellipsis: getType(msg.foregin_type) != 1}" @click="jumpAction(msg.action)">
          [{{getType(msg.foregin_type)}}]{{msg.to_content}}
        </div>
        <div v-else class="div-3 ellipsis" v-action="msg.action">
          {{msg.article_title}}
        </div>
      </li>
    </ul>
    <div v-else class="tip-nothing" style="margin-top:2rem;">
      <img src="../../assets/img/Tip_nothing.png">
      <div>您还没有点赞消息</div>
    </div>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  export default {
    data () {
      return {
        page:1,
        content:null,
      }
    },
    methods: {
      jumpAction(action){
        return jumpAction(action);
      },
      getType(foreign_type){
        let type;
        switch (foreign_type) {
          case '1':
            type = '评论';
            break;
          case '2':
            type = '文章';
            break;
          case '3':
            type = '商品';
            break;
        }
        return type;
      },
      fetch(){
        this.$post(URL.getLikeMessages, {page:this.page})
          .then( res => {
              if(res.errcode == 0) {
                  console.log(res)
                this.content = res.content;
              }else {
                  errback(res)
              }
          })
      }
    },
    created(){
      document.title = '点赞';
      this.fetch();
    },
    components: {
      AppPermanent,
    }
  }
</script>
