<template>
  <div class="shop-cart">
    <transition name="fade">
      <!-- 蒙版的部分 -->
      <div v-if="showCartView && !isEmpty" class="cartview-cartmask" @click="showCartView = false" >
      <div class="cartview-cartbody">
        <div class="cartview-cartheader">
          <span>已选商品</span>
          <button @click="clearFood">
            <i class="fa fa-trash-o"></i>
            <span>清空</span>
          </button>
        </div>
        <!-- 展示被添加到购物车的商品信息 -->
        <div class="entityList-cartbodyScroller">
            <ul class="entityList-cartlist">
              <li class="entityList-entityrow" v-for="(food,index) in selectFoods" :key="index">
                <h4>
                  <span>{{food.name}}</span>
                </h4>
                <span class="entityList-entitytotal">{{food.activity.fixed_price}}</span>
                <cart-controll :food="food"/>
              </li>
            </ul>
          </div>
      </div>
    </div>
    </transition>
    
    <!-- 购物车的那个条 -->
    <div
      class="bottom-nav-cartfooter"
      :class="{ 'bottomNav-carticon-empty': isEmpty }"
    >
      <span class="bottom-nav-carticon" @click="showCartView = !showCartView">
        <i class="fa fa-cart-plus"></i>
        <span v-if="totalCount">{{ totalCount }}</span>
      </span>
      <div class="bottom-nav-cart-info" @click="showCartView = !showCartView">
        <p class="bottom-nav-carttotal">
          <span v-if="isEmpty">未选购商品</span>
          <span v-else>￥{{ totalPrice.toFixed(2) }}</span>
        </p>
        <p class="bottom-nav-cartdelivery">
          另需配送费{{ shopInfo.rst.float_delivery_fee }}元
        </p>
      </div>
      <button class="submit-btn">
        <span v-if="isEmpty"
          >￥{{ shopInfo.rst.float_minimum_order_amount }}元起送</span
        >
        <span v-else @click="settleMent">去结算</span>
      </button>
    </div>
  </div>
</template>

<script>
import CartControll from '../../components/shops/CartControll.vue';
export default {
  components: { CartControll },
  name: "ShopCart",
  data() {
    return {
      totalCount: 0, //购物车总数量
      totalPrice: 0, //购物车总金额
      selectFoods: [], //购物车内的所有商品
      showCartView: false,//控制购物车中商品的显示和隐藏
    };
  },
  props: {
    shopInfo: Object,
  },
  computed: {
    isEmpty() {
      let empty = true;
      this.totalCount = 0;
      this.totalPrice = 0;
      this.selectFoods = [];
      this.shopInfo.recommend.forEach((recommend) => {
        recommend.items.forEach((item) => {
          if (item.count) {
            empty = false;
            this.totalCount += item.count;
            this.totalPrice += item.activity.fixed_price * item.count;
            this.selectFoods.push(item);
          }
        });
      });

      this.shopInfo.menu.forEach((menu) => {
        menu.foods.forEach((food) => {
          if (food.count) {
            empty = false;
            this.totalCount += food.count;
            this.totalPrice += food.activity.fixed_price * food.count;
            this.selectFoods.push(food);
          }
        });
      });

      return empty;
    },
  },
  created() {
    console.log(this.shopInfo);
  },
  methods: {
    // 清除购物车中的商品
    clearFood() {
      this.shopInfo.recommend.forEach((recommend) => {
        recommend.items.forEach((item) => {
         item.count = 0;
        });
      });

      this.shopInfo.menu.forEach((menu) => {
        menu.foods.forEach((food) => {
         food.count = 0;
        });
      });
    },
    // 去结算按钮
    settleMent() {
      this.$store.dispatch("setOrderInfo", {
        shopInfo: this.shopInfo.rst,
        selectFoods: this.selectFoods
      });
      this.$router.push("/settleMent")
    }
  }
};
</script>

<style scoped>
.bottom-nav-cartfooter {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding-left: 21.066667vw;
  background-color: rgba(61, 61, 63, 0.9);
  height: 12.8vw;
  z-index: 1000;
}

.bottom-nav-carticon {
  position: absolute;
  left: 3.2vw;
  bottom: 2vw;
  width: 13.333333vw;
  height: 13.333333vw;
  box-sizing: border-box;
  border-radius: 100%;
  background-color: #3190e8;
  border: 1.333333vw solid #444;
  box-shadow: 0 -0.8vw 0.533333vw 0 rgba(0, 0, 0, 0.1);
}
.bottom-nav-carticon > i {
  position: absolute;
  top: 7px;
  right: 0;
  bottom: 0;
  left: 7px;
  color: #fff;
  font-size: 1.6rem;
}
.bottom-nav-cart-info {
  flex: 1;
}
.bottom-nav-carttotal {
  font-size: 0.8rem;
  line-height: normal;
  color: #fff;
}
.bottom-nav-cartdelivery {
  color: #999;
  font-size: 0.6rem;
}
.submit-btn {
  height: 100%;
  width: 28vw;
  background-color: #38ca73;
  color: #fff;
  text-align: center;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 12.8vw;
  border: none;
  outline: none;
}

.bottom-nav-carticon-empty > span {
  background-image: radial-gradient(circle, #363636 6.266667vw, #444 0);
}
.bottom-nav-carticon-empty > span > i {
  color: #606065 !important;
}
.bottom-nav-carticon-empty .bottom-nav-carttotal > span {
  color: #999;
}
.bottom-nav-carticon-empty .submit-btn {
  background-color: #535356 !important;
}

.bottom-nav-carticon > span {
  position: absolute;
  right: -1.2vw;
  top: -1.333333vw;
  line-height: 1;
  background-image: linear-gradient(-90deg, #ff7416, #ff3c15 98%);
  color: #fff;
  border-radius: 3.2vw;
  padding: 0.833333vw 1.333333vw;
  font-size: 0.6rem;
}
.cartview-cartmask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 200;
}
.cartview-cartbody {
  position: fixed;
  left: 0;
  width: 100%;
  background-color: #fff;
  bottom: 12.8vw;
  z-index: 201;
  opacity: 1;
  font-size: 1rem;
}
.cartview-cartheader {
  display: flex;
  align-items: center;
  padding: 0 4vw;
  border-bottom: 0.133333vw solid #ddd;
  background-color: #eceff1;
  color: #666;
  height: 10.666667vw;
}
.cartview-cartheader > span {
  flex: 1;
  display: flex;
  align-items: center;
}
.cartview-cartheader > button {
  border: none;
  outline: none;
  flex: none;
  display: flex;
  align-items: center;
  padding-left: 4vw;
  color: #666;
  text-decoration: none;
  font-size: 0.8rem;
  line-height: 4vw;
  background: none;
}
.cartview-cartheader > button > span {
  margin-left: 0.8vw;
}
.entityList-cartbodyScroller {
  overflow: auto;
  max-height: 80vw;
}
.entityList-entityrow {
  border-bottom: 0.133333vw solid #eee;
  display: flex;
  align-items: center;
  padding: 2vw 3.333333vw 2vw 0;
  min-height: 12.666667vw;
  margin-left: 3.333333vw;
}
.entityList-entityrow > h4 {
  flex: 5.5;
  line-height: normal;
}
.entityList-entityrow > h4 > span {
  display: inline-block;
  font-style: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  max-width: 46.666667vw;
}
.entityList-entitytotal {
  color: rgb(255, 83, 57);
  flex: 2.5;
  text-align: left;
  white-space: nowrap;
  font-weight: 700;
}
.entityList-entitytotal::before {
  content: "\A5";
  font-size: 0.6rem;
  color: currentColor;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
