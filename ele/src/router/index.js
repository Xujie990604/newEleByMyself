import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
        path: 'first',
        name: 'first',
        component: () => import('../views/First.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search')
  },
  {
    path: '/shop', //改为使用动态匹配路由传参
    component: () => import('../views/shop/Shop.vue'),
    redirect: '/goods',
    children: [
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../views/shop/Goods')
      },
      {
        path: '/comments',
        name: 'comments',
        component: () => import('../views/shop/Comments')
      },
      {
        path: '/seller',
        name: 'seller',
        component: () => import('../views/shop/Seller')
      }
    ]
  },
  {
    path: '/myAddress',
    name: 'myAddress',
    component: () => import('../views/orders/MyAddress.vue')
  },
  {
    path: '/addAddress',
    name: 'addAddress',
    component: () => import('../views/orders/AddAddress.vue')
  },
  {
    path: '/settleMent',
    name: 'settleMent',
    component: () => import('../views/orders/SettleMent.vue')
  },
  {
    path: '/remark',
    name: 'remark',
    component: () => import('../views/orders/Remark.vue')
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('../views/Pay.vue')
  },
  {
    path: '/orderInfo',
    name: 'orderInfo',
    component: () => import('../views/orders/OrderInfo.vue')
  },
  {
    path: '*',
    component: () => import("../views/NotFoundViews.vue")
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  mode: 'history',
  // base: '', //就是一个基础路径
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
