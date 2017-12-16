<style type="text/less" lang="less">
  @import '../../common';

  .address_list-ul{
    >li{
      padding:0 .28rem;
      margin-top:.1rem;
      height:1.6rem;
      line-height:1.6rem;
      background-color:#fff;
      font-size:0;
      >span{
        line-height:normal;
        vertical-align: middle;
        >.a{
          line-height:.44rem;
          >span{
            vertical-align: middle;
            &:nth-child(1) {
              margin-right:.2rem;
              padding:0 .14rem;
              background-color:#000;
              color:#FFB305;
              font-size:.24rem;
              border-radius: .06rem;
            }
            &:nth-child(2) {
              margin-right:.2rem;
              font-size:.32rem;
            }
            &:nth-child(3) {
              font-size:.26rem;
              &:before{
                content: '';
                font-size:.32rem;
              }
            }
          }
        }
        >.b{
          margin-top:.1rem;
          color:@light;
          font-size:.26rem;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
</style>
<template>
  <div style="padding-top:.74rem;">
    <span class="btn-corner" v-href="'address_add'">新增</span>
    <ul class="address_list-ul">
      <li @click="selectAddress(address)" v-for="address in content" :key="address.address_id">
        <span>
          <span class="a">
            <span v-show="address.status == 1">默认</span>
            <span>{{address.name}}</span>
            <span>{{address.phone}}</span>
          </span><br>
          <span class="b">{{address.province}}{{address.city}}{{address.district}}{{address.address}}</span>
        </span>
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
        content:[],
      }
    },
    methods: {
      selectAddress(address){
        this.$setData('order_confirm', 'address', address);
        replacePage('order_confirm', getSession('order_confirm'));
      },
      fetch(){
        this.$post(URL.getAllAddress)
          .then ( res => {
            if(res.errcode == 0) {
              console.log(res.content);
              this.content = res.content;
            }else{
              errback(res)
            }
          })
      },
    },
    created(){
      document.title = '选择收货地址';
      this.fetch();
    },
    components: {
      AppPermanent
    }
  }
</script>
