<template>
  <div :class="{open: isSort || isScreen}" @click.self="hideBold">
    <!-- 导航 -->
    <div v-if="filterData" class="filter-wrap">
    <aside class="filter">
      <div
        class="filter-nav"
        :class="{ 'filter-bold': currentIndex == index }"
        v-for="(item, index) in filterData.navTab"
        :key="index"
        @click="filterSort(index)"
      >
        <span>{{ item.name }}</span>
        <i v-if="item.icon" :class="`fa fa-${item.icon}`"></i>
      </div>
    </aside>
  </div>

  <!-- 排序 -->
  <div class="filter-extend" v-if="isSort">
    <ul>
      <li v-for="(item, index) in filterData.sortBy" :key="index" @click="selectSort(item, index)">
        <span :class="{'select-name': index == selectIndex}">{{item.name}}</span>
        <i v-show="index == selectIndex" class="fa fa-check" ></i>
      </li>
    </ul>
  </div>

  <!-- 筛选 -->
  <div v-if="isScreen" class="filter-extend">
    <div class="filter-sort">
      <div class="more-filter" v-for="(screen, index) in filterData.screenBy" :key="index">
        <p class="title">{{screen.title}}</p>
        <ul>
          <li :class="{selected: item.select}" v-for="(item, i) in screen.data" :key="i" @click="selectScreen(item, screen)">
            <img v-if="item.icon" :src="item.icon" alt="筛选">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 确认和清空按钮 -->
    <div class="more-filter-btn">
      <span class="more-filter-clear" :class="{edit: edit}" @click="clearFilter">清空</span>
      <span class="more-filter-ok" @click="filterOk">筛选</span>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "FilterView",
  data() {
    return {
      currentIndex: 0,
      isSort: false,
      selectIndex: 0,
      isScreen: false
    };
  },
  props: {
    filterData: Object,
  },
  computed: {
    // 判断筛选条件是否有条件被选中，清空按钮是否可见
    edit() {
      let items = [];
      this.filterData.screenBy.forEach(screen => {
        screen.data.forEach(item => {
           items.push(item)
        })
      })
      return items.some(item => {
        return item.select == true;
      })
    }
  },
  methods: {
    // 点击导航栏时触发的函数
    filterSort(index) {
      this.currentIndex = index;
      switch(index) {
        case 0:
          this.$emit('home-fixed', true)
          this.isSort = true;
          this.isScreen = false;
          break;
        case 1:
          this.$emit("update", this.filterData.navTab[1].condition);
          this.hideBold();
          break;
        case 2:
          this.$emit("update", this.filterData.navTab[2].condition);
          this.hideBold();
          break;
        case 3:
          this.isScreen = true;
          this.isSort = false;
          this.$emit('home-fixed', true)
          break;
        default: 
            break;
      }
    },
    // 点击隐藏蒙版
    hideBold() {
      this.$emit('home-fixed', false)
      this.isSort = false;
      this.isScreen = false;
    },
    // 点击综合排序下的条件进行更新数据
    selectSort(item, index) {
      this.selectIndex = index;
      this.filterData.navTab[0].name = this.filterData.sortBy[index].name;
      this.hideBold();
      this.$emit('update', item.code)
    },
    // 点击筛选按钮里面具体的选项触发的函数
    selectScreen(item, screen) {
      if(screen.id == "MPI") {
        item.select = !item.select;
      }else {
        screen.data.forEach(item => {
          item.select = false;
        });
        item.select = !item.select;
      }
      
    },
    // 清空筛选条件按钮
    clearFilter() {
      this.filterData.screenBy.forEach(screen => {
        screen.data.forEach(item => {
           item.select = false;
        })
      })
    },
    // 确定筛选按钮
    filterOk() {
      let screenData = {
        MPI: '',
        offer: '',
        per: ''
      }
      let mpiStr = "";
      this.filterData.screenBy.forEach(screen => {
        screen.data.forEach(item => {
          if (item.select) {
            // 两种情况 单选 多选
            if (screen.id !== "MPI") {
              //单选
              screenData[screen.id] = item.code;
            } else {
              // 多选
              mpiStr += item.code + ",";
              screenData[screen.id] = mpiStr;
            }
          }
        });
      });
      console.log(screenData);
      this.$emit('update', screenData);
      this.hideBold();
    }
  },
};
</script>

<style scoped>
.filter-wrap {
  background: #fff;
  position: sticky;
  top: 54px;
  z-index: 10;
}
.filter {
  position: relative;
  border-bottom: 1px solid #ddd;
  line-height: 10.4vw;
  z-index: 101;
  height: 10.666667vw;
  display: flex;
  justify-content: space-around;
}
.filter-nav {
  flex: 1;
  text-align: center;
  color: #666;
  font-size: 0.8333rem;
}
.filter-nav i {
  width: 1.6vw;
  height: 0.8vw;
  margin-left: 1.333333vw;
  margin-bottom: 0.533333vw;
  fill: #333;
  will-change: transform;
}

.filter-bold {
  font-weight: 600;
  color: #333;
}

.open {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 3;
}

.filter-bold {
  font-weight: 600;
  color: #333;
}

.filter-extend {
  background-color: #fff;
  color: #333;
  padding-top: 2.133333vw;
  position: absolute;
  width: 100%;
  z-index: 4;
  left: 0;
  top: 24.533333vw;
}
.filter-extend li {
  position: relative;
  padding-left: 5.333333vw;
  line-height: 10.666667vw;
  overflow: hidden;
}
.fa-check {
  float: right;
  color: #009eef;
  margin-right: 3.733333vw;
  line-height: 10.666667vw;
}

.select-name {
  color: #009eef;
}

/* 筛选 */
.filter-sort {
  background: #fff;
  padding: 0 2.666667vw;
  line-height: normal;
}
.more-filter {
  margin: 2.666667vw 0;
  overflow: hidden;
}
.more-filter .title {
  margin-bottom: 2vw;
  color: #666;
  font-size: 0.5rem;
}
.more-filter ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 0.8rem;
}
.more-filter li {
  box-sizing: border-box;
  width: 30%;
  height: 9.333333vw;
  line-height: 9.333333vw;
  margin: 0.8vw 1%;
  background: #fafafa;
}
.more-filter li img {
  width: 3.466667vw;
  height: 3.466667vw;
  vertical-align: middle;
  margin-right: 0.8vw;
}
.more-filter li span {
  margin-left: 2%;
  vertical-align: middle;
}

.more-filter-btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fafafa;
  box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
  line-height: 11.466667vw;
  box-sizing: border-box;
}
.more-filter-btn span {
  font-size: 0.826667rem;
  text-align: center;
  text-decoration: none;
  flex: 1;
}
.more-filter-clear {
  color: #ddd;
  background: #fff;
}
.more-filter-ok {
  color: #fff;
  background: #00d762;
  border: 0.133333vw solid #00d762;
}
.selected {
  color: #3190e8 !important;
  background-color: #edf5ff !important;
}
.edit {
  color: #333 !important;
}
</style>
