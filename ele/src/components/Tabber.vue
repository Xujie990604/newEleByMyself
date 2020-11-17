<template>
  <div class="tabber">
    <router-link
      class="tab-item"
      tag="div"
      v-for="(item, index) in data"
      :key="`tabber${index}`"
      :to="item.path"
    >
      <div class="icon-contant">
          <i class="iconfont" :class="item.icon"></i>
          <p>{{ item.text }}</p>
      </div>
    </router-link>
  </div>
</template>


<script>
export default {
  name: "Tabber",
  props: {
    data: Array,
  },
  created() {},
};
</script>

<style scoped>
.tabber {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    box-sizing: border-box;
    height: 45px;
    width: 100%;
    border-top: #d9d9d9 solid 1px;
}

.tab-item {
    height: 45px;
    flex: 1 1 0;
}

.tab-item.active {
    color: #009eef;
} 

.icon-contant {
    height: 45px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.iconfont {
    font-size: 20px;
    margin-bottom: 3px;
}
</style>