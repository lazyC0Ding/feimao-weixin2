<style scoped lang="less" type="text/less">
  ul {
    background-color: #fff;
    padding: .26rem 0 .26rem .26rem;
    > li {
      display: inline-block;
      width: 3.4rem;
      vertical-align: top;
      padding-bottom: .15rem;
      &:nth-child(odd) {
        margin-right: .2rem;
      }
      > div.img {
        height: 3.4rem;
        position:relative;
        >img{
          width:100%;
          height:100%;
        }
        >span {
          position: absolute;
          text-align:center;
          width: 2.8rem;
          height: .6rem;
          line-height:.6rem;
          left: .3rem;
          bottom: .2rem;
          box-sizing: border-box;
          padding-left:.3rem;
          border-radius: 2rem;
          color:#fff;
          background:rgba(0, 0, 0, .4) url(../assets/img/Countdown.png) no-repeat .24rem center;
          background-size:.3rem .3rem;
          >span:first-child{
            font-size:.28rem;
            vertical-align: top;
          }
          >span:last-child{
            font-size:.24rem;
            vertical-align: top;
          }
        }
      }
      > div.name {
        min-height:.76rem;
        margin-top: .1rem;
        font-size: .28rem;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      > div.price {
        margin-top: .1rem;
        color: #d0021b;
        overflow:hidden;
        >span{
          &:nth-child(1) {
            float:left;
            font-size:.32rem;
            color:#D0021B;
          }
          &:nth-child(2) {
            float:right;
            margin-right:.1rem;
            font-size:.24rem;
            color:#9DA5A8;
            text-decoration: line-through;
            &:before {
              content: '';
              font-size:.28rem;
            }
          }
        }
      }
    }
  }
</style>
<template>
  <ul>
    <li v-for="item in goods" :key="item.goods_id">
      <div class="img" @click="showDetail(item.goods_id)">
        <span v-if="time">
          <span>{{d_time | countdown}}</span>
          <span>后{{ifStarted ? '结束' : '开始'}}</span>
        </span>
        <img :src="item.cover">
      </div>
      <div class="name">{{item.name}}</div>
      <div class="price" v-if="!type && !hidePrice">
        <span>{{item.price}}</span>
      </div>
      <div class="price" v-else-if="type && type == 1">
        <span>¥{{item.activity_price}}</span>
        <span>¥{{item.price}}</span>
      </div>
      <div class="price" v-else-if="type && type == 2">
        <span style="font-size:.28rem;">{{item.activity_content}}¥{{item.activity_price}}</span>
        <span>¥{{item.price}}</span>
      </div>
    </li>
  </ul>
</template>
<script>
  export default {
    props: {
      goods: {
        type: Array,
        required: true
      },
      hidePrice: Boolean,
      type:String,  //activity_goods专用
      time:Object,  //activity_goods专用
      parentData: Object,  // 用于文章后退不刷新父级页面
    },
    data(){
      return {
        now:0,
      }
    },
    computed:{
      ifStarted(){
        return this.now >= Number(this.time.date_start);
      },
      d_time(){
        return this.now < Number(this.time.date_start)
          ? Number(this.time.date_start) - this.now
          : Number(this.time.date_end) - this.now;
      }
    },
    methods:{
      showDetail(goods_id){
        if (this.parentData) {
          setSession(getPageName(), this.parentData);
        }
        return openPage('goods_detail', {goods_id})
      },
      getNow(){
        this.now = Date.parse(new Date()) / 1000;
      },
    },
    created(){
      if(this.time) {
        this.getNow();
        setInterval(this.getNow, 1000);
      }
    },
    components: {}
  }
</script>
