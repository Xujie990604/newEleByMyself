<template>
  <section class="index-container">
    <div class="index-shopInfo" @click="$router.push('/shop')">
      <div class="logo-container">
        <img :src="restaurant.image_path" />
      </div>
      <div class="index-main">
        <div class="index-shopname">
          <i v-if="restaurant.is_premium">品牌</i>
          <span>{{restaurant.name}}</span>
        </div>
        <div class="index-rateWrap">
          <div>
            <Rating :rating="restaurant.rating"/>
            <span class="rate">{{restaurant.rating}}</span>
            <span>月售{{restaurant.recent_order_num}}单</span>
          </div>
          <div v-if="restaurant.delivery_mode" class="delivery">
            <span class="icon-hollow">{{restaurant.delivery_mode.text}}</span>
          </div>
        </div>
        <div class="index-moneylimit">
          <div>
            <span>¥{{restaurant.float_minimum_order_amount}}起送</span>
            |
            <span>配送费¥{{restaurant.float_delivery_fee}}</span>
          </div>
          <div class="index-distanceWrap">
            <span>{{(restaurant.distance / 1000).toFixed(2)}}km</span>
            |
            <span>{{restaurant.order_lead_time}}分钟</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Rating from "./common/rating/Rating";
export default {
  name: "IndexShop",
  props: {
    restaurant: Object
  },
  components: {
    Rating
  }
};
</script>

<style scoped>
.index-container {
  background: #fff;
  color: #666;
  padding: 4vw 0;
  border-bottom: 0.133333vw solid #eee;
}
.index-shopInfo {
  display: flex;
  justify-content: flex-start;
  padding: 0 2.666667vw;
  align-items: stretch;
}
.logo-container {
  width: 17.333333vw;
  height: 17.333333vw;
}
.logo-container img {
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 0.133333vw solid rgba(0, 0, 0, 0.08);
  border-radius: 0.533333vw;
}
.index-main {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  flex-direction: column;
  padding-left: 2.666667vw;
  font-size: 0.66rem;
  flex-grow: 1;
}
.index-shopname {
  align-items: center;
  color: #333;
  font-weight: 700;
  font-size: 0.9rem;
}
.index-shopname i {
  background: #ffe800;
  margin-right: 1.333333vw;
  padding: 0.266667vw 0.666667vw;
  text-align: center;
  white-space: nowrap;
  font-size: 0.6rem;
}
.index-shopname span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.index-rateWrap {
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
}

.index-rateWrap .rate {
  margin-right: 1.066667vw;
}
.index-moneylimit {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.index-moneylimit .index-distanceWrap {
  color: #999;
}
</style>