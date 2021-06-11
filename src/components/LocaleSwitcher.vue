<template>
  <div class="control has-icons-left">
    <div class="select">
      <select v-model="locale">
        <option
          v-for="(lang, i) in languageArray"
          :key="`lang${i}`"
          :value="lang"
          >{{ lang }}</option>
      </select>
      <span class="icon is-left">
        <i class="fas fa-globe"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { languages } from '@/i18n';
import { useI18n } from 'vue-i18n';
import store from '@/store';

import {
  useRouter,
} from 'vue-router';

export default {
  name: 'LocaleSwitcher',
  data() {
    return {
      languageArray: languages,
    };
  },
  setup() {
    const router = useRouter();
    const i18n = useI18n({
      useScope: global,
    });

    /*
     * Source
     * https://next.vuex.vuejs.org/guide/composition-api.html#accessing-state-and-getters
     * https://blog.logrocket.com/advanced-localization-techniques-vue-js/
     */

    return {
      // locale,
      // store,
      lang: computed(() => store.state.locale),
      i18n,
      setStoredLang: (newVal) => store.dispatch('changeLocale', newVal),
      updateRoute: (newLocale) => router.replace({ params: { lang: newLocale } }).catch(() => {}),
    };
  },
  computed: {
    locale: {
      get() {
        return this.lang;
      },
      set(newVal) {
        this.i18n.locale = newVal;
        this.setLang(newVal);
        this.updateRoute(newVal);
      },
    },
  },
};
</script>
