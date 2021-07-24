/* eslint-disable import/prefer-default-export */

import yaml from 'js-yaml';

export const updateCurKinks = ({ commit }, kinks) => {
  commit('update_cur_kinks', { kinks });
};

export const updateCategory = ({ store, commit }, changedCategory) => {
  const tmpCurKinks = store.curKinks;
  tmpCurKinks.categories[
    tmpCurKinks.categories.findIndex((element) => element.name === changedCategory.name)
  ] = changedCategory;
  commit('update_cur_kinks', { ...tmpCurKinks });
};

export const loadFromString = ({ commit }, kinkString) => {
  const decodedKinks = decodeURI(kinkString);
  const tmpCurKinks = yaml.load(decodedKinks);
  commit('update_cur_kinks', { ...tmpCurKinks });
};
