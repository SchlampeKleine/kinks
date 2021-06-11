<template>
  <router-view
    name="UserOptions"
    v-model:user="user"
    v-model:allKinks="allKinks"
    v-model:myKinks="myKinks"
  ></router-view>
  <router-view
    v-model:myKinks="myKinks"
  ></router-view>
</template>

<script>
import {
  // useRoute,
  // useRouter,
  RouterView,
} from 'vue-router';

export default {
  name: 'App',
  components: {
    RouterView,
  },
  data() {
    return {
      user: '',
      myKinks: Object(),
      allKinks: this.getJSONFromLocalStorage('allKinks'),
    };
  },

  watch: {

    allKinks: {
      deep: true,
      handler(newVal) {
        console.log({ 'change allKinks': newVal });
        this.saveToLocalStorage('allKinks', this.allKinks);
      },
      immediate: true,
    },

  },

  methods: {

    saveToLocalStorage(key, data) {
      const parsedData = JSON.stringify(data);
      localStorage.setItem(key, parsedData);
      console.log({
        'Saved to localStorage': {
          key: data,
        },
      });
    },

    getJSONFromLocalStorage(key) {
      let localList = {};
      if (localStorage.getItem(key)) {
        try {
          localList = JSON.parse(localStorage.getItem(key));
        } catch (e) {
          console.warn(e);
          localStorage.remove(key);
        }
      }
      return localList;
    },

    updateCategory(newVal) {
      const msg = { updateCategory: newVal };
      console.log(msg);
      this.myKinks.categories[
        this.myKinks.categories.findIndex((element) => element.name === newVal.name)
      ] = newVal;
    },

  },
};
</script>

<style>
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
