<template>
  <div
    class="
           "
    >
    <KinkCategory
      v-for="category in curKinks.categories"
      :id="category.name"
      :key="'category-'+category.name"
      :category=category
      :name="category.name"
      :subcategories="category.subcategories"
      :kinds="category.kinds"
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
      curKinks: computed(() => store.getters['AllKinks/getCurKinks']),
    };
  },

  data() {
    return {
      debug: false,
    };
  },

};

</script>
