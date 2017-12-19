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
      &.limit{
        text-align:right;
        width:3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
    margin-top: .2rem;
    > div {
      &:nth-child(1) {
        position: relative;
        padding-left: .4rem;
        height: 1rem;
        background-color: #fff;
        > input {
          height: 100%;
          line-height: 1rem;
          font-size: .28rem;
        }
      }
      &:nth-child(2) {
        margin-top: .6rem;
      }
    }
  }

  .introduction{
    margin-top:.2rem;
    overflow:hidden;
    >.textarea{
      position:relative;
      background-color:#fff;
      overflow:hidden;
      >textarea{
        width:100%;
        padding:.28rem 1rem .32rem .4rem;
        font-size:.28rem;
        resize: none;
        outline: none;
        box-sizing: border-box;
        &::placeholder{
          color:@light;
        }
      }
      >.tips{
        position:absolute;
        right:.2rem;
        bottom:0;
        font-size:.24rem;
        color:@light;
      }
    }
  }

  .test{
    font-size:.28rem;
    -webkit-user-select: auto;
  }
</style>
<template>
  <div>
    <ul class="user_info-ul" v-show="!ifShowOthers">
      <li class="row-avatar" @click="updateAvatar">
        <span class="title">头像</span>
        <img class="row-avatar-arrow" src="../../assets/img/direction_right_black.png">
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
      <li class="row" @click="showIntroduction">
        <span class="title">个人简介</span>
        <span class="right limit" :class="{light:!content.introduction}">{{content.introduction || '介绍下自己'}}</span>
      </li>
      <li class="row" @click="showSex = true">
        <span class="title">性别</span>
        <span class="right" :class="{light:!content.sex}">{{content.sex || '请选择'}}</span>
      </li>
      <li class="row" v-href="'qrcode'">
        <span class="title">二维码</span>
        <span class="right" style="font-size:0;"><img src="../../assets/img/qrcode_black.png"
                                                      style="width:.4rem;height:.4rem;vertical-align: middle;"></span>
      </li>
      <!--<li class="row">-->
      <!--<span class="title">微信号</span>-->
      <!--<span class="right" :class="{light:!content.weixin}">{{content.weixin || '未绑定'}}</span>-->
      <!--</li>-->
      <li class="row" v-href="'user_updatePhone'">
        <span class="title">手机号绑定</span>
        <span class="right" :class="{light:!content.phone}">{{content.phone || '未绑定'}}</span>
      </li>
      <li class="row" v-href="'address_edit'">
        <span class="title">收货地址管理</span>
        <img class="row-arrow" style="width:.28rem;height:.28rem;" src="../../assets/img/direction_right_black.png">
      </li>
    </ul>
    <div class="test">{{test}}</div>
    <div class="nickname" v-show="show.nickname">
      <div>
        <input v-model="update.nickname" ref="inputNickname">
        <span class="cancel" v-show="update.nickname" @click="cancelNickname"></span>
      </div>
      <div class="btn-big" @click="updateNickname">保存</div>
    </div>
    <div class="introduction" v-show="show.introduction">
      <div class="textarea">
        <textarea v-model="update.introduction" placeholder="介绍下自己" maxlength="40"></textarea>
        <span class="tips">{{update.introduction.length}}/40</span>
      </div>
      <div class="btn-big" @click="updateIntroduction" style="margin-top:.6rem;">保存</div>
    </div>
    <actionsheet v-model="showSex" :menus="['女','男']" @on-click-menu="updateSex" show-cancel></actionsheet>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import {Actionsheet} from 'vux'
  export default {
    data () {
      return {
        content: {},
        show: {
          nickname: false,
          introduction:false,
        },
        update: {
          nickname: '',
          introduction:'',
        },
        title: '',
        showSex: false,
        test:'',
      }
    },
    computed: {
      ifShowOthers(){
        for (let i in this.show) {
          if (this.show[i]) {
            return true;
          }
        }
        return false;
      }
    },
    watch: {
      ifShowOthers(n){
        if (n) {
          history.pushState(null, '', '#');
          window.addEventListener('popstate', this.backFn);
        } else {
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
        this.update.nickname = this.content.nickname;
        this.show.nickname = true;
      },
      showIntroduction(){
        this.title = '个人简介';
        this.update.introduction = this.content.introduction || '';
        this.show.introduction = true;
      },
      updateAvatar(){
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            this.content.avater = localIds[0];
            wx.uploadImage({
              localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: (res) => {
                var serverId = res.serverId; // 返回图片的服务器端ID
                this.test = serverId;
                //接下来将serverId传给后台
                /*
                *
                *
                */
              }
            });
          }
        });
      },
      updateNickname(){
        if(!this.update.nickname.trim()){
          toast('昵称不得为空');
          return;
        }
        this.$post(URL.changeNickname, {nickname: this.update.nickname})
          .then(res => {
            if (res.errcode == 0) {
              this.content.nickname = res.content;
              history.go(-1);
            } else {
              errback(res);
            }
          })
      },
      updateIntroduction(){
        if(!this.update.nickname.trim()){
          toast('简介不得为空');
          return;
        }
        this.$post(URL.changeIntroduction, {introduction: this.update.introduction})
          .then (res => {
            if(res.errcode == 0) {
              this.content.introduction = res.content;
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
      updateSex(key, item){
        if(!item || item === this.content.sex) return;

        const type = item === '男' ? 1 : 2;

        this.$post(URL.changeSex, {type})
          .then (res => {
            if(res.errcode == 0) {
              toast('修改性别成功');
              this.content.sex = res.content;
            }else{
              errback(res);
            }
          })
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
      this.title = '个人信息';
      this.content = getSearchParams(location.search);
      const {nickname, showQrcode} = this.content;
      this.update.nickname = nickname;
      if (showQrcode) {
        this.show.qrcode = true;
      }
      console.log(this.content);
    },
    components: {
      AppPermanent,
      Actionsheet,
    }
  }
</script>
