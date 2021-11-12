<template>
  <section
    class="
           section
           is-centered
           "
    >
    <div class="block">
      <h2
        class="title block has-text-primary has-text-centered"
        >{{ t('name',category.name) }}
      </h2>
    </div>
    <div class="block">
      <div v-if="getEditMode" class="block">
        <div class="buttons is-right">
          <LocaleEditor v-model:messages="localCategory.messages"/>
          <ModalButtonYamlEdit v-model:dataObject="localCategory" />
        </div>
      </div>
    </div>
    <div class="block">
      <keep-alive>
      <div
        class=" columns
                   is-multiline
                   is-tablet"
        >
        <KinkSubCategory
          v-for="subcategoryName in subcategoryNames"
          :id="id+'-'+subcategoryName"
          :key="'subcategories-'+subcategoryName"
          :categoryName="categoryName"
          :selectedProfile="selectedProfile"
          :subcategoryName="subcategoryName"
          />
        <Kink
          v-for="kinkName in kinkNames"
          :id="id+'-'+kinkName"
          :key="'kink-'+kinkName"
          :kinkName="kinkName"
          :categoryName="categoryName"
          :selectedProfile="selectedProfile"
          />
      </div>
      </keep-alive>
    </div>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { defineAsyncComponent, computed } from 'vue';
import { useStore } from 'vuex';

import LoaderBar from '@/components/LoaderBar.vue';
import LocaleEditor from '@/components/LocaleModifier.vue';
import useEditMode from '@/plugins/EditMode';
import ModalButtonYamlEdit from '@/components/ModalButtonYamlEdit.vue';

export default {
  name: 'KinkCategory',
  props: {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    categoryName: {
      type: String,
      required: true,
    },
    selectedProfile: {
      type: String,
      required: true,
    },

  },
  setup(props) {
    const store = useStore();
    const category = computed(
      () => store.getters['AllKinks/getCategoryForUser']({
        username: props.selectedProfile,
        categoryName: props.categoryName,
        debug: true,
      }),
    );

    const subcategoryNames = computed(() => category.value.subcategoryNames);
    const kinkNames = computed(() => category.value.kinkNames);

    if (false) {
      console.log({
        props,
        category,
        subcategoryNames,
        kinkNames,
      });
    }
    const { t } = useI18n({
      messages: category.value.messages || { en: { name: props.categoryName } },
    });
    const { getEditMode } = useEditMode();

    return {
      category,
      subcategoryNames,
      kinkNames,
      updateCategory: (newVal) => store.dispatch('CurKinks/updateCategory', newVal),
      t,
      getEditMode,
    };
  },
  emits: {
    'update:category': (newVal) => {
      const debug = false;
      if (debug) {
        console.log({ 'KinkCategory emit update:category': newVal });
      }
      return true;
    },
  },
  computed: {
    localCategory: {
      get() {
        const tmpCategory = this.category;
        if (!(tmpCategory.subcategories)) tmpCategory.subcategories = [];
        if (!(tmpCategory.kinds)) tmpCategory.kinds = [];
        return tmpCategory;
      },
      set(newVal) {
        this.updateCategory(newVal);
      },
    },

  },
  methods: {

    updateSubcategory(newVal) {
      this.localCategory.subcategories[
        this.localCategory.subcategories.findIndex(
          (element) => element.name === newVal.name,
        )
      ] = newVal;
      this.$emit('update:category', this.localCategory);
    },

    updateKink(newVal) {
      if (this.debug) {
        console.log({ 'KinkCategory updateKink': newVal });
      }
      this.localCategory.kinds[
        this.localCategory.kinds.findIndex((element) => element.name === newVal.name)
      ] = newVal;
      this.$emit('update:category', this.localCategory);
    },
  },
  data() {
    return {
      debug: false,
    };
  },
  components: {
    LoaderBar,
    ModalButtonYamlEdit,
    Kink: defineAsyncComponent({
      loader: () => import('@/components/Kink.vue'),
      loadingComponent: LoaderBar,
    }),
    KinkSubCategory: defineAsyncComponent({
      loader: () => import('@/components/KinkSubCategory.vue'),
      loadingComponent: LoaderBar,
    }),
    LocaleEditor,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
