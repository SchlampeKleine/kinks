/*
 * Source
 * https://blog.logrocket.com/advanced-localization-techniques-vue-js/
 * https://next.vuex.vuejs.org/guide/hot-reload.html#dynamic-module-hot-reloading
 */

import { createStore, createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const debug = process.env.NODE_ENV !== 'production';

// Load all modules.
function loadModules() {
  const context = require.context('@/store/modules', true, /index\.js$/);

  const modules = context
    .keys()
    .map((key) => (
      { key, name: key.match(/([a-z_]+)\/index\.js$/i)[1] }))
    .reduce(
      /* eslint-disable no-shadow */
      (modules, { key, name }) => ({
        ...modules,
        [name]: context(key).default,
      }),
      {},
    );

  return { context, modules };
}

const { context, modules } = loadModules();

const store = createStore({
  modules,
  strict: false, // process.env.NODE_ENV !== 'production',
  plugins: debug ? [
    createLogger(),
    createPersistedState(),
  ] : [
    createPersistedState(),
  ],
});

if (module.hot) {
  // Hot reload whenever any module changes.
  module.hot.accept(context.id, () => {
    const { modules } = loadModules();
    console.log(JSON.stringify(modules));
    store.hotUpdate({
      modules,
    });
  });
}
export default store;
