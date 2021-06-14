<template>
  <div class="column
              box"
       >
    <div class="box name">
      <h4
        class="title"
        >{{ t('name',kink.name) }}</h4>
    </div>
    <p class="block kink description" v-if="te('description')">
    {{ t('description') }}
    </p>
    <div
      class=" columns
              is-align-items-stretch
              is-desktop"
      >
      <template
        v-if="localKink.variants"
        >
        <KinkVariant
          v-for="variant in localKink.variants"
          :key="key+'-'+variant.name"
          :variant=variant
          @update:variant="updateVariant"
          />
      </template>
        <template
          v-else
          >
          <KinkPreference
            v-model:preferences="localKink.preferences"
            @update:preferences="updatePreferences"
            />
        </template>
    </div>
  </div>
</template>

<script>
import KinkVariant from '@/components/KinkVariant.vue';
import KinkPreference from '@/components/KinkPreference.vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'Kink',
  props: {
    key: {
      type: String,
    },
    kink: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    variants: {
      type: Array,
      default() {
        return [];
      },
    },
    roles: {
      type: Array,
    },
    comment: {
      type: String,
      default: '',
    },
  },

  emits:
  [
    'update:kink',
  ],
  setup(props) {
    const { t, te } = useI18n({
      messages: props.kink.messages || { en: { name: props.kink.name } },
    });
    return {
      t,
      te,
    };
  },
  components: {
    KinkVariant,
    KinkPreference,
  },
  methods: {
    updatePreferences(newVal) {
      this.localKink.preferences = newVal;
    },
    updateVariant(newVal) {
      this.localVariants[
        this.localVariants.findIndex(
          (element) => element.name === newVal.name,
        )
      ] = newVal;
    },
  },
  computed: {
    localKink: {
      get() {
        return { preferences: {}, ...this.kink }
      },
      set(newVal) {
        this.$emit('update:kink', newVal);
      },

    },
    localVariants: {
      get() { return this.variants; },
      set(localVariants) {
        this.$emit('update:variants', localVariants);
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
