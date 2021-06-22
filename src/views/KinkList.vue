<template>
  <div
    class="
           "
    >
    <KinkCategory
      v-for="category in localMyKinks.categories"
      :id="category.name"
      :key="'category-'+category.name"
      :category=category
      :name="category.name"
      :subcategories="category.subcategories"
      :kinds="category.kinds"
      @update:category="updateCategory"
      />
  </div>
</template>

<script>

import KinkCategory from '@/components/KinkCategory.vue';

export default {
  name: 'KinkListView',
  components: {
    KinkCategory,
  },
  props: {
    myKinks: {
      type: Object,
      required: true,
    },

  },
  data() {
    return {
      debug: false,

    };
  },
  methods: {

    updateCategory(newVal) {
      const msg = { 'KinkListView updateCategory': newVal };
      if (this.debug) {
        console.log(msg);
      }
      this.localMyKinks.categories[
        this.localMyKinks.categories.findIndex(
          (element) => element.name === newVal.name,
        )
      ] = newVal;
    },

  },

  computed: {
    localMyKinks: {
      get() {
        return this.myKinks;
      },
      set(newVal) {
        this.$emit('update:myKinks', newVal);
      },
    },
  },

};

</script>

<style>
</style>
