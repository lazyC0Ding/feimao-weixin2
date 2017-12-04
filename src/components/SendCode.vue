<style scoped lang="less" type="text/less">
  @import '../common';

  a {
    width: 1.7rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    .primary-bg;
    color: #fff;
    font-size: .26rem;
    border-radius: .3rem;
    &.sent {
      background-color: #ccc;
    }
  }
</style>
<template>
  <a @click="sendCode" :class="{sent:hasSent}">{{countdown ? countdown + 's' : '发送验证码'}}</a>
</template>
<script>
  export default {
    props: {
      callback: Function,
      param: {
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
        if (this.hasSent || !this.param || !this.type) {
          return
        }
        const params = {
          param: this.param,
          type: this.type,
          time: (Date.parse(new Date())) / 1000,
          content: 'ShuaiBo2017',
        };
        const str = formatParams(params);
        const sign = md5(str);
        params['sign'] = sign;

        this.$post(url.sendCode, params)
          .then(res => {
            if (res.errcode == 0) {
              this.hasSent = true;
              this.countdown = 60;
            }
          });
      },
    },
    components: {}
  }
</script>
