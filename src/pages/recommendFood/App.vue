<style type="text/less" lang="less">
  @import '../../common';
  .textarea{
    margin-top:.2rem;
    background-color:#fff;
    height:2.6rem;
    .border-bottom-1px;
    >textarea{
      width:100%;
      height:100%;
      box-sizing: border-box;
      padding:.3rem;
      font-size:.28rem;
      resize:none;
      outline:none;
      &::placeholder{
        color:@light;
      }
    }
  }

  .the-row{
    height:1rem;
    line-height:1rem;
    padding-left:.3rem;
    font-size:.28rem;
    background-color:#fff;
    >input{
      margin-left:.5rem;
      font-size:.28rem;
      &::placeholder{
        color:@light;
      }
    }
  }
</style>
<template>
  <div>
    <div class="textarea">
      <textarea v-model="params.contents" placeholder="请输入您想推荐的内容"></textarea>
    </div>
    <div class="the-row">上传图片</div>
    <app-upload-img :images="params.images"></app-upload-img>
    <div class="the-row" v-model="params.name" style="margin-top:.2rem;">您的姓名
      <input placeholder="请输入您的姓名">
    </div>
    <div class="the-row" v-model="params.phone">联系电话
      <input placeholder="请输入您的电话">
    </div>
    <div class="btn-big" style="margin-top:.6rem;" @click="submit">提交</div>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import AppUploadImg from '@c/AppUploadImg.vue'
  export default {
    data () {
      return {
        params:{
          contents:'',
          images:[],
          name:'',
          phone:'',
        }
      }
    },
    methods: {
      submit(){

      }
    },
    created(){
      document.title = '推荐美食';
    },
    components: {
      AppPermanent,
      AppUploadImg,
    }
  }
</script>
