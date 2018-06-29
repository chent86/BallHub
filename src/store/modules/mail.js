import { sendResultMail, getMyMail, deleteMail } from '@/api/mail';

const mail = {
  state: {
    myMail_tableInfo: []
  },

  mutations: {
    SET_MY_MAIL_TABLE_INFO: (state, myMail_tableInfo) => {
      state.myMail_tableInfo = myMail_tableInfo;
    }
  },

  actions: {
    // 如果参加的球局已经结束，服务端发送邮件，提醒用户填写个人比赛结果
    SendResultMail({ commit }) {
      return new Promise((resolve, reject) => {
        sendResultMail().then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 获取我的邮件
    GetMyMail({ commit }) {
      return new Promise((resolve, reject) => {
        getMyMail().then(response => {
          commit('SET_MY_MAIL_TABLE_INFO', response);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 删除指定邮件
    DeleteMail({ commit }, mailInfo) {
      return new Promise((resolve, reject) => {
        deleteMail(mailInfo).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default mail;
