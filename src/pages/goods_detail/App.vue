<style type="text/less" lang="less">
  @import '../../common';

  .info {
    background-color: #fff;
    padding: 0 .24rem;
    overflow: hidden;
    > .title {
      margin-top: .18rem;
    }
    > .price {
      margin-top: .18rem;
      margin-bottom: .2rem;
      font-size: .36rem;
      color: #D0021B;
      > span:last-child {
        margin-left: .3rem;
        font-size: .28rem;
        color: @light;
        text-decoration: line-through;
      }
    }
  }

  .feimao {
    position: relative;
    margin-top: .1rem;
    height: 1.4rem;
    background-color: #fff;
    overflow: hidden;
    .border-bottom-1px;
    > img {
      float: left;
      width: .9rem;
      height: .9rem;
      margin-top: .25rem;
      margin-left: .4rem;
      border-radius: 50%;
    }
    > div {
      padding-left: .2rem;
      overflow: hidden;
      > div {
        &:nth-child(1) {
          margin-top: .34rem;
          font-size: .28rem;
        }
        &:nth-child(2) {
          margin-top: .04rem;
          font-size: .24rem;
          color: @light;
        }
      }
    }
    > span {
      position: absolute;
      top: .48rem;
      right: .38rem;
      width: 1.4rem;
      height: .52rem;
      line-height: .52rem;
      font-size: .24rem;
      border: 1px solid #111;
      box-sizing: border-box;
      text-align: center;
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

  .recommend-part {
    background-color: #fff;
    > ul {
      .ul-horizontal(2.7rem, 4);
      line-height: normal;
      > li {
        > dl {
          display: inline-block;
          width: 1.6rem;
          img {
            display: block;
            height: 1.6rem;
          }
          dd {
            margin-top: .06rem;
            font-size: .24rem;
            line-height: .3rem;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }

  .before_mai {
    margin-top: .1rem;
    padding-bottom: .3rem;
    background-color: #fff;
    > .content {
      margin: 0 .26rem;
      padding: .2rem .1rem .06rem .2rem;
      background-color: #eee;
      white-space: pre-wrap;
      font-size: .24rem;
    }
  }

  .goods_detail-footer {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    height: .8rem;
    line-height: .8rem;
    background-color: #fff;
    > li {
      display: inline-block;
      height: 100%;
      vertical-align: top;
      &.btn {
        float: right;
        width: 2.84rem;
        text-align: center;
        font-size: .34rem;
        color: #fff;
      }
      &.img {
        width: .48rem;
        background: no-repeat center;
        background-size: 100%;
      }
      &.img-1 {
        margin-left: .28rem;
        background-image: url(../../assets/img/goods_share.png)
      }
      &.img-2 {
        margin-left: .7rem;
        background-image: url(../../assets/img/goods_shoucang_off.png);
        &.active {
          background-image: url(../../assets/img/goods_shoucang_on.png);
        }
      }
      &.btn-1 {
        background-color: #000;
      }
      &.btn-2 {
        background-color: #F58C23;
      }
    }
    > hr {
      display: inline-block;
      margin: .16rem .08rem 0 .12rem;
      width: .02rem;
      height: .48rem;
      background-color: #D8D8D8;
    }
  }

  .goods_detail-bottom {
    &.fixed {
      padding-top: .8rem;
    }
    > .goods_detail-tags {
      background-color: #000;
      font-size: .26rem;
      overflow: hidden;
      height: .8rem;
      line-height: .8rem;
      color: #fff;
      margin: 0;
      &.fixed {
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 10;
      }
      > li {
        position: relative;
        float: left;
        height: inherit;
        text-align: center;
        width: 33.33%;
        &.active {
          color: #FFB305;
          &:after {
            content: " ";
            position: absolute;
            left: 50%;
            bottom: .1rem;
            width: 1rem;
            height: .04rem;
            margin-left: -.5rem;
            background-color: #FFB305;
          }
        }
      }
    }
    > .bottom-content {
      overflow: hidden;
      position:relative;
      >div.hidden{
        position:absolute;
        left:0;
        top:0;
        width:100%;
        height:100%;
        z-index:5;
      }
      > iframe {
        width: 100%;
      }
      > ul.records {
        background-color: #fff;
        > li {
          height: 1.4rem;
          line-height: 1.4rem;
          .border-bottom-1px;
          > img {
            float: left;
            width: .8rem;
            height: .8rem;
            margin-top: .3rem;
            margin-left: .2rem;
            border-radius: 50%;
          }
          > div {
            overflow: hidden;
            padding-left: .2rem;
            > span:nth-child(1) {
              vertical-align: top;
              font-size: .26rem;
              max-width: 2rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            > span:nth-child(2) {
              vertical-align: top;
              font-size: .26rem;
            }
            > span:nth-child(3) {
              float: right;
              font-size: .24rem;
              margin-top: .44rem;
              margin-right: .2rem;
              width: 1.2rem;
              height: .52rem;
              line-height: .52rem;
              text-align: center;
              border: 1px solid #111;
              box-sizing: border-box;
            }
            > span:nth-child(4) {
              float: right;
              margin-right: .2rem;
              font-size: .24rem;
            }
          }
        }
      }
    }
  }

  .select {
    position: relative;
    overflow: visible;
    background-color: #fff;
    padding-bottom: 2.54rem;
    > img.close {
      position: absolute;
      top: -.1rem;
      right: 0;
      width: .8rem;
      height: .8rem;
    }
    > .ok {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: .8rem;
      line-height: .8rem;
      background-color: #000;
      color: #fff;
      text-align: center;
    }
    > .top {
      position: relative;
      margin-right: .8rem;
      height: 1.6rem;
      box-sizing: border-box;
      padding-top: .34rem;
      overflow: visible;
      > img {
        position: absolute;
        left: .34rem;
        bottom: .2rem;
        width: 1.8rem;
        height: 1.8rem;
      }
      > div {
        padding-left: 2.5rem;
        overflow: hidden;
        &:nth-child(2) {
          font-size: .36rem;
          color: #D0021B;
        }
        &:nth-child(3) {
          margin-top: .06rem;
          font-size: .24rem;
        }
      }
    }
  }

  .favor {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: .8rem;
    height: .74rem;
    line-height: .74rem;
    padding-left: .72rem;
    background: url(../../assets/img/selected_on.png) no-repeat .36rem center;
    background-size: .24rem .24rem;
    font-size: .24rem;
    color: @light;
    &.off {
      background-image: url(../../assets/img/selected_off.png);
    }
  }

  .count {
    position: absolute;
    left: 0;
    bottom: 1.54rem;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background-color: #eee;
    color: @light;
    font-size: .28rem;
    > span:first-child {
      margin-left: .4rem;
    }
    > span:last-child {
      float: right;
      margin-top: .2rem;
      margin-right: .52rem;
      background-color: #fff;
      height: .6rem;
      overflow: hidden;
      > span {
        float: left;
        width: .6rem;
        height: 100%;
        background: no-repeat center;
        background-size: 100% 100%;
        &:nth-child(1) {
          background-image: url(../../assets/img/Number_reduce.png);
        }
        &:nth-child(2) {
          text-align: center;
          line-height: .6rem;
          width: .76rem;
          background-image: url(../../assets/img/Number_input.png);
          color: #111;
        }
        &:nth-child(3) {
          background-image: url(../../assets/img/Number_add.png);
        }
      }
    }
  }

  .specs {
    > div {
      margin-top: .14rem;
      padding-left: .4rem;
      font-size: .28rem;
      color: @light;
    }
    > ul {
      padding: 0 .4rem .4rem .2rem;
      font-size: .28rem;
      > li {
        display: inline-block;
        margin-top: .2rem;
        margin-left: .2rem;
        padding: .1rem .3rem;
        font-size: .28rem;
        border: 1px solid #111;
        &.active {
          background-color: #000;
          color: #fff;
        }
      }
    }
  }

  .countdown {
    position: absolute;
    bottom: .5rem;
    left: 50%;
    margin-left: -2.2rem;
    width: 4.4rem;
    height: .8rem;
    line-height: .8rem;
    border-radius: 2rem;
    background: rgba(0, 0, 0, .4) url(../../assets/img/Countdown.png) no-repeat .46rem center;
    background-size: .32rem .32rem;
    color: #fff;
    font-size: .36rem;
    z-index: 10;
    box-sizing: border-box;
    padding-left: 1rem;
    > span:nth-child(2) {
      margin-left: .05rem;
      font-size: .28rem;
      vertical-align: top;
    }
  }

  .comments-model {
    position: absolute;
    left: 10%;
    top: 1.5rem;
    width: 80%;
    overflow: hidden;
    z-index: 9;
    background-color: #fff;
    box-sizing: border-box;
    padding:.3rem;
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
</style>
<template>
  <div style="padding-bottom:.8rem;">
    <template v-if="content">
      <div class="goods_detail-top">
        <div style="position:relative;">
        <span class="countdown" v-if="activity">
          <span>{{d_time | countdown}}</span>
          <span>后{{ifStarted ? '结束' : '开始'}}</span>
        </span>
          <swiper
            :list="content.images"
            :aspect-ratio="1/1"
            dots-position="center"
            auto
            loop
            dots-class="banner-dot"
          ></swiper>
        </div>
        <div class="info">
          <div class="title">{{content.name}}</div>
          <div v-if="activity" class="price">
            <span>{{activity.activity_content}} ¥ {{activity.activity_price}}</span>
            <span>¥ {{content.price}}</span>
          </div>
          <div v-else class="price">¥ {{content.price}}</div>
        </div>
        <div class="feimao">
          <img src="../../assets/img/goods_detail_shop.png">
          <div>
            <div>肥猫商城</div>
            <div>品质保证 | 吃遍全国</div>
          </div>
          <span v-href="'mall'">进入首页</span>
        </div>
        <div class="recommend-part">
          <div class="title-with-hr">
            <hr>
            热卖推荐
            <hr>
          </div>
          <ul v-if="content.recommend_goods">
            <li v-for="item in content.recommend_goods.slice(0, 4)" v-href="['goods_detail', {goods_id:item.goods_id}]">
              <dl>
                <dt>
                  <img :src="item.cover">
                </dt>
                <dd>{{item.name}}</dd>
              </dl>
            </li>
          </ul>
        </div>
        <div class="before_mai" ref="before_mai">
          <div class="title-with-hr">
            <hr>
            购前须知
            <hr>
          </div>
          <div class="content">{{content.before_mai}}</div>
        </div>
      </div>
      <div class="goods_detail-bottom" :class="{fixed:isTagsFixed}">
        <ul class="goods_detail-tags" :class="{fixed:isTagsFixed}">
          <li :class="{active:activeTag === 0}" @click="activeTag=0">商品详情</li>
          <li :class="{active:activeTag === 1}" @click="activeTag=1">购买记录</li>
          <li :class="{active:activeTag === 2}" @click="activeTag=2">热销推荐</li>
        </ul>
        <div class="bottom-content">
          <!-- 商品详情 -->
          <div class="hidden" v-show="activeTag === 0 && !isTagsFixed"></div>
          <iframe
            v-show="activeTag === 0"
            :style="{height:clientHeight+'px'}"
            :src="content.desc"
            frameborder="no"
            border="0" marginwidth=0
            marginheight=0
          ></iframe>
          <!-- 购买记录 -->
          <ul v-show="activeTag === 1" class="records">
            <li v-for="record in content.records">
              <img v-avatar="record.avater">
              <div>
                <span>{{record.nickname}}</span>
                <span>购买了{{record.quantity}}件</span>
                <span @click="showComment(record.customer_id)">回复</span>
                <span>{{record.date_add | time_3}}</span>
              </div>
            </li>
          </ul>
          <!-- 热销推荐 -->
          <goods-container v-show="activeTag === 2"
                           :goods="recommend_goods"></goods-container>
        </div>
      </div>
      <popup v-model="ifShowSelect" style="overflow-y: visible">
        <div class="select">
          <img @click="ifShowSelect = false" class="close" src="../../assets/img/close_black.png">
          <div class="top">
            <img :src="content.cover">
            <div>¥{{activity ? activity.activity_price : content.price}}</div>
            <div>库存: {{activity ? activity.stock : content.stock}}</div>
          </div>
          <div v-for="spec in content.specs" class="specs">
            <div>{{spec.name}}</div>
            <ul>
              <li v-for="item in spec.items"
                  @click="selectSpec(spec, item.id)"
                  :class="{ active:item.id == spec.active_id }"
              >
                {{item.name}}
              </li>
            </ul>
          </div>
          <div class="count">
            <span>购买数量</span>
            <span>
            <span @click="params.quantity == 1 || params.quantity--"></span>
            <span>{{params.quantity}}</span>
            <span @click="params.quantity++"></span>
          </span>
          </div>
          <div class="favor"
               :class="{off:params.is_collect == 0}"
               @click="params.is_collect == 0 ? params.is_collect = 1 : params.is_collect = 0">
            同时加入收藏
          </div>
          <div class="ok" @click="buy">确认</div>
        </div>
      </popup>
      <ul class="goods_detail-footer">
        <!--<li class="img"></li>-->
        <!--<hr>-->
        <li class="img img-2" :class="{active:content.is_collection == 1}" @click="goodsCollection"></li>
        <li class="btn btn-1" @click="select(2)">立即购买</li>
        <li class="btn btn-2" @click="select(1)">加入购物车</li>
      </ul>
    </template>
    <div v-if="cantFind" class="tip-nothing" style="margin-top:2rem;">
      <img src="../../assets/img/Tip_nothing.png">
      <div>未找到对应的商品信息</div>
    </div>
    <the-shade v-show="ifShowComment" @click.native.self="hideComment">
      <div class="comments-model" v-show="ifShowComment">
        <textarea placeholder="请输入评论内容" v-model="comment"></textarea>
        <div class="actions">
          <span @click="hideComment">取消</span>
          <span @click="sendComment">发送</span>
        </div>
      </div>
    </the-shade>
    <load-more
      :url="getBuyRecord.url"
      :page="getBuyRecord.page"
      :params="getBuyRecord.params"
      :callback="loadMore"
      :no-listen="activeTag!=1 || !hasMore"
    ></load-more>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import GoodsContainer from '@c/GoodsContainer.vue'
  import {Swiper, Popup} from 'vux'
  import LoadMore from '@c/LoadMore.vue'
  import TheShade from '@c/TheShade.vue'

  export default {
    data () {
      return {
        content: null,
        recommend_goods: [],
        specs: [],
        activity: null,
        activeTag: 0,
        clientHeight: document.documentElement.clientHeight,
        isTagsFixed: false,
        before_mai: null,
        iframe:null,
        ifShowSelect: false,
        buyType: 0,
        now: 0,
        params: {
          goods_id: '',
          quantity: 1,
          option_id: 0,
          is_collect: 1,
        },
        cantFind: false,
        page: 1,
        hasMore: true,
        ifShowComment: false,
        comment: '',
        replyCustomer_id: '',
      }
    },
    computed: {
      getBuyRecord(){
        return {
          url: URL.getBuyRecord,
          page: this.page,
          params: {
            goods_id: this.params.goods_id
          }
        }
      },
      ifStarted(){
        return this.now >= Number(this.activity.date_start);
      },
      d_time(){
        if (!this.activity) return;
        return this.now < this.activity.date_start
          ? this.activity.date_start - this.now
          : this.activity.date_end - this.now;
      },
    },
    watch: {
      content(n){
        if (n) {
          this.$nextTick(() => {
            this.before_mai = this.$refs.before_mai;
            window.addEventListener('scroll', () => {
              this.isTagsFixed = window.scrollY > this.before_mai.offsetTop + this.before_mai.clientHeight;
            });
          })
        }
      }
    },
    methods: {
      showComment(customer_id){
        this.replyCustomer_id = customer_id;
        this.ifShowComment = true;
      },
      hideComment(){
        this.ifShowComment = false;
        this.comment = '';
      },
      sendComment(){
        if (!this.comment.trim()) {
          return;
        }
        this.$post(URL.reply, {comment: this.comment, pid: this.replyCustomer_id, goods_id: this.params.goods_id})
          .then(res => {
            if (res.errcode == 0) {
              toast(res.message);
              this.hideComment();
            } else {
              errback(res);
            }
          })
      },
      loadMore(content){
        if (content.length) {
          this.content.records.push(...content);
          this.page++
        } else {
          this.hasMore = false;
        }
      },
      goodsCollection(){
        this.$post(URL.goodsCollection, {goods_id: this.params.goods_id})
          .then(res => {
            if (res.errcode == 0) {
              toast(res.message);
              this.content.is_collection = this.content.is_collection == 0 ? 1 : 0;
            } else {
              errback(res);
            }
          })
      },
      select(type){ //type: 1:加入购物车, 2:立即购买
        this.ifShowSelect = true;
        this.buyType = type;
      },
      buy(){
        // 匹配option_id
        const specsArr = [];
        if (this.specs.length) {
          for (let i of this.specs) {
            if (!i.active_id) {
              return toast('请选择商品规格');
            }
            specsArr.push(i.active_id);
          }
          const specsStr = specsArr.join('_');
          for (let i of this.content.options) {
            if (i.specs == specsStr) {
              this.params.option_id = i.id;
              break;
            }
          }
        }

        let url, params, callback;
        switch (this.buyType) {
          // 加入购物车
          case 1:
            url = URL.addcart;
            params = this.params;
            callback = (res) => {
              if (res.errcode == 0) {
                toast(res.message);
                this.ifShowSelect = false;
              } else {
                errback(res);
              }
            };
            break;
          // 立即购买
          case 2:
            url = URL.settlement;
            console.log(this.params);
            const data = JSON.stringify([this.params]);
            params = {data, type: 1};
            callback = (res) => {
              if (res.errcode == 0) {
                res.content.type = 1;
                openPage('order_confirm', res.content);
              } else {
                errback(res);
              }
            };
            break;
        }
        this.$post(url, params)
          .then(callback);
      },
      selectSpec(spec, item_id){
        if (!spec.active_id) {
          this.$set(spec, 'active_id', item_id)
        } else {
          spec.active_id = item_id;
        }
      },
      fetch(){
        this.$post(URL.getGoodsDetail, {goods_id: this.params.goods_id})
          .then(res => {
            if (res.errcode == 0) {
              console.log(res);
              const images = [];
              for (let i of res.content.images) {
                images.push({img: i});
              }
              res.content.images = images;
              this.content = res.content;
              const {recommend_goods, specs, activity} = res.content;
              this.recommend_goods = recommend_goods;
              this.specs = specs;
              if (activity) {
                activity.date_start = Number(activity.date_start);
                activity.date_end = Number(activity.date_end);
                this.activity = activity;
                this.getNow();
                setInterval(this.getNow, 1000);
              }

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
              this.cantFind = true;
              errback(res)
            }
          })
      },
      getNow(){
        this.now = Date.parse(new Date()) / 1000;
      }
    },
    created(){
      document.title = '商品详情';
      const {goods_id, customer_id} = getSearchParams(location.search);
      this.params.goods_id = goods_id;
      if (customer_id) {
        setSession('customer_id', customer_id);
      }
      this.fetch();
    },
    components: {
      AppPermanent,
      GoodsContainer,
      Swiper,
      Popup,
      LoadMore,
      TheShade,
    }
  }
</script>
