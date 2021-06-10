/* eslint-disable */
import { useI18n } from 'vue-i18n';

export const changeLocale = ({ commit }, newLocale) => {
  const i18n = useI18n({
    useScope: global,
  });
  i18n.locale = newLocale; // important!
  commit('updateLocale', newLocale);
};
