<style type="text/less" lang="less">
  @import '../../common';

  .textarea {
    margin-top: .2rem;
    height: 3.6rem;
    background-color: #fff;
    > textarea {
      width: 100%;
      height: 100%;
      padding: .3rem;
      resize: none;
      outline: none;
      box-sizing: border-box;
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
      <textarea v-model="contents" placeholder="请输入您对我们的意见或建议"></textarea>
    </div>
    <div class="btn-big" style="margin-top:.6rem;" @click="submit">提交</div>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  export default {
    data () {
      return {
        contents: '',
      }
    },
    methods: {
      submit(){
        this.$post(URL.feedback, {contents: this.contents})
          .then(res => {
            console.log(res)
            if (res.errcode == 0) {
              myAlert('提交成功！感谢您的宝贵意见', () => {
                history.go(-1);
              });
            } else {
              errback(res);
            }
          })
      }
    },
    created(){
      document.title = '意见反馈';
    },
    components: {
      AppPermanent
    }
  }
</script>
