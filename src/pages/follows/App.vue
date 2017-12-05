<style type="text/less" lang="less">

</style>
<template>
  <div>
    <app-articles :parentData="_data" :articles="content" hasAuthorInfo></app-articles>
    <app-permanent type="1"></app-permanent>
  </div>
</template>
<script>
  import AppArticles from '@c/AppArticles.vue'
  import AppPermanent from '@c/AppPermanent.vue'
  export default {
    data () {
      return {
        page: 1,
        content: [],
        $_follow: false
      }
    },
    methods: {
      fetch(){
        this.$post(URL.getAllRecoAtte, {page: this.page})
          .then(res => {
            for (let i of res.content) {
              i['is_attention'] = 0;
            }
            this.content = res.content;
            this.$_follow = false;
          })
      },
      keepAlive(){
        const data = getSession(getPageName());
        if (data) {
          for (let i in data) {
            this[i] = data[i];
          }
          if (!data.$_follow) return;
        }
        return this.fetch();
      },
    },
    created(){
      document.title = '推荐关注';
      return this.keepAlive();
    },
    components: {
      AppArticles,
      AppPermanent,
    }
  }
</script>
