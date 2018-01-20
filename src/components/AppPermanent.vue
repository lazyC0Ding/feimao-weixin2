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
      type:[String, Number],  //1:发帖, 2:客服
      required:true
    },
    computed:{
      src(){
        switch (this.type){
          case '1':
            return './static/img/permanent_Release.png';
          case '2':
            return './static/img/permanent_call.png';
          case '3':
            return './static/img/icon_toIndex.png'

        }
      }
    }
  }
</script>
