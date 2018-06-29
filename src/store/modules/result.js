import { updateResult, getMyResult } from '@/api/result';

const result = {
  state: {
    myResult: {}
  },

  mutations: {
    SET_MY_RESULT: (state, myResult) => {
      state.myResult = myResult;
    }
  },

  actions: {
    // 更新比赛结果
    UpdateResult({ commit }, resultInfo) {
      return new Promise((resolve, reject) => {
        updateResult(resultInfo).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 获取个人最近7次球局表现
    GetMyResult({ commit }) {
      return new Promise((resolve, reject) => {
        getMyResult().then(response => {
          commit('SET_MY_RESULT', response);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default result;
