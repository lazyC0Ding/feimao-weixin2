<style type="text/less" lang="less">
  @import '../../common';
  .order_detail-top {
    height: 2rem;
    line-height: 2rem;
    background-color: #000;
    color: #fff;
    font-size: 0;
    overflow: hidden;
    > img {
      margin-left: .7rem;
      margin-right: .5rem;
      width: 1.2rem;
      height: 1.2rem;
      vertical-align: middle;
    }
    > span {
      font-size: .3rem;
      vertical-align: middle;
      line-height: normal;
      > .span-2 {
        margin-top: .1rem;
        font-size: .24rem;
      }
    }
  }

  .line{
    position: relative;
    display: inline-block;
    width: .22rem;
    height: .22rem;
    border-radius: 50%;
    background-color: #ddd;
    &:before{
      content: " ";
      position: absolute;
      left: 50%;
      bottom: 100%;
      width: 1px;
      height: .36rem;
      background-color: #EEEEEE;
    }
    &:after{
      content: " ";
      position: absolute;
      left: 50%;
      top: 100%;
      width: 1px;
      height: 1.22rem;
      background-color: #EEEEEE;
    }
  }

  .logistics-ul{
    margin-top:.1rem;
    background-color:#fff;
    overflow:hidden;
    >li{
      position:relative;
      overflow:hidden;
      padding-top:.28rem;
      >.line{
        float:left;
        margin:.04rem .26rem 0 .42rem;
      }
      >.data{
        overflow:hidden;
        padding-right:.47rem;
        padding-bottom: .34rem;
        .border-bottom-1px;
        >.time{
          font-size:.24rem;
          color:@light;
        }
        >.context{
          margin-top:.1rem;
          font-size:.26rem;
        }
      }
      &:first-child{
        >.line{
          background-color: #FFB305;
          &:before{
            width:0;
            height:0;
          }
        }
      }
      &:last-child{
        >.line{
          &:after{
            width:0;
            height:0;
          }
        }
      }
    }
  }
</style>
<template>
  <div>
    <template v-if="content">
      <div class="order_detail-top">
        <img src="../../assets/img/Orderdet_shouhuo.png">
        <span>
        <span class="span-1">承运公司：{{content.com_zn}}</span><br>
        <span class="span-2">运单编号：{{content.nu}}</span>
      </span>
      </div>
      <ul class="logistics-ul">
        <li v-for="item in content.data">
          <span class="line"></span>
          <div class="data">
            <div class="time">{{item.time}}</div>
            <div class="context">{{item.context}}</div>
          </div>
        </li>
      </ul>
    </template>
    <div v-if="cantFind" class="tip-nothing" style="margin-top:2rem;">
      <img src="../../assets/img/Tip_nothing.png">
      <div>暂无物流信息</div>
    </div>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  export default {
    data () {
      return {
        search:null,
        content:null,
        cantFind:false,
      }
    },
    methods: {
      fetch(){
        this.$post(URL.getLogistics, {order_sn:this.search.order_sn})
          .then ( res => {
            console.log(res);
            if(res.errcode == 0) {
              this.content = res.content;
            }else{
              this.cantFind = true;
              errback(res);
            }
          })
      }
    },
    created(){
      document.title = '物流信息';
      this.search = getSearchParams(location.search);
      this.fetch();
    },
    components: {
      AppPermanent
    }
  }
</script>
