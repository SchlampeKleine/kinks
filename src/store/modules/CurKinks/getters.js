/* eslint-disable import/prefer-default-export */
import defaultKinks from '@/assets/kinks.yaml';

import yaml from 'js-yaml';

export const getCurKinks = (state) => {
  console.log('getCurKinks');
  return Object.keys(state.curKinks) === 0
    ? defaultKinks
    : state.curKinks;
};

export const getCurKinksAsYAML = (state, getters) => yaml.dump(
  { categories: state.curKinks.categories },
);

export const getCurKinksAsURI = (state, getters) =>
  encodeURI(getters.getCurKinksAsYAML);
