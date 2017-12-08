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
      &:last-child {
        &:after {
          content: '';
          width: 0;
          height: 0;
        }
      }
      > span{
        float:left;
        height:100%;
        overflow:hidden;
        > .select {
          float: left;
          width: .6rem;
          height: 100%;
          background: url(../assets/img/selected_off.png) no-repeat right center;
          background-size: .32rem .32rem;
          &.on {
            background-image: url(../assets/img/selected_on.png);
          }
        }
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
          >span {
            position: absolute;
            width: 100%;
            height: .44rem;
            line-height:.44rem;
            left: 0;
            bottom: 0;
            background: rgba(0, 0, 0, .4) url(../assets/img/Countdown.png) no-repeat .18rem center;
            background-size:.24rem .24rem;
            font-size:.24rem;
            color:#fff;
            box-sizing: border-box;
            padding-left:.54rem;
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
              height:.4rem;
              > span {
                float: left;
                width: .4rem;
                height: 100%;
                background: no-repeat;
                background-size: 100% 100%;
                &:nth-child(1) {
                  background-image: url(../assets/img/Number_reduce.png);
                }
                &:nth-child(2) {
                  text-align: center;
                  line-height: .4rem;
                  width: .6rem;
                  background-image: url(../assets/img/Number_input.png);
                  color: #111;
                  font-size:.28rem;
                }
                &:nth-child(3) {
                  background-image: url(../assets/img/Number_add.png);
                }
              }
            }
            &:nth-child(3) {
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
    <li v-for="item in goods" :key="isCart ? item.cart_id : ''">
      <span>
        <span v-if="isCart" class="select"></span>
        <span class="img">
          <span v-if="item.date_start || item.date_end">{{item.d_time | countdown}}</span>
          <img v-href="['goods_detail', {goods_id:item.goods_id}]" :src="item.cover">
        </span>
      </span>
      <div>
        <div class="a">{{item.name}}</div>
        <div class="b">{{item.option_name}}</div>
        <div class="c">
          <span>¥ {{item.price}}</span>
          <span v-show="isEdit">
            <span @click="item.quantity == 1 || item.quantity--"></span>
            <span>{{item.quantity}}</span>
            <span @click="item.quantity++"></span>
          </span>
          <span v-show="!isEdit">x{{item.quantity}}</span>
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
      isCart: Boolean,
      hasCountdown:Boolean,
      isEdit:Boolean,
    },
    data(){

    },
    methods:{

    },
    created(){

    },
    components: {}
  }
</script>
