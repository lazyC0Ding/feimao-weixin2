<style lang="less" type="text/less">
  .weui-cells.vux-no-group-title:before {
    content: '';
    width: 0;
    height: 0;
    border: none;
  }

  .weui-cells .vux-cell-box:before {
    content: '';
    width: 0;
    height: 0;
    border: none;
  }

  .weui-cells.vux-no-group-title {
    margin: 0;
  }

  .vux-cell-box .weui-cell {
    padding: .26rem .32rem;
    border-bottom: 1px solid #e4e4e4;
  }

  .vux-popup-picker-value.vux-cell-value {
    font-size: .3rem;
  }

  .vux-popup-picker-placeholder.vux-cell-placeholder {
    font-size: .3rem;
  }
</style>
<template>
  <group>
    <x-address
      title="所在地区"
      @on-shadow-change="change"
      v-model="currentCity"
      :list="cities"
      placeholder="请选择"
    >
      <template slot="title" slot-scope="props">
            <span style="height:24px;">
              <span style="vertical-align:middle;font-size:.3rem;">所在地区</span>
            </span>
      </template>
    </x-address>
  </group>
</template>
<script>
  import {Group, XAddress} from 'vux'
  import myCities from '@a/myCities.json'

  export default {
    props: ['province', 'city', 'district'],
    data(){
      return {
        currentCity: [],
        cities: myCities,
      }
    },
    methods: {
      change(ids, names) {
        console.log(ids)
        console.log(names)
        this.$emit('updateAddress', names);
      },
    },
    created(){
      let province_id, city_id, district_id;
      // 循环可优化
      for (let i of this.cities) {
        if (i.name === this.province && !i.parent) {
          province_id = i.value;
          break;
        }
      }

      for (let i of this.cities) {
        if(i.name === this.city && i.parent === province_id) {
          city_id = i.value;
          break;
        }
      }

      for (let i of this.cities) {
        if(i.name === this.district && i.parent === city_id) {
          district_id = i.value;
          break;
        }
      }
      this.currentCity = [province_id, city_id, district_id];
    },
    components: {
      Group,
      XAddress
    }
  }
</script>
