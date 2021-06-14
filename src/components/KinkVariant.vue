<template>
  <div class="column
              box
              variant
              is-align-items-space-between"
       >
    <h5 class="title variant name" >{{ t('name',variant.name) }}</h5>
    <p class="block variant description" v-if="te('description')">
    {{ t('description') }}
    </p>
    <KinkPreference
      v-model:preferences="localVariant.preferences"
      :key="key"
      @update:preferences="updatePreferences"
      />
  </div>
</template>

<script>
import KinkPreference from '@/components/KinkPreference.vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'KinkVariant',
  emits: [
    'update:variant',
  ],
  props: {
    key: {
      type: String,
    },
    variant: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { t, te } = useI18n({
      messages: props.variant.messages || { en: { name: props.variant.name } },
    });
    return {
      t,
      te,
    };
  },
  components: {
    KinkPreference,
  },

  watch: {
    /*
    localVariant: {
      deep: true,
      immediate: true,
      handler(newVal) {
        // console.log({"KinkVariant: change localVariant": newVal.name})
        this.localVariant = newVal;
        this.$emit('update:variant', this.localVariant);
      },
    },
    */

  },
  computed: {
    localVariant: {
      get() {
        return { preferences: {}, ...this.variant };
      },
      set(newVal) {
        console.log({ 'KinkVariant: Update Variant': newVal });
        this.$emit('update:variant', newVal);
      },
    },
  },
  methods: {
    updatePreferences(newVal) {
      this.localVariant.preferences = newVal;
      this.$emit('update:variant', this.localVariant);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
