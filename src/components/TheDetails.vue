<style scoped lang="less" type="text/less">
  ul {
    padding: 0 .3rem;
    background-color: #fff;
    > li {
      height: 1.6rem;
      overflow: hidden;
      &:first-child {
        border-top: 1px solid #eee;
      }
      > span:first-child {
        display: block;
        margin-top: .3rem;
        overflow: hidden;
        > span:first-child {
          float: left;
          font-size: .3rem;
        }
        > span:last-child {
          float: right;
          font-size: .24rem;
          color: #999;
          &:before {
            content: '';
            font-size: .3rem;
          }
        }
      }
      > span:last-child {
        margin-top: .2rem;
        color: #111;
        font-size: .24rem;
      }
    }
  }

  .title{
    margin-top:.2rem;
    height: .8rem;
    text-align: center;
    line-height: .8rem;
    background-color: #fff;
  }

  .button{
    padding:.4rem;
    background-color:#fff;
    text-align:center;
    >button{
      height:.56rem;
      padding:0 .4rem;
      border:1px solid #e4393c;
      border-radius:.4rem;
      font-size:.26rem;
      line-height: .56rem;
      text-align: center;
    }
  }
</style>
<template>
  <div>
    <div class="title">{{title}}</div>
    <ul>
      <li v-for="detail in details" class="border-bottom-1px">
      <span>
        <span :style="{color:getColor(detail.title)}">{{detail.title}}</span>
        <span>{{detail.date_add | time}}</span>
      </span>
        <span>({{detail.comments}})</span>
      </li>
    </ul>
    <div class="button">
      <button class="primary">查看全部</button>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title:{
        type:String,
        required:true
      },
      details: {
        type: Array,
        required: true
      }
    },
    data(){
      return {}
    },
    methods: {
      getColor(str){
        return str.startsWith('+') ? '#e4393c' : '#189200';
      }
    },
    components: {}
  }
</script>
