<style scoped lang="less" type="text/less">
  .shade {
    position: fixed;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    z-index:5;
  }
</style>
<template>
  <div class="shade">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    data(){
      return {}
    },
    mounted(){
      this.$nextTick( () =>{
        this.$el.ontouchmove = function (e) {
          e.preventDefault();
        }
      })
    },
  }
</script>
