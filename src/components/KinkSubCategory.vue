<template>
  {{ subcategoryName }}
  {{ kinkNames }}
  <div
    class="
           column
           is-variable
           is-full
           "
    >
    <h3
      class="title block is-primary has-text-centered has-text-primary"
      >{{ t('name',subcategory.name) }}</h3>
    <div v-if="getEditMode" class="block">
        <div class="buttons is-right">
          <LocaleEditor v-model:messages="localSubCategory.messages"/>
          <ModalButtonYamlEdit v-model:dataObject="localSubCategory" />
        </div>
    </div>
    <div
      class="
             columns
             is-variable
             is-multiline
             "
      >
      <Kink
          v-for="kinkName in kinkNames"
          :id="id+'-'+kinkName"
          :key="'kink-'+kinkName"
          :kinkName="kinkName"
          :categoryName="categoryName"
          :selectedProfile="selectedProfile"
          :subcategoryName="subcategoryName"
        />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import LoaderBar from '@/components/LoaderBar.vue';
import LocaleEditor from '@/components/LocaleModifier.vue';
import ModalButtonYamlEdit from '@/components/ModalButtonYamlEdit.vue';
import useEditMode from '@/plugins/EditMode';

export default {
  name: 'KinkSubCategory',
  props: {
    id: {
      type: String,
    },
    key: {
      type: String,
    },
    name: {
      type: String,
    },
    selectedProfile: {
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    subcategoryName: {
      type: String,
      required: true,
    },
    selectedProfile: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore();

    const subcategory = computed(
      () => store.getters['AllKinks/getSubCategoryForUser'](
        {
          username: props.selectedProfile,
          categoryName: props.categoryName,
          subcategoryName: props.subcategoryName,
        },
      ),
    );

    const { t } = useI18n({
      messages: subcategory.value.messages || { en: { name: subcategory.value.name } },
    });
    const { getEditMode } = useEditMode();
    return {
      subcategory,
      t,
      getEditMode,
      kinkNames: computed(() => subcategory.value.kinkNames),
    };
  },
  methods: {

    updateKink(newVal) {
      this.localSubCategory.kinds[
        this.localSubCategory.kinds.findIndex(
          (element) => element.name === newVal.name,
        )
      ] = newVal;
      console.log({ 'KinkSubCategory: updated Kink': newVal });
      this.$emit('update:subcategory', this.localSubCategory);
    },

  },
  components: {
    ModalButtonYamlEdit,
    Kink: defineAsyncComponent({
      loader: () => import('@/components/Kink.vue'),
      loadingComponent: LoaderBar,
    }),
    LocaleEditor,
  },
  computed: {
    localSubCategory: {
      debug: false,
      get() { return this.subcategory ? this.subcategory : {}; },
      set(newVal) {
        if (this.debug) { console.log({ 'KinkSubCategory emit update:subcategory': newVal }); }
        this.$emit('update:subcategory', this.localSubCategory);
      },

    },

  },
};
</script>
