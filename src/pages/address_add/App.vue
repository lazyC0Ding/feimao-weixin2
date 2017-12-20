<style type="text/less" lang="less">
  @import '../../common';

  .address_add-ul {
    margin-top: .2rem;
    .row-container(1rem, .28rem);
    > .row {
      .title {
        &.input {
          width: 1.6rem;
          & + input {
            float: left;
            height: 100%;
            font-size: .28rem;
            &::placeholder {
              color: @light;
            }
          }
        }
      }
    }
    > .row-textarea {
      background-color: #fff;
      padding: .3rem 0;
      > textarea {
        display: block;
        width: 100%;
        min-height: 1.4rem;
        box-sizing: border-box;
        padding: 0 .3rem;
        outline: none;
        resize: none;
        font-size: .28rem;
        &::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
        &::placeholder {
          color: @light;
        }
      }
    }
  }

  .address_add-ul-single {
    margin-top: .2rem;
    .row-container(.9rem, .26rem);
    .right {
      width: .32rem;
      height: .32rem;
      margin-top: .29rem;
      background-image: url(../../assets/img/selected_off.png);
      background-size: 100% 100%;
      &.on {
        background-image: url(../../assets/img/selected_on.png);
      }
    }
  }
</style>
<template>
  <div>
    <ul class="address_add-ul">
      <li class="row">
        <span class="title input">收货人</span>
        <input v-model="name" placeholder="请输入收货人姓名">
      </li>
      <li class="row">
        <span class="title input">联系电话</span>
        <input v-model="phone" placeholder="请输入联系电话">
      </li>
      <select-address :province="province" :city="city" :district="district"
                      @updateAddress="updateAddress"></select-address>
      <li class="row-textarea">
        <textarea v-model="address" placeholder="详细地址"></textarea>
      </li>
    </ul>
    <ul class="address_add-ul-single">
      <li class="row" @click="status = status == 1 ? 0 : 1">
        <span class="title">设置默认地址</span>
        <span class="right" :class="{on:status == 1}"></span>
      </li>
    </ul>
    <div class="btn-big" style="margin-top:.6rem;" @click="save">保存</div>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import SelectAddress from '@c/SelectAddress.vue'
  export default {
    data () {
      return {
        province: '',
        city: '',
        district: '',
        address: '',
        name: '',
        phone: '',
        status: 0,
        address_id: 0,
      }
    },
    methods: {
      save(){
        const params = Object.assign({}, this._data);
        if(this.address_id === 0) {
          delete params.address_id;
        }
        this.$post(URL.saveAddress, params)
          .then(res => {
            if (res.errcode == 0) {
              replacePage(document.referrer);
            } else {
              errback(res);
            }
          })
      },
      updateAddress(addressArr){
        const [province, city, district] = addressArr;
        this.province = province;
        this.city = city;
        this.district = district || '';
      },
    },
    created(){
      const params = getSearchParams(location.search);
      if (params) {
        document.title = '编辑收货地址';
        for (let i in this._data) {
          this._data[i] = params[i];
        }
      } else {
        document.title = '新增收货地址';
      }
    },
    components: {
      AppPermanent,
      SelectAddress,
    }
  }
</script>
