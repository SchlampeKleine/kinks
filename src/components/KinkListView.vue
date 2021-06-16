<template>
  <div
    class="columns is-align-items-stretch is-variable is-full-mobile is-half-tablet
           is-one-quarter-desktop is-multiline"
    >
    <KinkCategory
      v-for="category in localMyKinks.categories"
      :key="category.name"
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
  methods: {

    updateCategory(newVal) {
      const msg = { updateCategory: newVal };
      console.log(msg);
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
