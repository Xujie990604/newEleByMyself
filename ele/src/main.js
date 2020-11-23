import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
// 引入mint ui库
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

// 安装mint ui插件
Vue.use(MintUI);
// 引入加载动画
import { Indicator } from 'mint-ui';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Indicator.open({
    text: '加载中',
    spinnerType: 'fading-circle'
  })
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  Indicator.close();
  return response;
}, function (error) {
  // 对响应错误做点什么
  Indicator.close();
  return Promise.reject(error);
});

Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
