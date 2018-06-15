import { login, logout, getLoginInfo, register, updateLoginInfo, updatePassword, deleteUser } from '@/api/console_users';
import Cookies from 'js-cookie';

const user = {
  state: {
    info: {
      username: null,
      name: null,
      birthday: null,
      sex: null,
      free_time_1: null, // 周几
      free_time_2: null, // 上午，下午，晚上
      role: null,
      price: null,
      motto: null
    },
    auth: false
  },

  mutations: {
    SET_USERNAME: (state, username) => {
      state.info.username = username;
    },
    SET_NAME: (state, name) => {
      state.info.name = name;
    },
    SET_BIRTHDAY: (state, birthday) => {
      state.info.birthday = birthday;
    },
    SET_SEX: (state, sex) => {
      state.info.sex = sex;
    },
    SET_FREE_TIME_1: (state, free_time_1) => {
      state.info.free_time_1 = free_time_1;
    },
    SET_FREE_TIME_2: (state, free_time_2) => {
      state.info.free_time_2 = free_time_2;
    },
    SET_ROLE: (state, role) => {
      state.info.role = role;
    },
    SET_PRICE: (state, price) => {
      state.info.price = price;
    },
    SET_MOTTO: (state, motto) => {
      state.info.motto = motto;
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
          Cookies.set('userInfo', {
            'username': response.username,
            'password': response.password
          });
          commit('SET_NAME', response.name);
          if (response.birthday !== null) {
            commit('SET_BIRTHDAY', response.birthday.substr(0, 10));
          }
          commit('SET_USERNAME', response.username);
          commit('SET_SEX', response.sex);
          commit('SET_FREE_TIME_1', response.free_time_1);
          commit('SET_FREE_TIME_2', response.free_time_2);
          commit('SET_ROLE', response.role);
          commit('SET_PRICE', response.price);
          commit('SET_MOTTO', response.motto);
          commit('SET_AUTH', true);
          resolve();
        }).catch(error => {
          console.log(error);
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
        commit('SET_USERNAME', null);
        commit('SET_NAME', null);
        commit('SET_BIRTHDAY', null);
        commit('SET_SEX', null);
        commit('SET_FREE_TIME_1', null);
        commit('SET_FREE_TIME_2', null);
        commit('SET_ROLE', null);
        commit('SET_PRICE', null);
        commit('SET_MOTTO', null);
        commit('SET_AUTH', false);
        Cookies.remove('userInfo');
        resolve();
      });
    },
    // Cookies 登录
    GetLoginInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getLoginInfo().then(response => {
          commit('SET_NAME', response.name);
          if (response.birthday !== null) {
            commit('SET_BIRTHDAY', response.birthday.substr(0, 10));
          }
          commit('SET_USERNAME', response.username);
          commit('SET_SEX', response.sex);
          commit('SET_FREE_TIME_1', response.free_time_1);
          commit('SET_FREE_TIME_2', response.free_time_2);
          commit('SET_ROLE', response.role);
          commit('SET_PRICE', response.price);
          commit('SET_MOTTO', response.motto);
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
          resolve(response);
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
    },

    // 注销用户
    DeleteUser({ commit }) {
      return new Promise((resolve, reject) => {
        deleteUser().then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default user;
