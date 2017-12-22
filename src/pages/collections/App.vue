<style type="text/less" lang="less">
  @import '../../common';

  .tip-nothing {
    text-align: center;
    > img {
      width: 3rem;
      height: 3rem;
    }
    > div {
      font-size: .28rem;
      color: @light;
    }
  }
</style>
<template>
  <div style="padding-top:.9rem;" v-if="content">
    <template v-if="content.length">
      <search-input v-model="key" placeholder="请输入要搜索的内容">
        <a @click="isEdit=!isEdit">{{isEdit ? '取消' : '编辑'}}</a>
      </search-input>
      <app-articles
        v-if="type==1"
        :parentData="_data"
        :articles="display"
        :if-show-close="isEdit"
      ></app-articles>
      <goods-container
        :if-show-close="isEdit"
        v-if="type==2"
        :parentData="_data"
        :goods="display"
        type="3"
      ></goods-container>
    </template>
    <div v-if="!content.length" class="tip-nothing" style="margin-top:2rem;">
      <img src="../../assets/img/Tip_nothing.png">
      <div>暂无收藏内容</div>
    </div>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import AppArticles from '@c/AppArticles.vue'
  import GoodsContainer from '@c/GoodsContainer.vue'
  import SearchInput from '@c/SearchInput.vue'

  export default {
    data () {
      return {
        type: 0, //1.文章 2.商品
        content: null,
        cantFind: false,
        key: '',
        showSearch: null,
        isEdit: false,
      }
    },
    computed: {
      display(){
        return this.key.trim() ? this.showSearch : this.content;
      }
    },
    watch: {
      type(n){
        switch (n) {
          case 1:
            document.title = '文章收藏';
            break;
          case 2:
            document.title = '商品收藏';
            break;
        }
      },
      key(n){
        if (!(n.trim())) {
          this.showSearch = null;
          return;
        }
        this.showSearch = [];
        const attr = this.type === 1 ? 'title' : 'name';
        for (let i of this.content) {
          if (i[attr].includes(n)) {
            this.showSearch.push(i);
          }
        }
      }
    },
    methods: {
      cancel(){
        this.key = '';
        this.isEdit = false;
      },
      fetch(){
        this.$post(URL.getCollections, {type: this.type})
          .then(res => {
            console.log(res);
            if (res.errcode == 0) {
              this.content = res.content;
//              this.$setPage();
            } else {
              errback(res);
            }
          })
      },
      keepAlive(){
        const data = getSession(getPageName());
        for (let i in data) {
          this[i] = data[i];
        }
      }
    },
    created(){
      const search = getSearchParams(location.search);
      this.type = search.type;
      this.fetch();
    },
    components: {
      AppPermanent,
      AppArticles,
      GoodsContainer,
      SearchInput,
    }
  }
</script>
