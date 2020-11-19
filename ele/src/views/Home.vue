<template>
  <div class="home">
    <div class="header">
      <div class="header">
        <div class="address-map"  @click="$router.push({path: '/address', query: {city: city}})">
          <i class="fa fa-map-marker"></i>
          <span>{{address}}</span>
          <i class="fa fa-sort-desc"></i>
        </div>
        <div class="shop-search">
          <i class="fa fa-search"></i>
          搜索商家，商家名称
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ 重定向到 src
export default {
  name: 'Home',
  data() {
    return {
      
    }
  },
  computed: {
    address() {
      return this.$store.getters.address;
    },
    city() {
      return this.$store.getters.location.addressComponent.city || 
      this.$store.getters.location.addressComponent.province
    }
  },
  mounted() {
  },
  components: {
  },
}
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
.search-wrap, .shop-search {
  margin-top: 10px;
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}

</style>
