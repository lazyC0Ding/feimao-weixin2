<style type="text/less" lang="less">
  @import '../../common';

  .message-row-container {
    .row-container(1.2rem, .3rem);
    >li.row{
      >.icon{
        width:.6rem;
        height:.6rem;
        margin-top:.3rem;
      }
    }
  }
</style>
<template>
  <div>
    <ul class="message-row-container" style="margin-top:.2rem;">
      <li class="row" @click="openMessage('system_count')">
        <img class="icon left" src="../../assets/img/mes_system.png">
        <span class="title">系统通知</span>
        <img class="row-arrow" src="../../assets/img/direction_right_gray.png">
        <span class="unread-count"
              v-if="content.system_count && content.system_count != 0">{{content.system_count}}</span>
      </li>
      <li class="row" @click="openMessage('order_count')">
        <img class="icon left" src="../../assets/img/mes_Order.png">
        <span class="title">订单消息</span>
        <img class="row-arrow" src="../../assets/img/direction_right_gray.png">
        <span class="unread-count" v-if="content.order_count && content.order_count != 0">{{content.order_count}}</span>
      </li>
      <li class="row" @click="openMessage('fans_count')">
        <img class="icon left" src="../../assets/img/mes_fans.png">
        <span class="title">粉丝</span>
        <img class="row-arrow" src="../../assets/img/direction_right_gray.png">
        <span class="unread-count" v-if="content.fans_count && content.fans_count != 0">{{content.fans_count}}</span>
      </li>
      <li class="row" @click="openMessage('reply_count')">
        <img class="icon left" src="../../assets/img/mes_comment.png">
        <span class="title">回复</span>
        <img class="row-arrow" src="../../assets/img/direction_right_gray.png">
        <span class="unread-count" v-if="content.reply_count && content.reply_count != 0">{{content.reply_count}}</span>
      </li>
      <li class="row" @click="openMessage('attention_count')">
        <img class="icon left" src="../../assets/img/mes_follow.png">
        <span class="title">关注</span>
        <img class="row-arrow" src="../../assets/img/direction_right_gray.png">
        <span class="unread-count" v-if="content.attention_count && content.attention_count != 0">{{content.attention_count}}</span>
      </li>
      <li class="row" @click="openMessage('like_count')">
        <img class="icon left" src="../../assets/img/mes_like.png">
        <span class="title">点赞</span>
        <img class="row-arrow" src="../../assets/img/direction_right_gray.png">
        <span class="unread-count" v-if="content.like_count && content.like_count != 0">{{content.like_count}}</span>
      </li>
    </ul>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  export default {
    data () {
      return {
        content: {},
      }
    },
    methods: {
      openMessage(type){
        this.content[type] = 0;
        switch (type) {
          case 'system_count':
            openPage('msg_system');
            break;
          case 'order_count':
            openPage('msg_order');
            break;
          case 'fans_count':
            openPage('msg_fans');
            break;
          case 'reply_count':
            openPage('msg_comment');
            break;
          case 'attention_count':
            openPage('msg_follow');
            break;
          case 'like_count':
            openPage('msg_like');
            break;
        }
      },
      fetch(){
        this.$post(URL.getMessages)
          .then(res => {
            if (res.errcode == 0) {
              this.content = res.content;
            } else {
              errback(res)
            }
          })
      }
    },
    created(){
      this.fetch();
      document.title = '消息';
    },
    components: {
      AppPermanent
    }
  }
</script>
