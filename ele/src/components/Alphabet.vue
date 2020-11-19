<template>
  <div class="area" ref="areaScroll" v-if="cityInfo">
    <div class="scroll-wrap">
      <div class="hot-wrap select-city">
        <div class="title ">热门城市</div>
        <ul class="hot-city">
          <li
            v-for="(city, index) in cityInfo.hotCities"
            :key="`hotCity${index}`"
            @click="$emit('select-city', city.name)"
          >
            {{ city.name }}
          </li>
        </ul>
      </div>
      <div class="city-wrap">
        <div
          class="city-content select-city"
          v-for="(item, index) in keys"
          :key="`keys${index}`"
          
        >
          <div class="title">{{ item }}</div>
          <ul>
            <li v-for="(item, index) in cityInfo[item]" :key="`city${index}`"
            @click="$emit('select-city', item.name)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="area-keys">
      <ul>
        <li @click="selectKeys(0)">#</li>
        <li
          v-for="(item, index) in keys"
          :key="`keys${index}`"
          @click="selectKeys(index + 1)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Alphabet",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    cityInfo: Object,
    keys: Array,
  },
  methods: {
    initScroll() {
      this.scroll = new BScroll(this.$refs.areaScroll, {
        click: true,
      });
    },
    // 点击右边的索引进行跳转
    selectKeys(index) {
        // 获取所有的DOM
        const selectCity = this.$refs.areaScroll.getElementsByClassName("select-city");
        // 根据传进来的index来获取对应的DOM
        let el = selectCity[index];
        // scroll对象上带有的方法，跳转到指定的DOM上
        this.scroll.scrollToElement(el, 250);
    },
  },
};
</script>

<style scoped>
.area {
  margin-top: 10px;
  box-sizing: border-box;
  padding: 0 16px;
  background: #fff;
  height: calc(100% - 65px);
  overflow: hidden;
}
.scroll-wrap {
  background: #fff;
  overflow: auto;
}
.title {
  color: #aaa;
  padding: 15px 0;
}
.hot-city {
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.hot-city li {
  width: 30%;
  background: #f1f1f1;
  margin: 0 10px 10px 0;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
}
.city-content li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.area-keys {
  position: fixed;
  right: 0;
  top: 25%;
  color: #aaa;
  font-size: 12px;
  line-height: 1.4;
  text-align: center;
  padding: 0 5px;
}
</style>
