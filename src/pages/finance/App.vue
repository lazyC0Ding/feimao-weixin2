<style type="text/less" lang="less">
  @import '../../common';

  .finance-tags {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    background-color: #000;
    color: #fff;
    font-size: .26rem;
    margin-bottom: .1rem;
    overflow: hidden;
    z-index: 10;
    > li {
      float: left;
      height: inherit;
      text-align: center;
      width: 20%;
      &.active {
        position: relative;
        font-weight: bold;
        color: #FFB305;
        &:after {
          content: " ";
          position: absolute;
          left: 50%;
          bottom: .1rem;
          width: .8rem;
          height: .04rem;
          margin-left: -.4rem;
          background-color: #FFB305;
        }
      }
    }
  }

  .finance-ul {
    background-color: #fff;
    > li {
      height: 1.2rem;
      line-height: 1.2rem;
      font-size: 0;
      .border-bottom-1px;
      overflow: hidden;
      &:last-child {
        &:after {
          width: 0;
          height: 0;
        }
      }
      > .left {
        width: 2rem;
        padding-left: .4rem;
        font-size: 18px;
        color: #D0021B;
        vertical-align: middle;
        box-sizing: border-box;
        &.is_minus {
          color: #559E00;
        }
      }
      > .main {
        line-height: normal;
        vertical-align: middle;
        font-size: .26rem;
        > .main-1 {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        > .main-2 {
          margin-top: .04rem;
          font-size: .24rem;
          color: @light;
        }
      }
      > .arrow {
        position: absolute;
        top: 50%;
        margin-top: -.12rem;
        right: .34rem;
        width: .25rem;
        height: .3rem;
      }
    }
  }
</style>
<template>
  <div style="padding-top:.9rem;">
    <ul class="finance-tags">
      <li :class="{active:params.type==0}" @click="changeType(0)">全部</li>
      <li :class="{active:params.type==1}" @click="changeType(1)">消费</li>
      <li :class="{active:params.type==2}" @click="changeType(2)">充值</li>
      <li :class="{active:params.type==3}" @click="changeType(3)">提现</li>
      <li :class="{active:params.type==4}" @click="changeType(4)">赚钱</li>
    </ul>
    <ul v-if="content" class="finance-ul">
      <li class="row" v-for="item in content" v-href="['finance_detail', {operation_id:item.operation_id}]"
          :key="item.operation_id">
        <span class="left"
              :class="{is_minus:item.is_minus == 1}">{{item.is_minus == 1 ? '-' : '+'}}{{item.amount}}</span>
        <span class="main">
          <span class="main-1">{{item.title}}</span><br>
          <span class="main-2">{{item.date_add | time}}</span>
        </span>
        <img class="arrow" src="../../assets/img/direction_right_gray.png">
      </li>
    </ul>
    <load-more
      :url="url"
      :page="params.page"
      :params="{type:params.type}"
      :callback="loadMore"
      :no-listen="!hasMore"
    ></load-more>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import LoadMore from '@c/LoadMore.vue'

  export default {
    data () {
      return {
        params: {
          type: 0,
          page: 1,
        },
        content: null,
        url: URL.finance,
        hasMore: true,
      }
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
      changeType(type){
        this.params.type = type;
        this.params.page = 1;
        this.fetch();
      },
      fetch(){
        this.$post(URL.finance, this.params)
          .then(res => {
            console.log(res)
            if (res.errcode == 0) {
              this.content = res.content;
            } else {
              errback(res);
            }
          })
      }
    },
    created(){
      document.title = '资金明细';
      const searchs = getSearchParams(location.search);
      if (searchs) {
        this.params.type = searchs.type;
//        history.replaceState(null, '', getPageName()+'.html');
      } else {
        this.params.type = getSession(getPageName()).params.type;
      }
      this.fetch();
    },
    components: {
      AppPermanent,
      LoadMore,
    }
  }
</script>
