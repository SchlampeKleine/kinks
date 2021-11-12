/*
 * Source
 * https://blog.logrocket.com/advanced-localization-techniques-vue-js/
 */

import defaultKinks from '@/assets/kinks.yaml';
//import defaultKinks from '@/assets/kinks_reduced.yaml';
//

import Profile from './classes/Profile';

import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

export { defaultKinks };

const state = () => ({
  userKinks: [
    /** TODO
     * Should this be in the userKinks ?
     * */
    new Profile({
      username: 'CURRENT',
      kinks: { ...defaultKinks },
    }),
    new Profile({
      username: 'default',
      kinks: { ...defaultKinks },
    }),
  ],
  /**
   * ætype {Preferences[]}
   */
  preferences: [],
  userName: '',
});

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
