import Vue from 'vue'
import VueRouter from 'vue-router'
import cinemaRouter from './cinema'
import filmRouter from './film'
import centerRouter from './center'
import adminRouter from './admin'

Vue.use(VueRouter)

const routes = [
  cinemaRouter,
  filmRouter,
  centerRouter,
  adminRouter,
  {
    path: '*', //  通配符
    redirect: '/film'
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  // 路由路径
  base: 'YY',
  routes
})

export default router
