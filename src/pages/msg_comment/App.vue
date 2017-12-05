<style type="text/less" lang="less">
  .msg_comment-ul{
    >li{
      margin-top:.2rem;
      background-color:#fff;
      overflow:hidden;
      >div.div-1{
        margin-top:.3rem;
        height:.6rem;
        line-height:.6rem;
        overflow:hidden;
        >img{
          float:left;
          margin-left:.56rem;
          width:.6rem;
          height:.6rem;
          border-radius: 50%;
        }
        >.nickname{
          margin:0 .16rem;
          font-size:.28rem;
          color:#00609B;
        }
        >.date_add{
          font-size:.24rem;
          color: #9DA5A8;
        }
        >.btn {
          float:right;
          margin-right:.22rem;
          margin-top:.08rem;
          width:1.14rem;
          height:.44rem;
          text-align:center;
          line-height:.44rem;
          box-sizing: border-box;
          border:1px solid #111;
          font-size:.24rem;
        }
      }
      >div.div-2{
        margin-top:.12rem;
        font-size:.28rem;
        white-space: pre-wrap;
        padding-left:1.3rem;
        padding-right:.4rem;
      }
      >div.div-3{
        background-color:#eee;
        font-size:.28rem;
        margin:.24rem .22rem .34rem .56rem;
        padding:.16rem 0 .14rem .24rem;
        &.ellipsis{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>
<template>
  <div>
    <app-msg-comment :msgs="content"></app-msg-comment>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import AppMsgComment from '@c/AppMsgComment.vue'
  export default {
    data () {
      return {
        page:1,
        content:[],
      }
    },
    methods: {
      fetch(){
        this.$post(URL.getCommentMessages, {page: this.page})
          .then( res => {
              if(res.errcode == 0){
                  console.log(res)
                this.content = res.content;
              }else {
                  errback(res)
              }
          })
      }
    },
    created(){
      document.title = '回复';
      return this.fetch();
    },
    components: {
      AppPermanent,
      AppMsgComment,
    }
  }
</script>
