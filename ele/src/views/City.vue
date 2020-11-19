<template>
  <div class="city">
    <div class="search-wrap">
      <div class="search">
        <i class="fa fa-search"></i>
        <input v-model="cityValue" type="text" placeholder="输入城市名" />
      </div>
      <button @click="$router.go(-1)">
        取消
      </button>
    </div>
    <div style="height: 100%;">
      <div class="location">
        <Location :address="city" />
      </div>
      <Alphabet :cityInfo="cityInfo" ref="allCity" :keys="keys" />
    </div>
  </div>
</template>

<script>
import Location from "../components/Location";
import Alphabet from "../components/Alphabet";

import { getCityInfo } from '../network/city.js';
export default {
  name: "City",
  data() {
    return {
      cityValue: "",
      cityInfo: null,
      keys: []
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
  mounted(){
    // 进行城市接口的调用和数据的处理
      this.getCityInfo()
  },
  methods: {
      getCityInfo() {
        // 调用二次包装的axios请求
          getCityInfo()
          .then(res => {
             this.cityInfo = res.data;
             this.keys = Object.keys(res.data)
             this.keys.pop();
             this.keys.sort();
            //  scroll的关键在于这里，等到DOM更新完成之后再进行scroll的初始化。
             this.$nextTick(() => {
               this.$refs.allCity.initScroll();
             })
          })
      },
  },
  components: {
    Location,
    Alphabet
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
