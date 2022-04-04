<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @click="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handleNum('dec', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handleNum('inp', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handleNum('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartInfoList.length > 0"
          @click="updateAllCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteCheckedAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["cartList"]),
    // 购物车数据
    cartInfoList() {
      //进一步简化数据
      return this.cartList.cartInfoList || [];
    },
    // 总价钱
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((value) => {
        sum += value.cartPrice * value.skuNum;
      });
      return sum;
    },
    isAllChecked() {
      //遍历数组里面的元素，只要全部元素isChecked都为1===>真
      //只要有一个为假====>false
      // 控制台报错
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
  methods: {
    // 将获取购物车数据派发的actions封装成一个函数
    getData() {
      this.$store.dispatch("getCartList");
    },
    // type：为了区分这三个元素
    // disNum形参：加号：变化量（1），减号：变化量（-1） input为最终的个数（并不是变化量）
    // cart:那个商品身上有Id
    // 向服务器发送请求，修改商品数量
    // handler:(function(type, disNum, cart){

    // }),
    handleNum: throttle(async function (type, disNum, cart) {
      // console.log("点击发送一个dispatch", type, chNum);
      switch (type) {
        // +
        case "add":
          console.log(cart);
          disNum = 1;
          break;
        case "dec":
          // 判断商品个数是否大于1，大于1才能减
          if (cart.skuNum > 1) {
            disNum = -1;
            console.log("执行了");
          } else {
            disNum = 0;
          }
          // disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "inp":
          // 处理用户输入的值 如果是非数字、负数，带给服务器数字0
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            // 请求传递的参数是变化的数量
            disNum = parseInt(disNum) - cart.skuNum;
          }
          // 简写形式
          // disNum = isNaN(disNum) || disNum < 1 ? 0 : parseInt(disNum) - cart.skuNum;
          break;
      }
      // 派发action   更新商品数量
      // 代表修改成功

      // .then(() => {
      //
      // });
      try {
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    }, 1000),
    // 点击删除商品
    async deleteCartById(cart) {
      // 删除成功 再次发送请求获取最新数据
      await this.$store.dispatch("deleteCartList", cart.skuId).then(() => {
        this.getData();
        console.log("成功");
      });
    },
    // 切换某一商品的选中状态
    updateChecked(cart, event) {
      // console.log(event);
      let isChecked = event.target.checked ? "1" : "0";
      this.$store
        .dispatch("updateCheckedById", {
          skuId: cart.skuId,
          isChecked,
        })
        .then((value) => {
          this.getData();
        });
    },
    // 删除选中的商品
    async deleteCheckedAll() {
      try {
        await this.$store.dispatch("deleteCheckedAllCart");
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 修改全部商品的选中状态
    async updateAllCartChecked(event) {
      let isChecked = event.target.checked ? "1" : "0";
      // console.log(isChecked);
      try {
        await this.$store.dispatch("updateAllChecked", isChecked);
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>