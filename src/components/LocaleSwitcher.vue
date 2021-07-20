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
import { useStore } from 'vuex';
// import store from '@/store';

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
    const store = useStore();

    const i18n = useI18n({
      scope: 'global',
    });

    /*
     * Source
     * https://next.vuex.vuejs.org/guide/composition-api.html#accessing-state-and-getters
     * https://blog.logrocket.com/advanced-localization-techniques-vue-js/
     */

    return {
      i18n,
      lang: computed(() => store.state.Locale.locale),
      setStoredLang: (newVal) => store.dispatch('Locale/changeLocale', newVal),
    };
  },
  computed: {
    locale: {
      get() {
        return this.lang;
      },
      set(newVal) {
        this.i18n.locale = newVal;
        this.setStoredLang(newVal);
      },
    },
  },
};
</script>
