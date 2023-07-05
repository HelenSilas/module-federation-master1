import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// eslint-disable-next-line import/no-unresolved
import HomeView from '@/views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('app_exposes/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
