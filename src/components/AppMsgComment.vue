<style type="text/less" lang="less">
  .msg_comment-ul {
    > li {
      margin-top: .2rem;
      background-color: #fff;
      overflow: hidden;
      > div.div-1 {
        margin-top: .3rem;
        height: .6rem;
        line-height: .6rem;
        overflow: hidden;
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
  <ul class="msg_comment-ul">
    <li v-for="msg in msgs" :key="msg.message_id">
      <div class="div-1">
        <img :src="msg.avater | avatar">
        <span class="nickname">{{msg.nickname}}</span><!--
          --><span class="date_add">{{msg.date_add | time}}</span>
        <span class="btn">回复TA</span>
      </div>
      <div class="div-2">{{msg.title}}</div>
      <div v-if="msg.foregin_type" class="div-3" :class="{ ellipsis: getType(msg.foregin_type) != 1}" @click="jumpAction(msg.action)">
        [{{getType(msg.foregin_type)}}]{{msg.to_content}}
      </div>
      <div v-else class="div-3 ellipsis" @click="jumpAction(msg.action)">
        {{msg.article_title}}
      </div>
    </li>
  </ul>
</template>
<script>
  export default {
    props: {
      msgs:{
        type:Array,
        required:true
      }
    },
    data(){
      return {}
    },
    methods:{
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
    },
    components: {}
  }
</script>
