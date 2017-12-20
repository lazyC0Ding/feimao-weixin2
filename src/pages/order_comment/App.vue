<style type="text/less" lang="less">
  @import '../../common';

  html, body {
    width: 100%;
    height: 100%;
  }

  .score {
    height: 1rem;
    line-height: 1rem;
    font-size: 0;
    padding: 0 .3rem;
    background-color: #fff;
    &.border-bottom {
      .border-bottom-1px;
    }
    > .title {
      margin-right: .6rem;
      font-size: .28rem;
      vertical-align: middle;
    }
    .star {
      margin-right: .3rem;
      width: .4rem;
      height: .4rem;
      vertical-align: middle;
      background-image: url(../../assets/img/comment_star_off.png);
      background-size: 100% 100%;
      &.on {
        background-image: url(../../assets/img/comment_star_on.png);
      }
    }
  }

  .textarea {
    position: relative;
    background-color: #fff;
    overflow: hidden;
    height: 2.6rem;
    .border-bottom-1px;
    > textarea {
      width: 100%;
      height: 100%;
      padding: .3rem;
      font-size: .28rem;
      resize: none;
      outline: none;
      box-sizing: border-box;
      &::placeholder {
        color: @light;
      }
    }
    > .tips {
      position: absolute;
      right: .2rem;
      bottom: .3rem;
      font-size: .24rem;
      color: @light;
    }
  }

  footer{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .order_comment-ul{
    overflow:hidden;
    >li{
      overflow:hidden;
      margin-top:.1rem;
    }
  }

</style>
<template>
  <div v-if="search" style="position:relative;padding-bottom:1.1rem;">
    <ul class="order_comment-ul">
      <li v-for="(item, index) in search">
        <goods-list :goods="[item]" cant-open-goods></goods-list>
        <div class="score border-bottom">
          <span class="title">商品评分</span>
          <span class="star" :class="{on:item.score >= star}" @click="item.score=star" v-for="star in [1,2,3,4,5]"></span>
        </div>
        <div class="textarea">
          <textarea v-model="item.comment" placeholder="说点对宝贝的评价吧......" maxlength="140"></textarea>
          <span class="tips">{{item.comment.length}}/140</span>
        </div>
        <div class="score">
          <span class="title">上传图片</span>
        </div>
        <app-upload-img :images="item.images"></app-upload-img>
      </li>
    </ul>
    <footer>
      <div class="btn-big" style="margin-bottom:.1rem;" @click="submit">提交</div>
    </footer>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import GoodsList from '@c/GoodsList.vue'
  import AppUploadImg from '@c/AppUploadImg.vue'
  export default {
    data () {
      return {
        search: null,
      }
    },
    computed:{
      goods(){
        if(this.search) {
          return this.search.goods;
        }
      },
      order_sn(){
        if(this.search) {
          return this.search.order_sn;
        }
      },
    },
    methods: {
      submit(){
        const data = [];
        let item;
        for (let i of this.goods) {
          if(i.score === 0) {
            alert('请给商品评分');
            return;
          }
          item = {
            order_sn:this.order_sn,
            goods_id:i.goods_id,
            option_id:i.option_id || 0,
            score:i.score,
          };
          if(i.images.length) {
            const arr = [];
            for (let j of i.images) {
              arr.push(j.src);
            }
            item.images = arr.join(',');
          }
          if(i.comment.trim()) {
            item.comment = i.comment;
          }
          data.push(item);
        }

        this.$post(URL.orderComment, {data:JSON.stringify(data)})
          .then (res => {
            if(res.errcode == 0) {
              alert('评价成功,感谢您的评价');
              history.go(-1);
            }else{
              errback(res);
            }
          })
      }
    },
    created(){
      document.title = '评价';
      const search = getSession('order_comment');
      for (let i of search.goods){
        i.images = [];
        i.comment = '';
        i.score = 0;
      }

      this.search = search;
      console.log(search);
    },
    components: {
      AppPermanent,
      GoodsList,
      AppUploadImg,
    }
  }
</script>
