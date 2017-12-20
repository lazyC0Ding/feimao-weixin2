<style type="text/less" lang="less">
  @import '../../common';

  .categorys-tags {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    background-color: #000;
    font-size: .26rem;
    margin-bottom: .1rem;
    overflow: hidden;
    height: .8rem;
    line-height: .8rem;
    color: #fff;
    z-index: 10;
    > li {
      float: left;
      height: inherit;
      text-align: center;
      &.active {
        position: relative;
        font-weight: bold;
        color: #FFB305;
        &:after {
          content: " ";
          position: absolute;
          left: 50%;
          bottom: .1rem;
          width: .4rem;
          height: .04rem;
          margin-left: -.2rem;
          background-color: #FFB305;
        }
      }
    }
  }

  img.cover {
    display: block;
    width: 100%;
    height: 4rem;
  }
</style>
<template>
  <div style="padding-top:.8rem;">
    <ul class="categorys-tags">
      <li v-for="item in categorys"
          :class="{active:category_id == item.category_id}"
          :style="{width:100/categorys.length + '%'}"
          @click="change(item.category_id)"
      >
        {{item.name}}
      </li>
    </ul>
    <img class="cover" :src="cover.image">
    <goods-container v-if="goods.length" :parentData="_data" :goods="goods"></goods-container>
    <load-more
      :url="url"
      :page="page"
      :params="{category_id:category_id}"
      :callback="loadMore"
      :no-listen="!hasMore"
    >
    </load-more>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import GoodsContainer from '@c/GoodsContainer.vue'
  import LoadMore from '@c/LoadMore.vue'

  export default {
    data () {
      return {
        categorys: [],
        url: URL.getCategoryGoods,
        page: 1,
        category_id: '',
        cover: {},
        goods: [],
        hasMore:true,
      }
    },
    methods: {
      loadMore(content){
        if (content.goods.length) {
          this.goods.push(...content);
          this.page++;
        }else{
          this.hasMore = false;
        }
      },
      change(category_id){
        this.category_id = category_id;
        this.page = 1;
        this.hasMore=true;
        this.fetch();
      },
      fetch(){
        this.$post(URL.getCategoryGoods, {category_id: this.category_id, page: 1})
          .then(res => {
            if (res.errcode == 0) {
              console.log(res);
              this.cover = res.content.cover[0];
              this.goods = res.content.goods;
            } else {
              errback(res)
            }
          })
      },
      keepAlive(){
        const data = getSession(getPageName());
        if (data) {
          for (let i in data) {
            this[i] = data[i];
          }
        } else {
          this.fetch();
        }
      },
    },
    created(){
      document.title = '分类';
      const {category_id, categorys} = getSearchParams(location.search);

      if (category_id) {
        this.category_id = category_id;
        this.categorys = categorys;
        this.fetch();
      } else {
        this.keepAlive();
      }
    },
    components: {
      AppPermanent,
      GoodsContainer,
      LoadMore,
    }
  }
</script>
