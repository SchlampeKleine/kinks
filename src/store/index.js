/*
 * Source
 * https://blog.logrocket.com/advanced-localization-techniques-vue-js/
 */

import { createStore, createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { selectedLocale } from '@/i18n';

import * as mutations from '@/store/mutations';
import * as actions from '@/store/actions';

const debug = process.env.NODE_ENV !== 'production';

const state = {
  locale: selectedLocale,
};

const store = createStore({
  state,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production',
  plugins: debug ? [
    createLogger(),
    createPersistedState(),
  ] : [
    createPersistedState(),
  ],
});

if (module.hot) {
  module.hot.accept([
    // './getters',
    './actions',
    './mutations',
  ], () => {
    store.hotUpdate({
      // getters: require('./getters'),
      /* eslint-disable-next-line */
      actions: require('./actions'),
      /* eslint-disable-next-line */
      mutations: require('./mutations'),
    });
  });
}

export default store;
