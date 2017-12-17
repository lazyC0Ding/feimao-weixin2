<style type="text/less" lang="less">
  @import '../../common';

  .settings-ul {
    margin-top: .2rem;
    .row-container(1rem, .28rem);
  }
</style>
<template>
  <div>
    <ul class="settings-ul">
      <li class="row" @click="aboutUs">
        <span class="title">关于我们</span>
        <img class="row-arrow" src="../../assets/img/direction_right_black.png">
      </li>
      <li class="row" @click="agreement">
        <span class="title">用户协议</span>
        <img class="row-arrow" src="../../assets/img/direction_right_black.png">
      </li>
      <li class="row" v-href="'recommendFood'">
        <span class="title">给我们推荐美食</span>
        <img class="row-arrow" src="../../assets/img/direction_right_black.png">
      </li>
    </ul>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  export default {
    data () {
      return {}
    },
    methods: {
      aboutUs(){
        this.$post(URL.aboutUs)
          .then(res => {
            if (res.errcode == 0) {
              location.href = res.content;
            } else {
              errback(res);
            }
          })
      },
      agreement(){
        this.$post(URL.agreement)
          .then(res => {
            if (res.errcode == 0) {
              location.href = res.content;
            } else {
              errback(res);
            }
          })
      }
    },
    created(){
      document.title = '设置';
    },
    components: {
      AppPermanent
    }
  }
</script>
