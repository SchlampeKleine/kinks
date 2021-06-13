<template>
  <div
    class="column"
    >
    <h3
      class="title"
      >{{ t('name',subcategory.name) }}</h3>
    <div
      class="columns is-align-items-stretch is-variable is-full-mobile is-half-tablet
             is-one-quarter-desktop is-multiline"
      >
      <Kink
        v-for="kink in kinds"
        :key="kink.name"
        :kink=kink
        :variants="kink.variants"
        @update:kink="updateKink"
        />
    </div>
  </div>
</template>

<script>
import Kink from '@/components/Kink.vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'KinkSubCategory',
  props: {
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
    return {
      t,
    };
  },
  methods: {

    updateKink(newVal) {
      this.localSubCategory.kinds[
        this.localSubCategory.kinds.findIndex(
          (element) => element.name === newVal.name,
        )
      ] = newVal;
      // console.log({"KinkSubCategory: updated Kink":newVal})
      // this.$emit("update:subcategory",this.localSubCategory);
    },
  },
  components: {
    Kink,
  },
  computed: {
    localSubCategory: {
      get() { return this.subcategory ? this.subcategory : {}; },
      set(newVal) {
        this.$emit('update:subcategory', newVal);
      },

    },

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
