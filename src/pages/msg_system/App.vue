<style type="text/less" lang="less">
  @import '../../common';

  .msg_system-ul {
    > li {
      margin-top: .2rem;
      position: relative;
      overflow: hidden;
      background-color: #fff;
      padding-bottom: .28rem;
      > .img {
        text-align: center;
        font-size: 0;
        > img {
          margin-top: .16rem;
          width: 7.2rem;
          height: 2.4rem;
        }
      }
      > .text {
        margin: 0 .24rem;
        position: relative;
        overflow: hidden;
        > .title {
          margin-top: .16rem;
          font-size: .28rem;
          > span {
            width: .2rem;
            height: .2rem;
            border-radius: 50%;
            background-color: #d0021b;
          }
        }
        > .bottom {
          margin-top: .1rem;
          color: @light;
          font-size: .24rem;
          overflow: hidden;
          > span {
            &:first-child {
              float: left;
            }
            &:last-child {
              float: right;
              .span-bg-icon(.24rem, right);
              background-image: url(../../assets/img/direction_right_gray.png);
            }
          }
        }
      }
    }
  }
</style>
<template>
  <div>
    <ul class="msg_system-ul" v-if="content && content.length">
      <li v-for="msg in content" :key="msg.message_id" @click="read(msg)">
        <div class="img">
          <img :src="msg.image" v-if="msg.image">
        </div>
        <div class="text">
          <div class="title">
            <span v-if="msg.is_read == 0"></span>
            {{msg.title}}
          </div>
          <div class="bottom">
            <span>{{msg.date_add | time}}</span>
            <span>查看详情</span>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="tip-nothing" style="margin-top:2rem;">
      <img src="../../assets/img/Tip_nothing.png">
      <div>暂无系统通知</div>
    </div>
    <load-more
      :url="url"
      :page="page"
      :callback="loadMore"
      :no-listen="!hasMore"
    ></load-more>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import LoadMore from '@c/LoadMore.vue'

  export default {
    data () {
      return {
        content: [],
        page: 1,
        url:URL.getSystemMessages,
        hasMore:true,
      }
    },
    methods: {
      loadMore(content){
        if(content.length) {
          this.content.push(...content);
          this.page++;
        }else{
          this.hasMore = false;
        }
      },
      read(msg){
        msg.is_read = 1;
        jumpAction(msg.action);
      },
      fetch(){
        this.$post(URL.getSystemMessages, {page: 1})
          .then(res => {
            console.log(res);
            if (res.errcode == 0) {
              this.content = res.content;
            }else{
              errback(res);
            }
          })
      }
    },
    created(){
      document.title = '系统通知';
      this.fetch();
    },
    components: {
      AppPermanent,
      LoadMore,
    }
  }
</script>
