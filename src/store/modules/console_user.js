import { login, logout, getLoginInfo, register, updateLoginInfo, updatePassword } from '@/api/console_users';
import Cookies from 'js-cookie';

const user = {
  state: {
    info: {
      user_id: null,
      username: null,
      age: null,
      sex: null,
      free_time: null,
      role: null,
      price: null,
      team_name: null
    },
    auth: false
  },

  mutations: {
    SET_USERID: (state, user_id) => {
      state.info.user_id = user_id;
    },
    SET_USERNAME: (state, username) => {
      state.info.username = username;
    },
    SET_AGE: (state, age) => {
      state.info.age = age;
    },
    SET_SEX: (state, sex) => {
      state.info.sex = sex;
    },
    SET_FREE_TIME: (state, free_time) => {
      state.info.free_time = free_time;
    },
    SET_ROLE: (state, role) => {
      state.info.role = role;
    },
    SET_PRICE: (state, price) => {
      state.info.price = price;
    },
    SET_TEAM_NAME: (state, team_name) => {
      state.info.team_name = team_name;
    },
    SET_AUTH: (state, auth) => {
      state.auth = auth;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          Cookies.set('userInfo', response);
          commit('SET_USERNAME', response.username);
          commit('SET_AGE', response.age);
          commit('SET_SEX', response.sex);
          commit('SET_FREE_TIME', response.free_time);
          commit('SET_ROLE', response.role);
          commit('SET_PRICE', response.price);
          commit('SET_TEAM_NAME', response.team_name);
          commit('SET_AUTH', true);
          resolve();
        }).catch(error => {
          // console.log(error);
          reject(error);
        });
      });
    },

    // 登出
    LogOut({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          dispatch('FeLogOut').then(() => resolve());
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FeLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_USERID', null);
        commit('SET_USERNAME', null);
        commit('SET_AGE', null);
        commit('SET_SEX', null);
        commit('SET_FREE_TIME', null);
        commit('SET_AUTH', false);
        Cookies.remove('userInfo');
        resolve();
      });
    },
    // Cookies 登录
    GetLoginInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getLoginInfo().then(response => {
          commit('SET_USERNAME', response.username);
          commit('SET_AGE', response.age);
          commit('SET_SEX', response.sex);
          commit('SET_FREE_TIME', response.free_time);
          commit('SET_ROLE', response.role);
          commit('SET_PRICE', response.price);
          commit('SET_TEAM_NAME', response.team_name);
          commit('SET_AUTH', true);
          resolve();
        }).catch((err) => reject(err));
      });
    },

    // 注册
    Register({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        register(username, userInfo.password, userInfo.role).then(response => {
          resolve();
        }).catch(error => {
          // console.log(error);
          reject(error);
        });
      });
    },

    // 更新用户信息
    UpdateLoginInfo({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        updateLoginInfo(userInfo).then(response => {
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 更新密码
    UpdatePassword({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        console.log(userInfo);
        updatePassword(userInfo).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default user;
