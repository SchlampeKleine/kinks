<template>
  <section class="section
                  is-centered"
           >
    <h2
      class="title"
      >{{ t('name',category.name) }}</h2>
    <div
    class=" columns
            is-align-items-stretch
            is-variable
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
  </section>
</template>

<script>
import Kink from '@/components/Kink.vue';
import KinkSubCategory from '@/components/KinkSubCategory.vue';
import { useI18n } from 'vue-i18n';

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
    return {
      t,
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
    Kink,
    KinkSubCategory,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
