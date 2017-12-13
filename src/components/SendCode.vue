<style scoped lang="less" type="text/less">
  @import '../common';

  a {
    float: right;
    width: 1.58rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    font-size: .3rem;
    border: 1px solid #111;
    box-sizing: border-box;
    margin-top: .2rem;
    /*&.sent {
    background-color: #ccc;
    }*/
  }
</style>
<template>
  <a @click="sendCode" :class="{sent:hasSent}">{{countdown ? countdown + 's' : config.btnValue}}</a>
</template>
<script>
  export default {
    props: {
      phone: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true
      }
    },
    data(){
      return {
        hasSent: false,
        countdown: 0,
        // 根据项目配置
        config: {
          url: URL.sendcode,
          btnValue: '发送',
        }
      }
    },
    computed: {
      params(){
        return {
          phone: this.phone,
          type: this.type,
        }
      }
    },
    watch: {
      countdown(n){
        if (n > 0) {
          setTimeout(() => {
            this.countdown = this.countdown - 1;
          }, 1000)
        } else {
          this.hasSent = false
        }
      }
    },
    methods: {
      sendCode(){
        if (this.hasSent || !this.phone || !this.type) {
          return
        }
        this.hasSent = true;
        this.$post(this.config.url, this.params)
          .then(res => {
            if (res.errcode == 0) {
              this.countdown = 60;
            }else{
              errback(res);
              this.hasSent = false;
            }
          }).catch( err => {
            this.hasSent = false
          })
      },
    },
    components: {}
  }
</script>
