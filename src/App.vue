<template>
  <div
  class="user-field"
  >
  <input
  placeholder="Name"
  v-model="user"
  @update="localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user))"
  />
  <button v-on:click="saveMyKinks">Save my kinks</button>
  <button v-on:click="loadMyKinks">Load my kinks</button>
  <button v-on:click="resetMyKinks">Reset my kinks</button>
  </div>
  <KinkCategory
  v-for="category in myKinks.categories"
  :key="category.name"
  :category=category
  :name="category.name"
  :subcategories="category.subcategories"
  :kinds="category.kinds"
  @update:category="updateCategory"
  />

</template>

<script>

const STORAGE_KEY = "all-my-kinks";
const kinkStorage = {
  fetch() {
    const allKinks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "['users': {}]");
    return allKinks;
  },
  save(allKinks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allKinks));
  }
};

import defaultKinks from '@/assets/template_limits.yaml';

import KinkCategory from '@/components/KinkCategory.vue'

export default {
  setup() {

  },
  name: 'App',
 components: {
    KinkCategory,
  },
  data() {
    return {
      user: null,
      allKinks: kinkStorage.fetch(),
      myKinks: ((this.allKinks || [] ) ["users"] || [] )[this.user] || defaultKinks,
      };
  },

  methods: {
    loadMyKinks() {
      this.allKinks=kinkStorage.fetch();
      this.myKinks=kinkStorage["users"][this.user||"default"]||defaultKinks;
    },
    saveMyKinks() {
      console.log(this.myKinks);
      if(!(this.allKinks["users"])) this.allKinks["users"] = {};
      this.allKinks["users"][this.user||"default"]=this.myKinks;
      kinkStorage.save(this.allKinks);
    },
    resetMyKinks() {
      this.myKinks = defaultKinks;
    },

    updateCategory(newVal) {
      var msg ={"new":newVal};
      console.log(msg);
      this.myKinks.categories[this.myKinks.categories.findIndex(element => element.name === newVal.name)]=newVal;
    },

  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
