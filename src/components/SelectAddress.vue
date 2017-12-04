<style lang="less" type="text/less">
  .weui-cells.vux-no-group-title:before {
    content:'';
    width:0;
    height:0;
    border: none;
  }

  .weui-cells .vux-cell-box:before {
    content:'';
    width:0;
    height:0;
    border: none;
  }

  .weui-cells.vux-no-group-title {
    margin: 0;
  }

  .vux-cell-box .weui-cell {
    padding: .26rem .1rem;
    border-bottom:1px solid #e4e4e4;
  }

  .vux-popup-picker-value.vux-cell-value{
    font-size:.3rem;
  }

  .vux-popup-picker-placeholder.vux-cell-placeholder{
    font-size:.3rem;
  }
</style>
<template>
  <group>
    <x-address
      title="所在地区"
      @on-shadow-change="change"
      v-model="currentCity"
      raw-value
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
  import myCities from 'assets/myCities.json'

  export default {
    data(){
      return {
        cities: myCities,
        currentCity: [],
      }
    },
    methods: {
      change(ids, names) {
        console.log(names)
      },
    },
    components: {
      Group,
      XAddress
    }
  }
</script>
