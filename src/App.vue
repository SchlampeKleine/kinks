<template>
  <KinkCategory
  v-for="category in kinks.categories"
  :category="category"
  :key="category.name"
  />
</template>

<script>

import kinks from '@/assets/template_limits.yaml';
console.log(kinks);

import KinkCategory from '@/components/KinkCategory.vue'

export default {
  name: 'App',
  components: {
    KinkCategory,
  },
  data() {
    return {
      kinks: kinks
      };
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
