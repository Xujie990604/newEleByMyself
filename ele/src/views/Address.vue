<template>
  <div class="address">
    <Header :isLeft="true" title="选择收货地址" />
    <div class="city-search">
      <div class="search">
        <span class="city" @click="$router.push('/city')">
          {{ city }}
          <i class="fa fa-angle-down"></i>
        </span>
        <i class="fa fa-search"></i>
        <input
          type="text"
          v-model="searchValue"
          placeholder="小区/写字楼/学校等"
        />
      </div>
      <Location @click="selectAddress" :address="address" />
    </div>
    <div class="area" v-if="areaList">
      <ul class="area-list" v-for="(item,index) in areaList" :key="`area-list${index}`">
        <li @click="selectAddress(item)">
          <h4>{{item.name}}</h4>
          <p>{{item.district}}{{item.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Location from "../components/Location";

import { debounce } from '../common/util';
export default {
  name: "Address",
  data() {
    return {
      city: "",
      searchValue: "",
      areaList: [], //根据关键字搜索到的城市数组
    };
  },
  computed: {
    // 从vuex中拿到的当前详细地址
    address() {
      return this.$store.getters.address;
    },
  },
  watch: {
    // 表单数据改变触发searchCity函数
    searchValue() {
      this.debounceSearchCity();
    },
  },
  created() {
    //   使用防抖函数，把匹配城市的方法进行防抖包装
      this.debounceSearchCity = debounce(this.searchCity, 1000);
  },
  methods: {
    // 根据关键字进行搜索地区
    searchCity() {
      const self = this;
      AMap.plugin("AMap.Autocomplete", function() {
        var autoOptions = {
          city: self.city,
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(self.searchValue, function(status, result) {
          self.areaList = result.tips;
        });
      });
    },
    // 点击具体的地区，携带参数回到home中
    selectAddress(item) {
      if(item) {
        this.$store.dispatch("setAddress", item.district + item.address + item.name);
      }
      this.$router.push("/home")
    }
  },
  // 路由守卫，接收city属性
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.city = to.query.city;
    });
  },
  components: {
    Header,
    Location,
  },
};
</script>

<style scoped>
.address {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}
.city-search {
  background-color: #fff;
  padding: 10px 20px;
  color: #333;
}

.search {
  background-color: #eee;
  height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  line-height: 40px;
}
.search .city {
  padding: 0 10px;
}
.city i {
  margin-right: 10px;
}
.search input {
  margin-left: 5px;
  background-color: #eee;
  outline: none;
  border: none;
}

.area {
  margin-top: 16px;
  background: #fff;
}
.area li {
  border-bottom: 1px solid #eee;
  padding: 8px 16px;
  color: #aaa;
}
.area li h4 {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}
</style>
