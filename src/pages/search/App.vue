<style type="text/less" lang="less">
  @import '../../common';
  .keys-container{
    >div.title{
      height:.6rem;
      line-height:.6rem;
      background-color:#eee;
      color:#9da5a8;
      font-size:.26rem;
      padding:0 .36rem;
      >span:nth-child(2){
        .span-bg-icon(.26rem, left);
        background-image:url(../../assets/img/search_del.png);
        float:right;
      }
    }
    >div.keys{
      background-color:#fff;
      font-size:.28rem;
      padding:.3rem .3rem .1rem 0;
      >span{
        padding:.1rem .2rem;
        background-color:#eee;
        margin-left:.3rem;
        margin-bottom:.2rem;
      }
    }
  }
</style>
<template>
  <div style="padding-top:.9rem;">
    <search-input v-model="key" placeholder="输入热门文章商品" auto :callback="search">
      <a v-back>取消</a>
    </search-input>
    <div class="keys-container">
      <div class="title">
        <span>历史搜索</span>
        <span>清空</span>
      </div>
      <div class="keys">

      </div>
    </div>
    <div class="keys-container">
      <div class="title">
        <span>热门搜索</span>
      </div>
      <div class="keys">
        <span @click="hotSearch(key.keyword)" v-for="key in content" :key="key.id">{{key.keyword}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import SearchInput from '@c/SearchInput.vue'
  export default {
    data () {
      return {
        content:[],
        key:'',
      }
    },
    methods: {
      search(){
        openPage('search_result', {key:this.key})
      },
      hotSearch(key){
        openPage('search_result', {key})
      }
    },
    created(){
      this.$post(URL.hotSearch)
        .then( res => {
          console.log(res)
          this.content = res.content;
        })
    },
    components: {
      SearchInput,
    }
  }
</script>
