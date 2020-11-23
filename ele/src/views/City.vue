<template>
  <div class="city">
    <!-- 搜索框 -->
    <div class="search-wrap">
      <div class="search">
        <i class="fa fa-search"></i>
        <input v-model="cityValue" type="text" placeholder="输入城市名" />
      </div>
      <button @click="$router.go(-1)">
        取消
      </button>
    </div>
    <!-- 当前定位组件和按照字母顺序显示的城市名称 -->
    <div style="height: 100%;" v-if="filterCities.length == 0">
      <div class="location">
        <Location @click="selectCity(city)" :address="city" />
      </div>
      <Alphabet
        @select-city="selectCity"
        :cityInfo="cityInfo"
        ref="allCity"
        :keys="keys"
      />
    </div>
    <!-- 根据检索得到的city的数据  -->
    <div class="search-list" v-else>
      <ul>
        <li v-for="(item, index) in filterCities" :key="`filter${index}`" @click="selectCity(item)">
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Location from "../components/Location";
import Alphabet from "../components/Alphabet";

// import { getCityInfo } from "../network/city.js";
import { debounce } from "../common/util";
export default {
  name: "City",
  data() {
    return {
      cityValue: "",
      cityInfo: null,
      keys: [],
      allCities: [],
      filterCities: [],
    };
  },
  computed: {
    city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      );
    },
  },
  watch: {
    cityValue() {
      this.debounceFilterCity();
    },
  },
  created() {
    this.debounceFilterCity = debounce(this.filterCity, 1000);
  },
  mounted() {
    // 进行城市接口的调用和数据的处理
    this.getCityInfo();
  },
  methods: {
    getCityInfo() {
      // 调用二次包装的axios请求
      this.$axios('api/posts/cities')
      .then((res) => {
        this.cityInfo = res.data;
        this.keys = Object.keys(res.data);
        this.keys.pop();
        this.keys.sort();
        //  scroll的关键在于这里，等到DOM更新完成之后再进行scroll的初始化。
        this.$nextTick(() => {
          this.$refs.allCity.initScroll();
        });
        //  获取所有的城市名字
        this.keys.forEach((key) => {
          this.cityInfo[key].forEach((city) => {
            this.allCities.push(city.name);
          });
        });
      });
    },
    // 点击具体的city跳转到address页面
    selectCity(city) {
      this.$router.push({
        path: "/address",
        query: {
          city: city,
        },
      });
    },
    // 根据关键字检索城市
    filterCity() {
      this.filterCities = this.allCities.filter((city) =>
        city.indexOf(this.cityValue) !== -1
      );
    },
  },
  components: {
    Location,
    Alphabet,
  },
};
</script>

<style scoped>
.city {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}
.search-wrap {
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 3px 16px;
  display: flex;
  justify-content: space-between;
}
.search {
  background-color: #eee;
  border-radius: 10px;
  line-height: 40px;
  width: 85%;
  box-sizing: border-box;
  padding: 0 16px;
}
.search input {
  background: #eee;
  outline: none;
  border: none;
  margin-left: 5px;
}
.search-wrap button {
  outline: none;
  border: 0;
  color: #009eef;
}

.location {
  background: #fff;
  padding: 8px 16px;
  height: 65px;
  box-sizing: border-box;
}

.search-list {
  background: #fff;
  padding: 5px 16px;
}
.search-list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
