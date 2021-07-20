/*
 * Source
 * https://blog.logrocket.com/advanced-localization-techniques-vue-js/
 */

import defaultKinks from '@/assets/kinks.yaml';
// import defaultKinks from '@/assets/kinks_reduced.yaml';

import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

export { defaultKinks };

const state = () => ({
  userKinks: [
    /** TODO
     * Should this be in the userKinks ?
     * */
    {
      username: 'default',
      kinks: defaultKinks,
    },
  ],
  userName: '',
});

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
