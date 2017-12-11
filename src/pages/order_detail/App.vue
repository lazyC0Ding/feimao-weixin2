<style type="text/less" lang="less">

</style>
<template>
  <div>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  export default {
    data () {
      return {
        content:{},
      }
    },
    methods: {

    },
    created(){
      document.title = '订单详情';
      console.log(getSearchParams(location.search));
    },
    components: {
      AppPermanent
    }
  }
</script>
