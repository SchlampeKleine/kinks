<template>
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
        v-for="kink in kinds"
        :id="id+'-'+kink.name"
        :key="'kink-'+kink.name"
        :kink=kink
        :variants="kink.variants"
        @update:kink="updateKink"
        />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
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
      required: true,
    },
    key: {
      type: String,
    },
    subcategory: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
    },
    kinds: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props) {
    const { t } = useI18n({
      messages: props.subcategory.messages || { en: { name: props.subcategory.name } },
    });
    const { getEditMode } = useEditMode();
    return {
      t,
      getEditMode,
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
