<style type="text/less" lang="less">
  @import '../../common';

  .orders-tags {
    .tags(5);
    margin-bottom: 0;
  }

  .orders-container {
    > li {
      margin-top: .1rem;
      background-color: #fff;
      > .top {
        height: .8rem;
        line-height: .8rem;
        font-size: .24rem;
        padding: 0 .26rem 0 .22rem;
        overflow: hidden;
        .border-bottom-1px;
        > span {
          &:first-child {
            float: left;
          }
          &:last-child {
            float: right;
            color: #FFB305;
          }
        }
      }
      > .bottom {
        padding: 0 .26rem 0 .22rem;
        > .total {
          height: .8rem;
          line-height: .8rem;
          text-align: right;
          overflow: hidden;
          font-size: .26rem;
          > span {
            font-size: .32rem;
          }
        }
        > .action {
          height: .8rem;
        }
      }
    }
  }

  .orders-btn {
    float: right;
    margin-left: .3rem;
    width: 1.32rem;
    height: .48rem;
    line-height: .48rem;
    text-align: center;
    font-size: .24rem;
    border: 1px solid #111;
  }

  .nothing {
    margin-top: 2rem;
    text-align: center;
    color: @light;
    font-size: .28rem;
    img {
      width: 3rem;
      height: 3rem;
    }
  }
</style>
<template>
  <div style="padding-top:.9rem;padding-bottom:.8rem;" v-if="content">
    <search-input v-model="key" placeholder="请输入要搜索的订单" :callback="fetch">
      <a @click="fetch">搜索</a>
    </search-input>
    <ul class="orders-tags">
      <li :class="{active:params.state == 0}" @click="changeState(0)">全部</li>
      <li :class="{active:params.state == 1}" @click="changeState(1)">待付款</li>
      <li :class="{active:params.state == 2}" @click="changeState(2)">待发货</li>
      <li :class="{active:params.state == 3}" @click="changeState(3)">待收货</li>
      <li :class="{active:params.state == 4}" @click="changeState(4)">待评价</li>
    </ul>
    <div v-show="!content.length" class="nothing">
      <div>
        <img src="../../assets/img/Tip_nothing.png">
      </div>
      <div>暂无订单</div>
    </div>
    <ul class="orders-container">
      <li v-for="(item, index) in content" :key="item.order_sn">
        <div class="top">
          <span>{{item.date_add | time}}</span>
          <span>{{item.state}}</span>
        </div>
        <goods-list v-href="['order_detail', {order_sn:item.order_sn}]" :goods="item.goods" cantOpenGoods></goods-list>
        <div class="bottom">
          <div class="total">共{{item.goods_count}}件商品，合计<span>¥{{item.order_amount}}</span>（含运费¥{{item.express_amount}}）
          </div>
          <div class="action" v-if="item.order_state == 1">
            <span class="orders-btn" v-href="['pay', {order_sn:item.order_sn, order_amount:item.order_amount}]">立即付款</span>
            <span class="orders-btn" @click="cancel(item.order_sn, index)">取消订单</span>
          </div>
          <div class="action" v-else-if="item.order_state == 3">
            <span class="orders-btn" @click="delivery(item)">确认收货</span>
            <span class="orders-btn" v-if="item.express_type != 2" v-href="['logistics', {order_sn:item.order_sn}]">查看物流</span>
          </div>
          <div class="action" v-else-if="item.order_state == 4">
            <span class="orders-btn" @click="comment(item)">去评价</span>
            <span class="orders-btn" v-if="item.express_type != 2" v-href="['logistics', {order_sn:item.order_sn}]">查看物流</span>
            <span class="orders-btn" @click="deleteOrder(item.order_sn, index)">删除订单</span>
          </div>
          <div class="action" v-else-if="item.order_state == 5 || item.order_state == 6">
            <span class="orders-btn" @click="deleteOrder(item.order_sn, index)">删除订单</span>
          </div>
        </div>
      </li>
    </ul>
    <load-more
      :url="url"
      :page="params.page"
      :params="loadMoreParams"
      :callback="loadMore"
      :no-listen="!hasMore"
    ></load-more>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import SearchInput from '@c/SearchInput.vue'
  import GoodsList from '@c/GoodsList.vue'
  import LoadMore from '@c/LoadMore.vue'
  export default {
    data () {
      return {
        params: {
          state: 0,
          page: 1,
        },
        key:'',
        content: null,
        url:URL.getOrders,
        hasMore:true,
      }
    },
    computed: {
      loadMoreParams(){
        const json = {
          state:this.params.state,
        };
        if(this.key) json.key = this.key;
        return json;
      },
      fetchParams(){
        if (this.key)  return Object.assign({key: this.key}, this.params);
        return this.params;
      },
    },
    methods: {
      loadMore(content){
        if(content.length) {
          this.content.push(...content);
          this.params.page++;
        }else{
          this.hasMore = false;
        }
      },
      cancel(order_sn, index){
        myConfirm('确定取消订单?', () => {
          this.$post(URL.cancel, {order_sn})
            .then ( res => {
              console.log(res);
              if(res.errcode == 0) {
                this.content.splice(index, 1);
              }else{
                errback(res);
              }
            })
        });

      },
      deleteOrder(order_sn, index){
        myConfirm('确定删除订单?', () => {
          this.$post(URL.deleteOrder, {order_sn})
            .then ( res => {
              console.log(res)
              if(res.errcode == 0) {
                this.content.splice(index, 1);
              }else{
                errback(res);
              }
            })
        });
      },
      delivery(item){
        myConfirm('是否确定收货?', () => {
          this.$post(URL.delivery, {order_sn:item.order_sn})
            .then ( res => {
              console.log(res)
              if(res.errcode == 0) {
                item.order_state = 4;
                toast('收货成功');
                setTimeout(() => {
                  this.comment(item);
                }, 500);
              }else{
                errback(res)
              }
            })
        });
      },
      comment(item){
        setSession('order_comment', {goods:item.goods, order_sn:item.order_sn});
        openPage('order_comment');
      },
      changeState(state){
        this.params.state = state;
        this.params.page = 1;
        this.fetch();
      },
      fetch(){
        this.$post(URL.getOrders, this.fetchParams)
          .then(res => {
            console.log(res)
            if (res.errcode == 0) {
              this.content = res.content;
            } else {
              errback(res);
            }
          })
      },
    },
    created(){
      document.title = '我的订单';
      const searchs = getSearchParams(location.search);
      if (searchs) {
        this.params.state = searchs.state;
      }else{
        this.params.state = getSession(getPageName()).params.state;
      }
      this.fetch();
    },
    components: {
      AppPermanent,
      SearchInput,
      GoodsList,
      LoadMore,
    }
  }
</script>
