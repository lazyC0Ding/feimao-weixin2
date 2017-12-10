<style scoped lang="less" type="text/less">
  @import '../common';

  ul {
    background-color: #fff;
    padding: 0;
    margin: 0;
    > li {
      height: 2.2rem;
      overflow: hidden;
      .border-bottom-1px;
      > span{
        float:left;
        height:100%;
        overflow:hidden;
        > .img {
          float: left;
          position:relative;
          margin-top: .2rem;
          margin-left: .2rem;
          width: 1.8rem;
          height: 1.8rem;
          > img {
            width: 100%;
            height: 100%;
          }
        }
      }
      > div {
        position:relative;
        height:100%;
        padding-left:.2rem;
        overflow: hidden;
        >.a{
          height:.72rem;
          margin-top:.28rem;
          font-size:.28rem;
          line-height:.36rem;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        >.b{
          margin-top:.1rem;
          font-size:.24rem;
          color:@light;
        }
        >.c{
          position:absolute;
          width:100%;
          left:0;
          bottom:.28rem;
          padding-left:.2rem;
          box-sizing: border-box;
          >span{
            &:nth-child(1) {
              font-size:.28rem;
              color: #D0021B;
            }
            &:nth-child(2) {
              float:right;
              margin-right:.24rem;
              font-size:.24rem;
              color:@light;
              &:before{
                content: '';
                font-size:.28rem;
              }
            }
          }
        }
      }
    }
  }
</style>
<template>
  <ul>
    <li v-for="item in goods" :key="item.cart_id">
      <span>
        <span class="img">
          <img v-href="['goods_detail', {goods_id:item.goods_id}]" :src="item.cover">
        </span>
      </span>
      <div>
        <div class="a">{{item.goods_name}}</div>
        <div class="b">{{item.option_name}}</div>
        <div class="c">
          <span>¥ {{item.price}}</span>
          <span>x{{item.quantity}}</span>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
  export default {
    props: {
      goods: {
        type: Array,
        required: true,
      },
    },
  }
</script>
