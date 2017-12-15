<style type="text/less" lang="less">
  @import '../../common';

  html, body {
    height: 100%;
    background-color: #fff;
    overflow: hidden;
  }

  .tip {
    margin-top: .68rem;
    font-size: .28rem;
    text-align: center;
  }

  .login-ul {
    margin-top: .72rem;
    > li {
      margin: 0 .45rem;
      padding-left: .24rem;
      height: 1rem;
      line-height: 1rem;
      font-size: 0;
      .border-bottom-1px;
      > img {
        margin-right: .32rem;
        vertical-align: middle;
      }
      > input {
        vertical-align: middle;
        font-size: .3rem;
        &::placeholder {
          color: @light;
        }
      }
    }
  }

  .text {
    margin-top: 1.12rem;
    font-size: .2rem;
    color: @light;
    text-align: center;
    em {
      color: #478db7;
    }
  }
</style>
<template>
  <div>
    <template v-if="is_bind == 0">
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
      <div class="btn-big" style="margin-top:.6rem;" @click="bind">完成绑定</div>
    </template>
    <div class="tip" v-if="!is_bind">正在跳转中...</div>
    <div>{{test}}</div>
  </div>
</template>
<script>
  import SendCode from '@c/SendCode.vue'
  export default {
    data () {
      return {
        phone: '',
        code: '',
        wxCode: '',
        from: '',
        is_bind: '',
        params: {
          oauth: 'weixin',
          type: 5,
        },
        wxData: null,
        test:'',
      }
    },
    methods: {
      getOauthInfo(){
        this.$post(URL.getOauthInfo, Object.assign({code: this.wxCode}, this.params))
          .then(res => {
            this.oauthLogin(res.content);
          })
      },
      oauthLogin(wxData){
        const params = {
          oauth:this.params.oauth,
          type:this.params.type,
          openid:wxData.openid,
          unionid:wxData.unionid,
          nickname:wxData.nickname,
          headimgurl:wxData.headimgurl,
        };
        this.$post(URL.oauthLogin, params)
          .then(res => {
            this.test = JSON.stringify(res);
            const is_bind = res.content.is_bind;
            if(!is_bind || is_bind == '0'){
              this.is_bind = '0';
            }else if(is_bind) {
              replacePage(this.from);
            }
          })
      },
      bind(){
        if (!this.phone.trim()) {
          toast('请输入手机号');
          return;
        }
        if (!this.code.trim()) {
          toast('请输入验证码');
          return;
        }
        let params = {
          oauth: this.params.oauth,
          phone: this.phone,
          verify_code: this.code,
          type: this.params.type
        };
        params = Object.assign(params, this.wxData);
        const pid = getSession('customer_id');
        if (pid) {
          params.pid = pid;
        }
        this.$post(URL.oauthRegister, params)
          .then(res => {
            console.log(res)
            if (res.errcode == 0) {
              setUser(res.content);
              setToken(res.content.access_token);
              replacePage(this.from || 'index');
            } else {

            }
          })
      }
    },
    created(){
      document.title = '肥猫';
      const search = getSearchParams(location.search);
      if (search) {
        const {code, state} = search;
        this.wxCode = code;
        this.from = state;
      }
      this.getOauthInfo();
    },
    components: {
      SendCode,
    }
  }
</script>
