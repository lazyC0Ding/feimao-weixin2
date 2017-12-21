<style type="text/less" lang="less">
  @import '../../common';

  .search_result-tags {
    .tags(2);
  }
</style>
<template>
  <div v-if="goods && articles" class="bottom-container" style="padding-top:.9rem;">
    <search-input v-model="keyword" :callback="search">
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
    <load-more
      :url="getMoreArticle.url"
      :page="getMoreArticle.page"
      :params="{keyword:keyword}"
      :callback="loadMoreArticle"
      :no-listen="activeTag!= 0 || !getMoreArticle.hasMore"
    ></load-more>
    <load-more
      :url="getMoreGoods.url"
      :page="getMoreGoods.page"
      :params="{keyword:keyword}"
      :callback="loadMoreGoods"
      :no-listen="activeTag!= 1 || !getMoreGoods.hasMore"
    ></load-more>
  </div>
</template>
<script>
  import SearchInput from '@c/SearchInput.vue'
  import GoodsContainer from '@c/GoodsContainer.vue'
  import AppArticles from '@c/AppArticles.vue'
  import LoadMore from '@c/LoadMore.vue'

  export default {
    data () {
      return {
        keyword:'',
        activeTag: 0,
        goods: null,
        articles: null,
        getMoreArticle:{
          url:URL.searchArticle,
          page:1,
          hasMore:true,
        },
        getMoreGoods:{
          url:URL.searchGoods,
          page:1,
          hasMore:true,
        },
      }
    },
    methods: {
      loadMoreArticle(content){
        if(content.length) {
          this.articles.push(...content);
          this.getMoreArticle.page++;
        }else{
          this.getMoreArticle.hasMore = false;
        }
      },
      loadMoreGoods(content){
        if(content.length) {
          this.goods.push(...content);
          this.getMoreGoods.page++;
        }else{
          this.getMoreGoods.hasMore = false;
        }
      },
      fetch(){
        this.$post(URL.searchGoods, {keyword:this.keyword, page:1})
          .then(res => {
            console.log(res);
            if (res.errcode == 0) {
              this.goods = res.content;
            }else{
              errback(res);
            }
          });
        this.$post(URL.searchArticle, {keyword:this.keyword, page:1})
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
        if(!this.keyword) return;
        const arr = getStorage('hisKeys') || [];
        let hasKey = false;
        for (let i of arr) {
          if(i === this.keyword) {
            hasKey = true;
            break;
          }
        }
        if(!hasKey) {
          arr.push(this.keyword);
          setStorage('hisKeys', arr);
        }
        this.getMoreArticle.page = 1;
        this.getMoreGoods.page = 1;
        return this.fetch();
      }
    },
    created(){
      this.keyword = getSearchParams(location.search).key;
      this.fetch();
    },
    components: {
      SearchInput,
      GoodsContainer,
      AppArticles,
      LoadMore,
    }
  }
</script>
