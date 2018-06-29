import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from '../views/layout/Layout';

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login'), hidden: true },
  { path: '/register', component: () => import('@/views/register'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    // hidden: true,
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/homepage/Homepage'),
      beforeEnter: (to, from, next) => {
        store.dispatch('GetMyResult').then((res) => {
          this.loading = false;
          next();
        }).catch((err) => {
          this.loading = false;
          console.log(err);
        });
      },
      meta: { title: '主页', icon: 'basketball' }
    }]
  },

  {
    path: '/Game',
    component: Layout,
    meta: { title: '球局', icon: 'player' },
    children: [{
      path: 'allGame',
      name: 'allGame',
      component: () => import('@/views/game/allGame/allGame'),
      // beforeEnter: (to, from, next) => {
      //   store.dispatch('GetAllGame').then((res) => {
      //     this.loading = false;
      //     next();
      //   }).catch((err) => {
      //     this.loading = false;
      //     console.log(err);
      //   });
      // },
      meta: { title: '所有球局', icon: 'peoples' }
    },
    {
      path: 'myGame',
      name: 'myGame',
      component: () => import('@/views/game/myGame'),
      meta: { title: '我的球局', icon: 'people' }
    }]
  },

  {
    path: '/Court',
    component: Layout,
    meta: { title: '球场', icon: 'court' },
    children: [{
      path: 'allCourt',
      name: 'allCourt',
      component: () => import('@/views/court/allCourt/allCourt'),
      meta: { title: '所有球场', icon: 'peoples' }
    },
    {
      path: 'myCourt',
      name: 'myCourt',
      component: () => import('@/views/court/myCourt'),
      meta: { title: '我的球场', icon: 'people' }
    }]
  },

  {
    path: '/mail',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Mail',
      component: () => import('@/views/mail/mail'),
      beforeEnter: (to, from, next) => {
        store.dispatch('SendResultMail').then((res) => {
          this.loading = false;
          next();
        }).catch((err) => {
          this.loading = false;
          console.log(err);
        });
      },
      meta: { title: '邮件', icon: 'mail' }
    }]
  },

  {
    path: '/setting',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Setting',
      component: () => import('@/views/setting/setting'),
      meta: { title: '个人设置', icon: 'settings' }
    }]
  },

  {
    path: '/form',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Form',
      component: () => import('@/views/form'),
      meta: { title: 'Form', icon: 'form' }
    }]
  },

  { path: '*', redirect: '/404', hidden: true }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
