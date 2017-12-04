<style scoped lang="less" type="text/less">
  img{
    position:fixed;
    right:.24rem;
    bottom:1.24rem;
    width:.68rem;
    height:.68rem;
  }
</style>
<template>
  <img :src="src">
</template>
<script>
  export default {
    props:{
      type:String,  //1:发帖, 2:客服
      required:true
    },
    computed:{
      src(){
        return this.type == 1
          ? './static/img/permanent_Release.png'
          : './static/img/permanent_call.png'
      }
    }
  }
</script>
