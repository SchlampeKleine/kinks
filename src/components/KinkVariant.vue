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
      :id="id+'-'+'preferences'"
      :key="id+'-'+'preferences'"
      v-bind:object="localVariant"
      v-model:preferences="localPreferences"
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

    id: {
      type: String,
      required: true,
    },

    variant: {
      type: Object,
      required: true,
    },

  },

  data() {
    return {
      debug: false,
    };
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

  computed: {

    localVariant: {
      get() {
        return { preferences: {}, ...this.variant };
      },
      set(newVal) {
        if (this.debug) {
          console.log({ 'KinkVariant: Update Variant': newVal });
        }
        this.$emit('update:variant', { ...newVal });
      },
    },

    localPreferences: {
      get() {
        return this.variant.preferences || {};
      },
      set(newVal) {
        if (this.debug) {
          console.log({ 'KinkVariant localPreferences set': newVal });
        }
        this.localVariant = { ...this.variant, preferences: newVal };
        this.$emit('update:variant', { ...this.localVariant, preferences: newVal });
      },
    },

  },

  methods: {

    updateVariant(newVal) {
      if (this.debug) {
        console.log({ 'KinkVariant updateVariant': newVal });
      }
      this.$emit('update:variant', { ...newVal });
    },

    updatePreferences(newVal) {
      this.localVariant.preferences = newVal;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
