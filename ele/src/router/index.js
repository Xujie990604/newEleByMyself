import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'index',
    component: () => import('../views/Index.vue'),
    children: [
      {
        path: "",
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../views/Order.vue')
      },
      {
        path: '/me',
        name: 'me',
        component: () => import('../views/Me.vue')
      },
      {
        path: '/address',
        name: 'address',
        component: () => import('../views/Address.vue')
      },
      {
        path: '/city',
        name: 'city',
        component: () => import('../views/City.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
    children: [
      {
        path: 'first',//使用children属性进行书写路由的时候。不必再写上父路由的路径
        // 在about路由的子路由first下面刷新。加载reset.css会在前面加上 /about
        name: 'first',
        component: () => import('../views/First.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login')
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  mode: 'history', //使用history模式 必须要使用字符串的形式，不然会出问题
  // base: '/xujie/', //什么意思???基础路由，作用是什么
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
