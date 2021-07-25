/* eslint-disable import/prefer-default-export */

import yaml from 'js-yaml';

export const updateCurKinks = ({ commit }, kinks) => {
  commit('updateCurKinks', { curKinks: { ...kinks } });
};

export const updateCategory = ({ commit, getters }, changedCategory) => {
  const tmpCurKinks = { ...getters.getCurKinks };
  const debug = false;
  if (debug) {
    console.log({ 'CurKinks actions updateCategory': { tmpCurKinks, changedCategory } });
  }
  tmpCurKinks.categories[
    tmpCurKinks.categories.findIndex((element) => element.name === changedCategory.name)
  ] = changedCategory;
  commit('updateCurKinks', { curKinks: { ...tmpCurKinks } });
};

export const loadFromString = ({ commit }, kinkString) => {
  const decodedKinks = decodeURI(kinkString);
  const tmpCurKinks = yaml.load(decodedKinks);
  commit('update_cur_kinks', { ...tmpCurKinks });
};
