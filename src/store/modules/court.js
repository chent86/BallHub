import { getMyCourt, getAllCourt, addCourt } from '@/api/court';

const user = {
  state: {
    myCourt_tableInfo: [],
    allCourt_tableInfo: []
  },

  mutations: {
    SET_MY_COURT_TABLE_INFO: (state, myCourt_tableInfo) => {
      state.myCourt_tableInfo = myCourt_tableInfo;
    },
    SET_ALL_COURT_TABLE_INFO: (state, allCourt_tableInfo) => {
      state.allCourt_tableInfo = allCourt_tableInfo;
    }
  },

  actions: {
    // 获取我添加的球场信息
    GetMyCourt({ commit }) {
      return new Promise((resolve, reject) => {
        getMyCourt().then(response => {
          commit('SET_MY_COURT_TABLE_INFO', response);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 获取所有球场球场信息
    GetAllCourt({ commit }) {
      return new Promise((resolve, reject) => {
        getAllCourt().then(response => {
          commit('SET_ALL_COURT_TABLE_INFO', response);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 添加球场
    AddCourt({ commit }, courtInfo) {
      return new Promise((resolve, reject) => {
        addCourt(courtInfo).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default user;
