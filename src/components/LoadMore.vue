<style scoped lang="less" type="text/less">

</style>
<template>
  <div>

  </div>
</template>
<script>
  export default {
    data(){
      return {

      }
    },
    methods:{
      doScroll(){
        if (document.body.scrollTop + window.innerHeight >= document.body.scrollHeight) {
          if (!this.busy) {
            this.loadMore();
          }
        }
      }
    },
    mounted(){
      window.addEventListener('scroll', this.doScroll);
    },
    components: {}
  }
</script>
