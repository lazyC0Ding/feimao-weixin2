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
      <a @click="search">搜索</a>
    </search-input>
    <div class="keys-container" v-if="hisKeys.length">
      <div class="title">
        <span>历史搜索</span>
        <span @click="removeHisKeys">清空</span>
      </div>
      <div class="keys">
        <span @click="search(item)" v-for="item in hisKeys">{{item}}</span>
      </div>
    </div>
    <div class="keys-container">
      <div class="title">
        <span>热门搜索</span>
      </div>
      <div class="keys">
        <span @click="search(item.keyword)" v-for="item in content" :key="item.id">{{item.keyword}}</span>
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
        hisKeys:[],
      }
    },
    methods: {
      search(key){
        if(key instanceof Event) key = this.key;
        if(!key) return;
        let hasKey = false;
        for (let i of this.hisKeys) {
          if(i === key) {
            hasKey = true;
            break;
          }
        }
        if(!hasKey) {
          this.hisKeys.push(key);
          setStorage('hisKeys', this.hisKeys);
        }
        openPage('search_result', {key})
      },
      removeHisKeys(){
        myConfirm('确定清空历史搜索？', () => {
          removeStorage('hisKeys');
          this.hisKeys = [];
        });
      },
      fetch(){
        this.$post(URL.hotSearch)
          .then( res => {
            console.log(res);
            this.content = res.content;
          })
      },
    },
    created(){
      if(getStorage('hisKeys')) {
        this.hisKeys = getStorage('hisKeys');
      }
      this.fetch();
    },
    components: {
      SearchInput,
    }
  }
</script>
