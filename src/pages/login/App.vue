<style type="text/less" lang="less">
  @import '../../common';
  html,body{
    height:100%;
    background-color:#fff;
    overflow:hidden;
  }
  .login-ul{
    margin-top:.6rem;
    >li{
      margin:0 .45rem;
      padding-left:.24rem;
      height:1rem;
      line-height:1rem;
      font-size:0;
      .border-bottom-1px;
      >img{
        margin-right:.32rem;
        vertical-align: middle;
      }
      >input{
        width:3.5rem;
        vertical-align: middle;
        font-size:.3rem;
        &::placeholder{
          color:@light;
        }
      }
    }
  }
  .text{
    margin-top:.8rem;
    font-size:.2rem;
    color:@light;
    text-align:center;
    a{
      color:#478db7;
    }
  }
</style>
<template>
  <div>
    <ul class="login-ul">
      <li>
        <img style="width:.36rem;height:.42rem;" src="../../assets/img/Login_phone.png">
        <input v-model="phone" placeholder="请输入您的手机号">
      </li>
      <li>
        <img style="width:.4rem;height:.46rem;" src="../../assets/img/Login_code.png">
        <input v-model="code" placeholder="请输入验证码">
        <send-code :phone="phone" type="0"></send-code>
      </li>
    </ul>
    <div class="text">
      <span>点击登录按钮代表您已同意<a href="http://app.feelmao.com/wap/home/agreement_view">《肥猫用户协议》</a></span><br>
      <span>未注册的用户将直接注册并登录</span>
    </div>
    <div class="btn-big" style="margin-top:.6rem;" @click="login">登录</div>
  </div>
</template>
<script>
  import SendCode from '@c/SendCode.vue'
  export default {
    data () {
      return {
        phone:'',
        code:'',
        from:'',
      }
    },
    methods: {
      login(){
        if(!this.phone.trim()){
          toast('请输入手机号');
          return;
        }
        if(!this.code.trim()){
          toast('请输入验证码');
          return;
        }
        const params = {
          phone:this.phone,
          code:this.code
        };
        const pid = getSession('customer_id');
        if(pid) params.pid = pid;

        this.$post(URL.login, params)
          .then ( res => {
            console.log(res);
            if(res.errcode == 0) {
              setSession('hasLogin', true);
              setUser(res.content);
              setToken(res.content.access_token);
              replacePage(this.from || 'index');
            }else{
              errback(res);
            }
          })
      },
    },
    created(){
      const search = getSearchParams(location.search);
      if(search && search.from) {
        this.from = decodeURIComponent(search.from);
      }
      document.title = '登录';
    },
    components: {
      SendCode,
    }
  }
</script>
