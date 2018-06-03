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
        width:3.5rem;
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
    a {
      color: #478db7;
    }
  }
  .error{
    text-align:center;
    img{
      margin-top: 2rem;
      width:1.8rem;
    }
    .text{
      color: @light;
      margin-top: 0.6rem;
    }

  }
</style>
<template>
  <div>
    <template v-if="needBind && !showError">
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
      <div class="text">点击完成绑定按钮代表您已同意<a href="https://app.feelmao.com/wap/home/agreement_view">《肥猫用户协议》</a></div>
      <div class="btn-big" style="margin-top:.6rem;" @click="bind">完成绑定</div>
    </template>
    <div class="tip" v-if="!needBind && !showError" >正在跳转中...</div>
    <div class="error" v-if="!needBind && showError">
          <img src="../../assets/img/tip_lost.png" />
          <div class="text">页面走丢了</div>

          <div style="margin: 0.8rem auto;"  @click="refresh()" class="btn-middle">点击刷新</div>

    </div>
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
        needBind:false,
        showError : false,
        params: {
          oauth: 'weixin',
          type: 5,
        },
        wxData: null,
      }
    },
    methods: {
      refresh (){
        location.reload();
      },
      getOauthInfo(){
        this.$post(URL.getOauthInfo, Object.assign({code: this.wxCode}, this.params))
          .then(res => {
			if(res.errcode == 0) {
				this.wxData = res.content;
				this.oauthLogin();
			}else{
              login(encodeURIComponent(this.from));
            }
          })
      },
      oauthLogin(){
        const params = {
          oauth:this.params.oauth,
          type:this.params.type,
          openid:this.wxData.openid,
          unionid:this.wxData.unionid,
          nickname:this.wxData.nickname.replace(/(^\s*)|(\s*$)/g, ""),
          headimgurl:this.wxData.headimgurl,
        };
        this.$post(URL.oauthLogin, params)
          .then(res => {
            if(res.errcode == 0) {
              if(res.content.is_bind){
                setSession('hasLogin', 1);
                setUser(res.content.customer);
                setToken(res.content.customer.access_token);
                replacePage(this.from || 'index');
              }else {
                document.title = '完善信息';
                this.needBind = true;
              }
            }else{
              errback(res);
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
        const params = {
          oauth:this.params.oauth,
          type:this.params.type,
          phone: this.phone,
          verify_code: this.code,
          openid:this.wxData.openid,
          unionid:this.wxData.unionid,
          nickname:this.wxData.nickname,
          headimgurl:this.wxData.headimgurl,
        };

        const pid = getSession('customer_id');
        if (pid) {
          params.pid = pid;
        }
        // alert(params.pid);
        this.$post(URL.oauthRegister, params)
          .then(res => {
            console.log(res);
            if (res.errcode == 0) {
              setUser(res.content);
              setToken(res.content.access_token);
              replacePage(this.from || 'index');
            } else {
              errback(res);
            }
          })
      }
    },
    created(){
      var _this = this;
      setTimeout(function(){
          if(!_this.needBind){
            _this.showError = true;
          }
      }, 5000);
      document.title = '肥猫';
      const search = getSearchParams(location.search);
      if (search) {
        const {code, state, from} = search;

        this.wxCode = code;
        let _from = from ? decodeURIComponent(from) : decodeURIComponent(state);
		if(_from){
			this.from = _from + (_from.indexOf('?') >= 0 ? '&hasLogin=1' : '?hasLogin=1');
		}else{
			this.from = '/index.html?hasLogin=1';
		}
        
        // let from = decodeURIComponent(state);
        // if(from){
        //   this.from = from + (from.includes('?') ? '&hasLogin=1' : '?hasLogin=1');
        // }else{
        //   this.from = "/index.html?hasLogin=1";
        // }
      }
      this.getOauthInfo();
    },
    components: {
      SendCode,
    }
  }
</script>
