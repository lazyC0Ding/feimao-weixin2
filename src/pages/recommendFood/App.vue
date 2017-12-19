<style type="text/less" lang="less">
  @import '../../common';

  .textarea {
    margin-top: .2rem;
    background-color: #fff;
    height: 2.6rem;
    .border-bottom-1px;
    > textarea {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: .3rem;
      font-size: .28rem;
      resize: none;
      outline: none;
      &::placeholder {
        color: @light;
      }
    }
  }

  .the-row {
    height: 1rem;
    line-height: 1rem;
    padding-left: .3rem;
    font-size: .28rem;
    background-color: #fff;
    > input {
      margin-left: .5rem;
      font-size: .28rem;
      &::placeholder {
        color: @light;
      }
    }
  }
</style>
<template>
  <div>
    <div class="textarea">
      <textarea v-model="contents" placeholder="请输入您想推荐的内容"></textarea>
    </div>
    <div class="the-row">上传图片</div>
    <app-upload-img :images="images"></app-upload-img>
    <div class="the-row" v-model="name" style="margin-top:.2rem;border-bottom: 1px solid #e4e4e4;">您的姓名
      <input placeholder="请输入您的姓名">
    </div>
    <div class="the-row" v-model="phone">联系电话
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
        contents: '',
        images: [],
        name: '',
        phone: '',
      }
    },
    computed:{
      params(){
        const params = {
          contents:this.contents,
          name:this.name,
          phone:this.phone,
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
      submit(){
        if(!this.name.trim()) {
          alert('请输入您的姓名');
          return;
        }
        if(!this.phone.trim()) {
          alert('请输入您的电话');
          return;
        }
        if(!this.contents.trim()) {
          alert('请输入推荐内容');
          return;
        }
        this.$post(URL.recommendFood, this.params)
          .then (res => {
            if(res.errcode == 0) {
              alert('感谢您的推荐!');
              history.go(-1)
            }else{
              errback(res);
            }
          })
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
