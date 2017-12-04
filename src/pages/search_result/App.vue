<style type="text/less" lang="less">
  @import '../../common';
</style>
<template>
  <div class="bottom-container" style="padding-top:.9rem;">
    <search-input v-model="params.keyword" :callback="search">
      <a v-back>取消</a>
    </search-input>
    <ul class="tags-2">
      <li :class="{active:activeTag === 0}" @click="activeTag=0">商品结果</li>
      <li :class="{active:activeTag === 1}" @click="activeTag=1">文章结果</li>
    </ul>
    <goods-container v-show="activeTag === 0" :goods="goods"></goods-container>
    <app-articles v-show="activeTag === 1" :articles="articles"></app-articles>
  </div>
</template>
<script>
  import SearchInput from '@c/SearchInput.vue'
  import GoodsContainer from '@c/GoodsContainer.vue'
  import AppArticles from '@c/AppArticles.vue'
  export default {
    data () {
      return {
        params:{
          keyword:'',
          page:1,
        },
        activeTag:0,
        goods:[],
        articles:[],
      }
    },
    methods: {
      fetch(){
        this.$post(URL.searchGoods, this.params)
          .then( res => {
            this.goods = res.content;
          });
        this.$post(URL.searchArticle, this.params)
          .then( res => {
            this.articles = res.content;
          })
      },
      search(){
        this.params.page = 1;
        return this.fetch();
      }
    },
    created(){
      this.params.keyword = getParams(location.search).key;
      this.fetch();
    },
    components: {
      SearchInput,
      GoodsContainer,
      AppArticles,
    }
  }
</script>
