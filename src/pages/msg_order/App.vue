<style type="text/less" lang="less">
  @import '../../common';

  .msg_order-ul {
    > li {
      margin-top: .2rem;
      background-color: #fff;
      > .state {
        height: .8rem;
        line-height: .8rem;
        overflow: hidden;
        padding: 0 .24rem 0 .2rem;
        .border-bottom-1px;
        > span {
          &:first-child {
            margin-right: .1rem;
            width: .2rem;
            height: .2rem;
            background-color: #D0021B;
            border-radius: 50%;
          }
          &:nth-child(2) {
            font-size: .28rem;
          }
          &:last-child {
            float: right;
            color: @light;
            font-size: .24rem;
          }
        }
      }
      > .content {
        height: 2.2rem;
        padding: 0 .24rem 0 .2rem;
        > img {
          float: left;
          width: 1.8rem;
          height: 1.8rem;
          margin-top: .2rem;
          margin-right: .18rem;
        }
        > div {
          overflow: hidden;
          > div {
            &.div-1 {
              height: .7rem;
              font-size: .28rem;
              line-height: .36rem;
              margin-top: .28rem;
              text-overflow: ellipsis;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            &.div-2 {
              font-size: .24rem;
              color: @light;
              margin-top: .18rem;
            }
            &.div-3 {
              font-size: .24rem;
              color: @light;
              margin-top: .15rem;
            }
          }
        }
      }
    }
  }
</style>
<template>
  <div v-if="content">
    <ul v-if="content.length" class="msg_order-ul">
      <li v-for="msg in content" :key="msg.message_id" @click="read(msg)">
        <div class="state">
          <span v-show="msg.is_read == 0"></span>
          <span>{{msg.title}}</span>
          <span>{{msg.date_add | time}}</span>
        </div>
        <div class="content">
          <img :src="msg.goods_cover">
          <div>
            <div class="div-1">{{msg.goods_name}}</div>
            <div class="div-2">共{{msg.goods_count}}件商品</div>
            <div class="div-3">订单号: {{msg.order_sn}}</div>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="tip-nothing" style="margin-top:2rem;">
      <img src="../../assets/img/Tip_nothing.png">
      <div>您还没有订单消息</div>
    </div>
    <app-permanent type="1"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  export default {
    data () {
      return {
        content: null,
        page: 1
      }
    },
    methods: {
      read(msg){
        msg.is_read = 1;
        jumpAction(msg.action);
      },
      fetch(){
        this.$post(URL.getOrderMessages, {page: this.page})
          .then(res => {
            if (res.errcode == 0) {
              console.log(res)
              this.content = res.content;
            } else {
              errback(res)
            }
          })
      }
    },
    created(){
      document.title = '订单消息';
      this.fetch();
    },
    components: {
      AppPermanent
    }
  }
</script>
