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

Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
