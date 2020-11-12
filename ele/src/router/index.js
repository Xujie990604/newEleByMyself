import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
]

const router = new VueRouter({
  routes,
  mode: 'history', //使用history模式 必须要使用字符串的形式，不然会出问题
})


export default router
