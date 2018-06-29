import { getOneGame, getMyGame, organizeGame, getAllGame, joinGame, quitGame } from '@/api/game';

const game = {
  state: {
    myGame_tableInfo: [],
    allGame_tableInfo: []
  },

  mutations: {
    SET_MY_GAME_TABLE_INFO: (state, myGame_tableInfo) => {
      state.myGame_tableInfo = myGame_tableInfo;
    },
    SET_ALL_GAME_TABLE_INFO: (state, allGame_tableInfo) => {
      state.allGame_tableInfo = allGame_tableInfo;
    }
  },

  actions: {
    // 获取某个球局信息
    GetOneGame({ commit }, gid) {
      return new Promise((resolve, reject) => {
        getOneGame(gid).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 获取我的球局
    GetMyGame({ commit }) {
      return new Promise((resolve, reject) => {
        getMyGame().then(response => {
          commit('SET_MY_GAME_TABLE_INFO', response);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 获取所有球局
    GetAllGame({ commit }) {
      return new Promise((resolve, reject) => {
        getAllGame().then(response => {
          commit('SET_ALL_GAME_TABLE_INFO', response);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 发起球局
    OrganizeGame({ commit }, gameInfo) {
      return new Promise((resolve, reject) => {
        organizeGame(gameInfo).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 加入球局
    JoinGame({ commit }, gameInfo) {
      return new Promise((resolve, reject) => {
        joinGame(gameInfo).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 退出球局
    QuitGame({ commit }, gameInfo) {
      return new Promise((resolve, reject) => {
        quitGame(gameInfo).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default game;
