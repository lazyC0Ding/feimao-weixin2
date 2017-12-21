<style type="text/less" lang="less">
  @import '../../common';
  .address_edit-ul {
    overflow:hidden;
    > li {
      margin-top: .2rem;
      background-color: #FFF;
      overflow:hidden;
      > .info {
        padding:0 .3rem;
        overflow:hidden;
        .border-bottom-1px;
        >.info-1 {
          margin-top:.3rem;
          >span{
            &:nth-child(2) {
              font-size:.26rem;
            }
          }
        }
        >.info-2{
          margin-top:.14rem;
          margin-bottom:.34rem;
          font-size:.26rem;
          color:@light;
        }
      }
      >.action{
        height:.9rem;
        line-height:.9rem;
        padding:0 .3rem;
        >span {
          .span-bg-icon(.26rem, left);
          &.action-1 {
            float:left;
            background-image: url(../../assets/img/selected_off.png);
            background-size:.32rem .32rem;
            padding-left:.42rem;
            &.on{
              background-image: url(../../assets/img/selected_on.png);
            }
          }
          &.action-3 {
            float:right;
            margin-left:.4rem;
            background-image: url(../../assets/img/address_edit.png);
            background-size:.3rem .3rem;
          }
          &.action-2 {
            float:right;
            background-image: url(../../assets/img/address_del.png);
            background-size:.3rem .3rem;

          }
        }
      }
    }
  }
</style>
<template>
  <div style="padding-top:.7rem;">
    <span class="btn-corner" v-href="'address_add'">新增</span>
    <ul class="address_edit-ul">
      <li v-for="(item, index) in content" :key="item.address_id">
        <div class="info">
          <div class="info-1">
            <span>{{item.name}}</span>
            <span>{{item.phone}}</span>
          </div>
          <div class="info-2">{{item.province}}{{item.city}}{{item.district}}{{item.address}}</div>
        </div>
        <div class="action">
          <span class="action-1" @click="editStatus(item)" :class="{on:item.status == 1}">默认地址</span>
          <span class="action-3" @click="deleteAddress(item.address_id, index)">删除</span>
          <span class="action-2" v-href="['address_add', item]">编辑</span>
        </div>
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
        content: [],
      }
    },
    methods: {
      deleteAddress(address_id, index){
        myConfirm('确认删除该地址吗?', () => {
          this.$post(URL.deleteAddress, {address_id})
            .then ( res => {
              console.log(res);
              if(res.errcode == 0) {
                this.content.splice(index, 1);
                toast(res.message);
              }else{
                errback(res);
              }
            })
        });
      },
      editStatus(item){
        this.$post(URL.editStatus, {address_id: item.address_id})
          .then ( res => {
              if(res.errcode == 0) {
                console.log(res)
                for (let i of this.content) {
                  i.status = i.address_id === item.address_id ? 1 : 0;
                }
              }else{
                errback(res);
              }
          })
      },
      fetch(){
        this.$post(URL.getAllAddress)
          .then(res => {
            if (res.errcode == 0) {
              console.log(res);
              this.content = res.content;
            } else {
              errback(res);
            }
          })
      }
    },
    created(){
      document.title = '收货地址管理';
      this.fetch();
    },
    components: {
      AppPermanent
    }
  }
</script>
