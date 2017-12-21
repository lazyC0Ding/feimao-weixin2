<style type="text/less" lang="less">
  @import '../../common';
  .msg_follow-ul {
    > li {
      margin-top: .2rem;
      height: 1.4rem;
      background-color: #fff;
      overflow: hidden;
      position: relative;
      > span {
        width: .2rem;
        height: .2rem;
        background-color: #D0021B;
        border-radius: 50%;
        position: absolute;
        left: .2rem;
        top: .6rem;
      }
      > img {
        float: left;
        width: .8rem;
        height: .8rem;
        border-radius: 50%;
        margin-left: .56rem;
        margin-right: .22rem;
        margin-top: .3rem;
      }
      >.text{
        overflow: hidden;
        > div:first-child {
          margin-top: .28rem;
          font-size: .3rem;
          overflow:hidden;
          >span{
            float:left;
            &:first-child{
              margin-right:.2rem;
              max-width:2.6rem;
              white-space: nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
            }
          }
        }
        > div:last-child {
          margin-top: .1rem;
          font-size: .24rem;
          color: #9DA5A8;
        }
      }
    }
  }
</style>
<template>
  <div v-if="content">
    <ul v-if="content.length" class="msg_follow-ul">
      <li v-for="msg in content" v-action="msg.action">
        <span v-if="msg.is_read == 0"></span>
        <img :src="msg.avater | avatar">
        <div class="text">
          <div>
            <span>{{msg.nickname}}</span>
            <span>{{msg.title}}</span>
          </div>
          <div>{{msg.date_add | time}}</div>
        </div>
      </li>
    </ul>
    <div v-else class="tip-nothing" style="margin-top:2rem;">
      <img src="../../assets/img/Tip_nothing.png">
      <div>您还没有粉丝消息</div>
    </div>
    <app-permanent type="1"></app-permanent>
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
      fetch(){
        this.$post(URL.getFansMessages, {page:this.page})
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
      document.title = '粉丝';
      return this.fetch();
    },
    components: {
      AppPermanent
    }
  }
</script>
