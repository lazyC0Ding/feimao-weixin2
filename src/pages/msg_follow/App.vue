<style type="text/less" lang="less">
  .msg_follow-ul{
    >li{
      margin-top:.2rem;
      height:1.4rem;
      background-color:#fff;
      overflow:hidden;
      position:relative;
      >span{
        width:.2rem;
        height:.2rem;
        background-color:#D0021B;
        border-radius: 50%;
        position:absolute;
        left:.2rem;
        top:.6rem;
      }
      >img{
        float:left;
        width:.8rem;
        height: .8rem;
        border-radius: 50%;
        margin-left:.56rem;
        margin-right:.22rem;
        margin-top:.3rem;
      }
      >div{
        overflow:hidden;
        >div:first-child{
          margin-top:.28rem;
          font-size:.3rem;
        }
        >div:last-child{
          margin-top:.1rem;
          font-size:.24rem;
          color:#9DA5A8;
        }
      }
    }
  }
</style>
<template>
  <div>
    <ul class="msg_follow-ul">
      <li v-for="msg in content">
        <span v-if="msg.is_read == 0"></span>
        <img :src="msg.avater">
        <div>
          <div>{{msg.nickname}} {{msg.title}}</div>
          <div>{{msg.date_add | time}}</div>
        </div>
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
        page:1,
        content:[]
      }
    },
    methods: {
      fetch(){
        this.$post(URL.getAttentionMessages, {page:this.page})
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
      document.title = '关注';
      return this.fetch();
    },
    components: {
      AppPermanent
    }
  }
</script>
