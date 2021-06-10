<template>
<div class="lang-dropdown">
<select class="select" v-model="locale">
<option
v-for="(lang, i) in languageArray"
:key="`lang${i}`"
:value="lang"
>{{ lang }}</option>
  <option value="de">de</option>
</select>
</div>
</template>

<script>
import { computed } from 'vue';
import { languages } from '@/i18n';
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
    /*
     * Source
     * https://next.vuex.vuejs.org/guide/composition-api.html#accessing-state-and-getters
     * https://blog.logrocket.com/advanced-localization-techniques-vue-js/
     */

    return {
      // locale,
      // store,
      lang: computed(() => store.state.locale),
      setLang: (newVal) => store.dispatch('changeLocale', newVal),
      updateRoute: (newLocale) => router.replace({ params: { lang: newLocale } }).catch(() => {}),
    };
  },
  computed: {
    locale: {
      get() {
        return this.lang;
      },
      set(newVal) {
        this.setLang(newVal);
        this.updateRoute(newVal);
      },
    },
  },
};
</script>
