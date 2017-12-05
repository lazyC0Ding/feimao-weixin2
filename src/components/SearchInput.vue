<style lang="less" type="text/less">
  .searchInput {
    position:fixed;
    width:100%;
    top:0;
    left:0;
    overflow: hidden;
    height: .9rem;
    line-height:.9rem;
    font-size:.28rem;
    background-color:#000;
    color:#fff;
    z-index:10;
    >div{
      display: inline-block;
      margin-left:.16rem;
      width:6.6rem;
      height:.6rem;
      padding:0 .74rem;
      box-sizing: border-box;
      background:#444 url(./img/SearchInput-icon.png) no-repeat .26rem center;
      background-size:.32rem .32rem;
      vertical-align: middle;
      > input {
        float: left;
        height: inherit;
        line-height: normal;
        font-size:.28rem;
        color:#fff;
        &::placeholder{
          color:#fff;
        }
      }
      >img{
        position:absolute;
        right:.22rem;
        bottom:.26rem;
        width:.32rem;
      }
      >a{
        position:absolute;
        right:.1rem;
        bottom:0;
        font-size:.26rem;
      }
      >span{
        position:absolute;
        right:.06rem;
        top:.16rem;
        background-color:#D0021B;
        font-size:.2rem;
        height:.28rem;
        border-radius:.28rem;
        line-height:.28rem;
        min-width: .14rem;
        text-align:center;
        padding:0 .07rem;
      }
    }
  }
</style>
<template>
  <div class="searchInput">
    <div>
      <input
        ref="input"
        :placeholder="_placeholder"
        :value="value"
        @input="updateValue($event.target.value)"
        @keyup.enter="callback"
      >
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      value:String,
      placeholder: String,
      disabled: Boolean,
      auto:Boolean,
      callback:Function,
    },
    data(){
      return {}
    },
    computed: {
      _placeholder(){
        if(this.placeholder) {
          return this.placeholder;
        }else{
          return this.placeholder === '' ? '' : '搜索喜欢的宝贝'
        }
      }
    },
    methods:{
      updateValue(value){
        this.$emit('input', value)
      }
    },
    components: {
    },
    mounted(){
      const input = this.$refs.input;
      if(this.auto) {
        input.setAttribute('autofocus', 'autofocus');
      }
      if (this.disabled) {
        input.setAttribute('disabled', '');
      }
    }
  }
</script>
