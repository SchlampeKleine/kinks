import i18n from '@/i18n';

/* eslint-disable import/prefer-default-export */

export const changeLocale = ({ commit }, newLocale) => {
  i18n.locale = newLocale;
  commit('updateLocale', newLocale);
};
