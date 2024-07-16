import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/doctors',
    },
    {
      path: '/doctors',
      name: 'doctors',
      component: () => import('../views/UsersView.vue'),
    },
    {
      path: '/nurses',
      name: 'nurses',
      component: () => import('../views/UsersView.vue'),
    },
  ],
});

export default router;
