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
import { defineAsyncComponent, computed } from 'vue';
import { useStore } from 'vuex';

import LoaderBar from '@/components/LoaderBar.vue';

export default {
  name: 'KinkListView',
  components: {
    KinkCategory: defineAsyncComponent({
      loader: () => import('@/components/KinkCategory.vue'),
      loadingComponent: LoaderBar,
    }),
  },

  setup() {
    const store = useStore();

    return {
      updateCurKinks: (newKinks) => store.dispatch('CurKinks/updateCurKinks', newKinks),
      curKinks: computed(() => store.state.CurKinks.curKinks),
    };
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
        return this.curKinks;
      },
      set(newVal) {
        if (this.debug) {
          console.log({ 'updating curkinks': newVal });
        }
        this.updateCurKinks(newVal);
      },
    },
  },

};

</script>

<style>
</style>
