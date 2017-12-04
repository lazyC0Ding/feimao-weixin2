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
        content: [],
      }
    },
    methods: {
      fetch(){

      }
    },
    created(){
      document.title = '系统通知';
    },
    components: {
      AppPermanent
    }
  }
</script>
