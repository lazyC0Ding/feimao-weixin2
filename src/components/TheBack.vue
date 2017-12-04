<style scoped lang="less" type="text/less">
  img{
    float:left;
    width:.42rem;
    margin-left:.2rem;
    margin-top:.3rem;
  }
</style>
<template>
  <img @click="back" v-src="'./static/img/back_black'">
</template>
<script>
  export default {
    data(){
      return {}
    },
    methods:{
      back(){
        window.history.go(-1);
      }
    },
    components: {

    }
  }
</script>
