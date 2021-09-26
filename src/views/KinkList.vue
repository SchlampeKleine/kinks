<template>
  <div
    class="
           "
    >
    <KinkCategory
      v-for="categoryName in categoryNames"
      :id="categoryName"
      :key="'category-'+categoryName"
      :name="categoryName"
      :categoryName="categoryName"
      :selectedProfile="selectedProfile"
      />
  </div>
</template>

<script>
import { defineAsyncComponent, computed, ref } from 'vue';
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
    const profile = ref('CURRENT');

    // https://learnvue.co/2019/12/mastering-computed-properties-in-vuejs/
    const selectedProfile = computed({
      get: () => (
        profile.value
      ),
      set: (value) => {
        profile.value = value;
      },
    });

    const store = useStore();
    const categoryNames = computed({
      get: () => (
        store.getters[
          'AllKinks/getCategoryNamesForUser'
        ]({ username: selectedProfile.value })
      ),
    });

    console.log({
      categoryNames,

    });

    return {
      selectedProfile,
      categoryNames,
    };
  },

  data() {
    return {
      debug: false,
    };
  },

};

</script>
