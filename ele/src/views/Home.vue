<template>
  <div class="home">
    <!-- header -->
    <div class="header">
      <div
        class="address-map"
        @click="$router.push({ path: '/address', query: { city: city } })"
      >
        <i class="fa fa-map-marker"></i>
        <span>{{ address }}</span>
        <i class="fa fa-sort-desc"></i>
      </div>
    </div>

    <!-- search -->
    <div class="search-wrap" :class="{ 'fixed-view': sortFixed }">
      <div class="shop-search">
        <i class="fa fa-search"></i>
        搜索商家，商家名称
      </div>
    </div>

    <!-- 两个轮播图 -->
    <div id="container">
      <!-- 轮播图 -->
      <mt-swipe :auto="4000" class="swiper">
        <mt-swipe-item v-for="(item, index) in swiperItems" :key="index">
          <img :src="item" alt="轮播图" />
        </mt-swipe-item>
      </mt-swipe>
      <!-- 分类 -->
      <mt-swipe :auto="0" class="entries">
        <mt-swipe-item class="entry-wrap" v-for="(item, i) in entries" :key="i">
          <div class="foodentry" v-for="(entry, index) in item" :key="index">
            <div class="img-wrap">
              <img :src="entry.image" alt="选择分类" />
            </div>
            <span>{{ entry.name }}</span>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!-- 推荐商家 -->
    <div class="shoplist-title">推荐商家</div>
    <!-- 导航栏和筛选栏 -->
    <filter-view
      :filterData="filterData"
      @home-fixed="homeFixed"
      @update="update"
    ></filter-view>
    <!-- mint ui自带的上拉刷新和下拉加载组件 -->
    <mt-loadmore
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      :auto-fill="false"
      :bottom-pull-text="bottomPullText"
      :top-pull-text="topPullText"
      ref="loadmore"
    >
      <!-- 商家列表 -->
      <div class="shop-list">
        <index-shop
          v-for="(item, index) in restaurants"
          :key="index"
          :restaurant="item.restaurant"
        />
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
// @ 重定向到 src
import FilterView from "../components/FilterView";
import IndexShop from "../components/IndexShop";
import { Swipe, SwipeItem, Loadmore } from "mint-ui";
export default {
  name: "Home",
  data() {
    return {
      swiperItems: [],
      entries: [],
      filterData: null,
      sortFixed: false,
      page: 1,
      size: 5,
      restaurants: [],
      allLoaded: false, //是否全部加载完毕 属性值为true，则不会上拉加载更多
      bottomPullText: "上拉加载更多", //组价的上拉底部的文案
      topPullText: "下拉进行刷新", //组件的下拉进行刷新的文案
      data: null, //按照条件进行筛选的时候，post带的参数
    };
  },
  computed: {
    address() {
      return this.$store.getters.address;
    },
    city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      );
    },
  },
  created() {
    // 获取数据
    this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      // 轮播图的数据
      this.$axios("api/profile/shopping")
        .then((res) => {
          // console.log(res.data);
          this.swiperItems = res.data.swipeImgs;
          this.entries = res.data.entries;
        })
        .catch((err) => {
          console.log(err);
        });
      // 排序筛选的数据
      this.$axios("api/profile/filter").then((res) => {
        // console.log(res.data);
        this.filterData = res.data;
      });
      // 触发mint ui的loadTop函数进行数据的初始化加载
      this.loadTop();
    },
    // 子组件触发的事件，显示蒙版
    homeFixed(boolean) {
      this.sortFixed = boolean;
    },
    // 根据组件提供的条件进行数据的重新获取
    update(condition) {
      let data = {
        condition
      }
      this.data = data;
      this.loadTop()
    },
    // 下拉刷新函数
    loadTop() {
      // 每次进行下拉的时候，需要重置一些属性
      this.page = 1;
      this.allLoaded = false;
      this.bottomPullText = "上拉加载更多";
      // 获取商家的信息
      this.$axios
        .post(`api/profile/restaurants/${this.page}/${this.size}`,this.data)
        .then((res) => {
          // 每次下拉刷新的时候，这个组件是不会自动的停止方法的
          // 需要在合适的地方手动的调用loadmore.onTopLoaded()这个函数来结束该方法。
          this.$refs.loadmore.onTopLoaded();
          this.restaurants = res.data;
        });
    },
    // 上拉加载
    loadBottom() {
        this.page++;
        this.$axios
          .post(`api/profile/restaurants/${this.page}/${this.size}`)
          .then((res) => {
            // 每次上拉加载的时候，这个组件是不会自动的停止方法的
            // 需要在合适的地方手动的调用loadmore.onBottomLoaded()这个函数来结束该方法。
            this.$refs.loadmore.onBottomLoaded();
            if (res.data.length > 0) {
              res.data.forEach((element) => {
                this.restaurants.push(element);
              });
              if(res.data.length < this.size) {
                this.allLoaded = true;
                this.bottomPullText = '没有更多数据了'
              }
            }else {
              this.allLoaded = true;
              this.bottomPullText = '没有更多数据了'
            }
          });
    },
  },
  components: {
    Swipe,
    SwipeItem,
    Loadmore,
    FilterView,
    IndexShop,
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header,
.search-wrap {
  background-color: #009eef;
  padding: 10px 16px;
}
.header .address-map {
  color: #fff;
  font-weight: bold;
}
.address-map i {
  margin: 0 3px;
  font-size: 18px;
}
.address-map span {
  display: inline-block;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.search-wrap .shop-search {
  margin-top: 10px;
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}
.search-wrap {
  position: sticky;
  top: 0px;
  z-index: 999;
  box-sizing: border-box;
}
.swiper {
  height: 100px;
}
.swiper img {
  width: 100%;
  height: 100px;
}

.entries {
  background: #fff;
  height: 47.2vw;
  text-align: center;
  overflow: hidden;
}
.foodentry {
  width: 20%;
  float: left;
  position: relative;
  margin-top: 2.933333vw;
}
.foodentry .img-wrap {
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 12vw;
}
.img-wrap img {
  width: 100%;
  height: 100%;
}
.foodentry span {
  display: block;
  color: #666;
  font-size: 0.32rem;
}
/* 推荐商家 */
.shoplist-title {
  display: flex;
  align-items: flex;
  justify-content: center;
  height: 9.6vw;
  line-height: 9.6vw;
  font-size: 16px;
  color: #333;
  background: #fff;
}
.shoplist-title:after,
.shoplist-title:before {
  display: block;
  content: "一";
  width: 5.333333vw;
  height: 0.266667vw;
  color: #999;
}
.shoplist-title:before {
  margin-right: 3.466667vw;
}
.shoplist-title:after {
  margin-left: 3.466667vw;
}
.fixed-view {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
}

.fixed-view.search-wrap {
  padding-top: 5px;
}

.mint-loadmore {
  height: calc(100% - 95px);
  overflow: auto;
}
</style>
