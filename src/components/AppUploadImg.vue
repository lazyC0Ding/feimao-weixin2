<style scoped lang="less" type="text/less">
  .images {
    background-color: #fff;
    padding-bottom: .3rem;
    font-size:0;
    > li {
      position:relative;
      vertical-align: top;
      display: inline-block;
      margin-bottom: .2rem;
      margin-left: .38rem;
      width: 1.4rem;
      height: 1.4rem;
      line-height: 2rem;
      text-align: center;
      font-size: .2rem;
      color: #9DA5A8;
      background: url(../assets/img/upload_pic.png) no-repeat center .4rem;
      background-size: .44rem .36rem;
      border: .5px solid #979797;
      box-sizing: border-box;
      >.content{
        width:100%;
        height:100%;
      }
      >.close{
        position:absolute;
        top:0;
        right:0;
        width:.28rem;
        height:.28rem;
      }
    }
  }

  .test{
    font-size:.28rem;
    -webkit-user-select: auto;
  }
</style>
<template>
  <ul class="images">
    <li v-for="(image, index) in images">
      <img class="content" :src="image">
      <img class="close" src="../assets/img/close_redbj.png" @click="images.splice(index,1)">
    </li><!--
    --><li @click="chooseImg" v-show="images.length < 6">{{images.length + 1}}/6</li>
    <li class="test">{{test}}</li>
  </ul>
</template>
<script>
  export default {
    props:{
      images:{
        type:Array,
        required:true,
      }
    },
    data(){
      return {
        test:'',
      }
    },
    methods:{
      chooseImg(){
        wx.chooseImage({
          count: 6-this.images.length, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            let media_id;
            for (let i of localIds) {
              wx.uploadImage({
                localId: i, // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: (res) => {
                  media_id = res.serverId; // 返回图片的服务器端ID
                  this.$post(URL.upload_weixin, {media_id})
                    .then (res => {
                      if(res.errcode == 0) {
                        this.test = res.content.url;
                        this.images.push(res.content.url);
                      }else{
                        errback(res);
                      }
                    })
                }
              });
            }
          }
        });
      }
    },
    components: {}
  }
</script>
