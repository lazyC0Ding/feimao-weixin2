<style type="text/less" lang="less">
  @import '../../common';

  html,body{
    height:100%;
    background-color:#fff;
    overflow:hidden;
  }

  .tip{
    margin-top:.68rem;
    font-size:.28rem;
    text-align:center;
  }

  .login-ul{
    margin-top:.72rem;
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
        vertical-align: middle;
        font-size:.3rem;
        &::placeholder{
          color:@light;
        }
      }
    }
  }

  .text{
    margin-top:1.12rem;
    font-size:.2rem;
    color:@light;
    text-align:center;
    em{
      color:#478db7;
    }
  }
</style>
<template>
  <div>
    <div class="tip">为了体验肥猫完整服务请绑定您的手机号码</div>
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
    <div class="text">点击完成绑定按钮代表您已同意<em>《肥猫用户协议》</em></div>
    <div class="btn-big" style="margin-top:.6rem;">完成绑定</div>
  </div>
</template>
<script>
  import SendCode from '@c/SendCode.vue'
  export default {
    data () {
      return {
        phone:'',
        code:'',
      }
    },
    methods: {

    },
    created(){
      document.title = '完善信息';
    },
    components: {
      SendCode,
    }
  }
</script>
