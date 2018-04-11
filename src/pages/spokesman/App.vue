<style type="text/less" lang="less">
  @import '../../common';
  .spokesman-top{
    height:3rem;
    background-color:#000;
    overflow:hidden;
    >div{
      margin-top:.6rem;
      height:1.8rem;
      line-height:1.8rem;
      font-size:0;
      >.avatar{
        float:left;
        margin-left:.4rem;
        width:1.8rem;
        height:1.8rem;
        border-radius: 50%;
      }
      >.text{
        margin-left:.32rem;
        width:4rem;
        color:#fff;
        overflow:hidden;
        font-size:.32rem;
        vertical-align: middle;
        line-height:normal;
        >.text-1{
          width:100%;
          overflow:hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size:.36rem;
        }
        >.text-2{
          width:100%;
          margin-top:.14rem;
          margin-bottom:-.1rem;
          font-size:.24rem;
          overflow:hidden;
          >span{
            &:nth-child(2) {
              float:right;
            }
          }
        }
        >.text-3{
          width:100%;
          height:.24rem;
          border-radius: .16rem;
          background-color: #5B5B5B;
          overflow:hidden;
          >span{
            vertical-align:top;
            height:100%;
            background-image: linear-gradient(-90deg, #FFB305 0%, #FF4A4A 100%);
            border-radius: 6px 0 0 6px;
          }
        }
      }
    }
  }

  .explain{
    height:.6rem;
    line-height:.6rem;
    font-size:.24rem;
    padding:0 .26rem;
    overflow:hidden;
    background-color:#eee;
    >span {
      float:right;
      color:@light;
      .span-bg-icon(.24rem, right);
      background-image:url(../../assets/img/direction_right_gray.png)
    }
  }

  .spokesman-info {
    background-color: #fff;
    .ul-horizontal(1.4rem, 3);
    box-sizing: border-box;
    .border-bottom-1px;
    > li {
      padding-top: .28rem;
      line-height: normal;
      text-align: center;
      box-sizing: border-box;
      &:nth-child(1), &:nth-child(2) {
        > dl {
          position: relative;
          &:after {
            content: " ";
            position: absolute;
            right: 0;
            bottom: 0;
            width: 1px;
            height: .6rem;
            background-color: #ddd;
          }
        }
      }
      dd {
        font-size: .22rem;
        color: @light;
      }
    }
  }

  .recent-consume{
    padding:0 .26rem;
    height:1rem;
    line-height:1rem;
    font-size:.28rem;
    background-color:#fff;
    overflow:hidden;
    >span:nth-child(2) {
      float:right;
    }
  }

  .fans-ul {
    margin-top:.1rem;
    .row-container(1rem, .26rem);
    >.row{
      >.right{
        color:@light;
      }
      >.icon{
        border-radius: 50%;
      }
      >.title{
        max-width:2rem;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
<template>
  <div v-if="content">
    <div class="spokesman-top">
      <div>
        <img class="avatar" v-avatar="content.avater">
        <span class="text">
          <span class="text-1">{{content.nickname}}</span><br>
          <span class="text-2">
            <span>累计消费额</span>
            <span>{{isSpokesman ? '已达成' : content.current_consum + '/' + Number(content.spokesman_setting.spokesman_total).toFixed(2)}}</span>
          </span><br>
          <span class="text-3"><span :style="{width:isSpokesman ? '100%' : content.process * 100 + '%'}"></span></span>
        </span>
      </div>
    </div>
    <div class="explain">
      一次性消费{{content.spokesman_setting.spokesman_one}}或累计消费{{content.spokesman_setting.spokesman_total}}元即可成为代言人
      <span v-href="content.spokesman_detail">详情</span>
    </div>
    <ul class="spokesman-info">
      <li>
        <dl>
          <dt>{{content.commission}}</dt>
          <dd>奖励金</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>{{content.sale_amount}}</dt>
          <dd>销售额</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>{{content.fans_count}}</dt>
          <dd>粉丝数</dd>
        </dl>
      </li>
    </ul>
    <div v-if="content.last_consum_time" class="recent-consume">
      <span>最近消费时间</span>
      <span>{{last_consum_time}}天前</span>
    </div>
    <ul class="fans-ul" v-if="content.fans.length">
      <li class="row">
        <span class="title" style="font-size:.32rem;">粉丝列表</span>
      </li>
      <li class="row" v-for="fan in content.fans">
        <img class="icon left" v-avatar="fan.avater">
        <span class="title">{{fan.nickname}}</span>
        <span class="right">{{fan.date_add | time_2}}</span>
      </li>
    </ul>
    <load-more
      :url="url"
      :page="page"
      :callback="loadMore"
      :no-listen="!hasMore"
    ></load-more>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import LoadMore from '@c/LoadMore.vue'

  /*
  * content.identity:
  * 1:普通用户
  * 2:代言人
  * 3:特约代言人
  * 4:A级代理商
  * 5:B级代理商
  * 6:供应商*/
  export default {
    data () {
      return {
        content:null,
        url:URL.getFans,
        page:1,
        hasMore:true,
      }
    },
    computed:{
      isSpokesman(){
        if(this.content) {
          return [2,3,6].includes(this.content.identity * 1);
        }
      },
      last_consum_time(){
        if(!this.content) return;
        const now = Date.parse(new Date()) / 1000;
        return Math.round((now-Number(this.content.last_consum_time)) / 86400);
      },
    },
    methods: {
      loadMore(content){
        if(content.length) {
          this.content.fans.push(...content);
          this.page++;
        }else{
          this.hasMore = false;
        }
      },
      fetch(){
        this.$post(URL.spokesman)
          .then ( res => {
            console.log(res)
            if(res.errcode == 0) {
              this.content = res.content;
            }else{
              errback(res);
            }
          })
      }
    },
    created(){
      document.title = '我是代言人';
      this.fetch();
    },
    components: {
      AppPermanent,
      LoadMore,
    }
  }
</script>
