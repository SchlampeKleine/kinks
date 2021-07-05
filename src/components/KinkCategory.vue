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
      <div
        class=" columns
                   is-multiline
                   is-tablet"
        >
        <KinkSubCategory
          v-for="subcategory in localCategory.subcategories"
          :id="id+'-'+subcategory.name"
          :key="'subcategories-'+subcategory.name"
          :subcategory="subcategory"
          :kinds="subcategory.kinds"
          @update:subcategory="updateSubcategory"
          />
        <Kink
          v-for="kink in localCategory.kinds"
          :id="id+'-'+kink.name"
          :key="'kink-'+kink.name"
          :kink="kink"
          :variants="kink.variants"
          @update:kink="updateKink"
          />
      </div>
    </div>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { defineAsyncComponent } from 'vue';
import LoaderBar from '@/components/LoaderBar.vue';
import LocaleEditor from '@/components/LocaleModifier.vue';
import useEditMode from '@/plugins/EditMode';
import ModalButtonYamlEdit from '@/components/ModalButtonYamlEdit.vue';

export default {
  name: 'KinkCategory',
  props: {
    id: {
      type: String,
      required: true,
    },
    category: {
      type: Object,
      required: true,
    },
    subcategories: {
      kind: Array,
      default() {
        return [];
      },
    },
    kinds: {
      kind: Array,
      default() {
        return [];
      },
    },
    name: {
      type: String,
      required: true,

    },
  },
  setup(props) {
    const { t } = useI18n({
      messages: props.category.messages || { en: { name: props.category.name } },
    });
    const { getEditMode } = useEditMode();

    return {
      t,
      getEditMode,
    };
  },
  emits: ['update:category'],
  computed: {
    localCategory: {
      get() {
        const tmpCategory = this.category ? this.category : {};
        if (!(tmpCategory.subcategories)) tmpCategory.subcategories = [];
        if (!(tmpCategory.kinds)) tmpCategory.kinds = [];
        return tmpCategory;
      },
      set(newVal) {
        this.$emit('update:category', newVal);
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
