<style type="text/less" lang="less">
  @import '../../common';
  .finance_detail-top{
    height:3.2rem;
    background-color:#fff;
    overflow:hidden;
    text-align:center;
    >.top-1{
      margin-top:.5rem;
      font-size:.28rem;
    }
    >.top-2{
      margin-top:.34rem;
      font-size: 50px;
      color: #D0021B;
      &.is_minus{
        color: #559E00;
      }
    }
    >.state{
      position:absolute;
      top:.4rem;
      right:.3rem;
      color: #D0021B;
    }
  }

  .finance_detail-ul{
    margin-top:.2rem;
    background-color:#fff;
    font-size:.28rem;
    >li{
      height:.9rem;
      line-height:.9rem;
      .border-bottom-1px;
      >.title{
        padding-left:.26rem;
        width:1.68rem;
        color:@light;
      }
    }
  }
</style>
<template>
  <div v-if="content">
    <div class="finance_detail-top">
      <div class="top-1">消费金额(元)</div>
      <div class="top-2" :class="{is_minus:content.is_minus == 1}">{{content.is_minus == 1 ? '-' : '+'}}{{content.amount}}</div>
      <span class="state">{{state}}</span>
    </div>
    <ul class="finance_detail-ul">
      <li>
        <span class="title">说明</span>
        {{content.title}}
      </li>
      <li>
        <span class="title">交易时间</span>
        {{content.date_add | time}}
      </li>
      <li>
        <span class="title">订单号</span>
        {{content.order_sn}}
      </li>
    </ul>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  export default {
    data () {
      return {
        operation_id:'',
        content:null,
      }
    },
    computed:{
      state(){
        switch (this.content.state) {
          case '1':
            return '审核中';
          case '2':
            return '交易失败';
          case '3':
            return '交易成功';
        }
      }
    },
    methods: {
      fetch(){
        this.$post(URL.financeDetail, {operation_id:this.operation_id})
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
      document.title = '资金详情';
      this.operation_id = getSearchParams(location.search).operation_id;
      this.fetch();
    },
    components: {
      AppPermanent
    }
  }
</script>
