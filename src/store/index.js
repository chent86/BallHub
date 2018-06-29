import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import court from './modules/court';
import game from './modules/game';
import mail from './modules/mail';
import result from './modules/result';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    court,
    game,
    mail,
    result
  },
  getters
});

export default store;
