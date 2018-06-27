import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import console_user from './modules/console_user';
import court from './modules/court';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    console_user,
    court
  },
  getters
});

export default store;
