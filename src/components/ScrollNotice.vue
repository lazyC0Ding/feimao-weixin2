<style scoped lang="less" type="text/less">
  .notices {
    height: .7rem;
    line-height: .7rem;
    padding-left: .8rem;
    background: #fff url(../assets/img/store_notice.png) no-repeat .3rem center;
    background-size: .3rem .3rem;
    font-size: .26rem;
    > span {
      margin-top: -.01rem;
    }
    > ul {
      margin-left: .2rem;
      height: .7rem;
      overflow: scroll;
      &::-webkit-scrollbar{
        width:0;
        height:0;
      }
      > li {
        height: 100%;
        line-height: .7rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
<template>
  <div class="notices">
    <span style="float:left;">|</span>
    <ul ref="ul">
      <li @click="jump(notice.url)" v-for="notice in notices" :key="notice.notice_id">{{notice.name}}</li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      notices: {
        type: Array,
        required: true,
      }
    },
    data(){
      return {
        currentIndex: 0,
        ul: null,
        FPS:60,
        duration:500,
      }
    },
    computed:{
      height(){
        return this.ul.clientHeight;
      },
      // 每次动画间隔
      UPDATE_INTERVAL(){
        return 1000 / this.FPS;
      },
      // 每次动画index增量
      indexAddPerTime(){
        return 1 / ( this.duration * this.FPS / 1000);
      }
    },
    watch:{
      currentIndex(n, o){
        this.ul.scrollTop= n * this.height;
        if(n >= this.notices.length - 1){
          this.currentIndex = 0;
          return;
        }
        if(Math.floor(n) === Math.floor(o)){
          setTimeout( ()=>{
            this.currentIndex = this.currentIndex + this.indexAddPerTime;
          },this.UPDATE_INTERVAL)
        }else{
          setTimeout( ()=>{
            this.currentIndex = this.currentIndex + this.indexAddPerTime;
          },2000)
        }
      },
    },
    methods: {
      jump(src){
        window.location.href = src
      }
    },
    created(){
      // 将数组第一个元素复制添加到数组末尾,保证动画的连贯
      this.notices.push(this.notices[0]);
    },
    mounted(){
      this.ul = this.$refs.ul;
      this.ul.ontouchmove = function (e) {
        e.preventDefault();
      };
      setTimeout( ()=>{
        this.currentIndex = this.indexAddPerTime;
      },this.UPDATE_INTERVAL)
    },
    components: {}
  }
</script>
