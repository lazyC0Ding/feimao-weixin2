<style type="text/less" lang="less">
  @import '../../common';

  .user_info-ul {
    margin-top: .2rem;
    .row-container(1rem, .28rem);
    .title {
      color: @light;
    }
    .right {
      .span-bg-icon(.28rem, right);
      background-image: url(../../assets/img/direction_right_black.png);
      &.light {
        color: @light;
      }
    }
    > .row-avatar {
      padding: 0 .32rem;
      height: 2rem;
      line-height: 2rem;
      overflow: hidden;
      background-color: #fff;
      .border-bottom-1px;
      > img.row-avatar-arrow {
        float: right;
        width: .28rem;
        height: .28rem;
        margin-top: .86rem;
        margin-left: .14rem;
      }
      > img.avatar {
        float: right;
        margin-top: .4rem;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
      }
    }
  }

  .nickname {
    margin-top:.2rem;
    > div {
      &:nth-child(1) {
        position:relative;
        padding-left:.4rem;
        height: 1rem;
        background-color: #fff;
        >input{
          height:100%;
          line-height:1rem;
          font-size:.28rem;
        }
      }
      &:nth-child(2) {
        margin-top:.8rem;
      }
    }
  }

  .qrcode{
    background-color:#fff;
    text-align: center;
    overflow:hidden;
    >.img{
      font-size:0;
      margin-top:1.06rem;
      >img{
        width:5.4rem;
        height:5.4rem;
      }
    }
    >.text{
      margin-top:.46rem;
      color:@light;
    }
    >.btn-big{
      margin-top:1.06rem;
      >span {
        .span-bg-icon(.34rem, left);
        background-image: url(../../assets/img/qrcode_turn.png);
      }
    }
  }
</style>
<template>
  <div>
    <ul class="user_info-ul" v-show="!ifShowOthers">
      <li class="row-avatar">
        <span class="title">头像</span>
        <img class="row-avatar-arrow" src="../../assets/img/direction_right_gray.png">
        <img class="avatar" :src="content.avater | avatar">
      </li>
      <li class="row" @click="showNickname">
        <span class="title">昵称</span>
        <span class="right">{{content.nickname}}</span>
      </li>
      <li class="row">
        <span class="title">用户ID</span>
        <span class="right" style="background:none;padding:0;">{{content.uuid}}</span>
      </li>
      <li class="row">
        <span class="title">个人简介</span>
        <span class="right" :class="{light:!content.introduction}">{{content.introduction || '介绍下自己'}}</span>
      </li>
      <li class="row">
        <span class="title">性别</span>
        <span class="right" :class="{light:!content.sex}">{{content.sex || '请选择'}}</span>
      </li>
      <li class="row" @click="showQrcode">
        <span class="title">二维码</span>
        <span class="right" style="font-size:0;"><img src="../../assets/img/qrcode_black.png"
                                                      style="width:.4rem;height:.4rem;vertical-align: middle;"></span>
      </li>
      <li class="row">
        <span class="title">微信号</span>
        <span class="right" :class="{light:!content.weixin}">{{content.weixin || '未绑定'}}</span>
      </li>
      <li class="row">
        <span class="title">手机号绑定</span>
        <span class="right" :class="{light:!content.phone}">{{content.phone || '未绑定'}}</span>
      </li>
      <li class="row" v-href="'address_edit'">
        <span class="title">收货地址管理</span>
        <img class="row-arrow" style="width:.28rem;height:.28rem;" src="../../assets/img/direction_right_black.png">
      </li>
    </ul>
    <div class="nickname" v-show="show.nickname">
      <div>
        <input v-model="update.nickname" ref="inputNickname">
        <span class="cancel" v-show="update.nickname" @click="cancelNickname"></span>
      </div>
      <div class="btn-big" @click="updateNickname">保存</div>
    </div>
    <div class="qrcode" v-if="qrcode" v-show="show.qrcode" :style="{height:clientHeight+'px'}">
      <div class="img">
        <img :src="qrcode.qrcode" v-show="qrcode.showQrcode">
        <img :src="qrcode.receipt_qrcode" v-show="!qrcode.showQrcode">
      </div>
      <div class="text">扫描二维码{{qrcode.showQrcode ? '成为我的粉丝' : '付款给我'}}</div>
      <div class="btn-big" @click="qrcode.showQrcode = !qrcode.showQrcode"><span>切换为{{qrcode.showQrcode ? '收货' : '个人'}}码</span></div>
    </div>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  export default {
    data () {
      return {
        content: {},
        show:{
          nickname:false,
          qrcode:false,
        },
        update:{
          nickname:'',
        },
        title:'',
        qrcode:null,
        clientHeight:null,
      }
    },
    computed:{
      ifShowOthers(){
        for (let i in this.show) {
          if(this.show[i]) {
            return true;
          }
        }
        return false;
      }
    },
    watch:{
      ifShowOthers(n){
        if(n) {
          history.pushState(null, '', '#');
          window.addEventListener('popstate', this.backFn);
        }else{
          window.removeEventListener('popstate', this.backFn);
        }
      },
      title(n){
        document.title = n;
      },
    },
    methods: {
      showNickname(){
        this.title = '修改昵称';
        this.show.nickname = true;
      },
      updateNickname(){
        this.$post(URL.changeNickname, {nickname:this.update.nickname})
          .then( res => {
            if (res.errcode == 0) {
              this.content.nickname = res.content;
              history.go(-1);
            }else{
              errback(res);
            }
          })
      },
      cancelNickname(){
        this.update.nickname = '';
        this.$refs.inputNickname.focus();
      },
      showQrcode(){
        this.title = '我的二维码';
        this.show.qrcode = true;
        if(!this.qrcode) {
          this.$post(URL.getQrcode)
            .then ( res => {
              if(res.errcode == 0) {
                console.log(res.content);
                res.content.showQrcode = true;
                this.qrcode = res.content;
              }else{
                errback(res);
              }
            })
        }
      },
      showMain(){
        for (let i in this.show) {
          this.show[i] = false;
        }
      },
      backFn(){
        this.showMain();
        this.title = '个人信息';
      }
    },
    created(){
      this.clientHeight = document.documentElement.clientHeight;
      this.title = '个人信息';
      this.content = getSearchParams(location.search);
      const { nickname } = this.content;
      this.update.nickname = nickname;
      console.log(this.content);
    },
    components: {
      AppPermanent
    }
  }
</script>
