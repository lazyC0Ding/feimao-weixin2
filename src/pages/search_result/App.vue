<style type="text/less" lang="less">
  @import '../../common';

  .search_result-tags {
    .tags(2);
  }
</style>
<template>
  <div v-if="goods && articles" class="bottom-container" style="padding-top:.9rem;">
    <search-input v-model="params.keyword" :callback="search">
      <a @click="search">搜索</a>
    </search-input>
    <ul class="search_result-tags">
      <li :class="{active:activeTag === 0}" @click="activeTag=0">商品结果</li>
      <li :class="{active:activeTag === 1}" @click="activeTag=1">文章结果</li>
    </ul>
    <goods-container v-if="goods.length" v-show="activeTag === 0" :goods="goods"></goods-container>
    <app-articles v-if="articles.length" v-show="activeTag === 1" :articles="articles"></app-articles>
    <div v-show="activeTag===0 ? !goods.length : !articles.length" class="tip-nothing" style="margin-top:2rem;">
      <img src="../../assets/img/Tip_nothing.png">
      <div>暂无{{ activeTag===0 ? '商品' : '文章'}}搜索结果</div>
    </div>
  </div>
</template>
<script>
  import SearchInput from '@c/SearchInput.vue'
  import GoodsContainer from '@c/GoodsContainer.vue'
  import AppArticles from '@c/AppArticles.vue'
  export default {
    data () {
      return {
        params: {
          keyword: '',
          page: 1,
        },
        activeTag: 0,
        goods: null,
        articles: null,
      }
    },
    methods: {
      fetch(){
        this.$post(URL.searchGoods, this.params)
          .then(res => {
            console.log(res);
            if (res.errcode == 0) {
              this.goods = res.content;
            }else{
              errback(res);
            }
          });
        this.$post(URL.searchArticle, this.params)
          .then(res => {
            console.log(res);
            if(res.errcode == 0) {
              this.articles = res.content;
            }else{
              errback(res);
            }
          })
      },
      search(){
        const arr = getStorage('hisKeys') || [];
        let hasKey = false;
        for (let i of arr) {
          if(i === this.params.keyword) {
            hasKey = true;
            break;
          }
        }
        if(!hasKey) {
          arr.push(this.params.keyword);
          setStorage('hisKeys', arr);
        }
        this.params.page = 1;
        return this.fetch();
      }
    },
    created(){
      this.params.keyword = getSearchParams(location.search).key;
      this.fetch();
    },
    components: {
      SearchInput,
      GoodsContainer,
      AppArticles,
    }
  }
</script>
