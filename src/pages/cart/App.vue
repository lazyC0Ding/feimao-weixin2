<style type="text/less" lang="less">
  @import '../../common';

  .empty {
    margin-top: 2rem;
    text-align: center;
    img {
      width: 3rem;
      height: 3rem;
    }
    > div:nth-child(2) {
      margin-top: .56rem;
      font-size: .28rem;
      color: @light;
    }
    > div:nth-child(3) {
      margin-top: .6rem;
      font-size: .3rem;
      > span {
        width: 2.4rem;
        height: .7rem;
        line-height: .7rem;
        background-color: #000;
        color: #fff;
      }
    }
  }

  .cart-footer {
    position: fixed;
    width: 100%;
    bottom: 1rem;
    left: 0;
    height: 1rem;
    line-height: 1rem;
    background-color: #fff;
    &:after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 1px;
      background-color: #e4e4e4;
    }
    > .select {
      margin-left: .26rem;
      .span-bg-icon(.28rem, left);
      background-image: url(../../assets/img/selected_off.png);
      &.on {
        background-image: url(../../assets/img/selected_on.png);
      }
    }
    > .settle {
      float: right;
      width: 1.8rem;
      height: .7rem;
      line-height: .7rem;
      text-align: center;
      margin-top: .15rem;
      margin-right: .14rem;
      background-color: #000;
      color: #fff;
    }
    > .price {
      float: right;
      margin-right: .2rem;
      font-size: .2rem;
      > span {
        margin-left: .04rem;
        font-size: 15px;
        color: #D0021B;
      }
    }
  }

  .cart-list {
    background-color: #fff;
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
      > span {
        float: left;
        height: 100%;
        overflow: hidden;
        > .select {
          float: left;
          width: .8rem;
          height: 100%;
          background: url(../../assets/img/selected_off.png) no-repeat center center;
          background-size: .32rem .32rem;
          &.on {
            background-image: url(../../assets/img/selected_on.png);
          }
        }
        > .img {
          float: left;
          position: relative;
          margin-top: .2rem;
          width: 1.8rem;
          height: 1.8rem;
          line-height: 1.8rem;
          text-align: center;
          > img {
            width: 100%;
            height: 100%;
          }
          > span.countdown {
            position: absolute;
            width: 100%;
            height: .44rem;
            line-height: .44rem;
            left: 0;
            bottom: 0;
            background: rgba(0, 0, 0, .4) url(../../assets/img/Countdown.png) no-repeat .18rem center;
            background-size: .24rem .24rem;
            font-size: .24rem;
            color: #fff;
            box-sizing: border-box;
            padding-left: .54rem;
            text-align: left;
          }
          > span.bg {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: rgba(17, 17, 17, .4);
            color: #fff;
            font-size: .28rem;
          }
        }
      }
      > div {
        position: relative;
        height: 100%;
        padding-left: .2rem;
        overflow: hidden;
        > .a {
          height: .72rem;
          margin-top: .28rem;
          font-size: .28rem;
          line-height: .36rem;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        > .b {
          margin-top: .1rem;
          font-size: .24rem;
          color: @light;
        }
        > .c {
          position: absolute;
          width: 100%;
          left: 0;
          bottom: .28rem;
          padding-left: .2rem;
          box-sizing: border-box;
          > span {
            &:nth-child(1) {
              font-size: .28rem;
              color: #D0021B;
            }
            &:nth-child(2) {
              float: right;
              margin-right: .24rem;
              height: .4rem;
              > span {
                float: left;
                width: .4rem;
                height: 100%;
                background: no-repeat;
                background-size: 100% 100%;
                &:nth-child(1) {
                  background-image: url(../../assets/img/Number_reduce.png);
                }
                &:nth-child(2) {
                  text-align: center;
                  line-height: .4rem;
                  width: .6rem;
                  background-image: url(../../assets/img/Number_input.png);
                  color: #111;
                  font-size: .28rem;
                }
                &:nth-child(3) {
                  background-image: url(../../assets/img/Number_add.png);
                }
              }
            }
            &:nth-child(3) {
              float: right;
              margin-right: .24rem;
              font-size: .24rem;
              color: @light;
              &:before {
                content: '';
                font-size: .28rem;
              }
            }
          }
        }
      }
    }
  }
</style>
<template>
  <div style="padding-top:.85rem;padding-bottom: 2rem;">
    <span class="btn-corner" @click="edit()">{{isEdit ? '完成' : '编辑'}}</span>
    <div v-if="goods && !goods.length" class="empty">
      <div><img src="../../assets/img/Tip_ShoppingCart.png"></div>
      <div>您的购物车是空的</div>
      <div><span>去商城逛逛</span></div>
    </div>
    <ul v-if="goods" class="cart-list">
      <li v-for="item in goods" :key="item.cart_id">
      <span>
        <span class="select" :class="{on:item.isSelected}" @click="select(item)"></span>
        <span class="img bg">
          <span class="countdown" v-if="item.date_start || item.date_end">{{item.d_time | countdown}}</span>
          <img v-href="['goods_detail', {goods_id:item.goods_id}]" :src="item.cover">
          <span class="bg" v-if="item.on_sale == 0">已结束</span>
        </span>
      </span>
        <div>
          <div class="a">{{item.name}}</div>
          <div class="b">{{item.option_name}}</div>
          <div class="c">
            <span>¥ {{item.price}}</span>
            <span v-show="isEdit && item.on_sale != 0">
              <span @click="item.editQuantity == 1 || item.editQuantity--"></span>
              <span>{{item.editQuantity}}</span>
              <span @click="item.editQuantity++"></span>
            </span>
            <span v-show="item.on_sale == 0 || !isEdit">x{{item.quantity}}</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="cart-footer">
      <span class="select" :class="{on:isSelectAll}" @click="selectAll">全选</span>
      <span class="settle" @click="settle">{{isEdit ? '删除' : '结算'}}</span>
      <span class="price" v-show="!isEdit">合计 : <span>¥{{total}}</span></span>
    </div>
    <the-footer current="2"></the-footer>
    <app-permanent style="bottom:2.24rem;" type="2"></app-permanent>
  </div>
</template>
<script>
  import TheFooter from '@c/TheFooter.vue'
  import AppPermanent from '@c/AppPermanent.vue'
  import GoodsList from '@c/GoodsList.vue'
  export default {
    data () {
      return {
        goods: null,
        isEdit: false,
        now: null,
        isSelectAll: false,
      }
    },
    computed: {
      selectedItems(){
        const items = [];
        if (!this.goods) return;
        for (let i of this.goods) {
          if (i.isSelected) {
            items.push(i.cart_id)
          }
        }
        return items;
      },
      total(){
        let total = '0.00';
        if (this.goods) {
          for (let i of this.goods) {
            if (i.isSelected) {
              total = (Number(total) + Number(i.price) * Number(i.quantity)).toFixed(2);
            }
          }
        }
        return total;
      },
      onSaleCounts(){
        let count = 0;
        for (let i of this.goods) {
          if(i.on_sale != 0) count++;
        }
        return count;
      }
    },
    watch: {
      now(n){
        let d_time;
        if (this.goods) {
          for (let i of this.goods) {
            if (i.date_start || i.date_end) {
              d_time = n < i.date_start
                ? i.date_start - n
                : i.date_end - n;
              if (!i.d_time) {
                this.$set(i, 'd_time', d_time);
              } else {
                i.d_time = d_time;
              }
            }
          }
        }
      },
      'selectedItems.length'(n){
        if(this.isEdit) {
          this.isSelectAll = n === this.goods.length;
        }else{
          if(this.onSaleCounts === 0) {
            this.isSelectAll = false;
          }else{
            this.isSelectAll = n === this.onSaleCounts;
          }
        }
      },
    },
    methods: {
      edit(){
        this.isEdit = !this.isEdit;
        for (let i of this.goods) {
          i.isSelected = false;
        }
        // 若此时正在编辑中,return;
        if (this.isEdit) return;
        // 若此时已编辑完成,执行以下代码
        const data = [];
        for (let i of this.goods) {
          data.push({
            cart_id: i.cart_id,
            quantity: i.editQuantity
          })
        }
        this.$post(URL.editCart, {data: JSON.stringify(data)})
          .then(res => {
            console.log(res);
            if (res.errcode == 0) {
              for (let i of this.goods) {
                i.quantity = i.editQuantity
              }
            } else {
              errback(res);
              for (let i of this.goods) {
                i.editQuantity = i.quantity
              }
            }
          })
      },
      select(item){
        if(!this.isEdit && item.on_sale == 0) {
          item.isSelected = false;
        }else{
          item.isSelected = !item.isSelected;
        }
      },
      selectAll(){
        if (this.isSelectAll) {
          for (let i of this.goods) {
            i.isSelected = false;
          }
        } else {
          for (let i of this.goods) {
            if(this.isEdit || i.on_sale != 0) {
              i.isSelected = true;
            }
          }
        }
      },
      settle(){
        // 删除
        if (this.isEdit) {
          this.$post(URL.delCart, {cart_ids: this.selectedItems.join(',')})
            .then(res => {
              if (res.errcode == 0) {
                this.goods.forEach((item, index, arr) => {
                  for (let i of this.selectedItems) {
                    if (item.cart_id == i) {
                      arr.splice(index, 1);
                      break;
                    }
                  }
                });
                this.isEdit = false;
              } else {
                errback(res)
              }
            })
          //结算
        } else {
          const data = [];
          for (let item of this.goods) {
            for (let cart_id of this.selectedItems) {
              if(cart_id == item.cart_id){
                data.push({
                  cart_id:item.cart_id,
                  goods_id:item.goods_id,
                  option_id:item.option_id,
                  quantity:item.quantity
                });
                break;
              }
            }
          }
          this.$post(URL.settlement, {data:JSON.stringify(data), type: 2})
            .then( res => {
               if (res.errcode == 0) {
                 openPage('order_confirm', res.content);
                 console.log(res)
               }else{
                 errback(res);
               }
            });
        }
      },
      fetch(){
        this.$post(URL.getCarts)
          .then(res => {
            if (res.errcode == 0) {
              console.log(res);
              for (let i of res.content) {
                i.date_start = i.date_start ? Number(i.date_start) : null;
                i.date_end = i.date_end ? Number(i.date_end) : null;
                i.isSelected = false;
                i.editQuantity = i.quantity;
              }
              this.goods = res.content;
              this.getNow();
              setInterval(this.getNow, 1000);
            } else {
              errback(res);
            }
          })
      },
      getNow(){
        this.now = Date.parse(new Date()) / 1000;
      }
    },
    created(){
      document.title = '购物车';
      this.fetch();
    },
    components: {
      AppPermanent,
      TheFooter,
      GoodsList,
    }
  }
</script>
