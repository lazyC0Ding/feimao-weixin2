<style scoped lang="less" type="text/less">
  .images {
    background-color: #fff;
    padding-bottom: .3rem;
    font-size: 0;
    overflow:hidden;
    > li {
      position: relative;
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
      border: .5px solid #979797;
      box-sizing: border-box;
      overflow:hidden;
      &.chooseImg{
        background: url(../assets/img/upload_pic.png) no-repeat center .4rem;
        background-size: .44rem .36rem;
      }
      > .content {
        display: block;
        width: 100%;
      }
      > .close {
        position: absolute;
        top: 0;
        right: 0;
        width: .28rem;
        height: .28rem;
      }
    }
  }
</style>
<template>
  <ul class="images">
    <li class="image" v-for="(image, index) in images">
      <img class="content" :src="image.localId">
      <img class="close" src="../assets/img/close_redbj.png" @click.stop="images.splice(index,1)">
    </li><!--
    --><li class="chooseImg" @click="chooseImg" v-show="images.length < 6">{{images.length + 1}}/6</li>
  </ul>
</template>
<script>
  export default {
    props: {
      images: {
        type: Array,
        required: true,
      }
    },
    data(){
      return {
        localIds: null,
        uploadIndex: 0,
      }
    },
    methods: {
      chooseImg(){
        wx.chooseImage({
          count: 6 - this.images.length, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            this.localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            this.upload();
          }
        });
      },
      upload(){
        const localId = this.localIds[this.uploadIndex];
        wx.uploadImage({
          localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: (res) => {
            const media_id = res.serverId; // 返回图片的服务器端ID
            this.$post(URL.upload_weixin, {media_id})
              .then(res => {
                if (res.errcode == 0) {
                  alert(JSON.stringify(res.content));
                  this.images.push({
                    localId:localId,
                    src:res.content.url,
                  });
                  alert(JSON.stringify(this.images));
                  if(this.uploadIndex === this.localIds.length - 1) {
                    this.uploadIndex = 0;
                    this.localIds = null;
                  }else{
                    this.uploadIndex++;
                    this.upload();
                  }
                } else {
                  errback(res);
                }
              })
          }
        });
      }
    },
    components: {}
  }
</script>
