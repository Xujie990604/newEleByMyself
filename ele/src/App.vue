<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from './views/Home';
export default {
  name: 'App',
  components: {
    Home
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

a() {
  axios()
}