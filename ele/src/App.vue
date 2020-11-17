<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.getLocation()
  },
  methods: {
     // 调用高德提供的获取当前定位的方法
    getLocation() {
      const self = this;
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        // 精确定位成功执行的方法
        function onComplete(data) {
          // data是具体的定位信息  精准定位
          console.log(data);
          //把得到的定位信息存储到Vuex中，使用this.$store.dispatch请求，调用actions中的方法
          self.$store.dispatch("setLocation", data);
          self.$store.dispatch("setAddress", data.formattedAddress);
        }
        // 精确定位失败执行的方法
        function onError(data) {
          // 定位出错    非精准定位
          console.log(data);
          self.getLngLatLocation();
        }
      });
    },
    // 精确定位失败调用的方法
    getLngLatLocation() {
      const self = this;
      AMap.plugin("AMap.CitySearch", function() {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            console.log(result);
            AMap.plugin("AMap.Geocoder", function() {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode
              });

              var lnglat = result.rectangle.split(";")[0].split(",");

              geocoder.getAddress(lnglat, function(status, data) {
                if (status === "complete" && data.info === "OK") {
                  // result为对应的地理位置详细信息
                  console.log(data);
                  // 使用this.$axios.dispatch方法，把得到的数据存放到Vuex中
                  self.$store.dispatch("setLocation", {
                    addressComponent: {
                      city: result.city,
                      province: result.province
                    },
                    formattedAddress: data.regeocode.formattedAddress
                  });
                  // 使用this.$store.dispatch方法，把得到的数据存放到Vuex中
                  self.$store.dispatch(
                    "setAddress",
                    data.regeocode.formattedAddress
                  );
                }
              });
            });
          }
        });
      });
    }
  }
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  font-size: 14px;
  background-color: #f1f1f1;
}
</style>