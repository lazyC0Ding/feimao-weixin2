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
</style>
<template>
  <div>
    <template v-if="step == 1">
      <ul class="login-ul">
        <li>
          <img style="width:.36rem;height:.42rem;" src="../../assets/img/Login_phone.png">
          <input v-model="params.phone" placeholder="请输入当前手机号">
        </li>
        <li>
          <img style="width:.4rem;height:.46rem;" src="../../assets/img/Login_code.png">
          <input v-model="params.code" placeholder="请输入验证码">
          <send-code :phone="params.phone" type="2"></send-code>
        </li>
      </ul>
      <div class="btn-big" style="margin-top:.8rem;" @click="nextStep">下一步</div>
    </template>
    <template v-else>
      <ul class="login-ul">
        <li>
          <img style="width:.36rem;height:.42rem;" src="../../assets/img/Login_phone.png">
          <input v-model="params.newphone" placeholder="请输入新手机号">
        </li>
        <li>
          <img style="width:.4rem;height:.46rem;" src="../../assets/img/Login_code.png">
          <input v-model="params.newcode" placeholder="请输入验证码">
          <send-code :phone="params.newphone" type="2"></send-code>
        </li>
      </ul>
      <div class="btn-big" style="margin-top:.8rem;" @click="finish">确认更改</div>
    </template>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import SendCode from '@c/SendCode.vue'
  export default {
    data () {
      return {
        step:1,
        params:{
          phone:'',
          code:'',
          newphone:'',
          newcode:'',
        }
      }
    },
    methods: {
      nextStep(){
        if(!this.params.phone.trim()){
          toast('请输入当前手机号');
          return;
        }
        if(!this.params.code.trim()){
          toast('请输入验证码');
          return;
        }
        this.step = 2;
      },
      finish(){
        if(!this.params.phone.trim()){
          toast('请输入新手机号');
          return;
        }
        if(!this.params.code.trim()){
          toast('请输入验证码');
          return;
        }
        this.$post(URL.changePhone, this.params)
          .then (res => {
            console.log(res)
            if(res.errcode == 0) {
              toast('手机号修改成功');
              setTimeout(function () {
                history.go(-1);
              }, 1000);
            }else{
              errback(res);
            }
          })
      }
    },
    created(){
      document.title = '修改手机号';
    },
    components: {
      AppPermanent,
      SendCode,
    }
  }
</script>
