import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '../views/Auth.vue';
import Home from '../views/Home.vue';
import JobBoard from '../views/JobBoard.vue';
import Dashboard from '../views/Dashboard.vue';

import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/jobs',
    name: 'Job Board',
    component: JobBoard,
    props: true,
  },
  {
    path: '/login',
    alias: '/signup',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const { id, token } = store.state.user;
    if (!id || !token) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      });
    } else next();
  } else next();
});

export default router;
