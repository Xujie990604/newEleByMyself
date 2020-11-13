import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'), // 懒加载的定义方式
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    children: [
      {
        path: 'first',//使用children属性进行书写路由的时候。不必再写上父路由的路径
        // 在about路由的子路由first下面刷新。加载reset.css会在前面加上 /about
        name: 'First',
        component: () => import('../views/First.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history', //使用history模式 必须要使用字符串的形式，不然会出问题
  base: process.env.BASE_URL, //什么意思???
})

// 是整个路由对象router上的方法，不是路由映射表routes上的方法
// 路由守卫，如果isLogin参数不为true，那么就跳转到login页面
router.beforeEach((to,from,next) => {
  const isLogin = localStorage.getItem('login');
  if(to.path === '/login')  {
    next();
  }else {
    isLogin ? next() : next('/login');
  }
})


export default router;
