<style type="text/less" lang="less">
  @import '../../common';

  .refund_express-top {
    min-height: 4.4rem;
    background-color: #fff;
    text-align: center;
    overflow: hidden;
    > .img {
      > img {
        margin-top: .68rem;
        width: 4.3rem;
        height: 1.7rem;
      }
    }
    > .name {
      margin-top: .4rem;
      font-weight: 500;
    }
    > .address {
      margin-top: .2rem;
      font-size: .28rem;
    }
  }

  .refund_express-ul {
    margin-top: .2rem;
    .row-container(1rem, .28rem);
    .with-input {
      > .title {
        width: 1.4rem;
      }
      >input{
        font-size:.28rem;
        &::placeholder{
          color:@light;
        }
      }
    }
    >li.no-border-bottom{
      &:after{
        width:0;
        height:0;
      }
    }
    > li.images {
      background-color: #fff;
      padding-bottom: .3rem;
      > span {
        margin-bottom: .2rem;
        margin-left: .38rem;
        width: 1.4rem;
        height: 1.4rem;
        line-height: 2rem;
        text-align: center;
        font-size: .2rem;
        color: @light;
        background: url(../../assets/img/upload_pic.png) no-repeat center .4rem;
        background-size: .44rem .36rem;
        border: .5px solid #979797;
        box-sizing: border-box;
      }
    }
  }
</style>
<template>
  <div v-if="content">
    <div class="refund_express-top">
      <div class="img">
        <img src="../../assets/img/tip_tuihuo.png">
      </div>
      <div class="name">快递至{{name}}</div>
      <div class="address">地址：{{address}}</div>
    </div>
    <ul class="refund_express-ul">
      <li class="row with-input" @click="showExpress = true">
        <span class="title">快递公司</span>
        <input v-model="currentExpress[0]" placeholder="请选择" disabled>
        <img class="row-arrow" src="../../assets/img/direction_right_gray.png">
      </li>
      <li class="row with-input">
        <span class="title">快递单号</span>
        <input v-model="express_sn" placeholder="请输入快递单号">
      </li>
      <li class="row no-border-bottom">
        <span class="title">上传图片</span>
      </li>
      <app-upload-img :images="images"></app-upload-img>
    </ul>
    <div class="btn-big" style="margin-top:.8rem;" @click="apply">提交</div>
    <popup v-model="showExpress" style="overflow-y: visible;">
      <div style="height:.8rem;line-height:.8rem;text-align: right;background-color:#fff;">
        <span @click="showExpress = false" style="margin-right:.3rem;">完成</span>
      </div>
      <picker :data='express' v-model='currentExpress' @on-change='changeExpress'></picker>
    </popup>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import {Picker, Popup} from 'vux';
  import AppPermanent from '@c/AppPermanent.vue'
  import AppUploadImg from '@c/AppUploadImg.vue'
  export default {
    data () {
      return {
        content: null,
        refund_sn: null,
        address: null,
        name: null,
        currentExpress: [''],
        showExpress: false,
        express_sn: '',
        images: [],
      }
    },
    computed: {
      express(){
        const express = [];
        for (let i of this.content) {
          express.push(i.express_name);
        }
        return [express];
      },
      params(){
        let currentExpress = this.currentExpress[0];
        let express_id;
        for (let i of this.content){
          if(i.express_name === currentExpress) {
            express_id = i.express_id;
            break;
          }
        }
        const params = {
          refund_sn:this.refund_sn,
          express_id,
          express_sn:this.express_sn,
        };

        if(this.images.length) {
          const arr = [];
          for (let i of this.images) {
            arr.push(i.src);
          }
          params.images = arr.join(',');
        }
        return params;
      }
    },
    methods: {
      apply(){
        if(!this.currentExpress[0]){
          toast('请选择快递公司');
          return;
        }

        if(!this.express_sn.trim()) {
          toast('请输入快递单号');
          return;
        }
        this.$post(URL.uploadExpress, this.params)
          .then( res => {
            console.log(res)
            if(res.errcode == 0) {
              alert('提交成功！交由后台审核，三个工作室日内反馈结果');
              history.go(-1);
            }else{
              errback(res);
            }
          })
      },
      getExpress(){
        this.$post(URL.getExpress)
          .then(res => {
            console.log(res)
            if (res.errcode == 0) {
              this.content = res.content;
            } else {
              errback(res);
            }
          })
      }
    },
    created(){
      document.title = '上传快递单号';
//      const {refund_sn, address, name} = getSearchParams(location.search);
      const {refund_sn, address, name} = getSession('refund_express');
      this.refund_sn = refund_sn;
      this.address = address;
      this.name = name;
      this.getExpress();
    },
    components: {
      AppPermanent,
      Picker,
      Popup,
      AppUploadImg,
    }
  }
</script>
