<template>
  <router-view
    name="UserOptions"
  ></router-view>
  <router-view
  ></router-view>
</template>

<script>
import {
  // useRoute,
  useRouter,
  RouterView,
} from 'vue-router';
import { mapState, useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'App',
  components: {
    RouterView,
  },

  setup() {
    const store = useStore();

    const router = useRouter();

    return {

      router,
      locale: computed(() => store.state.Locale.locale),

    };
  },

  watch: {

    locale() {
      this.router.replace({ params: { lang: this.locale } }).catch(() => {});
    },

  },

  methods: {

    updateCategory(newVal) {
      const msg = { updateCategory: newVal };
      console.log(msg);
      saveObjectToLocalStorage('curKinks', this.myKinks);
    },

  },
};
</script>

<style>
/*
 * https://github.com/jgthms/bulma/issues/2616
 */
.columns {
  overflow:hidden;
}
#app {
  /*
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  */
}
</style>
