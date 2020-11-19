<template>
    <div class="area" ref="areaScroll" v-if="cityInfo">
        <div class="scroll-wrap">
            <div class="hot-wrap">
                <div class="title">热门城市</div>
                <ul class="hot-city">
                    <li v-for="(city,index) in cityInfo.hotCities" :key="`hotCity${index}`">
                        {{city.name}}
                    </li>
                </ul>
            </div>
            <div class="city-wrap">
                <div class="city-content" v-for="(item,index) in keys" :key="`keys${index}`">
                   <div class="title">{{item}}</div>
                   <ul>
                       <li v-for="(item,index) in cityInfo[item]" :key="`city${index}`">
                           {{item.name}}
                       </li>
                   </ul>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    name: 'Alphabet',
    data() {
        return {
            scroll: null,
        }
    },
    props: {
        cityInfo: Object,
        keys: Array
    },
    methods: {
        initScroll() {
            this.scroll = new BScroll(this.$refs.areaScroll, {
                click: true
            })
        }
    }
}
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