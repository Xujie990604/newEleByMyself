<template>
  <div class="search">
    <my-header :isLeft="true" title="搜索" />
    <div class="search-header">
      <form class="search-wrap">
        <i class="fa fa-search"></i>
        <input
          type="text"
          v-model.trim="keyWord"
          placeholder="输入商家， 商品信息"
        />
        <button @click="searchHandle" type="button">搜索</button>
      </form>
    </div>
    <!-- 因为result的默认值为null ，寻找null下的属性值会报错 -->
    <!-- 显示搜索的结果 -->
    <div class="shop" v-if="result && !showShop">
      <div class="empty-wrap" v-if="empty">
        <img
          src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png"
          alt
        />
        <div class="empty_txt">
          <h4>附近没有搜索结果</h4>
          <span>换个关键词试试吧</span>
        </div>
      </div>
      <div v-else>
        <!-- 不应该加在ul上，应该加在li上。并且使用路由来传参params -->
        <search-index @click="$router.push('/shop')" :data="result.restaurants" />
        <search-index @click="shopItemClick" :data="result.words" />
      </div>
    </div>

    <!-- 显示商家的信息 -->
    <div v-if="showShop" class="container">
      <!-- 筛选导航 -->
      <filter-view :filterData="filterData" @update="update"></filter-view>
      <!-- 商品信息 -->
      <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading">
        <index-shop
          v-for="(item, index) in restaurants"
          :key="index"
          :restaurant="item.restaurant"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../components/common/header/MyHeader";
import SearchIndex from "../components/SearchIndex";
import FilterView from "../components/FilterView";
import IndexShop from "../components/IndexShop";

import { InfiniteScroll } from "mint-ui";

import { debounce } from "../common/util";
export default {
  name: "Search",
  data() {
    return {
      keyWord: "",
      result: null,
      empty: false, //当前搜索结果是否为空
      showShop: false, // 当前是否要显示商家信息
      filterData: null,
      restaurants: [],
      page: 0,
      size: 8,
      loading: false,
      data: null,
    };
  },
  watch: {
    keyWord(newValue) {
      // 在输入内容(只有空格和没有输入)的情况下不请求数据
      if (newValue !== "") {
        this.empty = false;
        this.showShop = false;
        this.debounceKeyWordChange();
      }
    },
  },
  created() {
    this.debounceKeyWordChange = debounce(this.searchKeyWordChange, 1000);
    // 获取筛选导航的数据
    this.getData();
  },
  methods: {
    // mint ui组价的加载数据的方法
    loadMore() {
      this.page++;
      this.$axios
        .post(`api/profile/restaurants/${this.page}/${this.size}`, this.data)
        .then((res) => {
          if (res.data.length > 0) {
            res.data.forEach((element) => {
              this.restaurants.push(element);
            });
            if (res.data.length < this.size) {
              this.loading = true;
            }
          } else {
            this.loading = true;
          }
        });
    },
    getData() {
      this.$axios("api/profile/filter").then((res) => {
        this.filterData = res.data;
      });
    },
    update(condition) {
      let data = {
        condition,
      };
      this.data = data;
      this.loading = false;
      this.shopItemClick();
      this.loadMore();
    },
    // 点击具体的搜索内容的时候发生的事件
    shopItemClick() {
      this.showShop = true;
      this.page = 0;
      this.restaurants = [];
    },
    // 点击搜索按钮触发的事件
    searchHandle() {
      if (!this.result) return;
      if (
        (this.result && this.result.restaurants.length > 0) ||
        this.result.words.length > 0
      ) {
        this.shopItemClick();
      } else {
        this.empty = true;
      }
    },
    // 输入框内的数据发生变化时发生的事件
    searchKeyWordChange() {
      this.$axios(`/api/profile/typeahead/${this.keyWord}`).then((res) => {
        this.result = res.data;
      });
    },
  },
  components: {
    MyHeader,
    SearchIndex,
    FilterView,
    IndexShop,
  },
};
</script>
<style scoped>
.search {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.search-header {
  margin-top: 45px;
  background: #fff;
  padding: 0 4.266667vw;
}
.search-header .search-wrap {
  padding: 2.933333vw 2.933333vw 2.933333vw 0;
  display: flex;
  align-items: center;
  position: relative;
}
.search-wrap .fa-search {
  width: 2.933333vw;
  height: 2.933333vw;
  color: #888;
  position: absolute;
  top: 4.6666666vw;
  left: 2.933333vw;
}
.search-wrap input {
  flex-grow: 1;
  border-radius: 0.266667vw;
  background-color: #f8f8f8;
  padding: 1.733333vw 4vw 1.733333vw 8.8vw;
  color: #666;
  outline: none;
  border: none;
}
.search-wrap button {
  outline: none;
  border: none;
  color: #333;
  font-size: 0.426667rem;
  background: #fff;
  font-weight: 700;
  margin-left: 2.933333vw;
  font-size: 14px;
}
.shop {
  width: 100%;
  height: calc(100% - 95px);
  overflow: auto;
}
.empty-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  display: flex;
  justify-content: center;
}
.empty-wrap img {
  width: 35vw;
  height: 35vw;
}
.empty-txt h4 {
  color: #666;
  font-size: 1rem;
  margin: 12vw 0 2vw 0;
}
.empty-txt span {
  color: #999;
  font-size: 0.8rem;
}
</style>
