<template>
  <div v-if="showSearch" class="address-search">
    <div class="search-view">
    <!-- 搜索数据的输入框的父元素 -->
      <div class="search-box">
        <!-- 搜索的输入框 -->
        <div class="search-box-input">
          <i class="fa fa-search"></i>
          <input
            type="text"
            placeholder="请输入小区/写字楼/学校等"
            v-model="searchAddress"
          />
        </div>
        <button class="search-box-btn" @click="$emit('close')">取消</button>
      </div>

      <!-- 展示搜索到的城市数组 -->
      <ul class="search-list">
          <li class="search-row" v-for="(city, index) in areaList" :key="index" @click="selectAddress(city)">
              <p class="search-row-title">{{city.name}}</p>
              <p class="search-row-location">{{city.district}}{{city.address}}</p>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { debounce } from "../../common/util";
export default {
  name: "AddressSearch",
  data() {
    return {
      searchAddress: "",
      areaList: [],
    };
  },
  props: {
    showSearch: Boolean,
    addressInfo: Object
  },
  computed: {
    //   通过计算属性来获取存储在Vuex中的city或者province
    city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      );
    },
  },
  watch: {
    //   watch v-model 执行包装过的防抖函数
    searchAddress() {
      this.debounceSearch();
    },
  },
  created() {
    // 使用防抖函数包装
    this.debounceSearch = debounce(this.search);
  },
  methods: {
    //   根据关键字进行搜索城市数组的方法
    search() {
      // 调用谷歌的api来根据城市获取匹配的数据
      AMap.plugin("AMap.Autocomplete", () => {
        var autoOptions = {
          //city 限定城市，默认全国
          city: this.city,
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(this.searchAddress, (status, result) => {
          // 搜索成功时，result即是对应的匹配数据
          console.log(result);
          this.areaList = result.tips;
        });
      });
    },
    // 点击li 获取具体某个地址
    selectAddress(city) {
        this.addressInfo.address = city.name + city.district + city.address;
        this.$emit("close")
    }
  },
};
</script>

<style scoped>
.address-search {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
}
.search-view {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: #fff;
}
.search-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.133333vw 3.866667vw 1.866667vw;
}
.search-box-input {
  flex: 1;
  border: 1px solid #ddd;
  outline: 0;
  color: #999;
  height: 7.466667vw;
  margin-right: 2.666667vw;
  border-radius: 0.533333vw;
  background: #f5f5f5;
  padding: 0 2.133333vw;
  display: flex;
  align-items: center;
}
.search-box-input > input {
  margin-left: 2vw;
  width: 90%;
  background: none;
}
input,
button {
  outline: none;
  border: none;
}
.search-box-btn {
  color: #333;
  border-radius: 0.533333vw;
  width: 14.8vw;
  height: 7.466667vw;
  font-size: 0.9rem;
  white-space: nowrap;
}

.search-list {
  padding-left: 4vw;
}
.search-row {
  border-bottom: 0.266667vw solid #eee;
  padding: 2.533333vw 0 3.333333vw;
  line-height: 1.2;
}
.search-row-title {
  color: #333;
  font-size: 1rem;
}
.search-row-location {
  color: #999;
  font-size: 0.866rem;
}
</style>
