<style scoped lang="less" type="text/less">
  div{
    position:fixed;
    top:.1rem;
    right:.1rem;
    width:1rem;
    height:.618rem;
    line-height:.618rem;
    text-align:center;
    background-color:#000;
    color:#fff;
    font-size:.28rem;
    z-index:100;
  }
</style>
<template>
  <div @click="deleteMessages">清空</div>
</template>
<script>
  export default {
    props:{
      type:{
        type:[String,Number],
        required:true,
      },
      callback:Function,
    },
    data(){
      return {}
    },
    methods:{
      deleteMessages(){
        this.$post(URL.deleteMessages, {type:this.type})
          .then ( res => {
            if(res.errcode == 0) {
              this.callback();
            }else{
              errback(res);
            }
          })
      }
    },
    components: {}
  }
</script>
