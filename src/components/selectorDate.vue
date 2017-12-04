<style scoped lang="less" type="text/less">
  .vux-cell-box.picker:before {
    border: none;
    width: 0;
    height: 0;
  }
</style>
<template>
  <popup-picker @on-shadow-change="change" class="picker" title="出生日期" :data="list" v-model="currentDate" placeholder="请选择"/>
</template>
<script>
  import { PopupPicker } from 'vux'
  export default {
    data(){
      return {
        years:[],
        months:[],
        dates:[],
        currentDate: [],
      }
    },
    computed:{
      list(){
        return [this.years, this.months, this.dates]
      }
    },
    methods:{
      change(ids, names){
        let date = new Date(ids[0], ids[1], 0).getDate();
        this.dates = [];
        for ( let i=1; i<=date; i++) {
          this.dates.push(i)
        }
      }
    },
    created(){
      let year = 1950;
      while (year <= 2017) {
        this.years.push(year++)
      }
      let month = 1;
      while (month <= 12) {
        this.months.push(month++)
      }
      let date = 1;
      while (date <= 31) {
        this.dates.push(date++)
      }
    },
    components: {
      PopupPicker
    }
  }
</script>
