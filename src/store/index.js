import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import console_user from './modules/console_user';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    console_user
  },
  getters
});

export default store;
