<style type="text/less" lang="less">
  @import '../../common';

  .refund_detail-ul {
    > li {
      > .time {
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        font-size: .24rem;
        color: @light;
      }
      > .text {
        margin: 0 .48rem;
        background-color: #fff;
        > .title {
          padding: 0 .2rem 0 .3rem;
          height: .8rem;
          line-height: .8rem;
          .border-bottom-1px;
          > .title-1 {
            font-size: .28rem;
            float: left;
          }
          > .title-2 {
            color: @light;
            float: right;
            .span-bg-icon(.24rem, right);
            background-image: url(../../assets/img/direction_right_gray.png);
          }
        }
        > .content {
          font-size: .24rem;
          padding: .16rem .2rem .24rem .3rem;
          > div {
            margin-top: .1rem;
          }
          .imageCount {
            color: #0c68a0;
          }
        }
      }
    }
  }

  .refund_detail-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background-color: #fff;
    text-align: right;
    > span {
      margin-right: .2rem;
      height: .68rem;
      line-height: .68rem;
      padding: 0 .36rem;
      box-sizing: border-box;
      border: 0.5px solid #111;
    }
  }
</style>
<template>
  <div v-if="content" style="padding-bottom:1.2rem;">
    <ul class="refund_detail-ul">
      <li v-for="item in content.messages" :key="item.id">
        <div class="time">{{item.date_add | time}}</div>
        <div class="text">
          <div class="title">
            <span class="title-1">{{item.title}}</span>
            <span class="title-2" v-if="item.out_refund_sn" v-href="['refund_applyDetail', {refund_sn:item.refund_sn, return_message_id:item.id}]">查看申请详情</span>
          </div>
          <div class="content">
            <div>{{item.content}}</div>
            <template v-if="item.refund_state == 1">
              <div>商品状态：{{item.order_state}}</div>
              <div>退款金额：¥{{item.price}}</div>
              <div>售后原因：{{item.reason}}
                <span class="imageCount" v-if="item.imageCount > 0">[{{item.imageCount}}张图片]
                </span>
              </div>
            </template>
            <template v-if="item.refund_state == 2">
              <div>地址：{{item.address}}</div>
              <div>收件人：{{item.name}}</div>
              <div>电话：{{item.phone}}</div>
            </template>
            <template v-else-if="item.refund_state == 3">
              <div>拒绝原因：{{item.reason}}</div>
            </template>
            <template v-else-if="item.refund_state == 4">
              <div>快递公司：{{item.express}}</div>
              <div>快递单号：{{item.express_sn}}</div>
            </template>
            <template v-else-if="item.refund_state == 5">
              <div>退款金额：¥{{item.price}}</div>
            </template>
          </div>
        </div>
      </li>
    </ul>
    <div class="refund_detail-footer" v-if="content.refund_state == 1">
      <span @click="cancel">取消申请</span>
    </div>
    <div class="refund_detail-footer" v-else-if="content.refund_state == 2">
      <span @click="openRefund_express">上传快递单号</span>
    </div>
    <div class="refund_detail-footer" v-else-if="content.refund_state == 3">
      <span v-href="['refund_apply', {refund_sn:refund_sn, goods:goods}]">再次申请</span>
    </div>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  export default {
    data () {
      return {
        refund_sn: '',
        goods: null,
        content: null,
      }
    },
    methods: {
      openRefund_express(){
        let name, address;
        for (let i of this.content.messages) {
          if(i.refund_state == 2) {
            name = i.name;
            address = i.address;
            break;
          }
        }
        setSession('refund_express', {address, name, refund_sn: this.refund_sn});
        openPage('refund_express')
      },
      cancel(){
        myConfirm('是否确认取消退款?', () => {
          this.$post(URL.cancal_refund, {refund_sn: this.content.refund_sn})
            .then(res => {
              console.log(res)
              if (res.errcode == 0) {
                toast('取消退款申请成功');
                history.go(-1);
              } else {
                errback(res);
              }
            })
        });
      },
      fetch(){
        this.$post(URL.getRefundDetails, {refund_sn: this.refund_sn})
          .then(res => {
            console.log(res.content)
            if (res.errcode == 0) {
              this.content = res.content;
            } else {
              errback(res)
            }
          })
      }
    },
    created(){
      document.title = '售后详情';
      const {refund_sn, goods} = getSearchParams(location.search);
      this.refund_sn = refund_sn;
      this.goods = goods;
      this.fetch();
    },
    components: {
      AppPermanent
    }
  }
</script>
