<style type="text/less" lang="less">
  @import '../../common';

  html, body {
    background-color: #fff;
  }

  .article_detail-container {
    padding-top: .9rem;
    &.hasRecommend {
      padding-top: 1.9rem;
    }
  }

  .detail-top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    > .recommend {
      height: 1rem;
      line-height: 1rem;
      background-color: #fff;
      > img {
        margin-left: .2rem;
        width: .72rem;
        height: .72rem;
        vertical-align: middle;
      }
      > span {
        float: right;
        font-size: .24rem;
        &.btn {
          .span-bg-icon(.24rem, right);
          margin-right: .34rem;
          color: @light;
          background-image: url(../../assets/img/direction_down_gray.png);
          &.active {
            background-image: url(../../assets/img/direction_up_gray.png);
          }
        }
        &:last-child {
          margin-right: .4rem;
        }
      }
    }
    > ul {
      > li {
        padding-left: .2rem;
        height: 1rem;
        line-height: 1rem;
        background-color: #fff;
        font-size: .24rem;
        overflow: hidden;
        .border-bottom-1px;
        &:first-child {
          border-top: 1px solid #e4e4e4;
        }
        &:last-child {
          &:after {
            content: '';
            height: 0;
          }
        }
        > img {
          float: left;
          margin-top: .14rem;
          margin-right: .2rem;
          width: .72rem;
          height: .72rem;
        }
        > span {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .author {
    height: .9rem;
    line-height: .9rem;
    background-color: #000;
    font-size: 0;
    color: #fff;
    overflow: hidden;
    > a {
      > img {
        margin-left: .3rem;
        width: .6rem;
        height: .6rem;
        border-radius: 50%;
        vertical-align: middle;
      }
      > .nickname {
        color:#fff;
        width: 3rem;
        margin-left: .2rem;
        font-size: .28rem;
        vertical-align: middle;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    > .follows {
      float: right;
      margin-right: .24rem;
      font-size: .24rem;
    }
    > .button {
      float: right;
      .middle(.5rem);
      width: 1.18rem;
      margin-top: .2rem;
      margin-right: .18rem;
      box-sizing: border-box;
      border: 1px solid @primary;
      color: @primary;
      font-size: .24rem;
    }
  }

  .article {
    padding-bottom: .6rem;
    > .cover {
      max-height: 5rem;
      background: no-repeat center center;
      background-size: 100%;
    }
    > .title {
      padding: 0 .24rem;
      > div.a {
        margin-top: .28rem;
        font-size: .36rem;
        line-height: .56rem;
      }
      > hr {
        margin-top: .3rem;
        width: 3rem;
        height: .04rem;
        background-color: #000;
      }
      > div.b {
        margin-top: .28rem;
        font-size: .24rem;
        color: @light;
        overflow: hidden;
      }
    }
    > .content {
      margin-top: .4rem;
      > div.text {
        margin: .3rem .24rem 0;
        font-size: .3rem;
        white-space: pre-wrap;
        &:first-child {
          margin-top: 0;
        }
      }
      > div.image {
        margin-top: .4rem;
        min-height: 4rem;
        background-size: 100% 100%;
        > img {
          width: 100%;
          display: block;
          &:first-child {
            margin-top: 0;
          }
        }
      }
      > div.video {
        margin-top: .4rem;
        height: 5rem;
        background-size: 100% 100%;
        > video {
          width: 100%;
          height: 100%;
        }
      }
      > div.url {
        height: 1.88rem;
        margin: .4rem .36rem 0;
        border: 0 solid #ddd;
        box-shadow: 0 .02rem .04rem 0 rgba(0, 0, 0, .3);
        &:first-child {
          margin-top: 0;
        }
        > img {
          float: left;
          margin: .14rem;
          width: 1.6rem;
          height: 1.6rem;
        }
        > div {
          position: relative;
          overflow: hidden;
          height: inherit;
          > .a {
            margin-top: .18rem;
            margin-right: .28rem;
            font-size: .3rem;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          > .b {
            overflow: hidden;
            position: absolute;
            width: 100%;
            bottom: .14rem;
            > span {
              &:nth-child(1) {
                float: left;
                color: #d0021b;
                font-size: .36rem;
              }
              &:nth-child(2) {
                margin-left: .22rem;
                color: @light;
                font-size: .24rem;
                text-decoration: line-through;
              }
              &:nth-child(3) {
                float: right;
                margin-right: .2rem;
                font-size: .24rem;
                color: #000;
                width: 1.24rem;
                .middle(.4rem);
                border: 1px solid #000;
              }
            }
          }
        }
      }
    }
    > .recommend-articles {
      margin-top: .3rem;
      > div:first-child {
        text-align: center;
        font-size: .3rem;
      }
      > div:last-child {
        margin: .24rem .34rem 0 .36rem;
        padding: .1rem .4rem;
        font-size: .28rem;
        border: 0 solid #ddd;
        box-shadow: 0 .02rem .04rem 0 rgba(0, 0, 0, 0.30);
        > div {
          height: .8rem;
          line-height: .8rem;
          overflow: hidden;
          font-size: 0;
          .border-bottom-1px;
          &:last-child {
            &:after {
              content: '';
              width: 0;
              height: 0;
            }
          }
          > img {
            margin-right: .1rem;
            width: .48rem;
            height: .48rem;
            vertical-align: middle;
            border-radius: 50%;
          }
          > span {
            width:100%;
            padding-left:.58rem;
            margin-left:-.58rem;
            box-sizing: border-box;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: .28rem;
            vertical-align: middle;
          }
        }
      }
    }
  }

  .likes {
    padding: 0 .4rem;
    height: .9rem;
    line-height: .9rem;
    overflow: hidden;
    background-color: #eee;
    > img {
      margin-top: .35rem;
      width: .2rem;
      height: .2rem;
      float: right;
    }
    > span {
      .span-bg-icon(.24rem, left);
      float: right;
      margin-right: .14rem;
      background-image: url(../../assets/img/Article_like_show.png);
    }
    > ul {
      height: 100%;
      line-height: .9rem;
      overflow: hidden;
      font-size: 0;
      > li {
        display: inline-block;
        margin-right: .04rem;
        width: .48rem;
        height: .48rem;
        font-size: 0;
        vertical-align: middle;
        > img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }

  .comments {
    padding-bottom: .2rem;
    > li {
      position: relative;
      overflow: hidden;
      padding-left:1.1rem;
      &:last-child{
        >div.content{
          &:after{
            width:0;
            height:0;
          }
        }
      }
      > img.avatar {
        position: absolute;
        top: .24rem;
        left: .36rem;
        width: .6rem;
        height: .6rem;
        border-radius: 50%;
      }
      > div.content {
        position: relative;
        overflow: hidden;
        padding:.28rem 0 .32rem;
        .border-bottom-1px;
        > .a {
          > .a-1 {
            font-size: .24rem;
            color: #00609b;
            max-width:2rem;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          > .a-2 {
            color: @light;
            font-size: .24rem;
            overflow:hidden;
          }
        }
        > .b {
          margin-top: .14rem;
          margin-right: .32rem;
          font-size: .24rem;
          white-space: pre-wrap;
        }
        > .c {
          font-size: .24rem;
          color: #00609b;
          margin-top: .22rem;
        }
        > .reply {
          position: absolute;
          top: .4rem;
          right: .38rem;
          width: .28rem;
          height: .24rem;
        }
      }
    }
  }

  .comments-button{
    overflow:hidden;
    text-align:center;
    >span{
      padding:0 .35rem;
      height:.7rem;
      line-height:.7rem;
      background-color:#000;
      color:#fff;
      font-size:.28rem;
    }
  }

  .footer {
    .ul-horizontal(@footer-height, 3);
    &:after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 1px;
      background-color: #e4e4e4;
    }
    span {
      .span-bg-icon(.32rem, left);
    }
    > li {
      &:nth-child(1) {
        > span {
          background-image: url(../../assets/img/Article_Collection_off.png);
          &.on {
            background-image: url(../../assets/img/Article_Collection_on.png);
          }
        }
      }
      &:nth-child(2) {
        > span {
          background-image: url(../../assets/img/Article_like_off.png);
          &.on {
            background-image: url(../../assets/img/Article_like_on.png);
          }
        }
      }
      &:nth-child(3) {
        > span {
          background-image: url(../../assets/img/Article_comment.png);
        }
      }
    }
  }

  .comments-model {
    position: fixed;
    left: 10%;
    top: 1.5rem;
    width: 80%;
    overflow: hidden;
    background-color: #fff;
    box-sizing: border-box;
    padding:.3rem;
    z-index:100;
    > textarea {
      width: 100%;
      height: 3rem;
      box-sizing: border-box;
      resize: none ;
      outline: none;
      font-size: .28rem;
      &::placeholder {
        color: @light;
      }
      &::-webkit-scrollbar{
        width:0;
        height:0;
      }
    }
    > .actions {
      text-align: right;
      > span {
        width: .96rem;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
        margin-right: .4rem;
        border: 1px solid #111;
        box-sizing: border-box;
      }
    }
  }

  .title-with-hr {
    height: .9rem;
    line-height: .9rem;
    text-align: center;
    font-size: .24rem;
    > hr {
      display: inline-block;
      margin: .2rem;
      width: .5rem;
      height: 1px;
      background-color: #000;
      vertical-align: middle;
    }
  }
</style>
<template>
  <div class="bottom-container article_detail-container" :class="{ hasRecommend:article && article.goods_count > 0 }">
    <div v-if="content">
      <!--顶部作者头像、关注、推荐商品等-->
      <div class="detail-top">
        <div class="author">
          <a v-href="['person_detail', {pid:article.customer_id}]">
            <img v-avatar="article.avater">
            <span class="nickname">{{article.nickname}}</span>
          </a>
          <span class="button" v-if="article.can_attention != 0" @click="follow">{{ article.is_attention == 0 ? '关注TA' : '已关注' }}</span>
          <span class="follows">{{article.attention_count}}人关注</span>
        </div>
        <div class="recommend" v-if="article.goods_count > 0" @click="shade.ifShowGoods = !shade.ifShowGoods">
          <img v-for="item in topShowGoodsImg" :src="item.cover">
          <span class="btn" :class="{active:ifShowGoods}">{{ifShowGoods ? '收起' : '展开'}}</span>
          <span>共推荐{{article.goods_count}}件商品</span>
        </div>
        <ul v-show="shade.ifShowGoods">
          <li v-for="item in article.goods" v-href="['goods_detail', {goods_id:item.goods_id}]">
            <img :src="item.cover">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <!--文章顶部-->
      <div class="article">
        <div class="cover" :style="{backgroundImage:'url(' + content.article.cover + ')'}"></div>
        <div v-ratio-img="content.article.cover"></div>
        <div class="title">
          <div class="a">{{article.title}}</div>
          <hr>
          <div class="b">
            <span style="float:left">阅读 {{article.browse}}</span>
            <span v-if="article.date_add" style="float:right">{{article.date_add | time}}</span>
          </div>
        </div>
        <!--文章内容-->
        <div class="content">
          <template v-for="item in article.content">
            <div class="text" v-if="item.type === 'text'">{{item.content}}</div>
            <div class="image" v-else-if="item.type === 'image'" @click="previewImage(item)" :style="{backgroundImage:'url(./static/img/default_pic.png)'}">
              <img :src="item.content">
            </div>
            <div class="url" v-else-if="item.type === 'url'" v-href="['goods_detail', {goods_id:item.goods.goods_id}]">
              <img :src="item.goods.cover">
              <div>
                <div class="a">{{item.goods.name}}</div>
                <div class="b">
                  <span>¥{{item.goods.price}}</span>
                  <span>¥{{item.goods.market_price}}</span>
                  <span>查看详情</span>
                </div>
              </div>
            </div>
            <div class="video" v-else-if="item.type === 'video'" :style="{backgroundImage:'url(./static/img/default_pic.png)'}">
              <video :src="item.content" preload="auto" controls="controls"></video>
            </div>
          </template>
        </div>
        <!-- 文章推荐 -->
        <div v-if="article.articles_count > 0" class="recommend-articles">
          <div>文章推荐</div>
          <div>
            <div v-for="item in article.articles" v-href="['article_detail', {article_id:item.article_id}]">
              <img v-avatar="item.cover">
              <span>{{item.title}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 点赞列表 -->
      <div class="likes" v-if="content.likes_count>0">
        <img src="../../assets/img/direction_right_black.png">
        <span>{{content.likes_count}}</span>
        <ul>
          <li v-for="item in content.likes"><img v-avatar="item.avater"></li>
        </ul>
      </div>
      <!-- 评论列表 -->
      <template v-if="content.comments && content.comments.length">
        <ul class="comments">
          <li v-for="comment in content.comments" v-href="['comment_list', {comment_id:comment.comment_id}]">
            <img class="avatar" v-avatar="comment.avater">
            <div class="content">
              <img class="reply" src="../../assets/img/Article_reply.png" @click.stop="showComment(comment.comment_id)">
              <div class="a">
                <span class="a-1">{{comment.nickname}}</span>
                <span class="a-2">{{comment.date_add | time_3}}</span>
              </div>
              <div class="b">{{comment.content}}</div>
              <div class="c" v-if="comment.reply_count > 0">查看回复({{comment.reply_count}})</div>
            </div>
          </li>
        </ul>
        <div class="title-with-hr" v-if="content.comments.length%10==0 && hasMore" @click="loadMoreComments">
          <hr>
          点击查看更多评论
          <hr>
        </div>
        <!--<div class="comments-button" v-if="content.comments.length%10==0 && hasMore">-->
          <!--<span @click="loadMoreComments">点击查看更多评论</span>-->
        <!--</div>-->
      </template>
      <!-- 好物推荐 -->
      <goods-container
        v-if="ifShowRecommend && content.recommend"
        :goods="content.recommend.length <= 6 ? content.recommend : content.recommend.slice(0, 6)"
        hidePrice
      >
      </goods-container>
      <!-- Footer -->
      <ul class="footer">
        <li><span :class="{on:article.is_collection == 1}" @click="favor">收藏</span></li>
        <li><span :class="{on:article.is_like == 1}" @click="like">点赞</span></li>
        <li><span @click="showComment(0)">评论</span></li>
      </ul>
    </div>
    <div v-if="cantFind" class="tip-nothing" style="margin-top:2rem;">
      <img src="../../assets/img/Tip_nothing.png">
      <div>未找到对应的文章信息</div>
    </div>
    <!-- 评论弹框 -->
    <div class="comments-model" v-show="shade.ifShowComment">
      <textarea placeholder="请输入评论内容" v-model="comment"></textarea>
      <div class="actions">
        <span @click="hideComment">取消</span>
        <span @click="sendComment">发送</span>
      </div>
    </div>
    <!-- shade -->
    <the-shade v-show="ifShowShade" @click.native.self="hideShade"></the-shade>
    <app-permanent type="1"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import TheShade from '@c/TheShade.vue'
  import GoodsContainer from '@c/GoodsContainer.vue'

  export default {
    data () {
      return {
        cantFind: false,
        article_id: '',
        content: null,
        ifShowGoods: false,
        ifShowRecommend: true,
        shade: {
          ifShowGoods: false,
          ifShowComment: false,
        },
        comment: '',
        replyComment_id:0,
        url:URL.getComments,
        page:1,
        hasMore:true,
      }
    },
    computed: {
      ifShowShade(){
        for (let i in this.shade) {
          if (this.shade[i]) {
            return true
          }
        }
        return false;
      },
      article(){
        if (this.content) {
          return this.content.article;
        }
      },
      contentImages(){
        if (this.article) {
          const arr = [];
          for (let i of this.article.content) {
            if (i.type === 'image') {
              arr.push(i.content);
            }
          }
          return arr;
        }
      },
      topShowGoodsImg(){
        if (this.article) {
          const goods = this.article.goods;
          return goods.length > 4
            ? goods.slice(0, 4)
            : goods;
        }
      }
    },
    methods: {
      loadMoreComments(){
        this.$post(URL.getComments, {page:this.page+1,article_id:this.article_id, comment_id:0})
          .then( res => {
            if(res.errcode == 0) {
              if(res.content.length) {
                this.content.comments.push(...res.content);
                this.page++;
              }else{
                this.hasMore = false;
              }
            }else{
              errback(res);
            }
          })
      },
      loadMore(content){
        if(content.length) {
          this.content.comments.push(...content);
          this.page++;
        }else{
          this.hasMore = false;
        }
      },
      showComment(comment_id){
        if(!getToken()) {
          login();
          return;
        }
        this.replyComment_id = comment_id;
        this.shade.ifShowComment = true;
      },
      hideComment(){
        this.shade.ifShowComment = false;
        this.comment = '';
      },
      sendComment(){
        if (!this.comment.trim()) {
          return;
        }
        this.$post(URL.comment, {article_id: this.article_id, comment: this.comment, comment_id: this.replyComment_id})
          .then(res => {
            if (res.errcode == 0) {
              if (this.replyComment_id == 0) {
                location.reload();
              } else {
                toast(res.message);
                this.hideComment();
                for (let i of this.content.comments){
                  if(i.comment_id === this.replyComment_id) {
                    i.reply_count++;
                    break;
                  }
                }
              }
            } else {
              errback(res);
            }
          })
      },
      previewImage(item){
        wx.previewImage({
          current: item.content, // 当前显示图片的http链接
          urls: this.contentImages // 需要预览的图片http链接列表
        });
      },
      favor(){
        this.$post(URL.collection, {article_id: this.article_id})
          .then(res => {
            console.log(res)
            if (res.errcode == 0) {
              toast(res.message)
              this.article.is_collection = this.article.is_collection == 0 ? 1 : 0;
            } else {
              errback(res);
            }
          })
      },
      like(){
        this.$post(URL.like, {article_id: this.article_id})
          .then(res => {
            console.log(res)
            if (res.errcode == 0) {
              toast(res.message);
              this.article.is_like = this.article.is_like == 0 ? 1 : 0;
            } else {
              errback(res);
            }
          })
      },
      follow(){
        this.$post(URL.attention, {pid: this.article.customer_id})
          .then(res => {
            if (res.errcode == 0) {
              this.article.is_attention = res.content;
              if (res.content != 0) {
                this.article.attention_count = Number(this.article.attention_count) + 1;
              } else {
                this.article.attention_count = Number(this.article.attention_count) - 1;
              }
              follow_common();
            } else {
              errback(res);
            }
          })
      },
      fetch(){
        this.$post(URL.articleDetail, {article_id: this.article_id})
          .then(res => {
            console.log(res)
            if (res.errcode == 0) {
              this.content = res.content;

              //分享
              wx.ready( () => {
                let {share_desc, share_image, share_title, url} = res.content.share;
                wx.hideAllNonBaseMenuItem();
                wx.showMenuItems({
                  menuList: ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq"] // 要显示的菜单项，所有menu项见附录3
                });
                const arr = url.split('?');
                const search = getSearchParams(arr[1]);
                let str = encodeChinese(search);
                url = [arr[0], str].join('?');
                wx.onMenuShareAppMessage({
                  title: share_title,
                  desc: share_desc,
                  link: url,
                  imgUrl: share_image,
                  type: 'link', // 分享类型,music、video或link，不填默认为link
                  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                  success: function () {
                    toast('分享成功');
                  },
                  cancel: function () {

                  }
                });

                wx.onMenuShareQQ({
                  title: share_title, // 分享标题
                  desc: share_desc, // 分享描述
                  link: url, // 分享链接
                  imgUrl: share_image, // 分享图标
                  success: function () {
                    toast('分享成功');
                  },
                  cancel: function () {

                  }
                });

                wx.onMenuShareTimeline({
                  title: share_title, // 分享标题
                  link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: share_image, // 分享图标
                  success: function () {
                    toast('分享成功');
                  },
                  cancel: function () {

                  }
                });
              })
            } else {
              errback(res);
              this.cantFind = true;
            }
          })
      },
      hideShade(){
        for (let i in this.shade) {
          this.shade[i] = false;
        }
      }
    },
    created(){
      document.title = '文章详情';
      const {article_id, customer_id} = getSearchParams(location.search);
      if (customer_id) {
//        this.ifShowRecommend = true;
        setSession('customer_id', customer_id);
      }
      this.article_id = article_id;

      this.fetch();
    },
    components: {
      AppPermanent,
      TheShade,
      GoodsContainer,
    }
  }
</script>
