import router from './router';
import store from './store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条样式
// import { Message } from 'element-ui';

// const whiteList = ['/login']; // 不认证白名单

// let toLogin = false;

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (/* toLogin &&  */to.path === '/login') {
    next();
  }
  if (to.path === '/register') {
    if (from.path === 'login') {
      next({ path: '/register' });
      NProgress.done();
    } else {
      next();
    }
  } else if (!store.state.auth) {
    // 如果前端认为没有认证
    // 尝试用 cookie 获取当前是否已登录
    // GetLoginInfo有 设置前端登录状态 的副作用，因此不需要再次获取登录信息
    store.dispatch('GetLoginInfo').then(status => {
      if (to.path === '/login') {
        // 如果是要到登录页，由于已经登录，因此定向到 '/'
        next({ path: '/' });
        NProgress.done(); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
      } else {
        next();
      }
    }).catch((err) => {
      if (err.response.status === 401) {
        if (from.path === '/login') {
          next({ path: '/login' });
        }
        NProgress.done();
      }
    }); // 拦截器中已处理错误
  } else {
    // 前端认为已经登录
    if (to.path === '/login') {
      // 如果是要到登录页，由于已经登录，因此定向到 '/'
      next({ path: '/' });
      NProgress.done(); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
