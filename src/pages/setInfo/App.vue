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

      }
    },
    methods: {

    },
    created(){
      document.title = '完善信息';
    },
    components: {
      AppPermanent
    }
  }
</script>
