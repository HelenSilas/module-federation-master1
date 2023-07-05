import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/login'
  // },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录页'
    },
    component: () => import('@/views/login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: 'home'
    },
    component: () => import('@/views/layout.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
