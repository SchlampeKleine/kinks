<template>
  <h3>{{ category.name }}</h3>
  <KinkSubCategory
    v-for="subcategory in category.subcategories"
    v-bind:key="subcategory.name"
    :sub_category="subcategory"
  />
  <Kink
    v-for="kink in category.kinds"
    v-bind:key="kink"
    :kink="kink"
  />
</template>

<script>
console.log("create category");
import Kink from '@/components/Kink.vue'
import KinkSubCategory from '@/components/KinkSubCategory.vue'
export default {
  name: 'KinkCategory',
  props: {
    category: Object,
  },
  computed: {

  },
  components: {
    Kink,
    KinkSubCategory,
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
